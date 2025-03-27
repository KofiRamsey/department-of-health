'use client'

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
  Search,
  TrendingUp,
  TrendingDown,
  LogOut
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Sample data for the doctor dashboard
const appointments = [
  {
    name: "John Smith",
    type: "Regular Checkup",
    status: "Confirmed",
    time: "09:00 AM"
  },
  {
    name: "Emily Johnson",
    type: "Follow-up",
    status: "Confirmed",
    time: "10:30 AM"
  },
  {
    name: "Michael Brown",
    type: "Test Results",
    status: "Pending",
    time: "11:45 AM"
  },
  {
    name: "Sarah Wilson",
    type: "Consultation",
    status: "Confirmed",
    time: "02:15 PM"
  }
];

const quickActions = [
  {
    icon: <ClipboardList className="mr-2 h-4 w-4 text-blue-600" />,
    label: "View Schedule",
    onClick: () => {}
  },
  {
    icon: <MessageSquare className="mr-2 h-4 w-4 text-green-600" />,
    label: "Patient Messages",
    onClick: () => {}
  },
  {
    icon: <Users className="mr-2 h-4 w-4 text-purple-600" />,
    label: "My Patients",
    onClick: () => {}
  },
  {
    icon: <Settings className="mr-2 h-4 w-4 text-gray-600" />,
    label: "Account Settings",
    onClick: () => {}
  }
];

const recentActivities = [
  {
    title: "Updated patient record for Emily Johnson",
    time: "30 minutes ago"
  },
  {
    title: "Created prescription for Michael Brown",
    time: "1 hour ago"
  },
  {
    title: "Laboratory test results received",
    time: "2 hours ago"
  },
  {
    title: "Appointment with Sarah Wilson completed",
    time: "Yesterday"
  }
];

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // If authentication is loading, wait for it
    if (status === "loading") return;
    
    // If not authenticated or not a doctor, redirect to login
    if (!session || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
      router.push('/login');
    }
  }, [session, status, router]);
  
  // If authentication is still loading or no session, show loading screen
  if (status === "loading" || !session) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {session.user.name || 'Doctor'}</h1>
            <p className="text-muted-foreground">Doctor Dashboard</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <DatePicker />
            <Button className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
            <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Total Patients</h3>
                    <p className="text-2xl font-bold">248</p>
                  </div>
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-green-600 mt-2">+12% from last month</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Today's Schedule</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search patients..." 
                    className="pl-8 w-full"
                  />
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.name}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          <Badge variant={appointment.status === 'Confirmed' ? 'success' : 'warning'}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <p className="font-medium">{appointment.time}</p>
                      <Button variant="outline" size="sm" className="ml-auto sm:ml-0">
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
                {quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start hover:bg-gray-100 transition-colors"
                    onClick={action.onClick}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-md transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
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
