import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu, Great_Vibes, Playwrite_RO } from "next/font/google";
import "./globals.css";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
  
// 1. Configure Geist Sans and Geist Mono
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes", // We will use this name in CSS later
});

// 2. Configure Playwrite Hrvatska Lijeva
const playwrite = Playwrite_RO({
  variable: "--font-playwrite",
  // This font is usually variable, so we might not need 'weight'. 
  // If you get an error, add: weight: "400",
});

export const metadata: Metadata = {
  title: "Light",
  description: "A Social Media Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll no-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} ${greatVibes.variable} ${playwrite.variable} antialiased`}>
          <Navbar />
            {children}
          <MobileNavbar />
      </body>
    </html>
  );
}
