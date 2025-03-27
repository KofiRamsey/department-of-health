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
      refetchInterval={5 * 60} // Re-fetch session every 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
} 