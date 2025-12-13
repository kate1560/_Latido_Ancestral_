#!/bin/bash

# Script de Inicio Rápido - Tienda Virtual
# Este script instala y inicia tanto el frontend como el backend

echo "🚀 Iniciando Tienda Virtual..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Instalar dependencias del backend
echo -e "${BLUE}📦 Instalando dependencias del backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# Volver a la raíz
cd ..

# Instalar dependencias del frontend (si es necesario)
echo -e "${BLUE}📦 Verificando dependencias del frontend...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi
echo ""

# Información
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Para iniciar el proyecto, abre dos terminales:${NC}"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd backend"
echo "  npm run dev"
echo "  Servidor en: http://localhost:4000"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  npm run dev"
echo "  App en: http://localhost:3000"
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
