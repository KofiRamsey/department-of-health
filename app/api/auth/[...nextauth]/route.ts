import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // For demo test accounts
        if (credentials.email === "admin@health.example.com" && credentials.password === "Admin123!") {
          console.log("Authorized as ADMIN");
          return {
            id: "admin-id",
            email: "admin@health.example.com",
            name: "Admin User",
            role: "ADMIN",
          };
        }

        if (credentials.email === "doctor@health.example.com" && credentials.password === "Doctor123!") {
          console.log("Authorized as DOCTOR");
          return {
            id: "doctor-id",
            email: "doctor@health.example.com",
            name: "Doctor User",
            role: "DOCTOR",
          };
        }

        if (credentials.email === "patient@health.example.com" && credentials.password === "Patient123!") {
          console.log("Authorized as PATIENT");
          return {
            id: "patient-id",
            email: "patient@health.example.com",
            name: "Patient User",
            role: "PATIENT",
          };
        }

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            console.log("User not found");
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("Authorized from database");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // For security, if the URL is not part of the app, redirect to home
      if (!url.startsWith(baseUrl)) {
        return baseUrl;
      }

      return url;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 