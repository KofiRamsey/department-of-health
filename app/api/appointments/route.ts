import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, requireAuth } from "@/lib/auth-utils";

// Get all appointments (with role-based filtering)
export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    
    let appointments = [];
    
    // Filter appointments based on user role
    if (user.role === "ADMIN") {
      // Admins can see all appointments
      appointments = await db.appointment.findMany({
        where: status ? { status: status as any } : {},
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
        orderBy: {
          date: "asc",
        },
      });
    } else if (user.role === "DOCTOR") {
      // Doctors can only see their appointments
      const doctor = await db.doctor.findUnique({
        where: { userId: user.id },
      });
      
      if (!doctor) {
        return NextResponse.json(
          { error: "Doctor profile not found" },
          { status: 404 }
        );
      }
      
      appointments = await db.appointment.findMany({
        where: {
          doctorId: doctor.id,
          ...(status ? { status: status as any } : {}),
        },
        include: {
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
        orderBy: {
          date: "asc",
        },
      });
    } else if (user.role === "PATIENT") {
      // Patients can only see their appointments
      const patient = await db.patient.findUnique({
        where: { userId: user.id },
      });
      
      if (!patient) {
        return NextResponse.json(
          { error: "Patient profile not found" },
          { status: 404 }
        );
      }
      
      appointments = await db.appointment.findMany({
        where: {
          patientId: patient.id,
          ...(status ? { status: status as any } : {}),
        },
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
          service: true,
        },
        orderBy: {
          date: "asc",
        },
      });
    }
    
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// Create a new appointment
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { doctorId, date, time, serviceId, notes } = body;

    if (!doctorId || !date || !time) {
      return NextResponse.json(
        { error: "Doctor, date, and time are required" },
        { status: 400 }
      );
    }

    // Validate the patient
    const patient = await db.patient.findUnique({
      where: { userId: user.id },
    });

    if (!patient && user.role === "PATIENT") {
      return NextResponse.json(
        { error: "Patient profile not found" },
        { status: 404 }
      );
    }

    // Validate the doctor
    const doctor = await db.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    // Create the appointment
    const appointment = await db.appointment.create({
      data: {
        doctorId,
        patientId: patient?.id || body.patientId, // Allow admins to specify patient
        date: new Date(date),
        time,
        serviceId,
        notes,
        status: "PENDING",
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
} 