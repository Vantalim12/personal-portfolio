import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { siteDescription, siteUrl } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jasper Gumora | Full-Stack Developer",
  description: siteDescription,
  authors: [{ name: "Jasper Gumora", url: siteUrl }],
  creator: "Jasper Gumora",
  icons: {
    icon: { url: "/favicon3.png", type: "image/png", sizes: "1076x1462" },
    apple: "/favicon3.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Providers>
          <Header />
          <div className="mx-auto flex max-w-3xl flex-col px-8">
            <main className="grow">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
