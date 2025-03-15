from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from ..db.base import get_db
from ..models.usuario import Usuario
from ..schemas.usuario import TokenPayload
from .security import SECRET_KEY, ALGORITHM

# Dependency for OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> Usuario:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenPayload(sub=user_id, exp=payload.get("exp"))
    except JWTError:
        raise credentials_exception
    
    user = db.query(Usuario).filter(Usuario.id == token_data.sub).first()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Usuário inativo")
    return user

def get_active_user(current_user: Usuario = Depends(get_current_user)) -> Usuario:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Usuário inativo")
    return current_user