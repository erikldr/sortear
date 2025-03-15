from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.base import Base

class Participante(Base):
    __tablename__ = "participantes"
    
    id = Column(Integer, primary_key=True, index=True)
    promocao_id = Column(Integer, ForeignKey("promocoes.id"), nullable=False)
    nome = Column(String, nullable=False)
    telefone = Column(String, nullable=False)
    cpf = Column(String)
    email = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    promocao = relationship("Promocao", back_populates="participantes")
    ganhadores = relationship("Ganhador", back_populates="participante", cascade="all, delete-orphan")
    
    # Constraints
    __table_args__ = (
        UniqueConstraint('promocao_id', 'telefone', name='uq_participante_promocao_telefone'),
    )