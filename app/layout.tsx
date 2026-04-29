import { type Metadata } from 'next'
import { Geist_Mono, Geist } from 'next/font/google'
import './globals.css'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'My Delivery Fleet',
  description: '',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("scroll-pt-[5vh] sm:scroll-pt-8 h-full", "antialiased", geistMono.variable, inter.variable, "font-sans", geist.variable)}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
