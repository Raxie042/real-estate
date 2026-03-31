# Deployment Guide

## 🚀 Deployment Options

This guide covers multiple deployment strategies for your real estate platform.

## Option 1: Docker Deployment (Recommended)

### Prerequisites
- Docker & Docker Compose installed
- Domain name configured
- SSL certificate (Let's Encrypt recommended)

### Steps

1. **Build and run with Docker Compose**:
```bash
docker-compose up -d
```

2. **Initialize database**:
```bash
docker-compose exec backend npx prisma migrate deploy
```

3. **Check logs**:
```bash
docker-compose logs -f
```

### Production Docker Compose

Create `docker-compose.prod.yml`:
```yaml
version: '3.9'

services:
  postgres:
    image: postgis/postgis:15-3.3
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
    depends_on:
      - postgres
      - redis
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
    depends_on:
      - backend
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./certbot/conf:/etc/letsencrypt
    depends_on:
      - frontend
      - backend
    restart: always

volumes:
  postgres_data:
```

## Option 2: Cloud Deployment

### Backend on Railway/Render

**Railway**:
1. Connect GitHub repository
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy automatically

**Render**:
```yaml
# render.yaml
services:
  - type: web
    name: backend
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm run start:prod
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: realestate-db
          property: connectionString

databases:
  - name: realestate-db
    plan: starter
    postgresMajorVersion: 15
```

### Frontend on Vercel

1. **Connect repository**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

2. **Set environment variables** in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

3. **Configure build settings**:
- Framework: Next.js
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `.next`

## Option 3: AWS Deployment

### Architecture
```
├── Route 53 (DNS)
├── CloudFront (CDN)
├── S3 (Frontend Static Files)
├── ALB (Load Balancer)
├── ECS Fargate (Backend Containers)
├── RDS PostgreSQL (Database)
├── ElastiCache Redis (Cache)
└── S3 (Image Storage)
```

### Backend on ECS

1. **Create ECR repository**:
```bash
aws ecr create-repository --repository-name realestate-backend
```

2. **Build and push Docker image**:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com

docker build -t realestate-backend backend/
docker tag realestate-backend:latest YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/realestate-backend:latest
docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/realestate-backend:latest
```

3. **Create ECS task definition**
4. **Set up ALB and target groups**
5. **Deploy service**

### Frontend on S3 + CloudFront

1. **Build frontend**:
```bash
cd frontend
npm run build
```

2. **Upload to S3**:
```bash
aws s3 sync .next/static s3://your-bucket/
```

3. **Configure CloudFront distribution**

## Database Migration

### Before Deployment

1. **Create backup**:
```bash
pg_dump -h localhost -U user realestate > backup.sql
```

2. **Test migrations**:
```bash
npx prisma migrate deploy --preview-feature
```

3. **Run migrations**:
```bash
npx prisma migrate deploy
```

## Environment Configuration

### Production .env (Backend)
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public&sslmode=require
JWT_SECRET=your-secure-secret-here
REDIS_URL=redis://cache.example.com:6379
CORS_ORIGIN=https://yourdomain.com
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
SENTRY_DSN=your-sentry-dsn
```

### Production .env (Frontend)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_MAPBOX_TOKEN=your-token
NEXT_PUBLIC_GOOGLE_ANALYTICS=your-ga-id
```

## SSL/TLS Configuration

### Using Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (cron)
0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring & Logging

### Sentry Setup

**Backend**:
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**Frontend**:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

### Health Checks

Create health endpoint:
```typescript
@Get('health')
async health() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
}
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm run install:all
      
      - name: Run tests
        run: npm run test
      
      - name: Build backend
        run: cd backend && npm run build
      
      - name: Build frontend
        run: cd frontend && npm run build
      
      - name: Deploy to production
        run: |
          # Your deployment script
```

## Performance Optimization

### Backend
- Enable compression
- Use Redis for caching
- Database connection pooling
- CDN for static assets

### Frontend
- Enable Next.js image optimization
- Implement code splitting
- Use CDN for assets
- Enable gzip compression

## Security Checklist

- [ ] Environment variables secured
- [ ] SSL/TLS enabled
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Regular security updates
- [ ] Database backups scheduled
- [ ] Error messages don't leak info

## Scaling Strategies

### Horizontal Scaling
- Add more backend instances behind load balancer
- Use Redis for session storage
- Database read replicas

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Enable caching layers

## Backup Strategy

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

Schedule with cron:
```
0 2 * * * /path/to/backup.sh
```

## Rollback Plan

1. Keep previous Docker images
2. Database migration rollback:
```bash
npx prisma migrate resolve --rolled-back <migration_name>
```
3. Revert code deployment
4. Restore database from backup if needed

## Post-Deployment Checklist

- [ ] Health checks passing
- [ ] API endpoints responding
- [ ] Frontend loading correctly
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] Monitoring alerts configured
- [ ] Backup systems running
- [ ] SSL certificate valid
- [ ] CDN caching working
- [ ] Search functionality working
- [ ] Email notifications working
- [ ] Map integration functional
