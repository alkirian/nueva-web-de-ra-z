# =============================================================
#  DE RAÍZ — Publicar la web en GitHub Pages
# -------------------------------------------------------------
#  Crea el repositorio, sube los archivos y activa GitHub Pages.
#  Se ejecuta una sola vez. Después, para actualizar la web,
#  usá el otro archivo: actualizar-web.ps1
# =============================================================

$ErrorActionPreference = 'Stop'
$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repo = "deraiz-floricultura"   # nombre del repositorio en GitHub

Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  DE RAIZ - Publicar la web" -ForegroundColor Green
Write-Host "  =========================" -ForegroundColor Green
Write-Host ""

# 1 · Verificar sesión de GitHub
& $gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Primero hay que conectar tu cuenta de GitHub." -ForegroundColor Yellow
    Write-Host "  Se va a abrir el navegador para que inicies sesion."
    Write-Host ""
    & $gh auth login --hostname github.com --git-protocol https --web
    if ($LASTEXITCODE -ne 0) { Write-Host "  No se pudo iniciar sesion." -ForegroundColor Red; exit 1 }
}

$usuario = (& $gh api user --jq .login)
Write-Host "  Conectado como: $usuario" -ForegroundColor Green
Write-Host ""

# 2 · Crear el repositorio (si ya existe, seguimos)
Write-Host "  Creando el repositorio '$repo'..."
& $gh repo create $repo --public --source=. --remote=origin --description "Web de De Raiz Floricultura - vivero en Las Piedras, Canelones" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "  (el repositorio ya existia, se reutiliza)" -ForegroundColor Yellow
    git remote remove origin 2>$null
    git remote add origin "https://github.com/$usuario/$repo.git"
}

# 3 · Subir los archivos
Write-Host "  Subiendo los archivos..."
git push -u origin main
if ($LASTEXITCODE -ne 0) { Write-Host "  No se pudieron subir los archivos." -ForegroundColor Red; exit 1 }

# 4 · Activar GitHub Pages
Write-Host "  Activando GitHub Pages..."
& $gh api "repos/$usuario/$repo/pages" -X POST -f "source[branch]=main" -f "source[path]=/" 2>$null
if ($LASTEXITCODE -ne 0) {
    & $gh api "repos/$usuario/$repo/pages" -X PUT -f "source[branch]=main" -f "source[path]=/" 2>$null
}

Write-Host ""
Write-Host "  LISTO" -ForegroundColor Green
Write-Host ""
Write-Host "  Tu web va a estar online en 1 o 2 minutos en:" -ForegroundColor Green
Write-Host "  https://$usuario.github.io/$repo/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  El repositorio quedo en:"
Write-Host "  https://github.com/$usuario/$repo"
Write-Host ""
Read-Host "  Presiona Enter para cerrar"
