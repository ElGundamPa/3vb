import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic server-side validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK;
    const serverSecret = process.env.APPS_SCRIPT_SECRET;
    if (!webhook) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }
    if (!serverSecret) {
      return NextResponse.json({ error: 'Server secret not configured' }, { status: 500 });
    }

    // Basic in-memory rate limiting per IP (very small, in-memory, resets on restart)
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxPerWindow = 30;
    // store on global (module) to persist across calls in a single process
  // @ts-expect-error allow attaching ephemeral rate-limit state to global
  if (!global.__rateLimit) global.__rateLimit = {};
  // @ts-expect-error allow attaching ephemeral rate-limit state to global
  const rl = global.__rateLimit[ip] || { count: 0, start: now };
    if (now - rl.start < windowMs) {
      rl.count += 1;
    } else {
      rl.count = 1;
      rl.start = now;
    }
  // @ts-expect-error allow attaching ephemeral rate-limit state to global
  global.__rateLimit[ip] = rl;
    if (rl.count > maxPerWindow) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Inject server-side secret (not exposed to clients) so Apps Script can validate origin
    const forwardBody = { ...body, __serverSecret: serverSecret };

    // Forward to the Apps Script webhook (with logging)
    console.log('Forwarding to webhook:', webhook);
    console.log('Payload forwarded:', JSON.stringify(forwardBody));

    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardBody),
    });

    const respText = await resp.text().catch(() => '');
    console.log('Webhook response status:', resp.status);
    console.log('Webhook response body:', respText);

    if (!resp.ok) {
      return NextResponse.json({ error: 'Forwarding failed', details: respText }, { status: 502 });
    }

    return NextResponse.json({ ok: true, webhookStatus: resp.status });
  } catch (err) {
    console.error('submit-form error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
