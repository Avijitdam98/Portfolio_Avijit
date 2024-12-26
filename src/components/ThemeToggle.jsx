import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-[9996] p-3 rounded-full backdrop-blur-sm border ${
        isDark 
          ? 'bg-gray-900/80 border-gray-700 hover:bg-gray-800' 
          : 'bg-white/80 border-gray-200 hover:bg-gray-50'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icon container */}
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-600" />
        )}
      </motion.div>

      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full opacity-50"
        animate={{
          backgroundColor: isDark ? '#ffffff20' : '#00000010',
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={isDark ? 'dark' : 'light'}
      >
        <div className={`w-full h-full rounded-full ${
          isDark ? 'bg-yellow-400/30' : 'bg-blue-600/30'
        }`} />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
