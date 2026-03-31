import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import BottomPlayerBar from "@/components/BottomPlayerBar";

export const metadata: Metadata = {
  title: "Sparsh Majumdar | Portfolio",
  description:
    "Cloud and systems-focused developer portfolio. Experienced in building cloud-based applications using Azure, AWS, Node.js, and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-container-lowest text-on-surface font-body overflow-hidden h-screen flex">
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Sidebar />
        <main className="ml-64 flex-1 h-screen overflow-y-auto custom-scrollbar relative bg-surface pb-32">
          <TopNav />
          {children}
        </main>
        <BottomPlayerBar />
      </body>
    </html>
  );
}
