'use client';

type TelemetryType = 'page_view' | 'event' | 'error';

type TelemetryPayload = {
  type: TelemetryType;
  name?: string;
  path?: string;
  locale?: string;
  metadata?: Record<string, unknown>;
  message?: string;
  stack?: string;
  source?: string;
  ts: string;
};

const TELEMETRY_ENDPOINT = '/api/telemetry';

function isEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_TELEMETRY !== 'false';
}

function sendTelemetry(payload: TelemetryPayload) {
  if (!isEnabled() || typeof window === 'undefined') return;

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(TELEMETRY_ENDPOINT, blob);
    return;
  }

  fetch(TELEMETRY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // swallow telemetry failures
  });
}

export function trackPageView(path: string, locale?: string) {
  sendTelemetry({
    type: 'page_view',
    path,
    locale,
    ts: new Date().toISOString(),
  });
}

export function trackEvent(name: string, metadata?: Record<string, unknown>) {
  sendTelemetry({
    type: 'event',
    name,
    metadata,
    ts: new Date().toISOString(),
  });
}

export function trackError(message: string, options?: { stack?: string; source?: string; metadata?: Record<string, unknown> }) {
  sendTelemetry({
    type: 'error',
    message,
    stack: options?.stack,
    source: options?.source,
    metadata: options?.metadata,
    ts: new Date().toISOString(),
  });
}
