from fastapi import APIRouter
from .endpoints import auth, usuarios, promocoes, participantes, sorteios

api_router = APIRouter()

# Inclui rotas de autenticação sem prefixo
api_router.include_router(auth.router, tags=["auth"])

# Inclui rotas de usuários
api_router.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])

# Inclui rotas de promoções
api_router.include_router(promocoes.router, prefix="/promocoes", tags=["promocoes"])

# Inclui rotas de participantes
api_router.include_router(participantes.router, prefix="/participantes", tags=["participantes"])

# Inclui rotas de sorteios
api_router.include_router(sorteios.router, prefix="/sorteios", tags=["sorteios"])