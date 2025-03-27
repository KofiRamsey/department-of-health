'use client'
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signOut, useSession } from "next-auth/react"
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Pill, 
  Activity,
  MessageSquare,
  Settings,
  Bell,
  BarChart,
  LogOut
} from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

export default function PatientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // If authentication is loading, wait for it
    if (status === "loading") return;
    
    // If not authenticated or not a patient, redirect to login
    if (!session || (session.user.role !== "PATIENT" && session.user.role !== "ADMIN")) {
      router.push('/login');
    }
  }, [session, status, router]);
  
  // If authentication is still loading or no session, show loading screen
  if (status === "loading" || !session) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with Notifications */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {session.user.name || 'Patient'}</h1>
            <p className="text-muted-foreground">Patient Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <Calendar className="h-6 w-6 text-blue-600" />,
              title: "Next Appointment",
              value: "15 March, 2024",
              bg: "bg-blue-100"
            },
            {
              icon: <Activity className="h-6 w-6 text-green-600" />,
              title: "Health Score",
              value: "85/100",
              bg: "bg-green-100"
            },
            {
              icon: <Pill className="h-6 w-6 text-purple-600" />,
              title: "Active Prescriptions",
              value: "2 Medications",
              bg: "bg-purple-100"
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-orange-600" />,
              title: "Pending Messages",
              value: "3 Unread",
              bg: "bg-orange-100"
            }
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{stat.title}</h3>
                    <p className="text-sm text-muted-foreground">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <CardDescription>Your next 3 scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    doctor: "Dr. Sarah Wilson",
                    type: "General Checkup",
                    date: "March 15, 2024",
                    time: "09:30 AM"
                  },
                  {
                    doctor: "Dr. Michael Chen",
                    type: "Blood Test Results",
                    date: "March 20, 2024",
                    time: "02:00 PM"
                  },
                  {
                    doctor: "Dr. Emily Brown",
                    type: "Follow-up",
                    date: "March 28, 2024",
                    time: "11:15 AM"
                  }
                ].map((appointment, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{appointment.doctor}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access common patient services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    icon: <User className="h-4 w-4" />, 
                    label: "View Profile", 
                    href: "#profile",
                    color: "text-blue-600" 
                  },
                  { 
                    icon: <FileText className="h-4 w-4" />, 
                    label: "Medical Records", 
                    href: "#records",
                    color: "text-green-600"
                  },
                  { 
                    icon: <Pill className="h-4 w-4" />, 
                    label: "Prescriptions", 
                    href: "#prescriptions",
                    color: "text-purple-600"
                  },
                  { 
                    icon: <BarChart className="h-4 w-4" />, 
                    label: "Lab Results", 
                    href: "#results",
                    color: "text-orange-600"
                  },
                  { 
                    icon: <Settings className="h-4 w-4" />, 
                    label: "Settings", 
                    href: "#settings",
                    color: "text-gray-600"
                  }
                ].map((action, i) => (
                  <Button 
                    key={i}
                    variant="outline" 
                    className="w-full justify-start hover:bg-gray-50 transition-colors" 
                    asChild
                  >
                    <a href={action.href} className="flex items-center">
                      <span className={`mr-2 ${action.color}`}>
                        {action.icon}
                      </span>
                      {action.label}
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
