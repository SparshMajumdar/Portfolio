'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollZoomIntro = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Scale from 1 to 30 (reduced from 50 for performance)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 30]);
    // Opacity fades out faster so we don't render huge transparent text
    const opacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]);

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gray-950">
                <motion.div
                    style={{ scale, opacity, z: 0 }}
                    className="text-center w-full"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary-500 whitespace-nowrap leading-none pointer-events-none select-none">
                        Hi, I am Sparsh
                    </h1>
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollZoomIntro;
