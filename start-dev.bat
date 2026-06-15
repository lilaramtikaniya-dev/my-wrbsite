@echo off
echo.
echo  ⚡ JSForge Runtime - Quick Start
echo  ══════════════════════════════════
echo.

REM Copy env files if needed
if not exist "backend\.env" (
  copy "backend\.env.example" "backend\.env" >nul
  echo  ✓ Created backend/.env
)
if not exist "frontend\.env.local" (
  copy "frontend\.env.example" "frontend\.env.local" >nul
  echo  ✓ Created frontend/.env.local
)

echo  Starting backend on port 4000...
start "JSForge Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo  Starting frontend on port 3000...
start "JSForge Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo  ✓ Both servers starting!
echo  Backend:  http://localhost:4000
echo  Frontend: http://localhost:3000
echo.
echo  Press any key to exit this window...
pause >nul
