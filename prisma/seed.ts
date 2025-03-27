import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...");

  // Clear existing data
  await prisma.appointment.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log("Cleared existing data");

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: await hash("password123", 10),
      role: "ADMIN",
    },
  });
  
  console.log(`Created admin user: ${adminUser.email}`);

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "General Check-up",
        description: "A complete medical check-up to ensure your overall health is good.",
        duration: 30,
        price: 100,
      },
    }),
    prisma.service.create({
      data: {
        name: "Cardiology Consultation",
        description: "Heart health consultation and ECG test.",
        duration: 45,
        price: 150,
      },
    }),
    prisma.service.create({
      data: {
        name: "Dental Cleaning",
        description: "Professional teeth cleaning and oral check-up.",
        duration: 60,
        price: 120,
      },
    }),
    prisma.service.create({
      data: {
        name: "Pediatric Consultation",
        description: "Medical consultation for children.",
        duration: 30,
        price: 90,
      },
    }),
    prisma.service.create({
      data: {
        name: "Physical Therapy",
        description: "Therapeutic exercises for physical rehabilitation.",
        duration: 60,
        price: 130,
      },
    }),
  ]);
  
  console.log("Created services");

  // Create doctors
  const doctors = await Promise.all([
    // Doctor 1
    prisma.user.create({
      data: {
        name: "Dr. John Smith",
        email: "john.smith@example.com",
        password: await hash("password123", 10),
        role: "DOCTOR",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        doctor: {
          create: {
            specialization: "Cardiology",
            bio: "Dr. Smith is a leading cardiologist with over 15 years of experience.",
            education: "MD from Johns Hopkins University, Fellowship in Cardiology",
            experience: 15,
            licenseNumber: "MD12345",
            availability: {
              monday: { isAvailable: true, start: "09:00", end: "17:00" },
              tuesday: { isAvailable: true, start: "09:00", end: "17:00" },
              wednesday: { isAvailable: true, start: "09:00", end: "17:00" },
              thursday: { isAvailable: true, start: "09:00", end: "17:00" },
              friday: { isAvailable: true, start: "09:00", end: "13:00" },
              saturday: { isAvailable: false },
              sunday: { isAvailable: false },
            },
          },
        },
      },
      include: {
        doctor: true,
      },
    }),
    // Doctor 2
    prisma.user.create({
      data: {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@example.com",
        password: await hash("password123", 10),
        role: "DOCTOR",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        doctor: {
          create: {
            specialization: "Pediatrics",
            bio: "Dr. Johnson specializes in pediatric care and has been practicing for 8 years.",
            education: "MD from University of California, Residency in Pediatrics",
            experience: 8,
            licenseNumber: "MD54321",
            availability: {
              monday: { isAvailable: true, start: "10:00", end: "18:00" },
              tuesday: { isAvailable: true, start: "10:00", end: "18:00" },
              wednesday: { isAvailable: true, start: "10:00", end: "18:00" },
              thursday: { isAvailable: true, start: "10:00", end: "18:00" },
              friday: { isAvailable: true, start: "10:00", end: "15:00" },
              saturday: { isAvailable: false },
              sunday: { isAvailable: false },
            },
          },
        },
      },
      include: {
        doctor: true,
      },
    }),
    // Doctor 3
    prisma.user.create({
      data: {
        name: "Dr. David Lee",
        email: "david.lee@example.com",
        password: await hash("password123", 10),
        role: "DOCTOR",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        doctor: {
          create: {
            specialization: "Dentistry",
            bio: "Dr. Lee is a dentist with expertise in cosmetic dentistry and oral health.",
            education: "DDS from New York University",
            experience: 10,
            licenseNumber: "DDS9876",
            availability: {
              monday: { isAvailable: true, start: "09:00", end: "17:00" },
              tuesday: { isAvailable: true, start: "09:00", end: "17:00" },
              wednesday: { isAvailable: true, start: "09:00", end: "17:00" },
              thursday: { isAvailable: true, start: "09:00", end: "17:00" },
              friday: { isAvailable: true, start: "09:00", end: "13:00" },
              saturday: { isAvailable: true, start: "10:00", end: "14:00" },
              sunday: { isAvailable: false },
            },
          },
        },
      },
      include: {
        doctor: true,
      },
    }),
  ]);
  
  console.log("Created doctors");

  // Link services to doctors
  await prisma.doctor.update({
    where: { id: doctors[0].doctor!.id },
    data: {
      services: {
        connect: [{ id: services[0].id }, { id: services[1].id }],
      },
    },
  });

  await prisma.doctor.update({
    where: { id: doctors[1].doctor!.id },
    data: {
      services: {
        connect: [{ id: services[0].id }, { id: services[3].id }],
      },
    },
  });

  await prisma.doctor.update({
    where: { id: doctors[2].doctor!.id },
    data: {
      services: {
        connect: [{ id: services[2].id }],
      },
    },
  });
  
  console.log("Linked services to doctors");

  // Create patients
  const patients = await Promise.all([
    // Patient 1
    prisma.user.create({
      data: {
        name: "Alice Brown",
        email: "alice.brown@example.com",
        password: await hash("password123", 10),
        role: "PATIENT",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        patient: {
          create: {
            dateOfBirth: new Date("1985-03-15"),
            gender: "FEMALE",
            address: "123 Main St, Anytown, USA",
            phoneNumber: "555-123-4567",
            medicalHistory: "No major medical issues. Allergic to penicillin.",
          },
        },
      },
      include: {
        patient: true,
      },
    }),
    // Patient 2
    prisma.user.create({
      data: {
        name: "Bob Miller",
        email: "bob.miller@example.com",
        password: await hash("password123", 10),
        role: "PATIENT",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        patient: {
          create: {
            dateOfBirth: new Date("1978-07-22"),
            gender: "MALE",
            address: "456 Oak St, Anytown, USA",
            phoneNumber: "555-987-6543",
            medicalHistory: "Hypertension, controlled with medication.",
          },
        },
      },
      include: {
        patient: true,
      },
    }),
    // Patient 3
    prisma.user.create({
      data: {
        name: "Carol Wilson",
        email: "carol.wilson@example.com",
        password: await hash("password123", 10),
        role: "PATIENT",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        patient: {
          create: {
            dateOfBirth: new Date("1990-11-05"),
            gender: "FEMALE",
            address: "789 Pine St, Anytown, USA",
            phoneNumber: "555-456-7890",
            medicalHistory: "No significant medical history.",
          },
        },
      },
      include: {
        patient: true,
      },
    }),
  ]);
  
  console.log("Created patients");

  // Create appointments
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const appointments = await Promise.all([
    // Appointment 1 - Upcoming
    prisma.appointment.create({
      data: {
        date: tomorrow,
        time: "10:00 AM",
        status: "CONFIRMED",
        notes: "Regular check-up appointment",
        doctorId: doctors[0].doctor!.id,
        patientId: patients[0].patient!.id,
        serviceId: services[0].id,
      },
    }),
    // Appointment 2 - Upcoming
    prisma.appointment.create({
      data: {
        date: nextWeek,
        time: "2:30 PM",
        status: "PENDING",
        notes: "First time consultation",
        doctorId: doctors[1].doctor!.id,
        patientId: patients[1].patient!.id,
        serviceId: services[3].id,
      },
    }),
    // Appointment 3 - Past
    prisma.appointment.create({
      data: {
        date: lastWeek,
        time: "11:15 AM",
        status: "COMPLETED",
        notes: "Dental cleaning and check-up",
        doctorId: doctors[2].doctor!.id,
        patientId: patients[2].patient!.id,
        serviceId: services[2].id,
      },
    }),
    // Appointment 4 - Cancelled
    prisma.appointment.create({
      data: {
        date: today,
        time: "3:00 PM",
        status: "CANCELLED",
        notes: "Patient requested cancellation",
        doctorId: doctors[0].doctor!.id,
        patientId: patients[1].patient!.id,
        serviceId: services[1].id,
      },
    }),
    // Appointment 5 - Upcoming
    prisma.appointment.create({
      data: {
        date: nextWeek,
        time: "9:00 AM",
        status: "CONFIRMED",
        notes: "Follow-up appointment",
        doctorId: doctors[1].doctor!.id,
        patientId: patients[0].patient!.id,
        serviceId: services[0].id,
      },
    }),
  ]);
  
  console.log("Created appointments");
  console.log("Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 