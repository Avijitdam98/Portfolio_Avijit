import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Loading = () => {
  const { isDark } = useTheme();

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Animated dots */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full ${
              isDark ? 'bg-blue-500' : 'bg-blue-600'
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Loading text with gradient */}
        <motion.div
          className={`text-lg font-medium bg-gradient-to-r ${
            isDark
              ? 'from-blue-500 via-purple-500 to-pink-500'
              : 'from-blue-600 via-purple-600 to-pink-600'
          } bg-clip-text text-transparent`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Loading...
        </motion.div>

        {/* Background blur effect */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(17,24,39,0) 70%)'
              : 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;
