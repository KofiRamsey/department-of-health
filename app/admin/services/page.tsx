import { requireRole } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { ServicesManagementClient } from "@/components/admin/ServicesManagementClient";

export default async function ServicesPage() {
  // Ensure user is admin
  await requireRole(["ADMIN"]);
  
  // Get all services
  let services = [];
  try {
    services = await db.service.findMany({
      include: {
        doctors: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            appointments: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return <ServicesManagementClient services={services} />;
} 