'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock } from 'lucide-react';

const projects = [
  {
    title: "Social Engineering Simulation",
    description: "Comprehensive social engineering simulation using SET, OSINT, and theHarvester tools with Selenium and Python automation for security awareness training.",
    image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["SET", "OSINT", "theHarvester", "Recon-ng", "Selenium", "Python", "Beautiful Soup"],
    links: {
      github: "https://github.com/username/social-engineering-sim",
      live: null
    }
  },
  {
    title: "Electro Buck - IoT Electricity Tracker",
    description: "IoT-based system to track and record real-time electricity consumption of individual appliances using Arduino, Next.js, and Firebase integration.",
    image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Arduino", "Next.js", "Firebase", "IoT", "Real-time Data"],
    links: {
      github: "https://github.com/username/electro-buck",
      live: "https://electro-buck.demo"
    }
  },
  {
    title: "Smart Hospital Appointment System",
    description: "Full stack application with RFID attendance and appointment system using Next.js, MongoDB, and Node.js for seamless hospital management.",
    image: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Next.js", "MongoDB", "Node.js", "RFID", "React"],
    links: {
      github: "https://github.com/username/smart-hospital",
      live: null
    }
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work in cybersecurity analysis, IoT development, and full-stack applications,
            demonstrating practical applications of cutting-edge technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-950 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-600" title="Private Repository">
                      <Lock className="w-5 h-5" />
                    </span>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;