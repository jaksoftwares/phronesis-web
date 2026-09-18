import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Phronesis Homeschool",
    default: "Phronesis Homeschool | Genesis of Knowledge",
  },
  description: "A comprehensive, secure, and professional home-schooling platform for Grades 7–12. Access curated CBC revision materials, verified expert teachers, and live virtual classes.",
  openGraph: {
    title: "Phronesis Homeschool | Genesis of Knowledge",
    description: "A comprehensive, secure, and professional home-schooling platform for Grades 7–12.",
    url: "https://phronesis.example.com",
    siteName: "Phronesis Homeschool",
    images: [
      {
        url: "/brand/06-social-banner/phronesis-banner-full-color.jpg",
        width: 1200,
        height: 630,
        alt: "Phronesis Homeschool Banner",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phronesis Homeschool | Genesis of Knowledge",
    description: "A comprehensive, secure, and professional home-schooling platform for Grades 7–12.",
    images: ["/brand/06-social-banner/phronesis-banner-full-color.jpg"],
  },
  icons: {
    icon: "/brand/05-social-profile/phronesis-profile-full-color.png",
    shortcut: "/brand/05-social-profile/phronesis-profile-full-color.png",
    apple: "/brand/05-social-profile/phronesis-profile-full-color.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${sourceSerif4.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
