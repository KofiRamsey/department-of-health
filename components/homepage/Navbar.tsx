"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'

const navLinks = [
  ['HOME', '/'],
  ['DOCTOR', '/doctor'],
  ['PATIENT', '/patient'],
  ['SERVICES', '/services'],
  ['DOCTORS', '/doctors'],
  ['APPOINTMENT', '/appointment'],
  ['CONTACT', '/contact'],
] as const

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Image 
              src="/logo.png" 
              alt="Pietersburg Hospital Logo" 
              width={100} 
              height={100}
              className="w-auto h-auto"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-base md:text-xl font-bold">Department Of Health</h1>
              <h2 className="text-sm md:text-lg"> POLOKWANE HOSPITAL</h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(([label, href]) => (
              <Link 
                key={href}
                href={href} 
                className={`font-medium text-lg p-2 transition-colors hover:text-primary
                  ${pathname === href ? 'text-orange-500' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map(([label, href]) => (
                    <Link 
                      key={href}
                      href={href} 
                      className={`font-medium text-lg p-2 transition-colors hover:text-primary
                        ${href === '/' ? 'text-orange-500' : ''}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}