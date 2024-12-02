import React from "react";
import { motion } from "framer-motion";
import { Code, GraduationCap, Trophy } from "lucide-react";

const Education = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Gradient background effect */}
      <div className="absolute inset-0 opacity-75 pointer-events-none bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-black"></div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-black text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600">
              My Academic Journey
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 md:text-xl">
              Transforming theoretical knowledge into practical innovation.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.3 }}
            className="p-8 transition-all duration-300 border border-gray-800 shadow-2xl bg-gray-900/60 backdrop-blur-lg rounded-2xl hover:shadow-2xl hover:border-cyan-500/50"
          >
            <div className="flex items-center mb-6">
              <GraduationCap className="w-10 h-10 mr-4 text-cyan-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Bachelor of Technology in Electrical Engineering
                </h3>
                <p className="text-gray-400">
                  BP Poddar Institute of Management and Technology, Kolkata
                </p>
              </div>
            </div>

            <div className="grid gap-4 mt-6 md:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-4 shadow-lg bg-gray-800/50 rounded-xl"
              >
                <Code className="w-8 h-8 mb-3 text-pink-500" />
                <h4 className="mb-2 font-semibold text-white">
                  Technical Skills
                </h4>
                <p className="text-sm text-gray-300">
                  Proficient in JavaScript, React, and full-stack web
                  development
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-4 shadow-lg bg-gray-800/50 rounded-xl"
              >
                <Trophy className="w-8 h-8 mb-3 text-cyan-400" />
                <h4 className="mb-2 font-semibold text-white">Achievements</h4>
                <p className="text-sm text-gray-300">
                  Completed multiple industry-relevant projects and internships
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-4 shadow-lg bg-gray-800/50 rounded-xl"
              >
                <div className="mb-3 text-gray-400">📅</div>
                <h4 className="mb-2 font-semibold text-white">Duration</h4>
                <p className="text-sm text-gray-300">
                  2019 - 2022 | Graduated with distinction
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
