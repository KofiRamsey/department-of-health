import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, requireRole } from "@/lib/auth-utils";

// Get all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      include: {
        doctors: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// Create a new service (admin only)
export async function POST(req: NextRequest) {
  try {
    // Ensure user is admin
    await requireRole(["ADMIN"]);
    
    const body = await req.json();
    const { name, description, duration, price, doctorIds } = body;

    if (!name || !duration) {
      return NextResponse.json(
        { error: "Name and duration are required" },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        name,
        description,
        duration,
        price,
        doctors: doctorIds ? {
          connect: doctorIds.map((id: string) => ({ id })),
        } : undefined,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create service" },
      { status: error.message.includes("unauthorized") ? 403 : 500 }
    );
  }
} 