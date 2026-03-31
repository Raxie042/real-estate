# Secrets & Config Audit Checklist

Run this before any production deployment.

## 1) Authentication & Security
- [ ] `JWT_SECRET` is strong, unique, and not shared across environments.
- [ ] Refresh token secret differs from access token secret.
- [ ] Token expiry values are reviewed and intentional.

## 2) Database & Cache
- [ ] `DATABASE_URL` uses production credentials and SSL as required.
- [ ] DB user follows least privilege.
- [ ] Redis credentials/network access are restricted.

## 3) Third-Party Integrations
- [ ] Stripe keys are environment-specific (`test` vs `live`).
- [ ] Stripe webhook secret matches active endpoint.
- [ ] Email provider credentials are valid and rotated.
- [ ] Mapbox / geolocation keys are scoped and rate-limited.

## 4) Frontend Public Vars
- [ ] Only `NEXT_PUBLIC_*` values intended for browser exposure are public.
- [ ] No private secrets are referenced in frontend code.

## 5) CORS & Cookie Settings
- [ ] `CORS_ORIGIN` allowlist is explicit (no wildcard in prod).
- [ ] Cookies use secure flags in production (`Secure`, `HttpOnly`, `SameSite`).

## 6) Operational Hygiene
- [ ] Secrets are stored in a secrets manager (not committed files).
- [ ] Rotation cadence documented (quarterly or better).
- [ ] Old/unused secrets revoked.
- [ ] Incident response owner is defined for key compromise.

## 7) Verification Commands
- [ ] Frontend build: `cd frontend && npm run build`
- [ ] Backend build: `cd backend && npm run build`
- [ ] Smoke test: `npm run test:smoke`

## Notes
- Keep `.env` local-only; never commit real credentials.
- Update `.env.example` when adding new required variables.
