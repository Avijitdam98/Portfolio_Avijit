import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedProfile = () => {
  const [currentEffect, setCurrentEffect] = useState(0);
  
  const effects = [
    { filter: 'none', scale: 1 },
    { filter: 'hue-rotate(45deg)', scale: 1.05 },
    { filter: 'brightness(1.2) contrast(1.1)', scale: 1 },
    { filter: 'saturate(1.5)', scale: 1.02 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEffect((prev) => (prev + 1) % effects.length);
    }, 2500); // Change effect every 2.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEffect}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: effects[currentEffect].scale,
            filter: effects[currentEffect].filter
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg shadow-purple-500/20"
        >
          <motion.div
            className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 absolute"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <img
            src="/AnimatedProfile.png"
            alt="Avijit Dam"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedProfile;
