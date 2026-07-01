import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/utils/connect";// مهم هنا local فقط
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "FOUND" : "NOT FOUND");
import { authOptions } from "@/utils/auth";

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };