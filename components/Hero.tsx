'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-primary-950 to-gray-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 140, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 140, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles - Client Side Only */}
      <div className="absolute inset-0 overflow-hidden">
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [null, Math.random() * 0.5 + 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full backdrop-blur-sm">
                <span className="text-primary-400 text-sm font-medium">👋 Welcome to my portfolio</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-primary-300 to-primary-500 bg-clip-text text-transparent">
                  Hi, I'm Sparsh
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400">
                Computer Science Developer
              </p>

              <p className="text-gray-500 text-lg max-w-xl">
                Crafting innovative solutions with modern technologies. Specializing in full-stack development, cloud architecture, and creating seamless user experiences.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/Sparsh_Resume.pdf"
                download
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-gray-900 font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105"
              >
                <span className="relative z-10">Download Resume</span>
                <Download className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-500 text-primary-400 font-bold rounded-full hover:bg-primary-500/10 transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-gray-500 text-sm">Connect:</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/SparshMajumdar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-primary-500/20 border border-gray-700 hover:border-primary-500 rounded-lg transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-primary-400" />
                </a>
                <a
                  href="https://linkedin.com/in/sparsh-majumdar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-primary-500/20 border border-gray-700 hover:border-primary-500 rounded-lg transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-primary-400" />
                </a>
                <a
                  href="mailto:sparshmajumdar04@gmail.com"
                  className="p-3 bg-gray-800 hover:bg-primary-500/20 border border-gray-700 hover:border-primary-500 rounded-lg transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-primary-400" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 3D Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Central Glowing Orb */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-500/30 to-transparent rounded-full blur-3xl"
            />

            {/* Floating Cards */}
            {[
              { delay: 0, x: -50, y: -100, rotate: -15, icon: '⚡' },
              { delay: 0.2, x: 100, y: -50, rotate: 10, icon: '🚀' },
              { delay: 0.4, x: -80, y: 80, rotate: -10, icon: '💻' },
              { delay: 0.6, x: 120, y: 120, rotate: 15, icon: '🎨' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  x: card.x,
                  rotate: card.rotate,
                  y: [card.y, card.y - 20, card.y]
                }}
                transition={{
                  opacity: { duration: 0.6, delay: card.delay },
                  x: { duration: 0.8, delay: card.delay },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay
                  },
                  rotate: { duration: 0.8, delay: card.delay }
                }}
                className="absolute top-1/2 left-1/2 w-24 h-24 bg-gray-800/60 backdrop-blur-md border border-primary-500/30 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-primary-500/10 hover:shadow-primary-500/30 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                {card.icon}
              </motion.div>
            ))}

            {/* Orbital Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary-500/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-primary-500/10 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
