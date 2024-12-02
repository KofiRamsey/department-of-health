import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      email, 
      password, 
      name, 
      role, 
      dateOfBirth, 
      gender, 
      address, 
      phoneNumber,
      specialization,
      licenseNumber,
      experience,
      department
    } = body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with profile based on role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        ...(role === "PATIENT" && {
          patientProfile: {
            create: {
              dateOfBirth: new Date(dateOfBirth),
              gender,
              address,
              phoneNumber
            }
          }
        }),
        ...(role === "DOCTOR" && {
          doctorProfile: {
            create: {
              specialization,
              licenseNumber,
              experience,
              department
            }
          }
        })
      },
      include: {
        patientProfile: true,
        doctorProfile: true
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    )
  }
}
