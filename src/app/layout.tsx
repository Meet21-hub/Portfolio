import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";

import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Meet Khandelwal - Portfolio",
  description: "Backend Developer & Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cursor-none">
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
