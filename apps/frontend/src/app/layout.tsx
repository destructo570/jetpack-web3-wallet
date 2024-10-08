import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jetpack wallet",
  description: "Web 3 wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Toaster position="top-right" richColors={true} />
          <main className="max-w-4xl mx-auto min-h-screen px-6 py-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
