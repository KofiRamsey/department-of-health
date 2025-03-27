'use client';

import { Navbar } from "@/components/homepage/Navbar"
import { HeroSection } from "@/components/homepage/HeroSection"
import { QuickAccess } from "@/components/homepage/QuickAccess"
import { AppointmentSection } from "@/components/homepage/AppointmentSection"
import { MapAndHours } from "@/components/homepage/MapAndHours"
import { Footer } from "@/components/homepage/Footer"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Role-based redirection
  useEffect(() => {
    // Only redirect if the session is fully loaded and the user is authenticated
    if (status === "authenticated" && session?.user?.role) {
      console.log("User is authenticated with role:", session.user.role);
      
      // Redirect to appropriate dashboard based on role
      switch (session.user.role) {
        case "ADMIN":
          router.push("/admin");
          break;
        case "DOCTOR":
          router.push("/doctor");
          break;
        case "PATIENT":
          router.push("/patient");
          break;
      }
    }
  }, [session, status, router]);
  
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <QuickAccess />
      <AppointmentSection />
      <MapAndHours />
      <Footer />
    </main>
  )
}
