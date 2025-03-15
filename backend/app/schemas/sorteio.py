from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Base model for shared properties
class SorteioBase(BaseModel):
    data_sorteio: datetime
    descricao: Optional[str] = None

# Properties to receive via API on creation
class SorteioCreate(SorteioBase):
    promocao_id: int

# Properties to receive via API on update
class SorteioUpdate(BaseModel):
    data_sorteio: Optional[datetime] = None
    descricao: Optional[str] = None

# Properties shared by models stored in DB
class SorteioInDB(SorteioBase):
    id: int
    promocao_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Sorteio(SorteioInDB):
    pass

# For performing a draw
class SorteioExecute(BaseModel):
    quantidade: int = 1