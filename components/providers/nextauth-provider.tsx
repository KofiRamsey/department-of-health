'use client';

import { SessionProvider } from "next-auth/react";

export function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider 
      // Force re-fetch session when window is focused
      refetchInterval={1 * 60} // Re-fetch session every minute for more responsiveness
      refetchOnWindowFocus={true}
      refetchWhenOffline={false} // Don't refetch when offline
      // Explicitly use sessionToken cookie without Secure flag for Vercel deployment
      // This helps with cookie issues in some Vercel environments
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  );
} 