from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...core.deps import get_current_user, get_active_user
from ...core.security import get_password_hash
from ...db.base import get_db
from ...models.usuario import Usuario
from ...schemas.usuario import Usuario as UsuarioSchema
from ...schemas.usuario import UsuarioCreate, UsuarioUpdate

router = APIRouter()

@router.post("/", response_model=UsuarioSchema, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UsuarioCreate, db: Session = Depends(get_db)):
    """
    Cria um novo usuário.
    """
    # Verifica se o e-mail já está em uso
    user = db.query(Usuario).filter(Usuario.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já registrado no sistema",
        )
    
    # Cria o novo usuário
    user = Usuario(
        nome=user_in.nome,
        email=user_in.email,
        radio=user_in.radio,
        senha_hash=get_password_hash(user_in.senha),
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.get("/me", response_model=UsuarioSchema)
def read_user_me(current_user: Usuario = Depends(get_active_user)):
    """
    Obtém o usuário atual.
    """
    return current_user

@router.put("/me", response_model=UsuarioSchema)
def update_user_me(
    user_in: UsuarioUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_active_user),
):
    """
    Atualiza dados do usuário atual.
    """
    # Prepara um dicionário com os valores a atualizar
    update_data = user_in.dict(exclude_unset=True)
    
    # Verificar se está atualizando o e-mail e se ele já está em uso
    if "email" in update_data and update_data["email"] != current_user.email:
        existing_user = db.query(Usuario).filter(Usuario.email == update_data["email"]).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já registrado no sistema",
            )
    
    # Trata a senha separadamente para fazer o hash
    if "senha" in update_data:
        update_data["senha_hash"] = get_password_hash(update_data.pop("senha"))
    
    # Atualiza os atributos do usuário
    for field, value in update_data.items():
        setattr(current_user, field, value)
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user