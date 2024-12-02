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
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-pink-500 via-purple-600 to-blue-500 opacity-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="container relative px-4 mx-auto text-center">
        {/* Profile Picture */}
        <motion.div
          className="w-32 h-32 mx-auto mb-6 overflow-hidden border-4 rounded-full shadow-lg md:w-40 md:h-40 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/84221186?s=400&u=a96d86bd5930864c3f1994be6a7909aa51bd447e&v=4"
            alt="Avijit Dam"
            className="object-cover w-full h-full"
          />
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
          <div className="mb-8 text-xl text-gray-300 md:text-2xl">
            <Typewriter
              options={{
                strings: [
                  "Full Stack Developer",
                  "UI/UX Designer",
                  "Problem Solver",
                  "Tech Enthusiast",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <motion.a
            href="https://github.com/Avijitdam98"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-2xl"
            variants={buttonVariants}
            whileHover="hover"
          >
            View Projects <ArrowRight size={20} />
          </motion.a>

          {/* Hire Me Button */}
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1fqICrMPAFGcsOn6eHTrsETVDBuiZHhxY"
            download
            className="px-8 py-3 text-white transition-all border border-white rounded-full hover:bg-white hover:text-gray-900"
            variants={buttonVariants}
            whileHover="hover"
          >
            Hire Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
