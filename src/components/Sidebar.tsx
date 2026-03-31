"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "folder_special", label: "Projects" },
  { href: "/contact", icon: "mail", label: "Contact" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 text-[#E5E2E1] text-xl font-bold bg-[#1C1B1B] p-2 rounded shadow-lg"
        >
          SM
        </button>
      )}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-[#1C1B1B] flex flex-col py-8 gap-6 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
        {/* Branding */}
        <div className="px-6 mb-4">
          <h1 className="text-xl font-bold text-[#E5E2E1] tracking-tighter">
            Sparsh Majumdar
          </h1>
          <p className="text-[0.6875rem] uppercase tracking-widest text-primary/80 mt-1">
            Cloud &amp; Systems Developer
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 py-2 transition-all duration-300 ${isActive
                  ? "text-[#53E076] font-bold border-l-4 border-[#53E076] pl-4 bg-[#2A2A2A]"
                  : "text-[#E5E2E1]/60 hover:text-[#E5E2E1] pl-5 hover:bg-[#2A2A2A]"
                  }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Download CV CTA */}
        <div className="mt-auto px-6">
          <a
            href="/Sparsh_Majumdar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-3 px-4 rounded-full text-sm text-center hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Download CV
          </a>
        </div>
      </aside>
    </>
  );
}
