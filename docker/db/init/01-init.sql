-- Script de inicialização do banco de dados

-- Criar esquema template para multi-tenant
CREATE SCHEMA IF NOT EXISTS tenant_template;

-- Tabela de rádios no esquema template
CREATE TABLE IF NOT EXISTS tenant_template.radios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de promoções
CREATE TABLE IF NOT EXISTS tenant_template.promocoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'inativa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de participantes
CREATE TABLE IF NOT EXISTS tenant_template.participantes (
    id SERIAL PRIMARY KEY,
    promocao_id INTEGER NOT NULL REFERENCES tenant_template.promocoes(id),
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(promocao_id, telefone)
);

-- Tabela de sorteios
CREATE TABLE IF NOT EXISTS tenant_template.sorteios (
    id SERIAL PRIMARY KEY,
    promocao_id INTEGER NOT NULL REFERENCES tenant_template.promocoes(id),
    data_sorteio TIMESTAMP WITH TIME ZONE NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de ganhadores
CREATE TABLE IF NOT EXISTS tenant_template.ganhadores (
    id SERIAL PRIMARY KEY,
    sorteio_id INTEGER NOT NULL REFERENCES tenant_template.sorteios(id),
    participante_id INTEGER NOT NULL REFERENCES tenant_template.participantes(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(sorteio_id, participante_id)
);
