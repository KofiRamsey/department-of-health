import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth-utils";

const prisma = new PrismaClient();

async function main() {
  console.log(`🌱 Seeding doctors and patients...`);

  // South African doctor names
  const doctors = [
    {
      name: "Dr. Thabo Mabaso",
      email: "thabo.mabaso@health.example.com",
      password: "Doctor123!",
      specialization: "Cardiology",
      bio: "Specialist in interventional cardiology with over 10 years of experience treating heart conditions.",
      education: "MBChB from University of Cape Town, FCSA Cardiology",
      experience: 10,
      licenseNumber: "SA-MED-12345",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dr. Nomvula Ndlovu",
      email: "nomvula.ndlovu@health.example.com",
      password: "Doctor123!",
      specialization: "Paediatrics",
      bio: "Caring paediatrician focused on child health and development from infancy through adolescence.",
      education: "MBChB from University of Witwatersrand, MMed Paediatrics",
      experience: 8,
      licenseNumber: "SA-MED-23456",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      name: "Dr. Sipho Khumalo",
      email: "sipho.khumalo@health.example.com",
      password: "Doctor123!",
      specialization: "Orthopedics",
      bio: "Orthopedic surgeon specializing in sports injuries and joint replacements.",
      education: "MBChB from University of KwaZulu-Natal, FC Orth(SA)",
      experience: 12,
      licenseNumber: "SA-MED-34567",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  // South African patient names
  const patients = [
    {
      name: "Lerato Molefe",
      email: "lerato.molefe@example.com",
      password: "Patient123!",
      dateOfBirth: new Date(1985, 5, 15),
      gender: "FEMALE",
      address: "25 Mandela Street, Johannesburg, 2001",
      phoneNumber: "072-123-4567",
      image: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      name: "Bongani Nkosi",
      email: "bongani.nkosi@example.com",
      password: "Patient123!",
      dateOfBirth: new Date(1990, 2, 10),
      gender: "MALE",
      address: "42 Nelson Road, Cape Town, 8001",
      phoneNumber: "083-234-5678",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      name: "Zinhle Dlamini",
      email: "zinhle.dlamini@example.com",
      password: "Patient123!",
      dateOfBirth: new Date(1978, 9, 25),
      gender: "FEMALE",
      address: "15 Pretoria Avenue, Durban, 4001",
      phoneNumber: "061-345-6789",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  // Create services
  const services = [
    {
      name: "General Consultation",
      description: "Basic medical consultation for general health issues.",
      duration: 30,
      price: 500
    },
    {
      name: "Cardiology Assessment",
      description: "Comprehensive heart health examination.",
      duration: 45,
      price: 800
    },
    {
      name: "Pediatric Check-up",
      description: "Regular check-up for children's health and development.",
      duration: 30,
      price: 450
    },
    {
      name: "Orthopedic Consultation",
      description: "Assessment of bone, joint, and muscle problems.",
      duration: 45,
      price: 750
    }
  ];

  // Create services first
  const createdServices = [];
  for (const service of services) {
    const createdService = await prisma.service.upsert({
      where: { id: `seed-${service.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `seed-${service.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...service
      }
    });
    createdServices.push(createdService);
    console.log(`✅ Created service: ${service.name}`);
  }

  // Create doctors
  for (const doctor of doctors) {
    const hashedPassword = await hashPassword(doctor.password);
    
    const userExists = await prisma.user.findUnique({
      where: { email: doctor.email }
    });
    
    if (!userExists) {
      // Create user
      const createdUser = await prisma.user.create({
        data: {
          name: doctor.name,
          email: doctor.email,
          password: hashedPassword,
          image: doctor.image,
          role: "DOCTOR"
        }
      });
      
      // Create doctor profile
      const createdDoctor = await prisma.doctor.create({
        data: {
          userId: createdUser.id,
          specialization: doctor.specialization,
          bio: doctor.bio,
          education: doctor.education,
          experience: doctor.experience,
          licenseNumber: doctor.licenseNumber,
          availability: {
            monday: { start: "08:00", end: "17:00", isAvailable: true },
            tuesday: { start: "08:00", end: "17:00", isAvailable: true },
            wednesday: { start: "08:00", end: "17:00", isAvailable: true },
            thursday: { start: "08:00", end: "17:00", isAvailable: true },
            friday: { start: "08:00", end: "17:00", isAvailable: true },
            saturday: { start: "09:00", end: "13:00", isAvailable: true },
            sunday: { isAvailable: false }
          }
        }
      });
      
      // Connect services to doctors based on specialization
      if (doctor.specialization === "Cardiology") {
        await prisma.doctor.update({
          where: { id: createdDoctor.id },
          data: {
            services: {
              connect: [
                { id: createdServices[0].id }, // General Consultation
                { id: createdServices[1].id }  // Cardiology Assessment
              ]
            }
          }
        });
      } else if (doctor.specialization === "Paediatrics") {
        await prisma.doctor.update({
          where: { id: createdDoctor.id },
          data: {
            services: {
              connect: [
                { id: createdServices[0].id }, // General Consultation
                { id: createdServices[2].id }  // Pediatric Check-up
              ]
            }
          }
        });
      } else if (doctor.specialization === "Orthopedics") {
        await prisma.doctor.update({
          where: { id: createdDoctor.id },
          data: {
            services: {
              connect: [
                { id: createdServices[0].id }, // General Consultation
                { id: createdServices[3].id }  // Orthopedic Consultation
              ]
            }
          }
        });
      }
      
      console.log(`✅ Created doctor: ${doctor.name}`);
    } else {
      console.log(`⚠️ Doctor ${doctor.name} already exists, skipping...`);
    }
  }

  // Create patients
  for (const patient of patients) {
    const hashedPassword = await hashPassword(patient.password);
    
    const userExists = await prisma.user.findUnique({
      where: { email: patient.email }
    });
    
    if (!userExists) {
      // Create user
      const createdUser = await prisma.user.create({
        data: {
          name: patient.name,
          email: patient.email,
          password: hashedPassword,
          image: patient.image,
          role: "PATIENT"
        }
      });
      
      // Create patient profile
      await prisma.patient.create({
        data: {
          userId: createdUser.id,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
          address: patient.address,
          phoneNumber: patient.phoneNumber
        }
      });
      
      console.log(`✅ Created patient: ${patient.name}`);
    } else {
      console.log(`⚠️ Patient ${patient.name} already exists, skipping...`);
    }
  }

  console.log(`✅ Seeding completed successfully!`);
}

main()
  .catch((e) => {
    console.error(`❌ Error during seeding:`, e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 