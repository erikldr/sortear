from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Base model for shared properties
class ParticipanteBase(BaseModel):
    nome: str
    telefone: str
    cpf: Optional[str] = None
    email: Optional[EmailStr] = None

# Properties to receive via API on creation
class ParticipanteCreate(ParticipanteBase):
    promocao_id: int

# Properties to receive via API on update
class ParticipanteUpdate(BaseModel):
    nome: Optional[str] = None
    telefone: Optional[str] = None
    cpf: Optional[str] = None
    email: Optional[EmailStr] = None

# Properties shared by models stored in DB
class ParticipanteInDB(ParticipanteBase):
    id: int
    promocao_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Participante(ParticipanteInDB):
    pass