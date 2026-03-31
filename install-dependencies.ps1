# Backend dependencies installation script

Write-Host "Installing backend dependencies..." -ForegroundColor Green

# Navigate to backend directory (relative to this script)
$repoRoot = $PSScriptRoot
Set-Location -Path (Join-Path $repoRoot "backend")

# Install WebSocket dependencies
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

# Install Stripe
npm install stripe

# Install file upload dependencies
npm install @nestjs/platform-express multer
npm install --save-dev @types/multer

# Install Cloudinary
npm install cloudinary

# Install HTTP module for external API calls
npm install @nestjs/axios

Write-Host "`nBackend dependencies installed successfully!" -ForegroundColor Green

# Frontend dependencies installation
Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location -Path (Join-Path $repoRoot "frontend")

# Install Socket.IO client
npm install socket.io-client

# Install types
npm install --save-dev @types/socket.io-client

Write-Host "`nFrontend dependencies installed successfully!" -ForegroundColor Green

# Return to root
Set-Location -Path $repoRoot

Write-Host "`nAll dependencies installed! Run 'npm run prisma:migrate' in the backend directory to apply database schema changes." -ForegroundColor Cyan
