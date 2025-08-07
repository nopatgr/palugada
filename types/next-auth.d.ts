// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string; // ✅ tambahkan role di sini
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string; // ✅ tambahkan role di sini
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: string; // ✅ tambahkan role di sini
  }
}
