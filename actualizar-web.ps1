# =============================================================
#  DE RAÍZ — Actualizar la web online
# -------------------------------------------------------------
#  Usalo cada vez que cambies precios, stock, productos o fotos.
#  Sube los cambios y en 1 o 2 minutos se ven en:
#  https://alkirian.github.io/nueva-web-de-ra-z/
# =============================================================

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  DE RAIZ - Actualizar la web" -ForegroundColor Green
Write-Host "  ===========================" -ForegroundColor Green
Write-Host ""

$cambios = git status --porcelain
if (-not $cambios) {
    Write-Host "  No hay cambios para subir." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "  Presiona Enter para cerrar"
    exit 0
}

Write-Host "  Cambios detectados:"
git status --short
Write-Host ""

$fecha = Get-Date -Format "dd/MM/yyyy HH:mm"
git add -A
git commit -q -m "Actualizacion del $fecha"

Write-Host "  Subiendo..."
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "  No se pudo subir." -ForegroundColor Red
    Read-Host "  Presiona Enter para cerrar"
    exit 1
}

Write-Host ""
Write-Host "  LISTO - los cambios se ven en 1 o 2 minutos en:" -ForegroundColor Green
Write-Host "  https://alkirian.github.io/nueva-web-de-ra-z/" -ForegroundColor Cyan
Write-Host ""
Read-Host "  Presiona Enter para cerrar"
