import { Navbar } from "@/components/homepage/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar,
  Clock,
  Users,
  ClipboardList,
  MessageSquare,
  Activity,
  UserPlus,
  Settings,
  Search
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DoctorDashboard() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Dr. Smith</h1>
            <p className="text-muted-foreground">Department of General Medicine</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Total Patients</h3>
                  <p className="text-2xl font-bold">248</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Today's Appointments</h3>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Pending Reports</h3>
                  <p className="text-2xl font-bold">5</p>
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
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Today's Schedule</CardTitle>
              <div className="relative max-w-xs">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search patients..." 
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <p className="text-sm text-muted-foreground">General Checkup</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">09:30 AM</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Write Prescription
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  View Medical Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">Prescription Updated</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
