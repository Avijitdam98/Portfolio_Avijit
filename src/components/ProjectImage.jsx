import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectImage = ({ src, alt, className, gradient }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const defaultGradient = {
    from: "#3B82F6",
    via: "#6366F1",
    to: "#8B5CF6"
  };

  // Use provided gradient or default gradient
  const activeGradient = gradient || defaultGradient;

  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="100%" height="100%" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:%23${activeGradient.from.slice(1)};stop-opacity:1" />
          <stop offset="50%" style="stop-color:%23${activeGradient.via.slice(1)};stop-opacity:1" />
          <stop offset="100%" style="stop-color:%23${activeGradient.to.slice(1)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(%23grad)"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dy=".3em">
        ${alt || 'Loading...'}
      </text>
    </svg>
  `)}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ''}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900"
          >
            {/* Loading animation */}
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-b-2 border-white"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={error ? placeholderImage : src}
        alt={alt || 'Project Image'}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full h-full object-cover rounded-lg ${error ? 'filter blur-sm' : ''}`}
      />

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ProjectImage;
