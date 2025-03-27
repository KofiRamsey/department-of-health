import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";
import { Toaster } from "sonner";

// Initialize the Inter font outside of the component
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Department of Health",
  description: "Department of Health developed by Msebetsi Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <NextAuthProvider>
          {children}
          <Toaster position="top-right" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
