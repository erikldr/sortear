from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import func

from ...core.deps import get_active_user
from ...db.base import get_db
from ...models.usuario import Usuario
from ...models.promocao import Promocao
from ...models.participante import Participante
from ...models.sorteio import Sorteio
from ...schemas.promocao import (
    Promocao as PromocaoSchema, 
    PromocaoCreate, 
    PromocaoUpdate,
    PromocaoWithCount
)

router = APIRouter()

@router.post("/", response_model=PromocaoSchema, status_code=status.HTTP_201_CREATED)
def create_promocao(
    promocao_in: PromocaoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Cria uma nova promoção.
    """
    # Validações adicionais podem ser incluídas aqui
    promocao = Promocao(
        **promocao_in.dict(),
        usuario_id=current_user.id
    )
    db.add(promocao)
    db.commit()
    db.refresh(promocao)
    return promocao

@router.get("/", response_model=List[PromocaoWithCount])
def read_promocoes(
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Retorna a lista de promoções do usuário atual.
    """
    query = db.query(
        Promocao,
        func.count(Participante.id).label("participantes_count"),
        func.count(Sorteio.id).label("sorteios_count")
    ).outerjoin(
        Participante, Promocao.id == Participante.promocao_id
    ).outerjoin(
        Sorteio, Promocao.id == Sorteio.promocao_id
    ).filter(
        Promocao.usuario_id == current_user.id
    ).group_by(
        Promocao.id
    )
    
    if status:
        query = query.filter(Promocao.status == status)
    
    result = query.offset(skip).limit(limit).all()
    
    # Transformar resultado em lista de PromocaoWithCount
    promocoes = []
    for promocao, participantes_count, sorteios_count in result:
        promocao_dict = {
            **PromocaoSchema.from_orm(promocao).dict(),
            "participantes_count": participantes_count,
            "sorteios_count": sorteios_count
        }
        promocoes.append(promocao_dict)
    
    return promocoes

@router.get("/{promocao_id}", response_model=PromocaoSchema)
def read_promocao(
    promocao_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Obtém uma promoção específica pelo ID.
    """
    promocao = db.query(Promocao).filter(
        Promocao.id == promocao_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not promocao:
        raise HTTPException(status_code=404, detail="Promoção não encontrada")
    
    return promocao

@router.put("/{promocao_id}", response_model=PromocaoSchema)
def update_promocao(
    promocao_id: int,
    promocao_in: PromocaoUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Atualiza uma promoção.
    """
    promocao = db.query(Promocao).filter(
        Promocao.id == promocao_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not promocao:
        raise HTTPException(status_code=404, detail="Promoção não encontrada")
    
    # Atualiza os atributos da promoção
    update_data = promocao_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(promocao, field, value)
    
    db.add(promocao)
    db.commit()
    db.refresh(promocao)
    return promocao

@router.delete("/{promocao_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_promocao(
    promocao_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Remove uma promoção.
    """
    promocao = db.query(Promocao).filter(
        Promocao.id == promocao_id,
        Promocao.usuario_id == current_user.id
    ).first()
    
    if not promocao:
        raise HTTPException(status_code=404, detail="Promoção não encontrada")
    
    db.delete(promocao)
    db.commit()
    return None