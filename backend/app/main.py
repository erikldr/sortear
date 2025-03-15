from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .api import api_router
from .db.base import engine, Base

# Cria todas as tabelas definidas no SQLAlchemy
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SorteAr API", 
    description="API para gerenciamento de promoções e sorteios para rádios",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, definir origens específicas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir roteador principal da API
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Bem-vindo à API do SorteAr",
        "documentation": "/api/docs",
        "version": "1.0.0"
    }
