import { NextRequest, NextResponse } from 'next/server';

const MAX_BODY_SIZE = 16_000;

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    if (!raw || raw.length > MAX_BODY_SIZE) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('[telemetry]', payload);
    }

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
