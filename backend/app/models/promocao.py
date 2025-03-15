from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.base import Base

class Promocao(Base):
    __tablename__ = "promocoes"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(Text)
    data_inicio = Column(Date, nullable=False)
    data_fim = Column(Date, nullable=False)
    status = Column(String, default="inativa")
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    usuario = relationship("Usuario", back_populates="promocoes")
    participantes = relationship("Participante", back_populates="promocao", cascade="all, delete-orphan")
    sorteios = relationship("Sorteio", back_populates="promocao", cascade="all, delete-orphan")