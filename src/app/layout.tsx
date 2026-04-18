import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const deltha = localFont({
  src: "../../public/fonts/Deltha.ttf",
  variable: "--font-deltha",
});

const equinox = localFont({
  src: [
    {
      path: "../../public/fonts/Equinox Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Equinox Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-equinox",
});

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
      className={`${inter.variable} ${outfit.variable} ${deltha.variable} ${equinox.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#080808] text-white selection:bg-primary/30 antialiased overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
