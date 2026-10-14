"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BookProvider } from "@/context/BookContext";
import ResumeBookOverlay from "@/components/resume/ResumeBookOverlay";

// Dynamically load the heavy 3D Three.js canvas to optimize performance & disable SSR
const BookScene = dynamic(() => import("@/components/book/BookScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111112] text-white">
      <div className="w-12 h-12 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mb-4" />
      <div className="text-xs font-mono tracking-widest uppercase text-white/70">
        Loading 3D Experience...
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <BookProvider>
      <main className="relative w-full h-screen overflow-hidden bg-[#111112] select-none">
        {/* 3D Canvas Scene: Checkerboard Studio Backdrop & Floating Burnt Orange Book */}
        <BookScene />

        {/* Interactive Open Book Reader Modal / Spreads */}
        <ResumeBookOverlay />
      </main>
    </BookProvider>
  );
}
