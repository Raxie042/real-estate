# Development Guide

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **PostgreSQL** 15+ with PostGIS extension
- **Redis** (optional for caching)
- **Git**

### Initial Setup

1. **Clone the repository** (or you already have it):
```bash
cd "c:\Users\HP\OneDrive\Documents\Real Estate"
```

2. **Install dependencies**:
```bash
npm run install:all
```

3. **Set up environment variables**:
```bash
# Copy example env file
copy .env.example .env

# Edit .env with your credentials
notepad .env
```

4. **Set up PostgreSQL with PostGIS**:
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE realestate;

-- Connect to the database
\c realestate

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
```

5. **Run database migrations**:
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

6. **Seed the database** (optional):
```bash
npx prisma db seed
```

## 🏃‍♂️ Running the Application

### Development Mode

Run both backend and frontend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend**:
```bash
cd backend
npm run start:dev
```

**Frontend**:
```bash
cd frontend
npm run dev
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **API Documentation**: http://localhost:4000/api/docs
- **Prisma Studio**: `npm run prisma:studio`

## 📂 Project Structure

```
real-estate-platform/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication
│   │   │   ├── users/         # User management
│   │   │   ├── listings/      # Property listings
│   │   │   ├── search/        # Search functionality
│   │   │   ├── agencies/      # Agency management
│   │   │   ├── mls/           # MLS integration
│   │   │   ├── favorites/     # Saved properties
│   │   │   ├── notifications/ # Notifications
│   │   │   └── analytics/     # Analytics
│   │   ├── common/            # Shared utilities
│   │   │   ├── dto/           # Data transfer objects
│   │   │   ├── filters/       # Exception filters
│   │   │   └── interceptors/  # Request interceptors
│   │   ├── database/          # Database module
│   │   ├── app.module.ts      # Root module
│   │   └── main.ts            # Entry point
│   ├── prisma/                # Database schema
│   │   ├── schema.prisma      # Prisma schema
│   │   └── migrations/        # Database migrations
│   └── test/                  # Tests
├── frontend/                  # Next.js app
│   ├── app/                   # App router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── providers.tsx      # React Query provider
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   ├── home/              # Home page components
│   │   └── properties/        # Property components
│   └── lib/                   # Utilities
│       ├── api.ts             # API client
│       ├── hooks.ts           # React hooks
│       └── utils.ts           # Helper functions
└── shared/                    # Shared types
```

## 🔧 Development Workflow

### 1. Creating a New Feature

Example: Adding a "Reviews" feature

**Backend**:
```bash
cd backend/src/modules
nest g module reviews
nest g service reviews
nest g controller reviews
```

**Frontend**:
```bash
cd frontend
# Create component
mkdir -p components/reviews
# Create page
mkdir -p app/reviews
```

### 2. Database Changes

When you need to modify the database schema:

1. Edit `backend/prisma/schema.prisma`
2. Create migration:
```bash
cd backend
npx prisma migrate dev --name add_reviews_table
```
3. Generate Prisma client:
```bash
npx prisma generate
```

### 3. API Development

1. Define the service logic in `*.service.ts`
2. Create DTOs for request/response
3. Add controller endpoints in `*.controller.ts`
4. Document with Swagger decorators

Example:
```typescript
@Post()
@ApiOperation({ summary: 'Create listing' })
@ApiResponse({ status: 201, description: 'Listing created' })
async create(@Body() dto: CreateListingDto) {
  return this.listingsService.create(dto);
}
```

### 4. Frontend Development

1. Create API hook in `lib/hooks.ts`
2. Build UI components
3. Use React Query for data fetching
4. Style with Tailwind CSS

Example:
```typescript
export function useCreateListing() {
  return useMutation({
    mutationFn: (data) => api.listings.create(data),
  });
}
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🐛 Debugging

### Backend Debugging

1. Add breakpoint in VS Code
2. Run debug configuration:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "start:debug"],
  "console": "integratedTerminal"
}
```

### Frontend Debugging

Use Chrome DevTools or VS Code debugger with Next.js

## 📝 Code Style

We use ESLint and Prettier for code formatting:

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
```

## 🔒 Environment Variables

Key environment variables you need to set:

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/realestate"
JWT_SECRET="your-secret-key"
REDIS_URL="redis://localhost:6379"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
```

## 🚢 Building for Production

```bash
# Build all
npm run build

# Build backend only
cd backend
npm run build

# Build frontend only
cd frontend
npm run build
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostGIS Documentation](https://postgis.net/documentation/)

## 🆘 Common Issues

### Issue: Prisma Client not generated
**Solution**: Run `npx prisma generate`

### Issue: Port already in use
**Solution**: Change PORT in .env or kill the process

### Issue: PostGIS extension not found
**Solution**: Install PostGIS for PostgreSQL

## 💡 Tips

1. Use Prisma Studio to visualize data: `npm run prisma:studio`
2. Check API docs at `/api/docs` for endpoint reference
3. Use React Query DevTools for frontend debugging
4. Enable hot reload for faster development
5. Use Git branches for feature development
