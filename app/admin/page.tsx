import { requireRole } from "@/lib/auth-utils";
import Link from "next/link";
import { db } from "@/lib/db";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  // Ensure the user is admin
  await requireRole(["ADMIN"]);

  // Get counts for dashboard stats
  let doctorsCount = 0;
  let patientsCount = 0;
  let appointmentsCount = 0;
  let servicesCount = 0;
  let upcomingAppointments: any[] = [];

  try {
    // Get counts
    doctorsCount = await db.doctor.count();
    patientsCount = await db.patient.count();
    appointmentsCount = await db.appointment.count();
    servicesCount = await db.service.count();

    // Get upcoming appointments (today and future)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    upcomingAppointments = await db.appointment.findMany({
      where: {
        date: {
          gte: today,
        },
      },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        patient: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        service: true,
      },
      orderBy: {
        date: "asc",
      },
      take: 10,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }

  return (
    <AdminDashboardClient
      doctorsCount={doctorsCount}
      patientsCount={patientsCount}
      appointmentsCount={appointmentsCount}
      servicesCount={servicesCount}
      upcomingAppointments={upcomingAppointments}
    />
  );
}

// Stat card component
function StatCard({ title, value, link }: { title: string; value: number; link: string }) {
  return (
    <Link href={link} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </Link>
  );
} 