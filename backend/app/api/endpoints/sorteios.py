from fastapi import APIRouter, Depends, HTTPException, status, Query, Path
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import func
import random
from datetime import datetime

from ...core.deps import get_active_user
from ...db.base import get_db
from ...models.usuario import Usuario
from ...models.promocao import Promocao
from ...models.participante import Participante
from ...models.sorteio import Sorteio
from ...models.ganhador import Ganhador
from ...schemas.sorteio import (
    Sorteio as SorteioSchema,
    SorteioCreate,
    SorteioUpdate,
    SorteioExecute
)
from ...schemas.ganhador import (
    Ganhador as GanhadorSchema,
    GanhadorWithParticipante
)

router = APIRouter()

@router.post("/", response_model=SorteioSchema, status_code=status.HTTP_201_CREATED)
def create_sorteio(
    sorteio_in: SorteioCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Cria um novo sorteio para uma promoção.
    """
    # Verificar se a promoção existe e pertence ao usuário
    promocao = db.query(Promocao).filter(
        Promocao.id == sorteio_in.promocao_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not promocao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promoção não encontrada ou você não tem permissão para acessá-la"
        )
    
    # Verificar se a promoção está ativa
    if promocao.status != "ativa":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é possível criar sorteios para promoções inativas"
        )
    
    # Criar o sorteio
    sorteio = Sorteio(**sorteio_in.dict())
    db.add(sorteio)
    db.commit()
    db.refresh(sorteio)
    return sorteio

@router.get("/promocao/{promocao_id}", response_model=List[SorteioSchema])
def list_sorteios_by_promocao(
    promocao_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Lista os sorteios de uma promoção específica.
    """
    # Verificar se a promoção existe e pertence ao usuário
    promocao = db.query(Promocao).filter(
        Promocao.id == promocao_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not promocao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promoção não encontrada ou você não tem permissão para acessá-la"
        )
    
    # Buscar sorteios
    sorteios = db.query(Sorteio).filter(
        Sorteio.promocao_id == promocao_id
    ).order_by(
        Sorteio.data_sorteio.desc()
    ).all()
    
    return sorteios

@router.get("/{sorteio_id}", response_model=SorteioSchema)
def read_sorteio(
    sorteio_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Obtém detalhes de um sorteio específico.
    """
    # Buscar o sorteio verificando se a promoção relacionada pertence ao usuário
    sorteio = db.query(Sorteio).join(
        Promocao, Sorteio.promocao_id == Promocao.id
    ).filter(
        Sorteio.id == sorteio_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not sorteio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sorteio não encontrado ou você não tem permissão para acessá-lo"
        )
    
    return sorteio

@router.put("/{sorteio_id}", response_model=SorteioSchema)
def update_sorteio(
    sorteio_id: int,
    sorteio_in: SorteioUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Atualiza os dados de um sorteio.
    """
    # Buscar o sorteio verificando se a promoção relacionada pertence ao usuário
    sorteio = db.query(Sorteio).join(
        Promocao, Sorteio.promocao_id == Promocao.id
    ).filter(
        Sorteio.id == sorteio_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not sorteio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sorteio não encontrado ou você não tem permissão para acessá-lo"
        )
    
    # Verificar se o sorteio já tem ganhadores
    if db.query(Ganhador).filter(Ganhador.sorteio_id == sorteio_id).count() > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é possível atualizar um sorteio que já possui ganhadores"
        )
    
    # Atualizar os dados do sorteio
    update_data = sorteio_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(sorteio, field, value)
    
    db.add(sorteio)
    db.commit()
    db.refresh(sorteio)
    return sorteio

@router.delete("/{sorteio_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sorteio(
    sorteio_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Remove um sorteio que ainda não teve ganhadores sorteados.
    """
    # Buscar o sorteio verificando se a promoção relacionada pertence ao usuário
    sorteio = db.query(Sorteio).join(
        Promocao, Sorteio.promocao_id == Promocao.id
    ).filter(
        Sorteio.id == sorteio_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not sorteio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sorteio não encontrado ou você não tem permissão para acessá-lo"
        )
    
    # Verificar se o sorteio já tem ganhadores
    if db.query(Ganhador).filter(Ganhador.sorteio_id == sorteio_id).count() > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é possível excluir um sorteio que já possui ganhadores"
        )
    
    db.delete(sorteio)
    db.commit()
    return None

@router.post("/{sorteio_id}/executar", response_model=List[GanhadorWithParticipante])
def executar_sorteio(
    sorteio_id: int,
    params: SorteioExecute,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Executa um sorteio, selecionando aleatoriamente os ganhadores.
    """
    # Buscar o sorteio verificando se a promoção relacionada pertence ao usuário
    sorteio = db.query(Sorteio).join(
        Promocao, Sorteio.promocao_id == Promocao.id
    ).filter(
        Sorteio.id == sorteio_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not sorteio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sorteio não encontrado ou você não tem permissão para acessá-lo"
        )
    
    # Verificar se o sorteio já tem ganhadores
    if db.query(Ganhador).filter(Ganhador.sorteio_id == sorteio_id).count() > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este sorteio já foi executado anteriormente"
        )
    
    # Obter todos os participantes elegíveis da promoção
    participantes = db.query(Participante).filter(
        Participante.promocao_id == sorteio.promocao_id
    ).all()
    
    if not participantes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não há participantes cadastrados nesta promoção para realizar o sorteio"
        )
    
    # Definir número de ganhadores a sortear
    quantidade = min(params.quantidade, len(participantes))
    
    # Sortear os ganhadores aleatoriamente
    ganhadores_sorteados = random.sample(participantes, quantidade)
    
    # Registrar os ganhadores no banco de dados
    ganhadores_registrados = []
    for participante in ganhadores_sorteados:
        ganhador = Ganhador(
            sorteio_id=sorteio_id,
            participante_id=participante.id
        )
        db.add(ganhador)
        db.commit()
        db.refresh(ganhador)
        
        # Criar resposta enriquecida com os dados do participante
        ganhador_response = {
            "id": ganhador.id,
            "sorteio_id": ganhador.sorteio_id,
            "participante_id": ganhador.participante_id,
            "created_at": ganhador.created_at,
            "participante": participante
        }
        ganhadores_registrados.append(ganhador_response)
    
    return ganhadores_registrados

@router.get("/{sorteio_id}/ganhadores", response_model=List[GanhadorWithParticipante])
def list_ganhadores(
    sorteio_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Lista os ganhadores de um sorteio específico.
    """
    # Verificar se o sorteio existe e pertence ao usuário
    sorteio = db.query(Sorteio).join(
        Promocao, Sorteio.promocao_id == Promocao.id
    ).filter(
        Sorteio.id == sorteio_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not sorteio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sorteio não encontrado ou você não tem permissão para acessá-lo"
        )
    
    # Buscar ganhadores com os dados dos participantes
    ganhadores = db.query(Ganhador, Participante).join(
        Participante, Ganhador.participante_id == Participante.id
    ).filter(
        Ganhador.sorteio_id == sorteio_id
    ).all()
    
    # Formatar resultado
    result = []
    for ganhador, participante in ganhadores:
        ganhador_data = {
            "id": ganhador.id,
            "sorteio_id": ganhador.sorteio_id,
            "participante_id": ganhador.participante_id,
            "created_at": ganhador.created_at,
            "participante": participante
        }
        result.append(ganhador_data)
    
    return result