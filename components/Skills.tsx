'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python"},
        { name: "JavaScript"},
        { name: "C/C++"},
        { name: "HTML/CSS" },
        { name: "SQL/Postgres" },
        { name: "R" }
      ]
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { name: "React" },
        { name: "Node.js" },
        { name: "Next.js" },
        { name: "Flask" },
        { name: "OSINT" }
      ]
    },
    {
      title: "Developer Tools & Libraries",
      skills: [
        { name: "Git"},
        { name: "VS Code"},
        { name: "Kali Linux"},
        { name: "Burpsuite"},
        { name: "Metasploit"},
        { name: "Wireshark"},
        { name: "Cisco Packet Tracer"}
      ]
    },
    {
      title: "Libraries & Automation",
      skills: [
        { name: "pandas"},
        { name: "NumPy"},
        { name: "Matplotlib"},
        { name: "Selenium"},
        { name: "Beautiful Soup"}
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across programming languages, 
            frameworks, cybersecurity tools, and development environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;