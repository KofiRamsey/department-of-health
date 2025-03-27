import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role, patientData, doctorData } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the user with role
    const user = await registerUser({
      name,
      email,
      password,
      role: role as Role || "PATIENT",
    });

    // Create user profile based on role
    if (user.role === "PATIENT" && patientData) {
      await db.patient.create({
        data: {
          userId: user.id,
          dateOfBirth: patientData.dateOfBirth ? new Date(patientData.dateOfBirth) : undefined,
          gender: patientData.gender,
          address: patientData.address,
          phoneNumber: patientData.phoneNumber,
          medicalHistory: patientData.medicalHistory,
        },
      });
    } else if (user.role === "DOCTOR" && doctorData) {
      await db.doctor.create({
        data: {
          userId: user.id,
          specialization: doctorData.specialization,
          bio: doctorData.bio,
          education: doctorData.education,
          experience: doctorData.experience,
          licenseNumber: doctorData.licenseNumber,
        },
      });
    }

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
} 