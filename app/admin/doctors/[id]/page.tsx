import { requireRole } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DoctorDetailClient } from "@/components/admin/DoctorDetailClient";

interface DoctorDetailPageProps {
  params: {
    id: string;
  };
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  // Ensure user is admin
  await requireRole(["ADMIN"]);
  
  try {
    // Get doctor
    const doctor = await db.doctor.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        services: true,
        appointments: {
          include: {
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
            date: "desc",
          },
          take: 10,
        },
      },
    });
    
    if (!doctor) {
      return notFound();
    }
    
    // Get all services for selection
    const allServices = await db.service.findMany({
      orderBy: {
        name: "asc",
      },
    });
    
    return <DoctorDetailClient doctor={doctor} allServices={allServices} />;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 p-8 rounded-lg shadow text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">There was an error loading this doctor.</p>
          <Link href="/admin/doctors">
            <Button variant="outline">Back to Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }
} 