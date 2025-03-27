"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const linkStyle = "text-gray-700 hover:text-primary transition-colors";
  const activeLinkStyle = "text-primary font-semibold border-b-2 border-primary";
  
  const displayLinks = navLinks.filter(link => {
    // Hide login link if user is logged in
    if (link.href === "/login" && session) {
      return false;
    }
    return true;
  });
  
  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!session) return null;
    
    const role = session.user.role;
    let href = "/patient";
    let label = "Dashboard";
    
    if (role === "ADMIN") {
      href = "/admin";
      label = "Admin Dashboard";
    } else if (role === "DOCTOR") {
      href = "/doctor";
      label = "Doctor Dashboard";
    }
    
    return { href, label };
  };
  
  const dashboardLink = getDashboardLink();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Department of Health</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {displayLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  linkStyle,
                  pathname === link.href && activeLinkStyle
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {dashboardLink && (
              <Link
                href={dashboardLink.href}
                className={cn(
                  "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors",
                  pathname.startsWith(dashboardLink.href) && "bg-primary/90"
                )}
              >
                {dashboardLink.label}
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {displayLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-2",
                    linkStyle,
                    pathname === link.href && activeLinkStyle
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
            
            {dashboardLink && (
              <div>
                <Link
                  href={dashboardLink.href}
                  className="block py-2 text-primary font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dashboardLink.label}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}