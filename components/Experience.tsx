'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: "Technical Team Member",
    company: "Be a Nerd Club, VIT-AP",
    period: "2023",
    description: "Supported the technical team in creating automation scripts and dashboards for internal projects.",
    achievements: [
      "Assisted in developing web tools for 100+ participants during awareness programs",
      "Improved testing efficiency by 30% through documentation and process automation"
    ]
  },
  {
    title: "Team Lead – Smart Hospital System",
    company: "Smart India Hackathon, VIT-AP",
    period: "2023",
    description: "Led a team of 5 to build a secure RFID-based appointment system used in mock simulations for 50+ patients.",
    achievements: [
      "Developed a real-time web app using Next.js, Node.js, and MongoDB with 3-tier architecture",
      "Implemented role-based access control (RBAC) and authentication for improved data privacy"
    ]
  },
  {
    title: "Frontend Developer",
    company: "Engineering Clinics, VIT-AP University",
    period: "2023",
    description: "Developed an IoT-based electricity tracker used in demo labs to monitor 10+ appliances' power usage.",
    achievements: [
      "Built a real-time dashboard with React and integrated Firebase, achieving 1-second sync latency",
      "Completed MVP delivery 2 weeks ahead of schedule while maintaining 100% functionality coverage"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-transparent dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through cybersecurity analysis, full-stack development, and technical leadership
            in various projects and organizations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-12 relative"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-primary-950 dark:text-white">
                      {exp.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-500 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-primary-100 dark:bg-primary-900" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;