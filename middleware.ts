import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Add routes that should be accessible without authentication
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/services",
  "/doctors",
  "/contact",
  "/appointment",
  "/api/auth",
  "/api/register",
  "/unauthorized"
];

// Add routes that require specific roles
const roleRestrictedRoutes = {
  "/doctor": ["DOCTOR", "ADMIN"],
  "/admin": ["ADMIN"],
  "/patient": ["PATIENT", "ADMIN"],
};

// Dashboard routes for each role - used to redirect authenticated users
const roleDashboards = {
  "ADMIN": "/admin",
  "DOCTOR": "/doctor",
  "PATIENT": "/patient"
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public asset - always allow access
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname.includes("favicon")
  ) {
    return NextResponse.next();
  }

  // Auth check
  try {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Special case: If at homepage or login page and already logged in, redirect to dashboard
    if ((pathname === "/" || pathname === "/login") && token?.role) {
      const dashboardUrl = roleDashboards[token.role as keyof typeof roleDashboards];
      if (dashboardUrl) {
        return NextResponse.redirect(new URL(dashboardUrl, request.url));
      }
    }
    
    // Check if the route is public - anyone can access
    const isPublicRoute = publicRoutes.some((route) =>
      pathname === route || pathname.startsWith(`${route}/`) || pathname.startsWith(`/api${route}`)
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Handle protected routes - user must be logged in
    if (!token) {
      // For API routes, return unauthorized
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      // For regular routes, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // For role-restricted routes, check permissions
    for (const [route, roles] of Object.entries(roleRestrictedRoutes)) {
      if (pathname === route || pathname.startsWith(`${route}/`)) {
        if (!roles.includes(token.role as string)) {
          // Unauthorized for this role
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
        break;
      }
    }

    // All checks passed, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    
    // If there's an error in the middleware, let the request through
    // The route handlers can handle further authentication if needed
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image).*)"],
}; 