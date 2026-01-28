-- 1. Habilita extensão para gerar UUIDs (v4)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Configurações de Timezone (Opcional, mas recomendado)
SET timezone = 'America/Sao_Paulo';

-- ==========================================
-- MÓDULO: AUTH
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- MÓDULO: PLANTS (CORE)
-- ==========================================

-- Enum para garantir a integridade dos tipos de cuidado
DO $$ BEGIN
    CREATE TYPE care_type AS ENUM ('WATER', 'FERTILIZE', 'PRUNE', 'PEST_CONTROL', 'NOTE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS plants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, 
    
    -- Dados Básicos (Input do Usuário)
    nickname VARCHAR(100) NOT NULL,
    original_image_path TEXT, -- Foto original que o usuário subiu

    -- Dados Enriquecidos pela IA (Processamento em Background)
    scientific_name VARCHAR(150),
    icon_path TEXT, -- Imagem "cartonesca" gerada
    description TEXT,
    
    -- Status do Processamento (Para a UI saber se mostra loading)
    ai_processing_status VARCHAR(20) DEFAULT 'PENDING' CHECK (ai_processing_status IN ('PENDING', 'COMPLETED', 'FAILED')),
    
    -- O "Cérebro" da planta (JSON flexível com regras de rega, sol, etc)
    ai_data JSONB, 
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- FK
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Tabela de Logs (Diário)
CREATE TABLE IF NOT EXISTS care_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plant_id UUID NOT NULL,
    
    type care_type NOT NULL, -- Usa o ENUM
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- FK
    CONSTRAINT fk_plant
        FOREIGN KEY(plant_id) 
        REFERENCES plants(id)
        ON DELETE CASCADE
);

-- ==========================================
-- INDEXES (Performance)
-- ==========================================

-- Busca rápida de usuário por email (login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Listagem de plantas de um usuário (dashboard principal)
CREATE INDEX IF NOT EXISTS idx_plants_user ON plants(user_id);

-- Histórico de uma planta específica
CREATE INDEX IF NOT EXISTS idx_logs_plant ON care_logs(plant_id);

-- Queries JSONB (ex: Buscar todas as plantas que gostam de 'high sun')
CREATE INDEX IF NOT EXISTS idx_plants_ai_data ON plants USING gin (ai_data);