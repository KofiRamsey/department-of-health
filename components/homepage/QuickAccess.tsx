import Image from 'next/image'
import Link from 'next/link'

export function QuickAccess() {
  return (
    <section className="bg-white shadow-sm">
      <div className="container mx-auto grid grid-cols-4 text-center">
        {[
          ['DOCTOR', '/doctor', '/doctor-icon.svg'],
          ['PATIENT', '/patient', '/patient-icon.svg'],
          ['REGISTER', '/register', '/register-icon.svg'],
          ['LOGIN', '/login', '/login-icon.svg'],
        ].map(([label, href, icon]) => (
          <Link 
            key={href}
            href={href} 
            className="p-8 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Image src={icon} alt={label} width={40} height={40} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
} 