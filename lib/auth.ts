import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }
        return { id: user.id, email: user.email, role: 'admin' }; // ✅ Tambahkan role
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin' },

  // ✅ Tambahkan callbacks di sini
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role || 'admin'; // ✅ Simpan role di token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          email: token.email as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};

export default authOptions;