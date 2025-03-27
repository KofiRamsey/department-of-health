'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Mail, 
  Phone, 
  Edit, 
  Trash, 
  Clock, 
  User, 
  Briefcase, 
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock4
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DoctorDetailClientProps {
  doctor: any;
  allServices: any[];
}

export function DoctorDetailClient({ doctor, allServices }: DoctorDetailClientProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const statusIconMap: Record<string, JSX.Element> = {
    'PENDING': <Clock4 className="h-4 w-4 text-yellow-500" />,
    'CONFIRMED': <CheckCircle2 className="h-4 w-4 text-green-500" />,
    'CANCELLED': <XCircle className="h-4 w-4 text-red-500" />,
    'COMPLETED': <CheckCircle2 className="h-4 w-4 text-blue-500" />,
  };
  
  const statusColorMap: Record<string, string> = {
    'PENDING': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    'CONFIRMED': 'bg-green-100 text-green-800 hover:bg-green-100',
    'CANCELLED': 'bg-red-100 text-red-800 hover:bg-red-100',
    'COMPLETED': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  const handleDeleteDoctor = async () => {
    // This would be implemented with an API call
    console.log("Deleting doctor:", doctor.id);
    setDeleteDialogOpen(false);
    // After deletion, redirect to the doctors list
    window.location.href = '/admin/doctors';
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Back button and action buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Link href="/admin/doctors">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Doctors
          </Button>
        </Link>
        
        <div className="flex gap-3">
          <Link href={`/admin/doctors/${doctor.id}/edit`}>
            <Button variant="outline" className="flex items-center">
              <Edit className="h-4 w-4 mr-2" /> Edit Doctor
            </Button>
          </Link>
          
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center">
                <Trash className="h-4 w-4 mr-2" /> Delete Doctor
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {doctor.user.name}'s account
                  and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteDoctor} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {/* Doctor details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Doctor info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                  {doctor.user.image ? (
                    <Image
                      src={doctor.user.image}
                      alt={doctor.user.name || "Doctor"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-primary/10 text-primary font-bold text-4xl">
                      {doctor.user.name?.charAt(0) || "D"}
                    </div>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold">{doctor.user.name}</h1>
                <p className="text-muted-foreground">{doctor.specialization}</p>
                
                <div className="w-full mt-6 space-y-3 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-left">{doctor.user.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  
                  {doctor.licenseNumber && (
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>License: {doctor.licenseNumber}</span>
                    </div>
                  )}
                </div>
                
                {/* Services */}
                <div className="w-full mt-6">
                  <h3 className="text-sm font-medium mb-2 text-left">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.services.length > 0 ? (
                      doctor.services.map((service: any) => (
                        <Badge key={service.id} variant="outline">
                          {service.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No services assigned</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Tabs for different sections */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Profile</CardTitle>
                  <CardDescription>Detailed information about this doctor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Biography</h3>
                    <p className="text-muted-foreground">
                      {doctor.bio || "No biography provided."}
                    </p>
                  </div>
                  
                  {/* Education */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Education</h3>
                    <p className="text-muted-foreground">
                      {doctor.education || "No education information provided."}
                    </p>
                  </div>
                  
                  {/* Services */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Services Offered</h3>
                    {doctor.services.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {doctor.services.map((service: any) => (
                          <Card key={service.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{service.description || "No description"}</p>
                              <div className="flex justify-between mt-2 text-sm">
                                <span>
                                  <Clock className="h-3 w-3 inline mr-1" /> 
                                  {service.duration} minutes
                                </span>
                                {service.price ? (
                                  <span className="font-medium">${service.price.toFixed(2)}</span>
                                ) : null}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No services assigned to this doctor.</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/admin/doctors/${doctor.id}/edit`} className="w-full">
                    <Button className="w-full">Edit Profile</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Appointments Tab */}
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>
                    {doctor.appointments.length > 0 
                      ? `Showing ${doctor.appointments.length} recent appointments`
                      : "No appointments found for this doctor"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {doctor.appointments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Time</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Patient</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Service</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctor.appointments.map((appointment: any) => (
                            <tr key={appointment.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm">{formatDate(appointment.date)}</td>
                              <td className="py-3 px-4 text-sm">{appointment.time}</td>
                              <td className="py-3 px-4 text-sm">
                                {appointment.patient?.user?.name || 'N/A'}
                              </td>
                              <td className="py-3 px-4 text-sm">{appointment.service?.name || 'N/A'}</td>
                              <td className="py-3 px-4 text-sm">
                                <div className="flex items-center">
                                  {statusIconMap[appointment.status] || 
                                   <Clock4 className="h-4 w-4 text-gray-500 mr-1.5" />}
                                  <Badge className={`ml-1.5 ${statusColorMap[appointment.status] || 'bg-gray-100'}`}>
                                    {appointment.status || 'PENDING'}
                                  </Badge>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <Link href={`/admin/appointments/${appointment.id}`}>
                                  <Button size="sm" variant="outline">View</Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-10 text-center border rounded-md">
                      <p className="text-gray-500 mb-4">No appointments found for this doctor.</p>
                      <Link href={`/admin/appointments/add?doctorId=${doctor.id}`}>
                        <Button>Schedule Appointment</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("profile")}>
                    View Profile
                  </Button>
                  <Link href={`/admin/appointments/add?doctorId=${doctor.id}`}>
                    <Button>Schedule New Appointment</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Availability Tab */}
            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Availability Schedule</CardTitle>
                  <CardDescription>Doctor's working hours and availability</CardDescription>
                </CardHeader>
                <CardContent>
                  {doctor.availability ? (
                    <div className="space-y-4">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                        const dayData = doctor.availability[day];
                        const isAvailable = dayData && 
                          (typeof dayData === 'object') && 
                          (dayData.isAvailable || dayData.start);
                        
                        return (
                          <div key={day} className="flex items-start border-b pb-3">
                            <div className="w-24 font-medium capitalize">{day}</div>
                            <div>
                              {isAvailable ? (
                                typeof dayData.start === 'string' && typeof dayData.end === 'string' ? (
                                  <span>{dayData.start} - {dayData.end}</span>
                                ) : (
                                  <span>Available (hours not specified)</span>
                                )
                              ) : (
                                <span className="text-muted-foreground">Not available</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-10 text-center border rounded-md">
                      <p className="text-gray-500 mb-4">No availability information found.</p>
                      <Link href={`/admin/doctors/${doctor.id}/edit`}>
                        <Button>Set Availability</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link href={`/admin/doctors/${doctor.id}/edit?tab=availability`} className="w-full">
                    <Button className="w-full">Edit Availability</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 