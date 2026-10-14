"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { audioManager } from "@/lib/audioManager";

interface BookContextType {
  isBookOpen: boolean;
  currentPage: number;
  totalPages: number;
  currentSpread: number;
  totalSpreads: number;
  isMuted: boolean;
  openBook: () => void;
  closeBook: () => void;
  toggleOpen: () => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageIndex: number) => void;
  goToSpread: (spreadIndex: number) => void;
  toggleMute: () => void;
}

const TOTAL_SPREADS = 8;
const TOTAL_PAGES = TOTAL_SPREADS * 2; // 16 pages (0 to 15)

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const currentSpread = Math.floor(currentPage / 2);

  useEffect(() => {
    setIsMuted(audioManager.getIsMuted());
  }, []);

  const openBook = useCallback(() => {
    setIsBookOpen(true);
    audioManager.playBookOpen();
  }, []);

  const closeBook = useCallback(() => {
    setIsBookOpen(false);
    audioManager.playBookClose();
  }, []);

  const toggleOpen = useCallback(() => {
    if (isBookOpen) {
      closeBook();
    } else {
      openBook();
    }
  }, [isBookOpen, closeBook, openBook]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const nextSpread = Math.floor(prev / 2) + 1;
      if (nextSpread < TOTAL_SPREADS) {
        audioManager.playPageFlip();
        return nextSpread * 2;
      }
      return prev;
    });
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => {
      const prevSpread = Math.floor(prev / 2) - 1;
      if (prevSpread >= 0) {
        audioManager.playPageFlip();
        return prevSpread * 2;
      }
      return prev;
    });
  }, []);

  const goToSpread = useCallback(
    (spreadIndex: number) => {
      if (spreadIndex >= 0 && spreadIndex < TOTAL_SPREADS) {
        const targetPage = spreadIndex * 2;
        if (targetPage !== currentPage) {
          audioManager.playPageFlip();
          setCurrentPage(targetPage);
        }
        if (!isBookOpen) {
          setIsBookOpen(true);
        }
      }
    },
    [currentPage, isBookOpen]
  );

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < TOTAL_PAGES) {
        const spreadOfPage = Math.floor(pageIndex / 2);
        goToSpread(spreadOfPage);
      }
    },
    [goToSpread]
  );

  const toggleMute = useCallback(() => {
    const newMuted = audioManager.toggleMute();
    setIsMuted(newMuted);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "Escape" && isBookOpen) {
        closeBook();
      } else if ((e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") && isBookOpen) {
        nextPage();
      } else if ((e.key === "ArrowLeft" || e.key === "PageUp") && isBookOpen) {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBookOpen, nextPage, prevPage, closeBook]);

  return (
    <BookContext.Provider
      value={{
        isBookOpen,
        currentPage,
        totalPages: TOTAL_PAGES,
        currentSpread,
        totalSpreads: TOTAL_SPREADS,
        isMuted,
        openBook,
        closeBook,
        toggleOpen,
        nextPage,
        prevPage,
        goToPage,
        goToSpread,
        toggleMute,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
}
