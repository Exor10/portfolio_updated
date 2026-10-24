import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "devicon/devicon.min.css";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nathan Ian Comiso — Developer Portfolio",
  description:
    "Portfolio of Nathan Ian Comiso — full-stack Java, machine learning, and web development projects.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
