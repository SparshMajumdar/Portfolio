'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-primary-50/90 dark:bg-gray-950/80 backdrop-blur-md py-3 shadow-sm'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div /> {/* ✅ Empty div replaces logo or text */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white transition-colors relative z-10"
                >
                  {link.name}
                </a>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            <motion.a
              href="https://github.com/SparshMajumdar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sparsh-majumdar-03820b288/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:sparshmajumdar04@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <Mail size={20} />
            </motion.a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 dark:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-primary-50 dark:bg-gray-900 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center space-x-6">
              <a
                href="https://github.com/SparshMajumdar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/sparsh-majumdar-03820b288/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:sparshmajumdar04@gmail.com"
                className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
