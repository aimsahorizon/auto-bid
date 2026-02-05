// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/hooks/useTheme';
// import NavbarController from "@/components/layout/NavbarController";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoBID - Premium and Secured Car Auctions",
  description: "Zamboanga City's online mobile car auction platform. Buy and sell premium vehicles with confidence.",
  keywords: ["car auction", "vehicle sales", "premium cars", "online bidding", "secure auctions"],
  authors: [{ name: "AIMSA Horizon Developers" }],
  // viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}