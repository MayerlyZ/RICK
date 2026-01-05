import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    if (!url) return NextResponse.json({ error: 'url is required' }, { status: 400 });

    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[image-proxy] external fetch failed', res.status, text);
      return NextResponse.json({ error: 'External fetch failed' }, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      headers: { 'Content-Type': contentType },
    });
  } catch (err: any) {
    console.error('[image-proxy] error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
