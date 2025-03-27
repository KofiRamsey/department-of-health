import { requireRole } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DoctorsManagementClient } from "@/components/admin/DoctorsManagementClient";

export default async function DoctorsPage() {
  // Ensure user is admin
  await requireRole(["ADMIN"]);
  
  // Get all doctors
  let doctors = [];
  try {
    doctors = await db.doctor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        services: true,
      },
      orderBy: {
        user: {
          name: "asc",
        },
      },
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }

  // Get all services for filtering
  let services = [];
  try {
    services = await db.service.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return <DoctorsManagementClient doctors={doctors} services={services} />;
} 