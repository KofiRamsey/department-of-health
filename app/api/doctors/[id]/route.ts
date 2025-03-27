import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const doctor = await db.doctor.findUnique({
      where: { id },
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
        availability: true,
      },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctor" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { specialization, bio, education, experience, licenseNumber, availability } = body;

    // Update doctor profile
    const updatedDoctor = await db.doctor.update({
      where: { id },
      data: {
        specialization,
        bio,
        education,
        experience,
        licenseNumber,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Update availability if provided
    if (availability) {
      await db.availability.upsert({
        where: { doctorId: id },
        update: {
          monday: availability.monday,
          tuesday: availability.tuesday,
          wednesday: availability.wednesday,
          thursday: availability.thursday,
          friday: availability.friday,
          saturday: availability.saturday,
          sunday: availability.sunday,
        },
        create: {
          doctorId: id,
          monday: availability.monday,
          tuesday: availability.tuesday,
          wednesday: availability.wednesday,
          thursday: availability.thursday,
          friday: availability.friday,
          saturday: availability.saturday,
          sunday: availability.sunday,
        },
      });
    }

    return NextResponse.json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
} 