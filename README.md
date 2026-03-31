# Global Real Estate Platform 🌍

A world-wide, MLS-powered real estate platform built for scale from day one.

## 🎯 Features

- **Global Coverage**: Multi-country, multi-currency, multi-language support
- **MLS Integration**: RESO Web API compliant, normalized data ingestion
- **Advanced Search**: PostGIS-powered location search (radius, polygon, commute time)
- **SEO Optimized**: Next.js SSR with structured data for property listings
- **Scalable Architecture**: Modular monolith ready to split into microservices
- **Real-time Features**: Property alerts, saved searches, notifications

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    External Data Sources                     │
│           MLS Feeds • Agent APIs • Manual Input              │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  Ingestion Layer (NestJS)                    │
│     Adapters • Normalization • Deduplication • Validation    │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Database (PostgreSQL + PostGIS)                 │
│      Listings • Users • Agencies • Transactions • Geo        │
└──────────┬───────────────────────────────────┬──────────────┘
           │                                   │
┌──────────▼────────────┐          ┌──────────▼──────────────┐
│   Search Engine       │          │     API Layer           │
│   (Elasticsearch)     │◄─────────│     (NestJS)            │
└───────────────────────┘          └──────────┬──────────────┘
                                              │
                                   ┌──────────▼──────────────┐
                                   │   Frontend (Next.js)    │
                                   │   SEO • Maps • Filters  │
                                   └─────────────────────────┘
```

## 📁 Project Structure

```
real-estate-platform/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── listings/       # Property management
│   │   │   ├── search/         # Search & filters
│   │   │   ├── users/          # User management
│   │   │   ├── agencies/       # Agency management
│   │   │   ├── auth/           # Authentication
│   │   │   ├── mls/            # MLS adapters
│   │   │   ├── notifications/  # Alerts & emails
│   │   │   └── analytics/      # Tracking & metrics
│   │   ├── common/             # Shared utilities
│   │   └── database/           # Prisma client
│   └── prisma/                 # Database schema
├── frontend/                   # Next.js app
│   ├── app/                    # App router pages
│   ├── components/             # React components
│   └── lib/                    # Utilities
└── shared/                     # Shared types/constants
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ with PostGIS extension
- Redis (for caching)
- Elasticsearch 8+ (optional, for advanced search)

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Initialize database**:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

4. **Start development servers**:
```bash
# Terminal 1: Backend
cd backend
npm run start:dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

5. **Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api/docs

## 🗃️ Database

### PostGIS Setup

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
```

### Key Entities

- **Listings**: Properties with geo-coordinates, pricing, features
- **Users**: Buyers, sellers, agents with profiles
- **Agencies**: Real estate firms and teams
- **MLS Data**: Raw feeds and normalized mappings
- **Searches**: Saved searches and alerts
- **Transactions**: Offers, contracts, closings

## 🔌 API Endpoints

### Listings
- `GET /api/listings` - Search listings
- `GET /api/listings/:id` - Get listing details
- `POST /api/listings` - Create listing (authenticated)
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing

### Search
- `POST /api/search` - Advanced search with filters
- `POST /api/search/radius` - Search by radius
- `POST /api/search/polygon` - Search within polygon
- `POST /api/search/commute` - Search by commute time

### Users
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

## 🔧 Tech Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 15+ with PostGIS
- **ORM**: Prisma
- **Search**: Elasticsearch (optional)
- **Cache**: Redis
- **Validation**: class-validator
- **API Docs**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL / Leaflet
- **State**: React Query
- **Forms**: React Hook Form

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)
- **Storage**: AWS S3 / Cloudflare R2
- **CDN**: Cloudflare
- **Monitoring**: Sentry, Datadog

## 🌍 Multi-Region Support

### Database Sharding Strategy
- Shard by country/region for data residency
- Centralized user/agency data
- Regional listing databases

### Localization
- i18n support (next-intl)
- Currency conversion
- Date/time formatting
- Unit conversion (sqft ↔ sqm)

## 🔒 Security

- JWT authentication
- Role-based access control (RBAC)
- Rate limiting
- SQL injection prevention (Prisma)
- XSS protection
- CORS configuration
- Environment variable validation

## 📊 MLS Integration

### Supported Standards
- RESO Web API
- RETS (legacy)
- Custom feed adapters

### Normalization Flow
```
Raw MLS Data → Adapter → Validator → Normalizer → Database
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test           # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage

# Frontend tests
cd frontend
npm run test

# Full-stack smoke test (requires local frontend/backend running)
cd ..
npm run test:smoke
```

## 🚦 CI & Performance Gates

- GitHub Actions CI workflow: `.github/workflows/ci.yml`
- Nightly staging runtime smoke workflow: `.github/workflows/nightly-staging-smoke.yml`
- Route performance budget check script:

```bash
# After capturing frontend build output to frontend-build.log
npm run perf:check
```

Default route budgets enforced:
- `/` <= 170 kB first load JS
- `/search` <= 170 kB first load JS
- `/properties` <= 170 kB first load JS
- `/properties/[id]` <= 170 kB first load JS
- `/valuation` <= 145 kB first load JS

Nightly staging smoke workflow requires repository secrets:
- `STAGING_FRONTEND_URL` (example: `https://staging.example.com`)
- `STAGING_API_URL` (example: `https://api-staging.example.com/api`)

## ✅ Release Readiness Docs

- Staging/UAT checklist: `docs/UAT_CHECKLIST.md`
- Monitoring and alerts runbook: `docs/MONITORING_ALERTS.md`
- Secrets/config audit checklist: `docs/SECRETS_CONFIG_AUDIT.md`

## 💼 Commercial Model Docs

- Commercial policy: `docs/COMMERCIAL_POLICY.md`
- Pricing tier matrix: `docs/PRICING_TIER_MATRIX.md`
- Invitation-only criteria: `docs/INVITATION_ONLY_CRITERIA.md`
- London-first 60-day launch playbook: `docs/LONDON_LAUNCH_60_DAY.md`

## 📈 Performance

- Database indexes on key search fields
- Redis caching for hot data
- CDN for static assets
- Image optimization
- Lazy loading
- Server-side rendering for SEO

## 🚢 Deployment

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Docker
```bash
docker-compose up -d
```

## 📝 License

MIT

## 🤝 Contributing

This is a solo project designed to scale. Contributions welcome once MVP is live.

---

Built with ❤️ for the future of real estate tech
