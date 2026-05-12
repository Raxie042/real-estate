# Raxie Zenith Estate

A premium real estate platform targeting high-net-worth buyers in London, Dubai, and Edinburgh — with global reach across 50+ countries. Comparable in scope to Knight Frank, Sotheby's International Realty, and JamesEdition.

## Features

### Search & Discovery
- **Advanced Search**: PostGIS-powered location search with radius, polygon, and commute-time filters
- **Collections**: Curated property categories — Coastal Retreats, Country Estates, City Penthouses, Private Collection
- **Saved Searches & Alerts**: Real-time notifications when matching properties are listed
- **Sold Prices**: Historical transaction data browser

### Property Detail
- **AI Valuation Panel**: Instant automated property valuation
- **Transport Score**: Walking/cycling/transit accessibility ratings
- **Carbon Footprint**: EPC-based CO₂ calculator with UK average comparison
- **School Catchment**: Nearest Ofsted-rated schools with ratings
- **Price History Chart**: 12-month price trend visualization
- **Book Viewing Modal**: Inline slot picker with agent contact
- **Price on Request**: Sealed enquiry flow for ultra-prime listings (no price disclosed)
- **Property Brochure PDF**: Downloadable listing PDF (jsPDF/html2canvas)
- **QR Code**: Shareable listing QR code
- **Image Gallery**: Full-screen lightbox with thumbnails

### Tools & Calculators
- **Stamp Duty Calculator**: England, Scotland, Wales — with first-buyer and additional-property rates
- **Rental Yield Calculator**: Gross/net yield with expense modelling
- **Mortgage Calculator**: Monthly repayment calculator on listing pages
- **International Mortgage Calculator**: Multi-country rates for 10 countries with LTV/term sliders
- **Currency Converter**: Live rate conversion across major currencies
- **International Tax Guide**: Buying costs, CGT, and wealth tax per country

### Research & Intelligence
- **Investor Intelligence**: AI-powered global growth area scoring, cross-country ROI comparison, off-market deal finder
- **Wealth Reports**: Downloadable quarterly research PDFs (gated/free)
- **Market Reports & Guides**: In-depth editorial property guides
- **Seasonal Market Calendar**: Monthly buyer demand, seller activity, and price index by city
- **Agent Rankings**: Sortable league table by volume, DOM, and rating
- **Green Homes**: Sustainability-rated property listings

### Investment
- **Land & Development Plots**: Residential, commercial, and agricultural land listings
- **Fractional Ownership**: Co-investment SPV structures with share sizes from 1/8
- **Portfolio Wealth Tracker**: In-browser multi-currency portfolio with equity and yield summary
- **Golden Visa Guide**: Residency-by-investment programmes for UAE, Portugal, Greece, Malta, Spain

### Services
- **Mortgage Brokers**: Vetted broker finder with FCA-regulated disclaimer
- **Photography & Staging**: 3-tier staging packages with vetted creative partners
- **Interior Design Partners**: 6 partner studios with styles from Contemporary to Biophilic
- **Concierge Services**: Premium lifestyle and property management service
- **Conveyancing**: Solicitor referral network
- **Insurance**: Building, contents, and valuables cover referrals
- **Relocation Services**: Full relocation management for international movers
- **Short-Let & Seasonal**: Weekly/monthly short-term rental listings

### Platform
- **Command Palette**: ⌘K global search across all routes
- **Social OAuth**: Google, LinkedIn, Microsoft login
- **RBAC**: Platform Admin / Agent / Buyer / Developer roles
- **AI Chat**: Contextual property Q&A powered by OpenAI
- **WhatsApp Widget**: Direct agent contact shortcut
- **Cookie Consent**: GDPR-compliant banner
- **Real-time Features**: WebSocket notifications, live viewing counters
- **SEO**: Sitemap, structured data (JSON-LD), Next.js SSR

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    External Data Sources                     │
│           MLS Feeds • Agent APIs • Manual Input              │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  API Layer (NestJS 11)                       │
│     Auth • Listings • Search • AI • Leads • Analytics       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Database (PostgreSQL 15 + PostGIS)              │
│      Listings • Users • Agencies • Leads • Transactions      │
└──────────┬───────────────────────────────────┬──────────────┘
           │                                   │
┌──────────▼────────────┐          ┌──────────▼──────────────┐
│   Cache (Redis)       │          │   ORM (Prisma v5)       │
└───────────────────────┘          └─────────────────────────┘
                                              │
                                   ┌──────────▼──────────────┐
                                   │   Frontend (Next.js 15) │
                                   │   App Router • SSR      │
                                   └─────────────────────────┘
