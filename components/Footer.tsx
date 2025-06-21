'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 text-primary-950 dark:text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="mb-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronUp size={24} />
          </motion.button>

          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-bold mb-2"
            >
              Sparsh<span className="text-accent-400">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-700 dark:text-gray-300"
            >
              Cybersecurity Analyst & Full Stack Developer
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 text-sm mt-1"
            >
              B.Tech Computer Science with Business Systems | VIT-AP University
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex space-x-6 mb-8"
          >
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/sparsh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:sparshmajumdar04@gmail.com"
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-700 dark:text-gray-300 text-sm"
          >
            <p>&copy; {new Date().getFullYear()} Sparsh Majumdar. All rights reserved.</p>
            <p className="mt-1">
              Designed and built with <span className="text-red-500">♥</span> by Sparsh
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;