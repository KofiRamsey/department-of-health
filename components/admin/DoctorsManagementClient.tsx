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
  Clock, 
  Briefcase,
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

interface DoctorsManagementClientProps {
  doctors: any[];
  services: any[];
}

export function DoctorsManagementClient({ doctors, services }: DoctorsManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Get all unique specializations
  const specializations = useMemo(() => {
    const allSpecializations = doctors.map(doctor => doctor.specialization);
    return [...new Set(allSpecializations)].filter(Boolean).sort();
  }, [doctors]);

  // Filter doctors based on search and filters
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = doctor.user.name?.toLowerCase() || '';
        const email = doctor.user.email?.toLowerCase() || '';
        const doctorSpecialization = doctor.specialization?.toLowerCase() || '';
        
        if (!name.includes(query) && !email.includes(query) && !doctorSpecialization.includes(query)) {
          return false;
        }
      }
      
      // Specialization filter
      if (specialization && specialization !== "all" && doctor.specialization !== specialization) {
        return false;
      }
      
      // Service filter
      if (filterService && filterService !== "all" && !doctor.services.some((service: any) => service.id === filterService)) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by selected field
      if (sortBy === "name") {
        return sortDirection === "asc" 
          ? (a.user.name || "").localeCompare(b.user.name || "")
          : (b.user.name || "").localeCompare(a.user.name || "");
      } else if (sortBy === "experience") {
        const expA = a.experience || 0;
        const expB = b.experience || 0;
        return sortDirection === "asc" ? expA - expB : expB - expA;
      } else if (sortBy === "services") {
        return sortDirection === "asc"
          ? a.services.length - b.services.length
          : b.services.length - a.services.length;
      }
      
      return 0;
    });
  }, [doctors, searchQuery, specialization, filterService, sortBy, sortDirection]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSpecialization("all");
    setFilterService("all");
    setSortBy("name");
    setSortDirection("asc");
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header with title and add button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Doctors</h1>
          <p className="text-muted-foreground">
            {doctors.length === 0 
              ? "No doctors found. Start by adding your first doctor." 
              : `Showing ${filteredDoctors.length} of ${doctors.length} doctors`}
          </p>
        </div>
        <Link href="/admin/doctors/add">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Doctor
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
                placeholder="Search by name, email, or specialization..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={specialization} onValueChange={setSpecialization}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterService} onValueChange={setFilterService}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
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
              
              {specialization && specialization !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Specialization: {specialization}
                  <button onClick={() => setSpecialization("all")}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}
              
              {filterService && filterService !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Service: {services.find(s => s.id === filterService)?.name || ''}
                  <button onClick={() => setFilterService("all")}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}
              
              {(searchQuery || (specialization && specialization !== "all") || (filterService && filterService !== "all")) && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
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
      
      {filteredDoctors.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          {doctors.length === 0 ? (
            <>
              <p className="text-gray-500 mb-4">No doctors found.</p>
              <Link href="/admin/doctors/add">
                <Button>Add Your First Doctor</Button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-4">No doctors match your search criteria.</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-100">
                      {doctor.user.image ? (
                        <Image
                          src={doctor.user.image}
                          alt={doctor.user.name || "Doctor"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-primary/10 text-primary font-bold text-xl">
                          {doctor.user.name?.charAt(0) || "D"}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{doctor.user.name}</h2>
                      <p className="text-muted-foreground">{doctor.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span className="flex-1 break-words">{doctor.user.email}</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-start">
                      <Briefcase className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                      <div className="flex-1">
                        {doctor.services.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {doctor.services.map((service: any) => (
                              <Badge key={service.id} variant="outline">
                                {service.name}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No services assigned</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/doctors/${doctor.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/doctors/${doctor.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Doctor
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Doctor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Link href={`/admin/doctors/${doctor.id}/edit`} className="flex-1">
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