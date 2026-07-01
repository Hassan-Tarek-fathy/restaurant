import Notification from "@/components/Notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "BOSS Burger",
  description: "A burger restaurant website built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider >
        <div>
          <Notification />
          <Navbar />
          {children}
          <Footer />
        </div>
       </QueryProvider>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
        </AuthProvider>
      </body>
    </html>
  );
}
