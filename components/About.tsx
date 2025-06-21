'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Shield, Terminal, GraduationCap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cybersecurity Analysis",
      description: "Conducting social engineering simulations and Wi-Fi penetration testing to assess organizational security awareness."
    },
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
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
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
            I'm a passionate cybersecurity analyst and full-stack developer currently pursuing B.Tech in Computer Science 
            with Business Systems at VIT-AP University. I specialize in security assessments, penetration testing, 
            and building scalable web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow"
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