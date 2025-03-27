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
  
  // Check if the path is a public asset or authentication-related - always allow access
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname.includes("favicon") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".jpg") ||
    pathname.includes(".png") ||
    pathname.includes(".svg") ||
    pathname.includes(".ico")
  ) {
    return NextResponse.next();
  }

  // Auth check
  try {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production"
    });

    // Log token for debugging in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.log("Auth token:", token ? "Found with role: " + token.role : "Not found");
      console.log("Current path:", pathname);
    }

    // Special case: If at homepage or login page and already logged in, redirect to dashboard
    if ((pathname === "/" || pathname === "/login") && token?.role) {
      const dashboardUrl = roleDashboards[token.role as keyof typeof roleDashboards];
      if (dashboardUrl) {
        console.log(`Redirecting authenticated user to ${dashboardUrl}`);
        // Use absolute URL to ensure proper redirection in deployed environments
        const fullRedirectUrl = new URL(dashboardUrl, request.url);
        console.log(`Full redirect URL: ${fullRedirectUrl.toString()}`);
        return NextResponse.redirect(fullRedirectUrl);
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
        console.log(`Unauthorized access to API: ${pathname}`);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      // For regular routes, redirect to login with return URL
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      console.log(`Redirecting unauthenticated user to login with return URL: ${returnUrl}`);
      const loginRedirectUrl = new URL(`/login?callbackUrl=${returnUrl}`, request.url);
      console.log(`Full login redirect URL: ${loginRedirectUrl.toString()}`);
      return NextResponse.redirect(loginRedirectUrl);
    }

    // For role-restricted routes, check permissions
    for (const [route, roles] of Object.entries(roleRestrictedRoutes)) {
      if (pathname === route || pathname.startsWith(`${route}/`)) {
        if (!roles.includes(token.role as string)) {
          // Unauthorized for this role
          console.log(`User with role ${token.role} accessing unauthorized route: ${pathname}`);
          // Use absolute URL for redirection
          const fullRedirectUrl = new URL("/unauthorized", request.url);
          return NextResponse.redirect(fullRedirectUrl);
        }
        break;
      }
    }

    // All checks passed, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    
    // If there's an error in the middleware, redirect to login for non-API routes
    if (!pathname.startsWith("/api") && !pathname.startsWith("/_next") && !pathname.startsWith("/api/auth")) {
      const errorRedirectUrl = new URL("/login?error=middleware_error", request.url);
      console.log(`Middleware error redirect URL: ${errorRedirectUrl.toString()}`);
      return NextResponse.redirect(errorRedirectUrl);
    }
    
    // For API routes, continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}; 