import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollLines = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Vertical Lines */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute h-screen w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: 1,
            opacity: [0, 0.5, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }
          }}
          style={{
            left: `${(i + 1) * 5}%`,
            transform: `translateY(${scrollDirection === 'down' ? '-100%' : '100%'})`,
          }}
        />
      ))}

      {/* Horizontal Lines */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute w-screen h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            opacity: [0, 0.3, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.15,
            }
          }}
          style={{
            top: `${(i + 1) * 7}%`,
            transform: `translateX(${scrollDirection === 'down' ? '-100%' : '100%'})`,
          }}
        />
      ))}

      {/* Diagonal Lines */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`d-${i}`}
          className="absolute w-screen h-px origin-left bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            opacity: [0, 0.2, 0],
            transition: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }
          }}
          style={{
            top: `${(i + 1) * 10}%`,
            transform: `translateX(${scrollDirection === 'down' ? '-100%' : '100%'}) rotate(45deg)`,
          }}
        />
      ))}

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-500/30"
          animate={{
            y: [0, window.innerHeight],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: scrollDirection === 'down' ? '-5%' : '105%',
          }}
        />
      ))}
    </div>
  );
};

export default ScrollLines;
