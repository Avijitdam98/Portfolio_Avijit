import React, { useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { Code, GraduationCap, Trophy, ChevronRight, Star, Calendar, MapPin, ExternalLink, Book, Users, Award } from "lucide-react";

const Education = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverCard, setHoverCard] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse follow animation
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const mouseX = useMotionTemplate`${useSpring(mousePosition.x)}px`;
  const mouseY = useMotionTemplate`${useSpring(mousePosition.y)}px`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const expandedContent = {
    coursework: [
      "Power Systems Engineering",
      "Digital Electronics",
      "Control Systems",
      "Microprocessors & Microcontrollers",
      "Power Electronics",
      "Electric Machines",
    ],
    projects: [
      {
        title: "Smart Grid Monitoring System",
        description: "Developed an IoT-based system for real-time power grid monitoring",
        tech: ["Arduino", "IoT", "Python"],
      },
      {
        title: "Automated Load Management",
        description: "Created a system for efficient power distribution and load balancing",
        tech: ["PLC", "SCADA", "C++"],
      },
    ],
    activities: [
      "Technical Committee Member - IEEE Student Branch",
      "Coordinator - Annual Tech Fest",
      "Student Representative - Departmental Council",
      "Volunteer - College Social Service Club",
    ],
  };

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Express",
    "Git",
    "AWS",
  ];

  const achievements = [
    "Completed multiple industry-relevant projects",
    "Active member of college tech club",
    "Led team projects in web development",
    "Participated in hackathons",
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-black min-h-screen">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-75 pointer-events-none bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-black animate-gradient"></div>

      {/* Enhanced animated particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              scale: [1, 2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
              times: [0, 0.5, 1],
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced Header */}
          <motion.div
            variants={itemVariants}
            className="mb-12 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-1"
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="mb-4 text-4xl font-black text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 animate-gradient-x">
              My Academic Journey
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 md:text-xl">
              Transforming theoretical knowledge into practical innovation.
            </p>
          </motion.div>

          {/* Enhanced Main Education Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            onMouseMove={handleMouseMove}
            className="relative p-8 transition-all duration-300 border border-gray-800 shadow-2xl bg-gray-900/60 backdrop-blur-lg rounded-2xl hover:shadow-2xl hover:border-cyan-500/50 group overflow-hidden"
          >
            {/* Enhanced hover effect */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX} ${mouseY},
                    rgba(14, 165, 233, 0.15),
                    transparent 80%
                  )
                `,
              }}
            />

            {/* Header with enhanced animations */}
            <div className="relative flex flex-col items-start gap-6 mb-8 md:flex-row md:items-center md:justify-between">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600"
                >
                  <GraduationCap className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    Bachelor of Technology
                  </h3>
                  <p className="text-gray-400">Electrical Engineering</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap items-center gap-4 text-sm text-gray-400"
                whileHover={{ x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>2019 - 2022</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Kolkata, India</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>8.5 CGPA</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Institution Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-4 mb-8 transition-all border border-gray-800 rounded-lg bg-gray-800/50 hover:border-gray-700 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    BP Poddar Institute of Management and Technology
                  </h4>
                  <p className="text-gray-400">Premier Engineering Institute in West Bengal</p>
                </div>
                <motion.a
                  href="https://bppimt.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 relative z-10"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit
                </motion.a>
              </div>
              {/* Animated gradient border */}
              <div className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-cyan-500/20 animate-gradient-x" />
            </motion.div>

            {/* Enhanced Skills and Achievements Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Skills with enhanced animations */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 transition-all border border-gray-800 rounded-xl bg-gray-800/50 hover:border-gray-700 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-cyan-400" />
                  <h4 className="text-lg font-semibold text-white">Technical Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(14, 165, 233, 0.2)",
                      }}
                      className="px-3 py-1 text-sm text-white rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-gray-700 hover:border-cyan-500/50"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Achievements with enhanced animations */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 transition-all border border-gray-800 rounded-xl bg-gray-800/50 hover:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-pink-400" />
                  <h4 className="text-lg font-semibold text-white">Achievements</h4>
                </div>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={achievement}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10, color: "#38bdf8" }}
                      className="flex items-start gap-2 text-gray-300 transition-colors duration-200"
                    >
                      <ChevronRight className="flex-shrink-0 w-4 h-4 mt-1 text-cyan-400" />
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Enhanced Expandable Content */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 space-y-8">
                {/* Coursework Section */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 border border-gray-800 rounded-xl bg-gray-800/50 hover:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Book className="w-6 h-6 text-cyan-400" />
                    <h4 className="text-lg font-semibold text-white">Core Coursework</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {expandedContent.coursework.map((course, index) => (
                      <motion.div
                        key={course}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10, color: "#38bdf8" }}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                        <span>{course}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Projects Section */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 border border-gray-800 rounded-xl bg-gray-800/50 hover:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-pink-400" />
                    <h4 className="text-lg font-semibold text-white">Academic Projects</h4>
                  </div>
                  <div className="space-y-4">
                    {expandedContent.projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="p-4 border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-all"
                      >
                        <h5 className="mb-2 font-semibold text-white">{project.title}</h5>
                        <p className="mb-3 text-sm text-gray-400">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs text-cyan-400 border border-cyan-400/30 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Activities Section */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 border border-gray-800 rounded-xl bg-gray-800/50 hover:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-semibold text-white">Leadership & Activities</h4>
                  </div>
                  <div className="space-y-2">
                    {expandedContent.activities.map((activity, index) => (
                      <motion.div
                        key={activity}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10, color: "#38bdf8" }}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                        <span>{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Expand/Collapse Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-3 mx-auto mt-8 text-sm font-medium text-white transition-all rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 group"
            >
              {isExpanded ? "Show Less" : "Show More"}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="transition-transform group-hover:translate-x-1"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
