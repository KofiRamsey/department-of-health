import { requireRole } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AppointmentsPage() {
  // Ensure user is admin
  await requireRole(["ADMIN"]);
  
  // Get all appointments
  const appointments = await db.appointment.findMany({
    include: {
      doctor: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      patient: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      service: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  // Group appointments by date
  const groupedAppointments: Record<string, any[]> = {};
  appointments.forEach((appointment) => {
    const dateKey = appointment.date.toISOString().split('T')[0];
    if (!groupedAppointments[dateKey]) {
      groupedAppointments[dateKey] = [];
    }
    groupedAppointments[dateKey].push(appointment);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>
        <Link href="/admin/appointments/add">
          <Button>Schedule New Appointment</Button>
        </Link>
      </div>
      
      {appointments.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">No appointments found.</p>
          <Link href="/admin/appointments/add">
            <Button>Schedule Your First Appointment</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((dateKey) => (
            <div key={dateKey} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">
                  {new Date(dateKey).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Time</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Patient</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Doctor</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Service</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {groupedAppointments[dateKey].map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="py-3 px-4 text-sm">{appointment.time}</td>
                        <td className="py-3 px-4 text-sm">{appointment.patient.user.name}</td>
                        <td className="py-3 px-4 text-sm">{appointment.doctor.user.name}</td>
                        <td className="py-3 px-4 text-sm">{appointment.service?.name || 'N/A'}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm flex space-x-2">
                          <Link href={`/admin/appointments/${appointment.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                          <Link href={`/admin/appointments/${appointment.id}/edit`}>
                            <Button size="sm">Edit</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 