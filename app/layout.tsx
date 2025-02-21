import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fira_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira",
});

export const metadata: Metadata = {
  title: "LAWY - SDC",
  description: "Beam & Frame Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${firaSans.variable} font-sans`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
