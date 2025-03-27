import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  try {
    // Get credentials from request
    const { email, password, destination } = await request.json();
    
    // Admin check for direct login without all the NextAuth handling
    if (email === "admin@health.example.com" && password === "Admin123!") {
      // Create a manual session cookie with required fields for admin
      const sessionToken = await encode({
        token: {
          id: "admin-id",
          email: "admin@health.example.com",
          name: "Admin User",
          role: "ADMIN",
          sub: "admin-id",
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
          jti: "direct-login-" + Math.random().toString(36).substring(2, 10)
        },
        secret: process.env.NEXTAUTH_SECRET || "my-direct-login-secret",
      });
      
      // Set cookie directly
      const cookieStore = cookies();
      cookieStore.set({
        name: "next-auth.session-token",
        value: sessionToken,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });
      
      // Return success response with redirect
      return NextResponse.json({ 
        success: true,
        redirectTo: destination || "/admin",
        message: "Direct login successful"
      });
    }
    
    // Doctor check
    if (email === "doctor@health.example.com" && password === "Doctor123!") {
      const sessionToken = await encode({
        token: {
          id: "doctor-id",
          email: "doctor@health.example.com",
          name: "Doctor User",
          role: "DOCTOR",
          sub: "doctor-id",
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
          jti: "direct-login-" + Math.random().toString(36).substring(2, 10)
        },
        secret: process.env.NEXTAUTH_SECRET || "my-direct-login-secret",
      });
      
      const cookieStore = cookies();
      cookieStore.set({
        name: "next-auth.session-token",
        value: sessionToken,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 30 * 24 * 60 * 60
      });
      
      return NextResponse.json({ 
        success: true,
        redirectTo: destination || "/doctor",
        message: "Direct login successful"
      });
    }
    
    // Patient check
    if (email === "patient@health.example.com" && password === "Patient123!") {
      const sessionToken = await encode({
        token: {
          id: "patient-id",
          email: "patient@health.example.com",
          name: "Patient User",
          role: "PATIENT",
          sub: "patient-id",
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
          jti: "direct-login-" + Math.random().toString(36).substring(2, 10)
        },
        secret: process.env.NEXTAUTH_SECRET || "my-direct-login-secret",
      });
      
      const cookieStore = cookies();
      cookieStore.set({
        name: "next-auth.session-token",
        value: sessionToken,
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 30 * 24 * 60 * 60
      });
      
      return NextResponse.json({ 
        success: true,
        redirectTo: destination || "/patient",
        message: "Direct login successful"
      });
    }
    
    // If no test account matches, return error
    return NextResponse.json({ 
      success: false,
      message: "Invalid credentials"
    }, { status: 401 });
    
  } catch (error) {
    console.error("Direct login error:", error);
    return NextResponse.json({ 
      success: false,
      message: "An error occurred during direct login",
      error: String(error)
    }, { status: 500 });
  }
} 