import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { AdminUser } from '../types/admin'

// Data admin statis
const adminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@company.com',
    password: '$2a$12$0gzlKHG6mvotmgmgYNCrZe0iLhqpfuwXmUmRtVkX67h6RHZWnM.2G', // password: admin123
    name: 'Admin Company',
    role: 'admin'
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            return null
          }

          console.log('Attempting login for:', credentials.email)

          const admin = adminUsers.find(user => user.email === credentials.email)

          if (!admin) {
            console.log('Admin not found')
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          )

          if (!isPasswordValid) {
            console.log('Invalid password')
            return null
          }

          console.log('Login successful for:', admin.email)
          
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}