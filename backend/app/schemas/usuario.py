from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Base model for shared properties
class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr
    radio: str

# Properties to receive via API on creation
class UsuarioCreate(UsuarioBase):
    senha: str = Field(..., min_length=6)

# Properties to receive via API on update
class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    radio: Optional[str] = None
    senha: Optional[str] = Field(None, min_length=6)
    is_active: Optional[bool] = None

# Properties shared by models stored in DB
class UsuarioInDB(UsuarioBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Usuario(UsuarioInDB):
    pass

# Properties for login
class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str

# Properties for token
class Token(BaseModel):
    access_token: str
    token_type: str

# Properties contained in token
class TokenPayload(BaseModel):
    sub: str
    exp: int