import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie } from '@/lib/session';

export async function GET(req: NextRequest) {
  // Get the role from URL params
  const searchParams = req.nextUrl.searchParams;
  const role = searchParams.get('role');
  const redirect = searchParams.get('redirect') || '/';

  // Validate role
  if (!role || !['admin', 'doctor', 'patient'].includes(role)) {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Invalid role parameter. Use one of: admin, doctor, patient' 
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Create user session data based on role
  let sessionData = {
    user: {
      id: `test-${role}-id`,
      email: `test-${role}@example.com`,
      name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    }
  };

  // Create session cookie
  const sessionCookie = createSessionCookie(sessionData);

  // Create appropriate response based on redirect parameter
  if (redirect) {
    // Redirect response with cookie
    const response = NextResponse.redirect(new URL(redirect, req.url));
    response.headers.set('Set-Cookie', sessionCookie);
    return response;
  } else {
    // JSON response with cookie
    const response = new NextResponse(
      JSON.stringify({ 
        success: true, 
        message: `Successfully logged in as ${role}`,
        user: sessionData.user
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
        }
      }
    );
    response.headers.set('Set-Cookie', sessionCookie);
    return response;
  }
} 