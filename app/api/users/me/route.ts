import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, requireAuth, hashPassword } from "@/lib/auth-utils";

// Get current user profile with role-specific data
export async function GET() {
  try {
    await requireAuth();
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let profileData = null;

    // Get role-specific profile data
    if (user.role === "DOCTOR") {
      profileData = await db.doctor.findUnique({
        where: { userId: user.id },
        include: {
          services: true,
          availability: true,
        },
      });
    } else if (user.role === "PATIENT") {
      profileData = await db.patient.findUnique({
        where: { userId: user.id },
      });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      profile: profileData,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

// Update current user profile
export async function PATCH(req: NextRequest) {
  try {
    await requireAuth();
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { name, email, password, image, profileData } = body;

    // Update user base data
    const userData: any = {};
    
    if (name) userData.name = name;
    if (email && email !== user.email) userData.email = email;
    if (password) userData.password = await hashPassword(password);
    if (image) userData.image = image;

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: userData,
    });

    // Update role-specific profile
    let profileResult = null;
    if (profileData) {
      if (user.role === "DOCTOR") {
        profileResult = await db.doctor.update({
          where: { userId: user.id },
          data: {
            specialization: profileData.specialization,
            bio: profileData.bio,
            education: profileData.education,
            experience: profileData.experience,
            licenseNumber: profileData.licenseNumber,
          },
        });
        
        // Update availability if provided
        if (profileData.availability) {
          await db.availability.upsert({
            where: { doctorId: profileResult.id },
            update: {
              monday: profileData.availability.monday,
              tuesday: profileData.availability.tuesday,
              wednesday: profileData.availability.wednesday,
              thursday: profileData.availability.thursday,
              friday: profileData.availability.friday,
              saturday: profileData.availability.saturday,
              sunday: profileData.availability.sunday,
            },
            create: {
              doctorId: profileResult.id,
              monday: profileData.availability.monday,
              tuesday: profileData.availability.tuesday,
              wednesday: profileData.availability.wednesday,
              thursday: profileData.availability.thursday,
              friday: profileData.availability.friday,
              saturday: profileData.availability.saturday,
              sunday: profileData.availability.sunday,
            },
          });
        }
      } else if (user.role === "PATIENT") {
        profileResult = await db.patient.update({
          where: { userId: user.id },
          data: {
            dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
            gender: profileData.gender,
            address: profileData.address,
            phoneNumber: profileData.phoneNumber,
            medicalHistory: profileData.medicalHistory,
          },
        });
      }
    }

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      image: updatedUser.image,
      profile: profileResult,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
} 