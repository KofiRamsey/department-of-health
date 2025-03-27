'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { getImageUrl, getFallbackImageUrl } from '@/lib/utils'

export function QuickAccess() {
  const [iconErrors, setIconErrors] = useState<{[key: string]: boolean}>({});
  
  const getIconUrl = (path: string, label: string) => {
    return iconErrors[label] ? getFallbackImageUrl(path) : getImageUrl(path);
  };
  
  const handleIconError = (label: string) => {
    setIconErrors(prev => ({
      ...prev,
      [label]: true
    }));
  };

  return (
    <section className="bg-white shadow-sm">
      <div className="container mx-auto grid grid-cols-4 text-center">
        {[
          ['DOCTOR', '/doctor', '/doctor-icon.svg'],
          ['PATIENT', '/patient', '/patient-icon.svg'],
          ['REGISTER', '/register', '/register-icon.svg'],
          ['LOGIN', '/login', '/login-icon.svg'],
        ].map(([label, href, iconPath]) => (
          <Link 
            key={href}
            href={href} 
            className="p-8 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Image 
              src={getIconUrl(iconPath as string, label as string)} 
              alt={label as string} 
              width={40} 
              height={40}
              onError={() => handleIconError(label as string)}
            />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
} 