'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Shield } from 'lucide-react';
import FloatingCube from './FloatingCube';

const Hero: React.FC = () => {
  const [currentFact, setCurrentFact] = useState(0);

  const cybersecurityFacts = [
    "95% of successful cyber attacks are due to human error",
    "A new malware is created every 4.2 seconds globally",
    "The average cost of a data breach is $4.45 million",
    "Ransomware attacks occur every 11 seconds worldwide",
    "Only 38% of organizations are prepared for sophisticated attacks",
    "Phishing accounts for 90% of all data breaches",
    "It takes an average of 287 days to identify a data breach",
    "Cybercrime damages will cost $10.5 trillion by 2025",
    "43% of cyber attacks target small businesses",
    "Password attacks account for 81% of data breaches"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % cybersecurityFacts.length);
    }, 4000); // Change fact every 4 seconds

    return () => clearInterval(interval);
  }, [cybersecurityFacts.length]);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-950 dark:text-white mb-6"
            >
              Hi, I'm <span className="text-accent-400">Sparsh</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
            >
              Cybersecurity Analyst & Full Stack Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center lg:justify-start space-x-6 mb-12"
            >
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/sparsh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:sparshmajumdar04@gmail.com"
                className="text-gray-700 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </div>

          {/* Center Column - 3D Floating Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md h-[400px]">
              <FloatingCube />
            </div>
          </motion.div>

          {/* Right Column - Phone Mockup with Cybersecurity Facts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[14px] border-gray-800 shadow-xl">
              <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-6 overflow-hidden flex flex-col items-center justify-center">
                {/* Shield Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Cybersecurity Facts */}
                <div className="text-center px-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-green-400 font-bold text-lg mb-4"
                  >
                    Cybersecurity Fact
                  </motion.h3>
                  
                  <motion.div
                    key={currentFact}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[120px] flex items-center"
                  >
                    <p className="text-green-300 text-sm leading-relaxed font-medium">
                      {cybersecurityFacts[currentFact]}
                    </p>
                  </motion.div>

                  {/* Fact indicator dots */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {cybersecurityFacts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentFact 
                            ? 'bg-green-400 scale-125' 
                            : 'bg-green-600 opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={scrollToNextSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronDown size={24} className="text-primary-500" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;