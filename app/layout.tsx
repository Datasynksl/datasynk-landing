import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
// import { Inter } from "next/font/google";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataSynk",
  description: "Share and access open datasets",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="bg-black-100">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-black-100 font-sans antialiased",
          // fontSans.variable,
          // inter.className,
        )}
      >
        <ClerkProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen bg-black-100">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
