import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            doctorProfile: true,
            patientProfile: true
          }
        })

        if (!user) {
          throw new Error("No user found")
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          ...(user.doctorProfile && { doctorProfile: user.doctorProfile }),
          ...(user.patientProfile && { patientProfile: user.patientProfile })
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        if (user.doctorProfile) {
          token.doctorProfile = user.doctorProfile
        }
        if (user.patientProfile) {
          token.patientProfile = user.patientProfile
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
        if (token.doctorProfile) {
          session.user.doctorProfile = token.doctorProfile
        }
        if (token.patientProfile) {
          session.user.patientProfile = token.patientProfile
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  }
})

export { handler as GET, handler as POST }
