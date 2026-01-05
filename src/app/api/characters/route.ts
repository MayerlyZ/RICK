import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[api-route] external fetch failed', res.status, text);
      return NextResponse.json({ error: 'External fetch failed' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[api-route] error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
