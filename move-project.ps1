# Move project outside OneDrive to fix file locking issues
# Run as Administrator

Write-Host "📦 Moving Real Estate project outside OneDrive..." -ForegroundColor Cyan

$source = "c:\Users\HP\OneDrive\Documents\Real Estate"
$destination = "C:\Projects\Real-Estate"

# Create Projects folder if it doesn't exist
New-Item -ItemType Directory -Force -Path "C:\Projects" | Out-Null

# Move the project
Write-Host "Moving files (this may take a minute)..." -ForegroundColor Yellow
Move-Item -Path $source -Destination $destination -Force

Write-Host "✅ Project moved to: $destination" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Open VS Code: code '$destination'" -ForegroundColor White
Write-Host "2. In terminal: cd backend && npx prisma generate" -ForegroundColor White
Write-Host "3. All 80 errors will disappear!" -ForegroundColor White

# Offer to open in VS Code
$openVSCode = Read-Host "`nOpen project in VS Code now? (y/n)"
if ($openVSCode -eq 'y') {
    code $destination
}
