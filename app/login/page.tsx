import { Navbar } from "@/components/homepage/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Login() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center mb-12">Select User Type</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Doctor Card */}
          <Link href="/doctor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  I am a Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <img 
                  src="/doc.jpg" 
                  alt="Doctor Icon" 
                  className="w-32 h-32"
                />
              </CardContent>
            </Card>
          </Link>

          {/* Patient Card */}
          <Link href="/patient">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  I am a Patient
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <img 
                  src="/patient.jpg" 
                  alt="Patient Icon" 
                  className="w-32 h-32"
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}
