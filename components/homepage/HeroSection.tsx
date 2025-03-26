import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-120px)]">
      {/* Background Image */}
      <Image 
        src="/hero-section.jpg"
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-400/80">
        <div className="container h-full mx-auto px-8 flex flex-col justify-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Expert Medical</h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-8">Care Guaranteed</h2>
          <Link href="/login">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white w-fit"
            >
              Sign in
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}