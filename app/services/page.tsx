import { Navbar } from "@/components/homepage/Navbar"
import { Footer } from "@/components/homepage/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Stethoscope,
  FlaskConical,
  Clock,
  DollarSign,
  CheckCircle
} from 'lucide-react'

const services = [
  {
    title: "Cardiology",
    description: "Expert care for heart conditions and cardiovascular health",
    icon: Heart,
    color: "text-red-500",
    features: [
      "Heart Disease Treatment",
      "ECG & Echo Tests",
      "Blood Pressure Management",
      "Cardiac Surgery"
    ]
  },
  {
    title: "Neurology",
    description: "Specialized treatment for neurological disorders",
    icon: Brain,
    color: "text-blue-500",
    features: [
      "Stroke Treatment",
      "Epilepsy Management",
      "Headache Treatment",
      "Brain Surgery"
    ]
  },
  {
    title: "Orthopedics",
    description: "Comprehensive care for bone and joint problems",
    icon: Bone,
    color: "text-orange-500",
    features: [
      "Joint Replacement",
      "Sports Injuries",
      "Fracture Treatment",
      "Physical Therapy"
    ]
  },
  {
    title: "Ophthalmology",
    description: "Advanced eye care and vision treatments",
    icon: Eye,
    color: "text-green-500",
    features: [
      "Vision Testing",
      "Cataract Surgery",
      "Glaucoma Treatment",
      "LASIK Surgery"
    ]
  },
  {
    title: "Dental Care",
    description: "Complete dental health services",
    icon: Heart,
    color: "text-yellow-500",
    features: [
      "Dental Implants",
      "Root Canal",
      "Teeth Whitening",
      "Orthodontics"
    ]
  },
  {
    title: "Pediatrics",
    description: "Specialized healthcare for children",
    icon: Baby,
    color: "text-purple-500",
    features: [
      "Child Vaccinations",
      "Growth Monitoring",
      "Pediatric Surgery",
      "Child Psychology"
    ]
  },
  {
    title: "General Medicine",
    description: "Primary healthcare and routine check-ups",
    icon: Stethoscope,
    color: "text-indigo-500",
    features: [
      "Regular Check-ups",
      "Preventive Care",
      "Health Screening",
      "Chronic Disease Management"
    ]
  },
  {
    title: "Laboratory Services",
    description: "Comprehensive diagnostic testing",
    icon: FlaskConical,
    color: "text-pink-500",
    features: [
      "Blood Tests",
      "Urine Analysis",
      "Pathology",
      "Medical Imaging"
    ]
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Medical Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive healthcare services with state-of-the-art
            facilities and experienced medical professionals.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">24/7 Availability</h3>
                  <p className="text-sm text-muted-foreground">Round-the-clock medical care</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Affordable Care</h3>
                  <p className="text-sm text-muted-foreground">Reasonable healthcare costs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Quality Service</h3>
                  <p className="text-sm text-muted-foreground">Expert medical professionals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-12 h-12 ${service.color}`}>
                      <IconComponent className="w-full h-full" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                    <ul className="text-sm space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button>Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Footer />
    </main>
  )
}
