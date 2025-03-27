import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromCookie } from './lib/session';

// Paths that require authentication
const PROTECTED_PATHS = ['/admin', '/doctor', '/patient'];

// Role-specific paths
const ROLE_PATHS = {
  'admin': ['/admin'],
  'doctor': ['/doctor'],
  'patient': ['/patient'],
};

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;
  
  // Check if the path requires authentication
  const isProtectedPath = PROTECTED_PATHS.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );

  if (isProtectedPath) {
    // Get the session from the request cookies
    const session = getSessionFromCookie(request.headers.get('cookie'));
    
    // If no session, redirect to login
    if (!session || !session.user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has proper role for this path
    const userRole = session.user.role;
    const hasAccess = ROLE_PATHS[userRole]?.some(allowedPath => 
      path === allowedPath || path.startsWith(`${allowedPath}/`)
    );

    // If user doesn't have access to this path, redirect to unauthorized
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // If all checks pass, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Protect all paths under these routes
    '/admin/:path*',
    '/doctor/:path*',
    '/patient/:path*',
    // Also protect the root paths
    '/admin',
    '/doctor',
    '/patient',
  ],
}; 