"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TopNav() {
  const pathname = usePathname();
  const showSearch = pathname === "/projects";
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showProfileMenu &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 flex justify-between items-center px-4 md:px-8 z-30 bg-surface/80 backdrop-blur-sm">
      {/* Left: Nav Buttons + Links */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:opacity-80 transition-all"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>
          <button
            onClick={() => window.history.forward()}
            className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:opacity-80 transition-all"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>

        {showSearch && (
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm">
              search
            </span>
            <input
              className="bg-surface-container-high border-none rounded-full py-1.5 pl-10 pr-4 text-xs w-64 focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="Search Projects..."
              type="text"
            />
          </div>
        )}

        {!showSearch && (
          <nav className="flex gap-6 ml-4">
            <Link
              href="/"
              className="text-[#53E076] font-medium hover:opacity-80"
            >
              Discover
            </Link>
            <Link
              href="/projects"
              className="text-[#E5E2E1]/90 font-medium hover:opacity-80"
            >
              Archive
            </Link>
          </nav>
        )}
      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-6">
        {showSearch && (
          <nav className="flex gap-6">
            <Link
              href="/"
              className="font-medium text-[#E5E2E1]/90 hover:opacity-80"
            >
              Discover
            </Link>
            <Link
              href="/projects"
              className="font-medium text-[#E5E2E1]/90 hover:opacity-80"
            >
              Archive
            </Link>
          </nav>
        )}
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            notifications
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
            settings
          </button>
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20 bg-primary-container flex items-center justify-center text-on-primary font-bold text-sm"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
              aria-label="Profile actions"
            >
              SM
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-surface-container-low shadow-lg border border-outline-variant/20 z-40">
                <a
                  href="/Sparsh_Resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-highest"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Download Resume
                </a>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm text-on-surface hover:bg-surface-container-highest"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Contact Me
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
