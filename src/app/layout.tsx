import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasper's Portfolio",
  description:
    "Full-stack dev, empty-stack meetings. I self-host n8n automations.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Jasper's Portfolio",
    description:
      "Full-stack dev, empty-stack meetings. I self-host n8n automations.",
    type: "website",
    siteName: "Jasper's Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Jasper's Portfolio",
    description:
      "Full-stack dev, empty-stack meetings. I self-host n8n automations.",
    creator: "@Peirogi25",
  },
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
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
