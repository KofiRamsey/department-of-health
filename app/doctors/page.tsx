import { Navbar } from "@/components/homepage/Navbar"
import { Footer } from "@/components/homepage/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const doctors = [
  {
    name: "Dr. Thabo Molefe",
    specialty: "Cardiologist",
    experience: "15+ years experience",
    education: "MD - University of Cape Town",
    image: "/doctors/doctor1.jpg",
    availability: "Mon, Wed, Fri"
  },
  {
    name: "Dr. Priya Naidoo",
    specialty: "Neurologist",
    experience: "12+ years experience",
    education: "MD - University of Witwatersrand",
    image: "/doctors/doctor2.jpg",
    availability: "Tue, Thu, Sat"
  },
  {
    name: "Dr. Nomvula Dlamini",
    specialty: "Pediatrician",
    experience: "10+ years experience",
    education: "MD - Stellenbosch University",
    image: "/doctors/doctor3.jpg",
    availability: "Mon, Tue, Thu"
  },
  {
    name: "Dr. Johannes van der Merwe",
    specialty: "Orthopedic Surgeon",
    experience: "20+ years experience",
    education: "MD - University of Pretoria",
    image: "/doctors/doctor4.jpg",
    availability: "Wed, Thu, Fri"
  },
  {
    name: "Dr. Fatima Ebrahim",
    specialty: "Dermatologist",
    experience: "8+ years experience",
    education: "MD - University of KwaZulu-Natal",
    image: "/doctors/doctor5.jpg",
    availability: "Mon, Wed, Sat"
  },
  {
    name: "Dr. Sipho Ndlovu",
    specialty: "General Practitioner",
    experience: "14+ years experience",
    education: "MD - University of Free State",
    image: "/doctors/doctor6.jpg",
    availability: "Tue, Thu, Fri"
  }
]

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Medical Specialists</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our team of experienced and dedicated medical professionals committed
            to providing the highest quality healthcare services.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>{doctor.experience}</p>
                  <p>{doctor.education}</p>
                  <p>Available: {doctor.availability}</p>
                </div>
                <Button className="w-full">Book Appointment</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
