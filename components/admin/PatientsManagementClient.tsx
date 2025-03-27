'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Calendar,
  CalendarClock,
  User,
  MapPin,
  Clock,
  Eye,
  Edit,
  Trash,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface PatientsManagementClientProps {
  patients: any[];
}

export function PatientsManagementClient({ patients }: PatientsManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Filter patients based on search and filters
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = patient.user.name?.toLowerCase() || '';
        const email = patient.user.email?.toLowerCase() || '';
        const phone = patient.phoneNumber?.toLowerCase() || '';
        const address = patient.address?.toLowerCase() || '';
        
        if (!name.includes(query) && !email.includes(query) && !phone.includes(query) && !address.includes(query)) {
          return false;
        }
      }
      
      // Gender filter
      if (filterGender && filterGender !== "all" && patient.gender !== filterGender) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by selected field
      if (sortBy === "name") {
        return sortDirection === "asc" 
          ? (a.user.name || "").localeCompare(b.user.name || "")
          : (b.user.name || "").localeCompare(a.user.name || "");
      } else if (sortBy === "appointments") {
        const appointmentsA = a.appointments?.length || 0;
        const appointmentsB = b.appointments?.length || 0;
        return sortDirection === "asc" ? appointmentsA - appointmentsB : appointmentsB - appointmentsA;
      } else if (sortBy === "dateOfBirth") {
        if (!a.dateOfBirth) return sortDirection === "asc" ? 1 : -1;
        if (!b.dateOfBirth) return sortDirection === "asc" ? -1 : 1;
        return sortDirection === "asc" 
          ? new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime() 
          : new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime();
      }
      
      return 0;
    });
  }, [patients, searchQuery, filterGender, sortBy, sortDirection]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilterGender("all");
    setSortBy("name");
    setSortDirection("asc");
  };

  // Format date of birth
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header with title and add button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Patients</h1>
          <p className="text-muted-foreground">
            {patients.length === 0 
              ? "No patients found. Start by adding your first patient." 
              : `Showing ${filteredPatients.length} of ${patients.length} patients`}
          </p>
        </div>
        <Link href="/admin/patients/add">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Patient
          </Button>
        </Link>
      </div>
      
      {/* Filters and search */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2" /> 
            Filters and Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email, phone, or address..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterGender} onValueChange={setFilterGender}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
            <div className="flex gap-2 flex-wrap">
              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}
              
              {filterGender && filterGender !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Gender: {filterGender.charAt(0) + filterGender.slice(1).toLowerCase()}
                  <button onClick={() => setFilterGender("all")}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}
              
              {(searchQuery || (filterGender && filterGender !== "all")) && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="dateOfBirth">Date of Birth</SelectItem>
                  <SelectItem value="appointments">Appointment Count</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                className="h-9 w-9"
              >
                {sortDirection === "asc" ? "↑" : "↓"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredPatients.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          {patients.length === 0 ? (
            <>
              <p className="text-gray-500 mb-4">No patients found.</p>
              <Link href="/admin/patients/add">
                <Button>Add Your First Patient</Button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-4">No patients match your search criteria.</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-100">
                      {patient.user.image ? (
                        <Image
                          src={patient.user.image}
                          alt={patient.user.name || "Patient"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-primary/10 text-primary font-bold text-xl">
                          {patient.user.name?.charAt(0) || "P"}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{patient.user.name}</h2>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarClock className="w-4 h-4 mr-1" />
                        <span>{patient.appointments?.length || 0} appointments</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span className="flex-1 break-words">{patient.user.email}</span>
                    </div>
                    
                    {patient.phoneNumber && (
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span>{patient.phoneNumber}</span>
                      </div>
                    )}
                    
                    {patient.dateOfBirth && (
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span>DOB: {formatDate(patient.dateOfBirth)}</span>
                      </div>
                    )}
                    
                    {patient.gender && (
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span>Gender: {patient.gender.charAt(0) + patient.gender.slice(1).toLowerCase()}</span>
                      </div>
                    )}
                    
                    {patient.address && (
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span className="truncate">{patient.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/patients/${patient.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/patients/${patient.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Patient
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/appointments/add?patientId=${patient.id}`}>
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4" />
                            Schedule Appointment
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Patient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Link href={`/admin/patients/${patient.id}/edit`} className="flex-1">
                      <Button className="w-full">Edit</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 