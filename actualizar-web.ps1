# =============================================================
#  DE RAIZ - Actualizar la web online
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

# Solo los archivos de la web que ya estan versionados: asi un archivo
# suelto en la carpeta no se sube de prepo.
$cambios = git status --porcelain --untracked-files=no
if (-not $cambios) {
    Write-Host "  No hay cambios para subir." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "  Presiona Enter para cerrar"
    exit 0
}

Write-Host "  Cambios detectados:"
git status --short --untracked-files=no
Write-Host ""

$fecha = Get-Date -Format "dd/MM/yyyy HH:mm"
git add -u
git commit -q -m "Actualizacion del $fecha"

# El push normal se queda colgado esperando usuario y contrasena, porque
# Windows ya no tiene guardada la clave de GitHub. Se la pedimos a GitHub CLI
# en el momento y la usamos solo para este envio (no queda guardada en ningun
# archivo).
Write-Host "  Subiendo..."
$token = (& gh auth token 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $token) {
    Write-Host "  No se pudo subir: falta la clave de GitHub." -ForegroundColor Red
    Write-Host "  Abri una terminal y escribi:  gh auth login" -ForegroundColor Yellow
    Read-Host "  Presiona Enter para cerrar"
    exit 1
}

$destino = "https://x-access-token:$token@github.com/alkirian/nueva-web-de-ra-z.git"
# El 2>&1 junta los mensajes de git; el -replace tapa la clave por si aparece.
$salida = (& git push $destino main 2>&1) -replace [regex]::Escape($token), '***'
$exito = ($LASTEXITCODE -eq 0)
$token = $null
$destino = $null

if (-not $exito) {
    Write-Host "  No se pudo subir." -ForegroundColor Red
    Write-Host $salida
    Read-Host "  Presiona Enter para cerrar"
    exit 1
}

Write-Host ""
Write-Host "  LISTO - los cambios se ven en 1 o 2 minutos en:" -ForegroundColor Green
Write-Host "  https://alkirian.github.io/nueva-web-de-ra-z/" -ForegroundColor Cyan
Write-Host ""
Read-Host "  Presiona Enter para cerrar"
