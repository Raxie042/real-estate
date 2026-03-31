# Real Estate Platform - Feature Reference Guide

## ✨ Recently Implemented Features (Session 2)

### 1. Property Comparison System
**Location:** `/comparison`
- Compare up to 4 properties side-by-side
- Persistent state with localStorage
- Scale icon on property cards to add/remove
- Fixed bottom comparison bar
- Zustand state management

**Key Files:**
- [comparison-store.ts](frontend/lib/comparison-store.ts) - Zustand store with persist middleware
- [ComparisonBar.tsx](frontend/components/ComparisonBar.tsx) - Fixed bottom bar UI
- [PropertyCard.tsx](frontend/components/properties/PropertyCard.tsx) - Compare button integration

### 2. Admin Dashboard
**Location:** `/admin` (Admin only)
- User management table with ban/activate actions
- Listing moderation queue
- Platform analytics overview
- Real-time stats (users, listings, views, revenue)

**Key Files:**
- [admin/page.tsx](frontend/app/admin/page.tsx) - Main dashboard
- [AnalyticsCharts.tsx](frontend/components/admin/AnalyticsCharts.tsx) - Chart components

### 3. Lead Management CRM
**Location:** `/leads` (Admin only)
- Create and track sales leads
- Lead status pipeline (NEW → CONTACTED → QUALIFIED → NEGOTIATING → LOST)
- Search and filter by status and source
- Detailed lead profiles
- Budget and property interest tracking

**Key Files:**
- [leads/page.tsx](frontend/app/leads/page.tsx) - Lead management interface

### 4. Email Notification System
**Location:** Backend service
- Sendable email templates for:
  - Offer notifications (new, accepted, rejected, countered)
  - Open house RSVP confirmations
  - Document sharing alerts
  - Chat message notifications
  - Listing approval notifications
  - Price change alerts

**Key Files:**
- [email.service.ts](backend/src/common/services/email.service.ts) - Enhanced with new templates

### 5. Enhanced Analytics Dashboard
**Location:** `/admin` → Analytics tab
- User growth chart (6-month trend)
- Revenue trend analysis
- Listing status breakdown (pie chart)
- Property types distribution
- Offers received vs accepted chart

**Charts:**
- Line charts for trends
- Bar charts for comparisons
- Doughnut charts for distributions
- All powered by Chart.js

### 6. Stripe Payment Integration
**Location:** `/pricing`
- Professional plan: $99/month
- Free starter plan
- Enterprise custom pricing
- Checkout redirects to Stripe
- Success/cancel page handling

**Features:**
- Safe loading states
- Authentication checks
- Environment variable driven pricing
- Proper error handling

### 7. Chat with WebSocket
**Location:** `/messages`
- Real-time messaging with Socket.IO
- Conversation list with search
- Message display with timestamps
- Auto-scroll to latest message
- Phone/video call UI (ready for integration)
- Image upload button (ready for integration)
- Real-time updates via WebSocket

### 8. Subscription Management
**Location:** `/subscriptions`
- Current plan display
- Usage statistics (listings used/available)
- Payment history
- Cancel/reactivate subscription
- Billing information sidebar

### 9. Agent Profile Pages
**Location:** `/agents/[id]`
- Agent stats (listings, active, sales, rating)
- Current listings gallery
- Client reviews section
- Specialties badges
- Contact form
- Agency affiliation

## 📚 Documentation Files

### Deployment & DevOps
- [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) - Full production deployment guide
  - Vercel + Railway setup
  - AWS EC2 deployment
  - Docker Compose production deployment
  - CI/CD with GitHub Actions
  - Monitoring & logging setup
  - Security considerations

### Mobile & UX
- [MOBILE_OPTIMIZATION.md](MOBILE_OPTIMIZATION.md) - Mobile-first development guide
  - Responsive design patterns
  - Touch-friendly interactions
  - Performance optimization
  - Testing on mobile devices
  - Accessibility checklist

### Testing
- [CHAT_TESTING.md](CHAT_TESTING.md) - WebSocket chat testing guide
  - Quick start for testing both servers
  - Manual testing scenarios
  - Browser console debugging
  - Automated Cypress tests
  - Performance metrics

### Environment Setup
- [frontend/.env.local.example](frontend/.env.local.example) - Frontend env variables
- [backend/.env.example](backend/.env.example) - Backend env variables

## 🔧 Technology Stack

### Frontend
- **Framework:** Next.js 14.2.35
- **Styling:** Tailwind CSS
- **State:** Zustand (with persist middleware)
- **Real-time:** Socket.IO Client
- **Data Fetching:** TanStack Query
- **Charts:** Chart.js + react-chartjs-2
- **Forms:** React Hook Form (with validation utils)

