'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Skills = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  const skillCategories = [
    {
      title: "Programming",
      skills: [
        { name: "C/C++" },
        { name: "Python" },
        { name: "JavaScript" },
        { name: "SQL" },
        { name: "HTML/CSS" }
      ]
    },
    {
      title: "Frameworks",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Node.js" },
        { name: "Flask" }
      ]
    },
    {
      title: "Cloud & Databases",
      skills: [
        { name: "AWS (EC2, S3, Lambda)" },
        { name: "MongoDB Atlas" },
        { name: "Firebase" },
        { name: "CloudWatch" }
      ]
    },
    {
      title: "Tools & Libraries",
      skills: [
        { name: "Git" },
        { name: "Docker" },
        { name: "Power BI" },
        { name: "Pandas/NumPy" },
        { name: "Selenium" }
      ]
    }
  ];

  return (
    <section ref={targetRef} id="skills" className="relative h-[200vh] md:h-[300vh] bg-transparent dark:bg-gray-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 absolute top-6 md:top-10 left-0 right-0 z-10 px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              Technical Skills
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
              A comprehensive overview of my technical expertise across programming languages,
              frameworks, cloud technologies, and development tools.
            </p>
          </motion.div>

          <motion.div style={{ x }} className="flex gap-4 md:gap-8 pl-4 md:pl-20">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="min-w-[260px] sm:min-w-[300px] md:min-w-[400px] bg-white/60 dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl backdrop-blur-sm border border-primary-100 dark:border-gray-700 flex flex-col justify-center"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 md:pb-4">
                  {category.title}
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center space-x-2 md:space-x-3 group"
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-500 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors duration-300 font-medium">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;