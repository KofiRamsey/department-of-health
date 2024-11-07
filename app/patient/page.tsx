import { Navbar } from "@/components/homepage/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Pill, 
  Activity,
  MessageSquare,
  Settings
} from "lucide-react"

export default function PatientDashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
          <p className="text-muted-foreground">Patient ID: P123456</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Next Appointment</h3>
                  <p className="text-sm text-muted-foreground">15 March, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Last Checkup</h3>
                  <p className="text-sm text-muted-foreground">1 month ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Pill className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Prescriptions</h3>
                  <p className="text-sm text-muted-foreground">2 Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Messages</h3>
                  <p className="text-sm text-muted-foreground">3 Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Dr. Sarah Wilson</h4>
                      <p className="text-sm text-muted-foreground">General Checkup</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">March 15, 2024</p>
                      <p className="text-sm text-muted-foreground">09:30 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#profile">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#records">
                  <FileText className="mr-2 h-4 w-4" />
                  Medical Records
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#prescriptions">
                  <Pill className="mr-2 h-4 w-4" />
                  Prescriptions
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