### Backend
- **Framework:** NestJS 10.3.0
- **Database:** PostgreSQL 15 + Prisma ORM
- **Real-time:** Socket.IO 4.8.3
- **Payments:** Stripe 2026-01-28
- **Email:** SendGrid (installed, ready to use)
- **S3:** AWS SDK (ready for file uploads)

## 📦 Dependencies Installed (This Session)

```bash
# Frontend
npm install chart.js react-chartjs-2  # Analytics charts
npm install zustand                   # State management (previous session)
npm install socket.io-client          # WebSocket (previous session)

# Backend
# Email service ready with nodemailer
# SendGrid support added via email.service.ts
```

## 🚀 Quick Start - Run Everything

### Terminal 1 (Backend)
```bash
cd backend
npm run start:dev
# Runs on http://localhost:4000
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### Terminal 3 (Database - if needed)
```bash
# PostgreSQL should be running
# Run migrations if new:
cd backend
npm run prisma:migrate
npm run prisma:seed
```

## 📋 Environment Variables Needed

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_STRIPE_PRICE_ID_PROFESSIONAL=price_xxx
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/realestate
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_xxx
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@yourdomain.com
```

## 🎯 Feature Navigation

| Feature | URL | Auth | Role |
|---------|-----|------|------|
| Properties | `/properties` | No | Public |
| Search | `/search` | No | Public |
| Login | `/login` | No | Public |
| Register | `/register` | No | Public |
| Pricing | `/pricing` | No | Public |
| Profile | `/profile` | Yes | All |
| My Listings | `/my-listings` | Yes | All |
| List Property | `/list-property` | Yes | All |
| Messages | `/messages` | Yes | All |
| Subscriptions | `/subscriptions` | Yes | All |
| Comparison | `/comparison` | No | Public |
| Offers | `/offers` | Yes | All |
| Open Houses | `/open-houses` | Yes | All |
| Documents | `/documents` | Yes | All |
| Agents | `/agents/[id]` | No | Public |
| Admin Dashboard | `/admin` | Yes | ADMIN |
| Analytics | `/admin?tab=analytics` | Yes | ADMIN |
| Lead Management | `/leads` | Yes | ADMIN |

## 🔐 User Roles

- **PUBLIC:** No authentication required
- **AUTHENTICATED:** Any signed-in user
- **ADMIN:** Special admin account with platform management access

## 📊 Database Schema

Key entities:
- **User** - Accounts, profiles, roles
- **Listing** - Properties with details, images
- **Offer** - Purchase offers
- **OpenHouse** - Open house events
- **Document** - Shared documents
- **Message** - Chat messages
- **Subscription** - User subscriptions
- **Favorite** - Saved properties
- **Review** - Property/agent reviews

## 🎨 Design System

### Colors
- **Primary Gold:** #C9A96A
- **Dark Brown:** #1C1A17
- **Light Beige:** #F6F2EC
- **Accent Gray:** #7A6E60
- **Text Dark:** #2B2620

### Components
- Luxury card styling (lux-card)
- Button variants (lux-button, lux-button-outline)
- Form inputs with proper focus states
- Toast notifications (success/error)
- Loading skeletons

## ✅ Quality Assurance

### Code Quality
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- 0 TypeScript errors

### Browser Support
- Chrome/Edge (latest)
- Safari (14+)
- Firefox (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

### Performance
- Next.js image optimization
- Code splitting via dynamic imports
- CSS minification
- Bundle size monitoring

## 🚀 Next Steps / Future Enhancements

1. **Testing**
   - Unit tests (Jest)
   - Integration tests (Cypress)
   - E2E tests
   - Performance tests

2. **Features**
   - AI property recommendations
   - Video tours
   - Virtual staging
   - MLS integration
   - Mortgage calculator (backend)

3. **Infrastructure**
   - CDN setup (CloudFlare)
   - Database replication
   - Load balancing
   - Auto-scaling

4. **Features**
   - Notifications (SMS, push)
   - Analytics for sellers
   - Advanced search filters
   - Property valuation API

## 📞 Support

### Common Issues
See [CHAT_TESTING.md](CHAT_TESTING.md) for WebSocket debugging
See [MOBILE_OPTIMIZATION.md](MOBILE_OPTIMIZATION.md) for mobile issues
See [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) for production setup

### Error Logs
- Frontend: Browser DevTools Console
- Backend: Terminal output
- Database: PostgreSQL logs

## 📄 License

This project is proprietary real estate platform software.

---

**Last Updated:** February 11, 2026
**Platform Version:** 1.0.0
