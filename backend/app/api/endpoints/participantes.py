from fastapi import APIRouter, Depends, HTTPException, status, Query, Path
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import func, and_

from ...core.deps import get_active_user
from ...db.base import get_db
from ...models.usuario import Usuario
from ...models.promocao import Promocao
from ...models.participante import Participante
from ...schemas.participante import (
    Participante as ParticipanteSchema, 
    ParticipanteCreate, 
    ParticipanteUpdate
)

router = APIRouter()

@router.post("/", response_model=ParticipanteSchema, status_code=status.HTTP_201_CREATED)
def create_participante(
    participante_in: ParticipanteCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Cadastra um participante em uma promoção.
    """
    # Verificar se a promoção existe e pertence ao usuário
    promocao = db.query(Promocao).filter(
        Promocao.id == participante_in.promocao_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not promocao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promoção não encontrada ou você não tem permissão para acessá-la"
        )
    
    # Verificar se o participante já existe (mesmo telefone na mesma promoção)
    existing_participant = db.query(Participante).filter(
        Participante.promocao_id == participante_in.promocao_id,
        Participante.telefone == participante_in.telefone
    ).first()
    
    if existing_participant:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Participante com este telefone já está cadastrado nesta promoção"
        )
    
    # Criar o participante
    participante = Participante(**participante_in.dict())
    db.add(participante)
    db.commit()
    db.refresh(participante)
    return participante

@router.get("/promocao/{promocao_id}", response_model=List[ParticipanteSchema])
def list_participantes_by_promocao(
    promocao_id: int,
    skip: int = 0,
    limit: int = 100,
    search: str = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Lista os participantes de uma promoção específica.
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
    
    # Construir a query base
    query = db.query(Participante).filter(Participante.promocao_id == promocao_id)
    
    # Adicionar filtro de pesquisa se fornecido
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            Participante.nome.like(search_pattern) | 
            Participante.telefone.like(search_pattern) |
            Participante.email.like(search_pattern)
        )
    
    # Executar a query com paginação
    participantes = query.offset(skip).limit(limit).all()
    return participantes

@router.get("/{participante_id}", response_model=ParticipanteSchema)
def read_participante(
    participante_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Obtém detalhes de um participante específico.
    """
    # Buscar o participante verificando se a promoção relacionada pertence ao usuário
    participante = db.query(Participante).join(
        Promocao, Participante.promocao_id == Promocao.id
    ).filter(
        Participante.id == participante_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not participante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Participante não encontrado ou você não tem permissão para acessá-lo"
        )
    
    return participante

@router.put("/{participante_id}", response_model=ParticipanteSchema)
def update_participante(
    participante_id: int,
    participante_in: ParticipanteUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Atualiza os dados de um participante.
    """
    # Buscar o participante verificando se a promoção relacionada pertence ao usuário
    participante = db.query(Participante).join(
        Promocao, Participante.promocao_id == Promocao.id
    ).filter(
        Participante.id == participante_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not participante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Participante não encontrado ou você não tem permissão para acessá-lo"
        )
    
    # Se estiver atualizando o telefone, verificar se não causa duplicação
    if participante_in.telefone and participante_in.telefone != participante.telefone:
        existing = db.query(Participante).filter(
            Participante.promocao_id == participante.promocao_id,
            Participante.telefone == participante_in.telefone,
            Participante.id != participante_id
        ).first()
        
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Outro participante com este telefone já está cadastrado nesta promoção"
            )
    
    # Atualizar os dados do participante
    update_data = participante_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(participante, field, value)
    
    db.add(participante)
    db.commit()
    db.refresh(participante)
    return participante

@router.delete("/{participante_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_participante(
    participante_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Remove um participante.
    """
    # Buscar o participante verificando se a promoção relacionada pertence ao usuário
    participante = db.query(Participante).join(
        Promocao, Participante.promocao_id == Promocao.id
    ).filter(
        Participante.id == participante_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not participante:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Participante não encontrado ou você não tem permissão para acessá-lo"
        )
    
    db.delete(participante)
    db.commit()
    return None

@router.get("/promocao/{promocao_id}/count", response_model=int)
def count_participantes(
    promocao_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Retorna o número total de participantes em uma promoção.
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
    
    # Contar participantes
    count = db.query(func.count(Participante.id)).filter(
        Participante.promocao_id == promocao_id
    ).scalar()
    
    return count