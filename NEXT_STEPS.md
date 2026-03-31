# 🚀 Next Steps - Getting Everything Running

## Current Status ✅

### Completed:
- ✅ All 10 new features implemented (backend + frontend)
- ✅ Database schema updated with 8 new models
- ✅ Frontend compilation errors fixed
- ✅ Documentation created

### Pending (Expected Errors):
- ⚠️ Backend TypeScript errors for new Prisma models (normal - need to generate client)
- ⚠️ Missing npm packages (@nestjs/websockets, socket.io, stripe, etc.)

---

## Step-by-Step Setup Guide

### Step 1: Install Dependencies (5 minutes)

Run the installation script:

```powershell
.\install-dependencies.ps1
```

**This will install:**
- **Backend**: @nestjs/websockets, socket.io, stripe, cloudinary, @nestjs/axios
- **Frontend**: socket.io-client

**Or install manually:**

```bash
# Backend
cd backend
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io stripe cloudinary @nestjs/axios
npm install --save-dev @types/multer

# Frontend  
cd ../frontend
npm install socket.io-client
npm install --save-dev @types/socket.io-client
```

---

### Step 2: Configure Environment Variables (10 minutes)

Add these to `backend/.env`:

```env
# Database (existing)
DATABASE_URL="postgresql://user:password@localhost:5432/realestate"

# JWT (existing)
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=7d

# Frontend URL for CORS & WebSockets
FRONTEND_URL=http://localhost:3000

# Cloudinary (for document uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (use test keys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_FREE=price_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# Email (existing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Walk Score API (optional - fallback to mock data if not provided)
WALKSCORE_API_KEY=your_walkscore_key
```

**How to get API keys:**

1. **Cloudinary** (Free tier): https://cloudinary.com/users/register
   - Sign up → Dashboard → Copy Cloud Name, API Key, API Secret

2. **Stripe** (Test mode): https://stripe.com
   - Sign up → Developers → API Keys → Copy test keys
   - Create products/prices in Products section → Copy price IDs

3. **Walk Score** (Optional): https://www.walkscore.com/professional/api.php
   - Or leave blank to use mock data

---

### Step 3: Generate Prisma Client & Run Migrations (5 minutes)

```bash
cd backend

# Generate Prisma client with new models
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# (Optional) Seed database with sample data
npm run prisma:seed
```

**This will:**
- Generate TypeScript types for the 8 new models
- Create database tables: ChatRoom, ChatMessage, OpenHouse, OpenHouseRSVP, Offer, Document, Payment, Subscription
- Resolve all backend compilation errors

---

### Step 4: Start the Application (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Expected output:**
- Backend: `Application is running on: http://localhost:4000`
- Frontend: `Ready on http://localhost:3000`

---

## Testing Your New Features

### 1. Live Chat (WebSocket)
- Navigate to any property detail page
- Look for "Chat with Agent" button (needs to be integrated)
- Open chat → Send messages
- Check typing indicators and read receipts

### 2. Open House Management
- Go to a listing you own
- Create an open house event
- RSVP as a different user
- Verify max attendee limits work

### 3. Make an Offer
- View a property listing
- Click "Make an Offer" button
- Submit offer with amount, conditions, expiration
- Check offer stats as property owner

### 4. Document Upload
- Upload PDF or image documents to a listing
- Toggle public/private visibility
- Download and view documents

### 5. Social Sharing
- Click Share button on property page
- Test Facebook, Twitter, WhatsApp links
- Use "Copy Link" functionality

### 6. Neighborhood Insights
- View property with lat/lng coordinates
- Check Walk Score, Transit Score, Bike Score
- Browse nearby schools with ratings
- View demographics data

### 7. Property Valuation
- Navigate to valuation calculator
- Enter property details (beds, baths, sqft, location)
- Get estimated value with confidence score
- View comparable properties

### 8. Stripe Payments
```bash
# Test webhook locally with Stripe CLI:
stripe listen --forward-to localhost:4000/payments/webhook
```
- Create payment intent
- Test subscription plans
- Verify webhook events

---

## Integrating Features Into Pages

### Add to Property Detail Page (`frontend/app/properties/[id]/page.tsx`)

