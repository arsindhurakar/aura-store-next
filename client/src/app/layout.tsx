import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";

import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interMono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
});

const loraDisplay = Lora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "NOIR - Premium Mobile Devices & Accessories",
  description: "Explore premium smartphones, audio, wearables, and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interMono.variable} ${loraDisplay.variable}`}
    >
      <body>
        {" "}
        <ThemeProvider>
          <QueryProvider>
            <Toaster richColors position="top-right" />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
