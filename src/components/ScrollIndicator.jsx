import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDownIcon, ArrowUpIcon } from 'lucide-react';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const { scrollYProgress } = useScroll({
    container: document.documentElement
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      // Hide chevron after first section
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Show scroll to top after scrolling down 30% of page height
      if (window.scrollY > window.innerHeight * 0.3) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Calculate scroll percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);
      setScrollPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Percentage Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-50"
      >
        {scrollPercentage}%
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.button
          onClick={scrollToNextSection}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDownIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          x: showScrollTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;