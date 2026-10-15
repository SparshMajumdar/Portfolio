import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sparsh Majumdar — Interactive Hardcover Resume",
  description:
    "Interactive 3D hardcover resume of Sparsh Majumdar, DevOps & Cloud Engineer. Featuring cloud architecture, Azure security, Docker, and IoT telemetry pipelines.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111112",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#111112] text-stone-900 font-sans antialiased grain select-none overflow-hidden touch-none">
        {children}
      </body>
    </html>
  );
}