```

## Project Structure

```
real-estate/
├── backend/                    # NestJS 11 API (port 4000)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── listings/       # Property CRUD & search
│   │   │   ├── search/         # Saved searches & alerts
│   │   │   ├── users/          # User management
│   │   │   ├── agencies/       # Agency & agent profiles
│   │   │   ├── auth/           # JWT + OAuth (Google/LinkedIn/Microsoft)
│   │   │   ├── ai/             # Investor intelligence & valuation AI
│   │   │   ├── leads/          # Lead capture & management
│   │   │   ├── notifications/  # Alerts & email
│   │   │   ├── analytics/      # Tracking & metrics
│   │   │   └── offers/         # Offer management
│   │   ├── common/             # Guards, decorators, pipes
│   │   └── database/           # Prisma client
│   └── prisma/                 # Schema, migrations, seed
├── frontend/                   # Next.js 15 (port 3000)
│   ├── app/                    # 60+ App Router pages
│   ├── components/             # 40+ React components
│   └── lib/                    # API client, auth context
└── docs/                       # Business & deployment docs
```

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ with PostGIS extension
- Redis

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

## Database

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

## API Endpoints

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login (returns JWT)
- `GET /api/auth/google` — Google OAuth
- `GET /api/auth/linkedin` — LinkedIn OAuth
- `GET /api/auth/microsoft` — Microsoft OAuth

### Listings
- `GET /api/listings` — Search listings with filters
- `GET /api/listings/:id` — Get listing detail
- `POST /api/listings` — Create listing (agent+)
- `PUT /api/listings/:id` — Update listing
- `DELETE /api/listings/:id` — Delete listing

### Search
- `POST /api/search` — Advanced search with filters
- `POST /api/search/radius` — Search by radius
- `GET /api/search/saved` — Get saved searches
- `POST /api/search/saved` — Save a search

### AI & Investor Intelligence
- `GET /api/ai/global-growth-areas` — High-growth market scoring
- `POST /api/ai/global-roi-compare` — Cross-country ROI comparison
- `POST /api/ai/off-market-luxury-deals` — Off-market deal finder
- `POST /api/ai/valuation` — AI property valuation

### Users
- `GET /api/users/profile` — Get profile
- `PUT /api/users/profile` — Update profile

## Tech Stack

### Backend
- **Framework**: NestJS 11 (TypeScript)
- **Database**: PostgreSQL 15+ with PostGIS
- **ORM**: Prisma v5
- **Cache**: Redis
- **Auth**: JWT + Passport (Google, LinkedIn, Microsoft OAuth)
- **Validation**: class-validator / class-transformer
- **API Docs**: Swagger/OpenAPI (http://localhost:4000/api/docs)

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: Leaflet (ListingsMap)
- **PDF Generation**: jsPDF + html2canvas
- **Design**: Cormorant Garamond (headings) + Inter (body)
- **Palette**: `#1C1A17` dark · `#C9A96A` gold · `#F6F2EC` cream

### Infrastructure
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Managed PostgreSQL (Railway/Supabase)
- **Storage**: AWS S3 / Cloudflare R2
- **Monitoring**: Sentry

## Test Credentials (local/staging)

| Email | Password | Role |
|---|---|---|
| admin@realestate.com | password123 | PLATFORM_ADMIN |
| demo@realestate.com | password123 | AGENT |
| buyer1@example.com | password123 | BUYER |

## Security

- JWT authentication
- Role-based access control (RBAC)
- Rate limiting
- SQL injection prevention (Prisma)
- XSS protection
- CORS configuration
- Environment variable validation

## MLS Integration

### Supported Standards
- RESO Web API
- RETS (legacy)
- Custom feed adapters

### Normalization Flow
```
Raw MLS Data → Adapter → Validator → Normalizer → Database
```

## Testing

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

## CI & Performance Gates

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

## Release Readiness Docs

- Staging/UAT checklist: `docs/UAT_CHECKLIST.md`
- Monitoring and alerts runbook: `docs/MONITORING_ALERTS.md`
- Secrets/config audit checklist: `docs/SECRETS_CONFIG_AUDIT.md`

## Commercial Model Docs

- Commercial policy: `docs/COMMERCIAL_POLICY.md`
- Pricing tier matrix: `docs/PRICING_TIER_MATRIX.md`
- Invitation-only criteria: `docs/INVITATION_ONLY_CRITERIA.md`
- London-first 60-day launch playbook: `docs/LONDON_LAUNCH_60_DAY.md`

## Performance

- Database indexes on key search fields
- Redis caching for hot data
- CDN for static assets
- Image optimization
- Lazy loading
- Server-side rendering for SEO

## Deployment

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

## License

MIT

## Contributing

This is a solo project designed to scale. Contributions welcome once MVP is live.

---

Built with love for the future of real estate tech — Raxie Zenith Estate 2026
