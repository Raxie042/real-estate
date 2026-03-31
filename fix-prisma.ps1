# Run this script as Administrator to fix Prisma generation
# Right-click -> "Run with PowerShell"

Write-Host "🔧 Fixing Prisma Client Generation..." -ForegroundColor Cyan

# Stop OneDrive temporarily
Write-Host "`n⏸️  Stopping OneDrive..." -ForegroundColor Yellow
Stop-Process -Name "OneDrive" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Delete .prisma folders
Write-Host "🗑️  Deleting old Prisma client..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "node_modules\.prisma" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "backend\node_modules\.prisma" -ErrorAction SilentlyContinue

# Generate Prisma client
Write-Host "⚡ Generating Prisma client..." -ForegroundColor Yellow
Set-Location backend
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Success! Prisma client generated." -ForegroundColor Green
    
    # Ask about migration
    $runMigration = Read-Host "`nRun database migration? (y/n)"
    if ($runMigration -eq 'y') {
        Write-Host "`n🔄 Running migration..." -ForegroundColor Yellow
        npx prisma migrate dev --name add_phase2_features
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Migration complete!" -ForegroundColor Green
        } else {
            Write-Host "❌ Migration failed. Run manually: npm run prisma:migrate" -ForegroundColor Red
        }
    }
} else {
    Write-Host "`n❌ Failed to generate Prisma client" -ForegroundColor Red
    Write-Host "Try moving the project outside OneDrive folder." -ForegroundColor Yellow
}

# Restart OneDrive
Write-Host "`n▶️  Restarting OneDrive..." -ForegroundColor Yellow
Start-Process "$env:LOCALAPPDATA\Microsoft\OneDrive\OneDrive.exe"

Write-Host "`n✨ Done! Check VS Code for remaining errors." -ForegroundColor Cyan
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
