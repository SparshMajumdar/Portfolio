'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: "Cyber Security Analyst - Technical Team",
    company: "Be a Nerd (VIT-AP Club)",
    period: "2023",
    description: "Led cybersecurity initiatives and conducted security assessments for the technical team at VIT-AP University's premier tech club.",
    achievements: [
      "Conducted social engineering simulations to assess and improve organizational security awareness",
      "Performed Wi-Fi penetration testing during workshops to identify and mitigate vulnerabilities in wireless networks",
      "Delivered hands-on cybersecurity demonstrations to educate club members on best practices and emerging threats"
    ]
  },
  {
    title: "Group Leader - Smart Hospital Appointment System",
    company: "Smart India Hackathon (VIT-AP)",
    period: "2023",
    description: "Led a team to develop an innovative hospital appointment system with RFID integration and real-time tracking capabilities.",
    achievements: [
      "Developed RFID attendance and appointment system for seamless patient management",
      "Built full stack application using Next.js, MongoDB, and Node.js",
      "Implemented real-time tracking and notification features for enhanced user experience"
    ]
  },
  {
    title: "Front End Developer",
    company: "Engineering Clinics (ECS, VIT-AP)",
    period: "2023",
    description: "Developed IoT solutions and user interfaces for energy monitoring and management systems.",
    achievements: [
      "Developed an IoT solution to monitor and record real-time electricity consumption of individual appliances",
      "Created detailed insights dashboard for efficient energy usage tracking",
      "Designed seamless, user-friendly and dynamic UI for the Electro-Buck Project",
      "Collaborated with team members to achieve project goals and deliverables"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
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