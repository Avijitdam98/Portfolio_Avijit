import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Typewriter from "typewriter-effect";

const Hero = () => {
  // You can hardcode or dynamically fetch this URL if required
  const cvUrl = "https://drive.google.com/uc?export=download&id=your-file-id"; // Replace with your actual link

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background with moving particles */}
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
        {/* Profile Picture with 3D hover effect */}
        <motion.div
          className="relative w-40 h-40 mx-auto mb-8 group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 transition-transform duration-300 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse group-hover:scale-110" />
          <div className="relative w-full h-full p-2">
            <div className="relative w-full h-full overflow-hidden rounded-full">
              <img
                src="https://avatars.githubusercontent.com/u/84221186?s=400&u=a96d86bd5930864c3f1994be6a7909aa51bd447e&v=4"
                alt="Avijit Dam"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-5xl font-extrabold text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Avijit Dam
          </h1>
          <div className="mb-8 text-2xl font-light text-gray-300 md:text-3xl">
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer 💻",
                  "UI/UX Designer 🎨",
                  "Problem Solver 🔧",
                  "Tech Enthusiast 🚀",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 80,
              }}
            />
          </div>
        </motion.div>

        {/* Modern gradient buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row justify-center"
        >
          <motion.a
            href="https://github.com/Avijitdam98"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2 px-8 py-3 overflow-hidden text-white transition-all rounded-full group bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex items-center gap-2">
              View Projects <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </span>
          </motion.a>

          <motion.a
            href="https://drive.google.com/uc?export=download&id=1fqICrMPAFGcsOn6eHTrsETVDBuiZHhxY"
            download
            className="relative inline-flex items-center justify-center px-8 py-3 text-white transition-all border-2 rounded-full group hover:scale-105 border-purple-500/50 hover:bg-purple-500/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">Download CV</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
