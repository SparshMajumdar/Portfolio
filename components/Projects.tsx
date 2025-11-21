'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Github, ExternalLink, Lock } from 'lucide-react';

const projects = [
  {
    title: "Smart Hospital System",
    description: "Led a team of 5 to create an RFID-based hospital appointment management platform. Designed and implemented authentication with role-based access control, reducing data access errors by 60%. Achieved 100% functionality with a secure modular 3-tier architecture.",
    image: "/images/smart-hospital.png",
    tags: ["Next.js", "Node.js", "MongoDB", "RFID", "RBAC"],
    links: {
      github: "https://github.com/SparshMajumdar",
      live: null
    },
    color: "#00ff8c"
  },
  {
    title: "Electro Buck – IoT Electricity Monitor",
    description: "Built an end-to-end IoT system to monitor real-time power usage across appliances. Displayed live energy data using a Firebase backend and responsive React-based UI. Achieved 90%+ measurement accuracy through sensor calibration and test benchmarking.",
    image: "/images/electro-buck.png",
    tags: ["Arduino", "Next.js", "Firebase", "IoT"],
    links: {
      github: "https://github.com/SparshMajumdar/ElectroBuck",
      live: "https://electro-buck.vercel.app/"
    },
    color: "#22c55e"
  },
  {
    title: "Automated Cloud Misconfiguration Scanner",
    description: "Collaborated in a team of 3 to develop an automated AWS tool integrated with Power BI for detecting and visualizing cloud misconfigurations. Responsible for maintaining and managing cloud configurations, ensuring compliance, and optimizing system reliability.",
    image: "/images/cloud-scanner.png",
    tags: ["AWS", "Python", "Power BI", "Cloud Security"],
    links: {
      github: "https://github.com/SparshMajumdar",
      live: null
    },
    color: "#ef4444"
  }
];

const Card = ({ i, project, progress, range, targetScale }: { i: number, project: any, progress: MotionValue<number>, range: number[], targetScale: number }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-3xl p-10 origin-top bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
      >
        <div className="flex h-full gap-10">
          <div className="w-[40%] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 text-xs rounded-full border border-gray-200 dark:border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-white hover:text-primary-500 transition-colors"
                >
                  <Github size={20} />
                  <span className="text-sm">Source Code</span>
                </a>
              ) : (
                <span className="flex items-center gap-2 text-gray-500">
                  <Lock size={20} />
                  <span className="text-sm">Private</span>
                </span>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-white hover:text-primary-500 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span className="text-sm">Live Demo</span>
                </a>
              )}
            </div>
          </div>

          <div className="relative w-[60%] h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full"
            >
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="projects" className="bg-transparent dark:bg-black relative" ref={container}>
      <div className="pt-20 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work in cybersecurity analysis, IoT development, and full-stack applications.
          </p>
        </motion.div>

        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <Card
              key={i}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  );
};

export default Projects;