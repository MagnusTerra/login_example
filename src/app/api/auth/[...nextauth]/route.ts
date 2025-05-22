import NextAuth, { type DefaultSession, type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { JWT } from "next-auth/jwt"

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user']
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ 
          where: { email: credentials.email } 
        })
        if (!user || !user.password) return null
        const isValid = await compare(credentials.password, user.password)
        return isValid ? user : null
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }: { session: any, token: JWT }) {
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }