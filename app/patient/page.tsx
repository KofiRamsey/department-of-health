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
import { DebugAuth } from '@/components/auth/debug-auth'

export default function PatientDashboard() {
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
        } else if (data.session.user?.role !== 'patient' && data.session.user?.role !== 'admin') {
          // Redirect if not patient or admin
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
                  Continue to Patient Dashboard Anyway
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      
      {session?.user && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-6">
          <h2 className="text-green-800 font-medium">Authenticated as Patient</h2>
          <p className="text-green-700 text-sm mt-1">
            Logged in as {session.user.name} ({session.user.email})
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">My Appointments</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4">View and manage your appointments</p>
            <Button className="w-full">View Appointments</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-purple-700">Medical Records</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4">Access your medical history</p>
            <Button className="w-full">View Records</Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-700">Book Appointment</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600 mb-4">Schedule a new appointment</p>
            <Button className="w-full">Book Now</Button>
          </CardContent>
        </Card>
      </div>
      
      <DebugAuth />
    </div>
  )
}
