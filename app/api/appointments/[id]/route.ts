import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Get the current authenticated session
async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return null;
  }
  
  return session;
}

// Get the current user with role
async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }
  
  const user = await db.user.findUnique({
    where: {
      email: session.user.email
    }
  });
  
  return user;
}

// Get a single appointment
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { id } = params;

    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
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
                image: true,
              },
            },
          },
        },
        service: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to view this appointment
    if (
      user.role !== "ADMIN" &&
      ((user.role === "DOCTOR" && appointment.doctor.userId !== user.id) ||
       (user.role === "PATIENT" && appointment.patient.userId !== user.id))
    ) {
      return NextResponse.json(
        { error: "Not authorized to view this appointment" },
        { status: 403 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

// Update an appointment status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const { status, notes, date, time } = body;

    // Find appointment
    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to update this appointment
    if (
      user.role !== "ADMIN" &&
      ((user.role === "DOCTOR" && appointment.doctor.userId !== user.id) &&
       (user.role === "PATIENT" && appointment.patient.userId !== user.id))
    ) {
      return NextResponse.json(
        { error: "Not authorized to update this appointment" },
        { status: 403 }
      );
    }

    // Update appointment
    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: {
        status: status !== undefined ? status as any : undefined,
        notes: notes !== undefined ? notes : undefined,
        date: date ? new Date(date) : undefined,
        time: time !== undefined ? time : undefined,
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
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// Delete an appointment
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { id } = params;

    // Find appointment
    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Check if user has permission to delete this appointment
    // Only admin or the patient who created the appointment can delete it
    if (
      user.role !== "ADMIN" &&
      (user.role !== "PATIENT" || appointment.patient.userId !== user.id)
    ) {
      return NextResponse.json(
        { error: "Not authorized to delete this appointment" },
        { status: 403 }
      );
    }

    // Delete appointment
    await db.appointment.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Appointment deleted successfully" }
    );
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
} 