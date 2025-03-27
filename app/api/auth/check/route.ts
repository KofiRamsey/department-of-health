import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Get session information
    const session = await getServerSession(authOptions);
    
    if (session) {
      return NextResponse.json({
        status: "authenticated",
        user: {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
          name: session.user.name
        },
        csrfToken: true
      }, { status: 200 });
    }
    
    return NextResponse.json({
      status: "unauthenticated",
      session: null,
      csrfToken: true
    }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({
      status: "error",
      message: "An error occurred while checking authentication status",
      error: process.env.NODE_ENV !== "production" ? String(error) : undefined
    }, { status: 500 });
  }
} 