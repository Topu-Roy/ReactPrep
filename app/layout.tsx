import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReactKitchen",
  description: "A premium platform for mastering React through organized topics and questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"bg-background"}>
      <body className={`${rubik.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
