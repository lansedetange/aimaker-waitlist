import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AImaker Waitlist - The Future of AI-Powered Creation",
  description: "Join thousands of creators, developers, and innovators who are shaping the future of AI. Be the first to experience our revolutionary AI creation platform.",
  keywords: ["AI", "artificial intelligence", "creation", "waitlist", "innovation", "technology"],
  authors: [{ name: "AImaker Team" }],
  openGraph: {
    title: "AImaker Waitlist - The Future of AI-Powered Creation",
    description: "Join thousands of creators, developers, and innovators who are shaping the future of AI. Be the first to experience our revolutionary AI creation platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AImaker Waitlist - The Future of AI-Powered Creation",
    description: "Join thousands of creators, developers, and innovators who are shaping the future of AI. Be the first to experience our revolutionary AI creation platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
