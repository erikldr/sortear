from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.base import Base

class Ganhador(Base):
    __tablename__ = "ganhadores"
    
    id = Column(Integer, primary_key=True, index=True)
    sorteio_id = Column(Integer, ForeignKey("sorteios.id"), nullable=False)
    participante_id = Column(Integer, ForeignKey("participantes.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    sorteio = relationship("Sorteio", back_populates="ganhadores")
    participante = relationship("Participante", back_populates="ganhadores")
    
    # Constraints
    __table_args__ = (
        UniqueConstraint('sorteio_id', 'participante_id', name='uq_ganhador_sorteio_participante'),
    )