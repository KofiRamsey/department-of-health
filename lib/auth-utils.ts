import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { db } from "./db";

// Get the current authenticated session
export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

// Get the current user with role
export async function getCurrentUser() {
  const session = await getCurrentSession();
  
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

// Check if the user is authenticated
export async function requireAuth() {
  const session = await getCurrentSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }
  
  return session;
}

// Check if the user has specific role
export async function requireRole(allowedRoles: Role[]) {
  try {
    const session = await requireAuth();
    
    // Make sure session.user has a role property
    if (!session.user || !session.user.role) {
      console.error("User session missing role property:", session);
      redirect("/unauthorized");
    }
    
    if (!allowedRoles.includes(session.user.role as Role)) {
      redirect("/unauthorized");
    }
    
    return session;
  } catch (error) {
    console.error("Error in requireRole:", error);
    redirect("/login");
  }
}

// Hash a password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Register a new user
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) {
  const { name, email, password, role = "PATIENT" } = userData;
  
  const existingUser = await db.user.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    throw new Error("Email already in use");
  }
  
  const hashedPassword = await hashPassword(password);
  
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role as Role,
    }
  });
  
  return user;
}
