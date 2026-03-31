# Monitoring & Alerts Runbook

## Goals
- Detect production failures quickly.
- Reduce time to resolution (MTTR).
- Track user-facing reliability and latency.

## Recommended Signals

### Backend (NestJS)
- Error rate (`5xx` %) over 5 minutes
- p95 latency by route
- Request throughput (RPS)
- Auth failures (`401/403`) spike
- DB query latency / error rate
- Process memory and CPU

### Frontend (Next.js)
- JS runtime errors (Sentry)
- Page-load and route-change timing (web vitals)
- API call failure rates from client
- Hydration warnings / SSR mismatch anomalies

## Alert Thresholds (Starter)
- Critical: `5xx > 2%` for 5 min
- Warning: p95 latency > 1200ms for 10 min
- Critical: auth failures > 3x baseline for 10 min
- Warning: frontend runtime errors > 20/min

## Suggested Tools
- Error tracking: Sentry (frontend + backend)
- Metrics/traces: Datadog / New Relic / OpenTelemetry stack
- Logs: centralized structured logs with request IDs

## Implementation Notes
- Include request correlation ID in backend logs and API responses.
- Tag logs/metrics by environment (`staging`, `production`).
- Add release version tag to every event for quick rollback analysis.

## Pager/On-call Workflow
1. Alert fires and creates incident ticket.
2. Verify impact scope (routes, users, regions).
3. Mitigate (rollback, feature flag off, or restart if safe).
4. Root cause analysis and follow-up action item.

## Weekly Review
- Top erroring endpoints
- Regression in p95/p99 latency
- Alert noise and threshold tuning
- Open reliability action items
