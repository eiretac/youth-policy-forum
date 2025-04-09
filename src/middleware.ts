import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin' || path === '/auth/signup';
  
  // Skip auth check for NextAuth API routes and diagnostic routes
  const isNextAuthApiRoute = path.startsWith('/api/auth');
  const isDiagnosticRoute = path === '/api/db-test' || path === '/api/db-test-direct';
  
  if (isNextAuthApiRoute || isDiagnosticRoute) {
    const response = NextResponse.next();
    // Ensure proper CORS headers for API routes
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  // Get the token from the cookies
  const token = request.cookies.get('next-auth.session-token')?.value;

  // Redirect logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/member-area', request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Add CORS headers to API routes
  if (path.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  return NextResponse.next();
}

// Update the matcher to include diagnostic routes
export const config = {
  matcher: [
    '/member-area/:path*',
    '/auth/signin',
    '/auth/signup',
    '/api/auth/:path*',
    '/api/db-test',
    '/api/db-test-direct',
    '/api/:path*',
  ],
}; 