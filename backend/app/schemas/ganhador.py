from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from .participante import Participante

# Base model for shared properties
class GanhadorBase(BaseModel):
    sorteio_id: int
    participante_id: int

# Properties to receive via API on creation
class GanhadorCreate(GanhadorBase):
    pass

# Properties shared by models stored in DB
class GanhadorInDB(GanhadorBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Ganhador(GanhadorInDB):
    pass

# Properties to return with participant details
class GanhadorWithParticipante(Ganhador):
    participante: Participante