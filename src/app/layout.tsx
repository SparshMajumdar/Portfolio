import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sparsh Majumdar — Interactive Hardcover Resume",
  description:
    "Interactive 3D hardcover resume of Sparsh Majumdar, DevOps & Cloud Engineer. Featuring cloud architecture, Azure security, Docker, and IoT telemetry pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#111112] text-stone-900 font-sans antialiased grain select-none overflow-hidden">
        {children}
      </body>
    </html>
  );
}
