import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon, ArrowRightIcon, DownloadIcon } from "lucide-react";
import Typewriter from "typewriter-effect";
import ScrollIndicator from "./ScrollIndicator";
import { useTheme } from '../context/ThemeContext';
import { API_ENDPOINTS } from '../config/api';

const Hero = () => {
  const { theme } = useTheme();
  const [showAnimated, setShowAnimated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(null);
      
      console.log('Fetching CV from server...');
      const response = await fetch(`${API_ENDPOINTS.cv}/latest`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, application/pdf',
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to download CV' }));
        throw new Error(errorData.message || 'Failed to download CV');
      }
      
      // Get the filename from the Content-Disposition header if available
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'Avijit_Dam_CV.pdf';
      if (contentDisposition) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CV:', error);
      setDownloadError(error.message || 'Failed to download CV. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="hero" className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Glowing background gradients */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-pink-500 via-purple-600 to-blue-500 opacity-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container relative px-4 mx-auto text-center">
        {/* Profile Picture Section */}
        <AnimatePresence mode="wait">
          {!showAnimated ? (
            // Regular profile image
            <motion.div
              key="regular"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-40 h-40 mx-auto mb-8"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-purple-500">
                <img
                  src="https://avatars.githubusercontent.com/u/84221186?s=400&u=a96d86bd5930864c3f1994be6a7909aa51bd447e&v=4"
                  alt="Avijit Dam"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ) : (
            // Animated profile image
            <motion.div
              key="animated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-40 h-40 mx-auto mb-8"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  background: [
                    "linear-gradient(45deg, #FF0080 0%, #7928CA 50%, #FF0080 100%)",
                    "linear-gradient(45deg, #7928CA 0%, #FF0080 50%, #7928CA 100%)",
                    "linear-gradient(45deg, #FF0080 0%, #7928CA 50%, #FF0080 100%)",
                  ],
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative w-full h-full p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://avatars.githubusercontent.com/u/84221186?s=400&u=a96d86bd5930864c3f1994be6a7909aa51bd447e&v=4"
                    alt="Avijit Dam"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Avijit Dam
          </h1>
          <div className="mb-8 text-xl sm:text-2xl md:text-3xl font-light text-gray-300">
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer 💻",
                  "PLM Solution Expert 🔧",
                  "UI/UX Designer 🎨",
                  "Cloud Architecture Specialist ☁️",
                  "Tech Innovation Leader 🚀",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 80,
              }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8 text-base sm:text-lg text-gray-300 px-4 sm:px-0"
          >
            Passionate about creating innovative solutions with modern technologies.
            Specializing in full-stack development and PLM solutions.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-medium text-white transition-all rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Let's Connect
          </motion.a>
            
          <motion.button
            onClick={handleDownloadCV}
            disabled={isDownloading}
            className={`relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group hover:scale-105 transition-transform duration-200 ${
              isDownloading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            whileHover={{ scale: isDownloading ? 1 : 1.05 }}
            whileTap={{ scale: isDownloading ? 1 : 0.95 }}
          >
            {/* Animated background */}
            <span className="absolute w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 -z-10 group-hover:opacity-90 transition-opacity duration-300" />
            
            {/* Download icon with animation */}
            <motion.div
              className="w-6 h-6 mr-2"
              initial={{ y: -3 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
            >
              {isDownloading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <DownloadIcon className="w-6 h-6" />
                </motion.div>
              ) : (
                <DownloadIcon className="w-6 h-6" />
              )}
            </motion.div>
            
            {/* Text with gradient */}
            <span className="relative z-10 font-semibold tracking-wider">
              {isDownloading ? 'Downloading...' : 'Download CV'}
            </span>

            {/* Shine effect */}
            <span className="absolute top-0 right-full w-12 h-full -ml-2 transform translate-x-full transition-transform duration-1000 bg-white opacity-10 rotate-12 group-hover:translate-x-[500%]" />
          </motion.button>

          {/* Error Message */}
          {downloadError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[-40px] left-0 right-0 text-center text-red-500 text-sm"
            >
              {downloadError}
            </motion.div>
          )}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <motion.a
            href="https://github.com/Avijit826"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubIcon className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/avijit-dam-513a69219"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <LinkedinIcon className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:avijitdam826@gmail.com"
            className="text-gray-400 transition-colors hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MailIcon className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
