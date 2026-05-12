import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // Only allow fetching from known trusted image hosts
  const allowedHosts = [
    'images.unsplash.com',
    'plus.unsplash.com',
    'res.cloudinary.com',
    'uploadthing.com',
    'utfs.io',
    'lh3.googleusercontent.com',
  ];

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  const isAllowed = allowedHosts.some(host => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`));
  if (!isAllowed) {
    return new NextResponse('Host not permitted', { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: { 'User-Agent': 'RaxiePrime/1.0' },
    });

    if (!response.ok) {
      return new NextResponse('Image fetch failed', { status: 502 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new NextResponse('Proxy error', { status: 500 });
  }
}
