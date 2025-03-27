import { requireRole } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { PatientsManagementClient } from "@/components/admin/PatientsManagementClient";

export default async function PatientsPage() {
  // Ensure user is admin
  await requireRole(["ADMIN"]);
  
  // Get all patients
  let patients = [];
  try {
    patients = await db.patient.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        appointments: {
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
            service: true,
          },
          orderBy: {
            date: "desc",
          },
          take: 5,
        },
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
  }

  return <PatientsManagementClient patients={patients} />;
} 