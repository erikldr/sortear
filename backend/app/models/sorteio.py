from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.base import Base

class Sorteio(Base):
    __tablename__ = "sorteios"
    
    id = Column(Integer, primary_key=True, index=True)
    promocao_id = Column(Integer, ForeignKey("promocoes.id"), nullable=False)
    data_sorteio = Column(DateTime(timezone=True), nullable=False)
    descricao = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    promocao = relationship("Promocao", back_populates="sorteios")
    ganhadores = relationship("Ganhador", back_populates="sorteio", cascade="all, delete-orphan")