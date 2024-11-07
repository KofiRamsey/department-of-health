import type { Metadata } from "next";
import "./globals.css";



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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
