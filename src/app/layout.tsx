import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"; // Assuming your global styles are here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youth Policy Forum Studio", // Or a more general title
  description: "Admin interface for the Youth Policy Forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 