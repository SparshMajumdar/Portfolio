'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, GraduationCap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Full Stack Development",
      description: "Building IoT solutions and web applications using Next.js, MongoDB, Node.js, and modern frameworks."
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Technical Leadership",
      description: "Leading development teams and delivering hands-on cybersecurity demonstrations and training."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "B.Tech in Computer Science with Business Systems from VIT-AP University (2022-2026)."
    }
  ];

  return (
    <section id="about" className="py-20 bg-transparent dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Results-driven computer science developer with experience in software and cloud development.
            Experienced in designing and deploying scalable web applications using Next.js, Node.js, React, and AWS,
            with a focus on delivering efficient, secure, and user-friendly solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/60 dark:bg-gray-800 p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm border border-primary-100 dark:border-gray-700"
            >
              <div className="text-primary-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;