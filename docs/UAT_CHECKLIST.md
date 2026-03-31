# UAT Checklist (Staging)

Use this checklist before production release.

## 1) Environment Readiness
- [ ] Staging frontend URL loads over HTTPS.
- [ ] Staging backend health endpoints respond.
- [ ] Database migrations are applied (`prisma migrate deploy`).
- [ ] Required env vars are set for backend and frontend.
- [ ] Stripe/API webhooks (if enabled) point to staging.

## 2) Core User Journeys
- [ ] Home page loads and localized content renders.
- [ ] Search page loads, filters apply, and map/grid toggle works.
- [ ] Property details page loads media, map/insights, and related listings.
- [ ] Login and register flows succeed.
- [ ] Protected routes redirect correctly when unauthenticated.
- [ ] Authenticated user can submit and withdraw an offer.
- [ ] Messages/chat page loads and basic send/receive works.

## 3) Payments & Subscriptions
- [ ] Pricing page loads correct plans.
- [ ] Checkout session is created for test account.
- [ ] Success/cancel redirects behave correctly.
- [ ] Subscription status is reflected in UI.

## 4) Localization & Preferences
- [ ] Locale routing works (`/en`, `/fr`, `/de`, `/ar`).
- [ ] Currency and units apply across search/property pages.
- [ ] Date and number formatting is consistent.

## 5) Non-Functional Checks
- [ ] Frontend build succeeds.
- [ ] Backend build succeeds.
- [ ] Smoke E2E passes (`npm run test:smoke`).
- [ ] Route budget check passes (`npm run perf:check` with build log).
- [ ] No critical errors in browser console.

## 6) Sign-off
- [ ] Product owner sign-off
- [ ] Engineering sign-off
- [ ] QA sign-off
- [ ] Release notes prepared
