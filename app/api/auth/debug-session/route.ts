import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    // Get the session from cookies
    const session = getSessionFromCookie(request.headers.get('cookie'));
    
    // Return the session data (or null if not found)
    return NextResponse.json({
      success: true,
      session: session,
      timestamp: new Date().toISOString(),
      cookies: request.headers.get('cookie')?.split(';').map(c => c.trim()) || []
    });
  } catch (error) {
    console.error('Error in debug-session API:', error);
    return NextResponse.json({
      success: false,
      error: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 