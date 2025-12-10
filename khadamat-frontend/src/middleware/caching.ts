
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next/static')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400');
    return response;
  }

  if (pathname === '/' || pathname.startsWith('/about') || pathname.startsWith('/contact')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=1800');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/about',
    '/contact',
    '/api/:path*',
    '/_next/static/:path*',
  ],
};
