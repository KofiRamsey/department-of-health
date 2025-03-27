import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth-utils";

// Get a single service
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const service = await db.service.findUnique({
      where: { id },
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

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

// Update a service (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure user is admin
    await requireRole(["ADMIN"]);
    
    const { id } = params;
    const body = await req.json();
    const { name, description, duration, price, doctorIds } = body;

    // Find service to update
    const existingService = await db.service.findUnique({
      where: { id },
      include: { doctors: true },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Update service
    const updatedService = await db.service.update({
      where: { id },
      data: {
        name,
        description,
        duration,
        price,
        doctors: doctorIds ? {
          set: doctorIds.map((id: string) => ({ id })),
        } : undefined,
      },
      include: {
        doctors: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedService);
  } catch (error: any) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update service" },
      { status: error.message.includes("unauthorized") ? 403 : 500 }
    );
  }
}

// Delete a service (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure user is admin
    await requireRole(["ADMIN"]);
    
    const { id } = params;

    // Check if service exists
    const service = await db.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Delete service
    await db.service.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Service deleted successfully" }
    );
  } catch (error: any) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete service" },
      { status: error.message.includes("unauthorized") ? 403 : 500 }
    );
  }
} 