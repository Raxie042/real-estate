import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,

    // Capture 100% of transactions in dev, 10% in prod to stay on free tier
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session Replay — capture 10% of sessions, 100% on error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Don't alert on these — they're expected network errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ChunkLoadError',
      /^Network Error$/,
      /^Request failed with status code 4/,
    ],
  });
}
