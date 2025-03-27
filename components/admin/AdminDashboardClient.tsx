'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  TrendingUp, 
  Users, 
  Calendar, 
  Stethoscope, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  Search
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AdminDashboardClientProps {
  doctorsCount: number;
  patientsCount: number;
  appointmentsCount: number;
  servicesCount: number;
  upcomingAppointments: any[];
}

export function AdminDashboardClient({
  doctorsCount,
  patientsCount,
  appointmentsCount,
  servicesCount,
  upcomingAppointments
}: AdminDashboardClientProps) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const filteredAppointments = upcomingAppointments.filter(appointment => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const doctorName = appointment.doctor?.user?.name?.toLowerCase() || '';
    const patientName = appointment.patient?.user?.name?.toLowerCase() || '';
    const serviceName = appointment.service?.name?.toLowerCase() || '';
    const status = appointment.status?.toLowerCase() || '';
    
    return doctorName.includes(query) || 
           patientName.includes(query) || 
           serviceName.includes(query) ||
           status.includes(query);
  });

  // Calculate appointment stats
  const pendingAppointments = upcomingAppointments.filter(a => a.status === 'PENDING').length;
  const confirmedAppointments = upcomingAppointments.filter(a => a.status === 'CONFIRMED').length;
  const cancelledAppointments = upcomingAppointments.filter(a => a.status === 'CANCELLED').length;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header with welcome and logout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session?.user?.name || 'Admin'}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full md:w-auto">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Doctors</h3>
                  <p className="text-2xl font-bold">{doctorsCount}</p>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="mt-4">
              <Link href="/admin/doctors" className="text-sm text-blue-600 hover:underline">View Doctors →</Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Patients</h3>
                  <p className="text-2xl font-bold">{patientsCount}</p>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="mt-4">
              <Link href="/admin/patients" className="text-sm text-green-600 hover:underline">View Patients →</Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Appointments</h3>
                  <p className="text-2xl font-bold">{appointmentsCount}</p>
                </div>
              </div>
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <div className="mt-4">
              <Link href="/admin/appointments" className="text-sm text-purple-600 hover:underline">View Appointments →</Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Services</h3>
                  <p className="text-2xl font-bold">{servicesCount}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin/services" className="text-sm text-orange-600 hover:underline">View Services →</Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Appointment Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <h3 className="font-medium">Pending</h3>
                  <p className="text-2xl font-bold">{pendingAppointments}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                Pending
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="font-medium">Confirmed</h3>
                  <p className="text-2xl font-bold">{confirmedAppointments}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                Confirmed
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <h3 className="font-medium">Cancelled</h3>
                  <p className="text-2xl font-bold">{cancelledAppointments}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                Cancelled
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Access Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Link href="/admin/doctors/add" className="bg-primary text-white py-2 px-4 rounded-md text-center hover:bg-primary/90 transition-colors">
              Add New Doctor
            </Link>
            <Link href="/admin/patients/add" className="bg-primary text-white py-2 px-4 rounded-md text-center hover:bg-primary/90 transition-colors">
              Add New Patient
            </Link>
            <Link href="/admin/services/add" className="bg-primary text-white py-2 px-4 rounded-md text-center hover:bg-primary/90 transition-colors">
              Add New Service
            </Link>
            <Link href="/admin/appointments/add" className="bg-primary text-white py-2 px-4 rounded-md text-center hover:bg-primary/90 transition-colors">
              Schedule Appointment
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
            <CardDescription>Manage all aspects of your health system</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Link href="/admin/doctors" className="border border-gray-300 py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-colors">
              Manage Doctors
            </Link>
            <Link href="/admin/patients" className="border border-gray-300 py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-colors">
              Manage Patients
            </Link>
            <Link href="/admin/services" className="border border-gray-300 py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-colors">
              Manage Services
            </Link>
            <Link href="/admin/appointments" className="border border-gray-300 py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-colors">
              Manage Appointments
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>View and manage upcoming appointments</CardDescription>
          </div>
          <div className="relative w-full md:w-auto max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search appointments..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredAppointments && filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Doctor</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patient</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Service</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{new Date(appointment.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-sm">{appointment.time}</td>
                      <td className="py-3 px-4 text-sm">{appointment.doctor?.user?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm">{appointment.patient?.user?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm">{appointment.service?.name || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm">
                        <Badge className={`${
                          appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                          appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                          'bg-blue-100 text-blue-800 hover:bg-blue-100'
                        }`}>
                          {appointment.status || 'PENDING'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex gap-2">
                          <Link href={`/admin/appointments/${appointment.id}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                          <Link href={`/admin/appointments/${appointment.id}/edit`}>
                            <Button size="sm">Edit</Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center border rounded-md">
              <p className="text-gray-500 mb-2">No upcoming appointments found.</p>
              <p className="text-sm text-gray-400 mb-6">
                {searchQuery ? 'Try a different search term or ' : 'Get started by '}
                creating your first appointment
              </p>
              <Link href="/admin/appointments/add">
                <Button>Schedule Appointment</Button>
              </Link>
            </div>
          )}
          
          {upcomingAppointments.length > 0 && filteredAppointments.length === 0 && (
            <div className="py-10 text-center border rounded-md">
              <p className="text-gray-500">No appointments match your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-right">
            <Link href="/admin/appointments" className="text-primary hover:underline">
              View All Appointments →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 