```typescript
import ChatBox from '@/components/ChatBox';
import MakeOffer from '@/components/MakeOffer';
import ShareButtons from '@/components/ShareButtons';
import NeighborhoodInsights from '@/components/NeighborhoodInsights';

// Inside your component:
const [showChat, setShowChat] = useState(false);

return (
  <>
    {/* Existing property details... */}
    
    {/* Add Share Buttons */}
    <ShareButtons
      listingId={listing.id}
      title={listing.title}
      description={listing.description}
    />
    
    {/* Add Make Offer */}
    <MakeOffer
      listingId={listing.id}
      listingPrice={listing.price}
      currency={listing.currency}
      buyerId={currentUser?.id}
      onOfferSubmitted={() => refetch()}
    />
    
    {/* Add Neighborhood Insights */}
    <NeighborhoodInsights
      latitude={listing.latitude}
      longitude={listing.longitude}
    />
    
    {/* Add Chat Button */}
    <button onClick={() => setShowChat(true)}>
      Chat with Agent
    </button>
    
    {showChat && (
      <ChatBox
        roomId={`listing-${listing.id}`}
        userId={currentUser?.id}
        listingTitle={listing.title}
        onClose={() => setShowChat(false)}
      />
    )}
  </>
);
```

---

## What to Build Next

### High Priority:
1. **Integrate new components into existing pages**
   - Add ChatBox, MakeOffer, ShareButtons to property pages
   - Add ValuationCalculator to pricing/valuation page
   - Add OpenHouse cards to listing management

2. **Authentication guards**
   - Protect WebSocket connections (verify userId)
   - Add JWT auth to offer/document endpoints
   - Implement role-based access (buyer/seller/agent)

3. **Multi-language support (i18n)**
   - Create `frontend/messages/en.json` and `fr.json`
   - Configure next-intl in layout
   - Add language switcher component

### Medium Priority:
4. **Email notifications**
   - Send email when new offer received
   - Notify about open house RSVPs
   - Alert on document uploads

5. **Admin dashboard**
   - View all payments/subscriptions
   - Monitor active chats
   - Manage open houses

6. **Mobile optimization**
   - Responsive chat widget
   - Touch-friendly forms
   - Mobile payment flow

### Low Priority:
7. **Advanced features**
   - Video chat integration
   - 3D property tours
   - AI-powered property recommendations
   - Blockchain property records

---

## Common Issues & Solutions

### Issue: "Property 'chatRoom' does not exist on type 'PrismaService'"
**Solution:** Run `npm run prisma:generate` to generate client

### Issue: "Cannot find module '@nestjs/websockets'"
**Solution:** Run `npm install @nestjs/websockets @nestjs/platform-socket.io socket.io`

### Issue: "CORS error in WebSocket connection"
**Solution:** Check `FRONTEND_URL` in `.env` matches your frontend URL

### Issue: "Stripe webhook signature verification failed"
**Solution:** Use Stripe CLI: `stripe listen --forward-to localhost:4000/payments/webhook`

### Issue: "Cloudinary upload failed"
**Solution:** Verify CLOUDINARY_* environment variables are correct

---

## Performance Optimization Tips

1. **Chat:** Limit WebSocket connections, use room-based namespaces
2. **Documents:** Compress images before upload, set max file sizes
3. **Valuation:** Cache comparable sales data for 24 hours
4. **Neighborhood:** Cache Walk Score data (rarely changes)
5. **Pagination:** Add pagination to offers, documents, open houses

---

## Security Checklist

- [ ] Validate user owns listing before allowing document upload
- [ ] Verify buyer/seller identity before accepting offers
- [ ] Never expose Stripe secret keys to frontend
- [ ] Sanitize file uploads (check MIME types, extensions)
- [ ] Rate limit WebSocket connections per user
- [ ] Verify Stripe webhook signatures
- [ ] Add CSRF protection to payment endpoints
- [ ] Encrypt sensitive offer conditions
- [ ] Validate chat room participants before joining

---

## Monitoring & Analytics

**Add tracking for:**
- WebSocket connection/disconnection rates
- Document upload success/failure rates
- Offer conversion rates (submitted → accepted)
- Payment success rates
- Chat message volume per listing
- Most active open houses

---

## Need Help?

### Documentation:
- [Phase 2 Features](docs/NEW_FEATURES_PHASE2.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

### Tech Stack Docs:
- **WebSockets**: https://socket.io/docs/
- **Stripe**: https://stripe.com/docs/api
- **Cloudinary**: https://cloudinary.com/documentation
- **Prisma**: https://www.prisma.io/docs

---

## Summary

**Right now, you need to:**
1. ✅ Run `.\install-dependencies.ps1`
2. ✅ Add environment variables to `backend/.env`
3. ✅ Run `cd backend && npm run prisma:migrate`
4. ✅ Start both servers (backend + frontend)
5. ✅ Test features!

Then proceed to integrate components into your existing pages and build the features mentioned above.

**Your real estate platform now has enterprise-level features! 🎉**
