'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Filter, 
  Package, 
  Clock, 
  DollarSign, 
  Trash2, 
  PenSquare,
  Stethoscope,
  CalendarClock,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ServicesManagementClientProps {
  services: any[];
}

export function ServicesManagementClient({ services }: ServicesManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Get unique duration ranges for filtering
  const durationRanges = useMemo(() => {
    const ranges = [
      { label: 'Less than 30 min', value: '<30' },
      { label: '30-60 min', value: '30-60' },
      { label: 'More than 60 min', value: '>60' },
    ];
    return ranges;
  }, []);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = service.name?.toLowerCase() || '';
        const description = service.description?.toLowerCase() || '';
        
        if (!name.includes(query) && !description.includes(query)) {
          return false;
        }
      }
      
      // Duration filter
      if (durationFilter && durationFilter !== "all") {
        const duration = service.duration || 0;
        
        if (durationFilter === '<30' && duration >= 30) {
          return false;
        } else if (durationFilter === '30-60' && (duration < 30 || duration > 60)) {
          return false;
        } else if (durationFilter === '>60' && duration <= 60) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by selected field
      if (sortBy === "name") {
        return sortDirection === "asc" 
          ? (a.name || "").localeCompare(b.name || "")
          : (b.name || "").localeCompare(a.name || "");
      } else if (sortBy === "duration") {
        const durationA = a.duration || 0;
        const durationB = b.duration || 0;
        return sortDirection === "asc" ? durationA - durationB : durationB - durationA;
      } else if (sortBy === "price") {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
      } else if (sortBy === "appointments") {
        const appointmentsA = a._count?.appointments || 0;
        const appointmentsB = b._count?.appointments || 0;
        return sortDirection === "asc" ? appointmentsA - appointmentsB : appointmentsB - appointmentsA;
      }
      
      return 0;
    });
  }, [services, searchQuery, durationFilter, sortBy, sortDirection]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setDurationFilter("all");
    setSortBy("name");
    setSortDirection("asc");
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header with title and add button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <p className="text-muted-foreground">
            {services.length === 0 
              ? "No services found. Start by adding your first service." 
              : `Showing ${filteredServices.length} of ${services.length} services`}
          </p>
        </div>
        <Link href="/admin/services/add">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Add New Service
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
                placeholder="Search by name or description..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Durations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  {durationRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
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
              
              {durationFilter && durationFilter !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Duration: {durationRanges.find(r => r.value === durationFilter)?.label}
                  <button onClick={() => setDurationFilter("all")}>
                    <X className="h-3 w-3 ml-1" />
                  </button>
                </Badge>
              )}
              
              {(searchQuery || (durationFilter && durationFilter !== "all")) && (
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
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
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
      
      {filteredServices.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          {services.length === 0 ? (
            <>
              <p className="text-gray-500 mb-4">No services found.</p>
              <Link href="/admin/services/add">
                <Button>Add Your First Service</Button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-4">No services match your search criteria.</p>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold">{service.name}</h2>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/admin/services/${service.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <PenSquare className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-muted-foreground text-sm line-clamp-2">
                    {service.description || "No description available"}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} minutes</span>
                    </div>
                    
                    {service.price !== null && service.price !== undefined && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>${service.price.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarClock className="h-4 w-4" />
                      <span>{service._count?.appointments || 0} appointments</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Stethoscope className="h-4 w-4 mr-1 text-muted-foreground" />
                    Available Doctors:
                  </h3>
                  {service.doctors.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {service.doctors.map((doctor: any) => (
                        <Badge 
                          key={doctor.id} 
                          variant="outline"
                          className="px-2 py-1"
                        >
                          {doctor.user.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No doctors assigned to this service</p>
                  )}
                </div>
                
                <div className="p-4 flex">
                  <Link href={`/admin/services/${service.id}/edit`} className="w-full">
                    <Button className="w-full">Edit Service</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 