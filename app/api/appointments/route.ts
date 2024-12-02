import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { doctorId, dateTime, reason } = body

    const appointment = await prisma.appointment.create({
      data: {
        patientId: session.user.patientProfile.id,
        doctorId,
        dateTime: new Date(dateTime),
        reason,
        status: "PENDING"
      },
      include: {
        doctor: {
          include: {
            user: true
          }
        },
        patient: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Appointment creation error:", error)
    return NextResponse.json(
      { error: "Error creating appointment" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const role = session.user.role

    let appointments
    if (role === "DOCTOR") {
      appointments = await prisma.appointment.findMany({
        where: {
          doctorId: session.user.doctorProfile.id
        },
        include: {
          patient: {
            include: {
              user: true
            }
          }
        },
        orderBy: {
          dateTime: "asc"
        }
      })
    } else {
      appointments = await prisma.appointment.findMany({
        where: {
          patientId: session.user.patientProfile.id
        },
        include: {
          doctor: {
            include: {
              user: true
            }
          }
        },
        orderBy: {
          dateTime: "asc"
        }
      })
    }

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Appointment fetch error:", error)
    return NextResponse.json(
      { error: "Error fetching appointments" },
      { status: 500 }
    )
  }
}
