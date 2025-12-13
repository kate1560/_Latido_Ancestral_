@echo off
REM Script de Inicio Rápido - Tienda Virtual (Windows)
REM Este script instala y inicia tanto el frontend como el backend

echo.
echo ===================================================
echo Bienvenido a Tienda Virtual
echo ===================================================
echo.

REM Instalar dependencias del backend
echo Instalando dependencias del backend...
cd backend
call npm install
echo.
echo Dependencias del backend instaladas!
echo.

REM Volver a la raíz
cd ..

REM Instalar dependencias del frontend
echo Verificando dependencias del frontend...
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    call npm install
    echo.
    echo Dependencias del frontend instaladas!
) else (
    echo Dependencias del frontend ya están instaladas
)
echo.

REM Información final
echo ===================================================
echo.
echo Para iniciar el proyecto, abre DOS terminales:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo   Servidor en: http://localhost:4000
echo.
echo Terminal 2 - Frontend:
echo   npm run dev
echo   App en: http://localhost:3000
echo.
echo ===================================================
echo.
pause
