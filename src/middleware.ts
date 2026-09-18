import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the portal routes that require authentication
const protectedRoutes = ['/learner', '/guardian', '/teacher', '/admin'];
// Define auth routes that authenticated users shouldn't see
const authRoutes = ['/login', '/register', '/apply', '/forgot-password', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Basic check for refresh token in cookies as a proxy for 'is logged in'
  // Real token validation happens at the API layer, but this prevents unnecessary unauthenticated flashes
  const hasToken = request.cookies.has('refreshToken');

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route) && !pathname.includes('/login') && !pathname.includes('/register') && !pathname.includes('/apply'));
  
  // Check if it's an auth route
  const isAuthRoute = authRoutes.some(route => pathname.includes(route));

  if (isProtectedRoute && !hasToken) {
    // Redirect unauthenticated users to the appropriate login portal
    const portal = protectedRoutes.find(route => pathname.startsWith(route)) || '/learner';
    return NextResponse.redirect(new URL(`${portal}/login`, request.url));
  }

  if (isAuthRoute && hasToken) {
    // If they have a token and try to visit an auth page, redirect to their dashboard
    // In a real app we'd need to know their role from the token to redirect accurately.
    // For now, we'll route them to learner dashboard as a fallback, or let them stay.
    // Given the architecture, the API or frontend store will bounce them correctly.
    // A simple return NextResponse.next() is safe since the client-side store will handle the rest.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
