import { Doctor, Appointment } from "@prisma/client";

// Type for daily availability structure
export interface DailyAvailability {
  isAvailable: boolean;
  start?: string;
  end?: string;
}

// Type for the entire week's availability
export interface WeeklyAvailability {
  monday?: DailyAvailability;
  tuesday?: DailyAvailability;
  wednesday?: DailyAvailability;
  thursday?: DailyAvailability;
  friday?: DailyAvailability;
  saturday?: DailyAvailability;
  sunday?: DailyAvailability;
}

// Default empty availability structure
export const createEmptyAvailability = (): WeeklyAvailability => {
  return {
    monday: { isAvailable: false },
    tuesday: { isAvailable: false },
    wednesday: { isAvailable: false },
    thursday: { isAvailable: false },
    friday: { isAvailable: false },
    saturday: { isAvailable: false },
    sunday: { isAvailable: false },
  };
};

// Format appointment date for display
export function formatAppointmentDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
}

// Group appointments by status
export function groupAppointmentsByStatus(appointments: Appointment[]) {
  return {
    pending: appointments.filter(a => a.status === 'PENDING').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    cancelled: appointments.filter(a => a.status === 'CANCELLED').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
  };
}

// Get status color mapping for appointments
export const getStatusColorMap = () => ({
  'PENDING': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  'CONFIRMED': 'bg-green-100 text-green-800 hover:bg-green-100',
  'CANCELLED': 'bg-red-100 text-red-800 hover:bg-red-100',
  'COMPLETED': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
}); 