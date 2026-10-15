"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBook } from "@/context/BookContext";

export default function ResumeBookOverlay() {
  const { isBookOpen, currentSpread, totalSpreads, closeBook, nextPage, prevPage, goToSpread } =
    useBook();
  const [showRotateTip, setShowRotateTip] = useState(true);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentSpread]);

  // Fade out rotate tip on mobile after 7 seconds
  useEffect(() => {
    if (isBookOpen) {
      const timer = setTimeout(() => setShowRotateTip(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [isBookOpen]);

  if (!isBookOpen) return null;

  const spreadTabs = [
    { label: "Author", short: "Author", index: 0 },
    { label: "Contents", short: "TOC", index: 1 },
    { label: "01 Intro", short: "01", index: 2 },
    { label: "02 Education", short: "02", index: 3 },
    { label: "03 Projects", short: "03", index: 4 },
    { label: "04 Skills", short: "04", index: 5 },
    { label: "05 Contact", short: "05", index: 6 },
    { label: "06 Co-Author", short: "06", index: 7 },
  ];

  const spreadTitles = [
    "Author Page",
    "Table of Contents",
    "Chapter 01: Introduction",
    "Chapter 02: Education",
    "Chapter 03: Projects",
    "Chapter 04: Skills",
    "Chapter 05: Contact",
    "Chapter 06: Be a Co-Author",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-2.5 sm:p-4 md:p-6 select-none">
      {/* Top Floating Controls Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-auto">
        {/* Spread Navigation Tabs */}
        <div
          ref={tabsContainerRef}
          className="flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-white/20 shadow-2xl overflow-x-auto no-scrollbar scroll-smooth touch-pan-x max-w-[calc(100vw-120px)] sm:max-w-md md:max-w-xl"
        >
          {spreadTabs.map((tab) => {
            const isActive = currentSpread === tab.index;
            return (
              <button
                key={tab.index}
                ref={isActive ? activeTabRef : null}
                onClick={() => goToSpread(tab.index)}
                className={`px-2.5 py-1.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono transition-all whitespace-nowrap min-h-[32px] flex items-center justify-center ${
                  isActive
                    ? "bg-[#D64E14] text-white font-bold shadow-md scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10 active:scale-95"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PDF Resume Link */}
          <a
            href="/Sparsh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white text-xs font-mono border border-white/20 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-1"
          >
            <span>PDF</span>
            <span className="text-[10px]">↗</span>
          </a>

          {/* Close Book Button */}
          <button
            onClick={closeBook}
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-[#D64E14] hover:bg-[#EE5C1C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-xl transition-all hover:scale-105 active:scale-95"
            title="Close Book (Esc)"
          >
            <span>✕</span>
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Mobile Subtle Orientation Hint (Fades out) */}
      {showRotateTip && (
        <div className="sm:hidden pointer-events-auto self-center bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono text-white/80 shadow-lg flex items-center gap-2 animate-pulse">
          <span>⟲</span>
          <span>Tip: Rotate for 2-page landscape spread</span>
          <button
            onClick={() => setShowRotateTip(false)}
            className="text-white/50 hover:text-white ml-1 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bottom Floating Navigation HUD */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between pointer-events-auto bg-black/70 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-2xl text-white font-mono text-xs">
        <button
          onClick={prevPage}
          disabled={currentSpread === 0}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all min-h-[32px] ${
            currentSpread === 0
              ? "opacity-25 cursor-not-allowed text-white/30"
              : "hover:bg-white/15 text-white active:scale-95"
          }`}
        >
          <span>←</span>
          <span>Prev</span>
        </button>

        <div className="text-center text-[11px] sm:text-xs text-white/80 px-2">
          <span className="text-amber-400 font-bold">{currentSpread + 1}</span> / {totalSpreads}
          <span className="hidden sm:inline text-white/60 ml-2">
            ({spreadTitles[currentSpread]})
          </span>
        </div>

        <button
          onClick={nextPage}
          disabled={currentSpread === totalSpreads - 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all min-h-[32px] ${
            currentSpread === totalSpreads - 1
              ? "opacity-25 cursor-not-allowed text-white/30"
              : "hover:bg-white/15 text-white active:scale-95"
          }`}
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

