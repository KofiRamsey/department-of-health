import { Navbar } from "@/components/homepage/Navbar"
import { HeroSection } from "@/components/homepage/HeroSection"
import { QuickAccess } from "@/components/homepage/QuickAccess"
import { AppointmentSection } from "@/components/homepage/AppointmentSection"
import { MapAndHours } from "@/components/homepage/MapAndHours"
import { Footer } from "@/components/homepage/Footer"

export default function Home() {
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
