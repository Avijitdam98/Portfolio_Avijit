import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { damping: 15, stiffness: 100 };
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), springConfig);

  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10
    }));
  };

  const particles1 = generateParticles(30);
  const particles2 = generateParticles(20);
  const particles3 = generateParticles(15);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* First layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0"
      >
        {particles1.map(particle => (
          <motion.div
            key={`p1-${particle.id}`}
            className="absolute w-1 h-1 bg-blue-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Second layer */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0"
      >
        {particles2.map(particle => (
          <motion.div
            key={`p2-${particle.id}`}
            className="absolute w-1 h-1 bg-purple-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: particle.duration * 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Third layer */}
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0"
      >
        {particles3.map(particle => (
          <motion.div
            key={`p3-${particle.id}`}
            className="absolute w-1 h-1 bg-pink-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration * 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
    </div>
  );
};

export default ParallaxBackground;
