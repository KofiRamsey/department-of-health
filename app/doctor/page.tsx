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
import { DebugAuth } from "@/components/auth/debug-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [showWarning, setShowWarning] = useState(false);
  
  // Fetch session data from our debug-session API
  useEffect(() => {
    fetch('/api/auth/debug-session')
      .then(res => res.json())
      .then(data => {
        setSession(data.session);
        
        // If no session found, show the warning
        if (!data.session) {
          setShowWarning(true);
        } else if (data.session.user?.role !== 'doctor' && data.session.user?.role !== 'admin') {
          // Redirect if not doctor or admin
          router.push('/unauthorized');
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching session:', err);
        setShowWarning(true);
        setLoading(false);
      });
  }, [router]);

  const handleContinueAnyway = () => {
    setShowWarning(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500">Checking your session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Warning for unauthenticated users */}
      {showWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div>
              <h3 className="text-yellow-800 font-medium">Authentication Warning</h3>
              <p className="text-yellow-700 mt-1">
                You are not properly authenticated. This could be due to cookie issues with the deployment.
              </p>
              <div className="mt-3">
                <Button 
                  onClick={handleContinueAnyway}
                  size="sm"
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  Continue to Doctor Dashboard Anyway
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      
      {session?.user && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-6">
          <h2 className="text-green-800 font-medium">Authenticated as Doctor</h2>
          <p className="text-green-700 text-sm mt-1">
            Logged in as {session.user.name} ({session.user.email})
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">Appointments</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4">Manage your appointments</p>
            <Button className="w-full">View Appointments</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-purple-700">Patient Records</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4">Access patient medical records</p>
            <Button className="w-full">View Records</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-700">Schedule Management</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4">Manage your work schedule</p>
            <Button className="w-full">Manage Schedule</Button>
          </CardContent>
        </Card>
      </div>
      
      <DebugAuth />
    </div>
  );
}
