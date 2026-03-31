# Production Deployment Guide

## Pre-Deployment Checklist

### Environment Variables Setup

#### Frontend (.env.production)
```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_PROFESSIONAL=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD_xxxxx
NEXT_PUBLIC_SOCKET_URL=wss://api.yourdomain.com
```

#### Backend (.env.production)
```bash
DATABASE_URL=postgresql://user:password@host:5432/realestate
JWT_SECRET=use_a_strong_random_string_min_32_chars
JWT_EXPIRATION=7d
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
SENDGRID_API_KEY=SG.xxxxx
EMAIL_FROM=noreply@yourdomain.com
AWS_ACCESS_KEY_ID=AKIAXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

## Deployment Platforms

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy (automatic on push to main)

```bash
# Enable automatic preview deployments
# Settings → Git → Deploy on push: Yes
```

#### Backend Deployment (Railway)
1. Create account at Railway.app
2. Connect GitHub repository
3. Set environment variables
4. Configure PostgreSQL add-on
5. Deploy

### Option 2: AWS (Full Stack)

#### EC2 Instance Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx as reverse proxy
sudo apt install -y nginx

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install SSL certificates
sudo apt install -y certbot python3-certbot-nginx
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/realestate
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /socket.io {
        proxy_pass http://localhost:4000/socket.io;
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Database Setup
```bash
# Create database
sudo -u postgres createdb realestate

# Create user
sudo -u postgres createuser realestate_user
sudo -u postgres psql -c "ALTER USER realestate_user WITH PASSWORD 'strong_password';"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE realestate TO realestate_user;"
```

#### Application Deployment
```bash
# Clone repository
git clone https://github.com/yourusername/real-estate.git
cd real-estate

# Install dependencies
npm install

# Frontend build
cd frontend && npm run build && cd ..

# Backend setup
cd backend && npm install && npm run prisma:migrate && npm run prisma:seed && cd ..

# Start with PM2
pm2 start npm --name "frontend" -- run start -C frontend
pm2 start npm --name "backend" -- run start:prod -C backend
pm2 save
pm2 startup
```

### Option 3: Docker + Docker Compose Deployment

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: realestate
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/realestate
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
    depends_on:
      - postgres
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: https://api.yourdomain.com
    depends_on:
      - backend
    restart: always

volumes:
  postgres_data:
```

## CI/CD Pipeline Setup

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build Frontend
        run: cd frontend && npm install && npm run build
      
      - name: Build Backend
        run: cd backend && npm install && npm run build
      
      - name: Deploy to Production
        run: |
          # Deploy script here
          echo "Deploying to production..."
```

## Monitoring & Logging

### Application Monitoring
- New Relic
- DataDog
- AWS CloudWatch
- Sentry (Error tracking)

### Log Aggregation
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- CloudWatch Logs

### Performance Optimization
1. Enable Gzip compression
2. Set up CDN (CloudFlare or AWS CloudFront)
3. Optimize images (use WebP format)
4. Enable database query optimization
5. Set up caching (Redis)

## Security Considerations

1. **HTTPS/SSL** - Force all traffic through HTTPS
2. **Database** - Regular backups, encryption at rest
3. **Secrets** - Use environment variables, never commit secrets
4. **CORS** - Configure appropriately for your domain
5. **Rate Limiting** - Implement rate limiting on API endpoints
6. **DDoS Protection** - Use CloudFlare or AWS Shield
7. **Regular Updates** - Keep dependencies updated
8. **Security Headers** - Implement CSP, X-Frame-Options, etc.

## Health Checks & Recovery

### Automated Health Checks
```bash
# Add to crontab
*/5 * * * * curl -f https://yourdomain.com/health || (systemctl restart backend)
```

### Database Backups
```bash
# Daily backup script
0 2 * * * pg_dump realestate > /backups/db-$(date +\%Y\%m\%d).sql
```

## Rollback Procedure

If deployment issues occur:
1. Identify the issue in logs
2. Checkout previous stable version
3. Rebuild and redeploy
4. Monitor error rates
5. Document what went wrong for prevention

## Performance Targets

- Frontend Load Time: < 3 seconds
- API Response Time: < 200ms (p95)
- Database Query Time: < 100ms (p95)
- Uptime: > 99.9%
- Error Rate: < 0.1%
