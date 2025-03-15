from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime

# Base model for shared properties
class PromocaoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    data_inicio: date
    data_fim: date
    status: str = "inativa"

# Properties to receive via API on creation
class PromocaoCreate(PromocaoBase):
    pass

# Properties to receive via API on update
class PromocaoUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[str] = None

# Properties shared by models stored in DB
class PromocaoInDB(PromocaoBase):
    id: int
    usuario_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Promocao(PromocaoInDB):
    pass

# Properties to return with participant count
class PromocaoWithCount(Promocao):
    participantes_count: int
    sorteios_count: int