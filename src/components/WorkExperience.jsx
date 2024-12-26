import React, { useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Building2, Code, ExternalLink, Calendar, MapPin, ChevronDown } from "lucide-react";

const WorkExperience = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const experiences = [
    {
      company: "Wipro Pvt Ltd",
      role: "Project Engineer",
      duration: "April 2022 - Jan 2023",
      location: "Kolkata, India",
      description: [
        "Collaborated on enterprise-level software development projects",
        "Implemented robust technical solutions and optimized system performance",
        "Worked closely with cross-functional teams to deliver high-quality software products",
        "Gained valuable experience in software development methodologies and best practices",
      ],
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
      icon: Building2,
      gradient: "from-blue-500 to-purple-600",
      website: "https://www.wipro.com",
    },
    {
      company: "Bavistech Pvt Ltd",
      role: "Opcenter Teamcenter Developer Intern | React.js Developer",
      duration: "Sep 2023 - Apr 2024",
      location: "Kolkata, India",
      description: [
        "Developed responsive web applications using React.js",
        "Implemented Opcenter and Teamcenter solutions",
        "Gained hands-on experience in modern web development technologies",
      ],
      skills: ["React.js", "Teamcenter", "Opcenter", "JavaScript", "HTML/CSS"],
      icon: Code,
      gradient: "from-green-400 to-cyan-500",
      website: "https://www.bavistech.in",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-black min-h-screen">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1"
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-black text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500 animate-gradient-x">
            Work Experience
          </h2>
          <p className="text-lg text-gray-400 md:text-xl">
            My professional journey and contributions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-12"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-gray-900/60 backdrop-blur-lg border border-gray-800 overflow-hidden group"
              >
                {/* Mouse follow gradient */}
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

                {/* Header */}
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-3 rounded-xl bg-gradient-to-r ${experience.gradient}`}
                    >
                      <experience.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{experience.company}</h3>
                      <p className="text-lg text-gray-400">{experience.role}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap items-center gap-4 mt-4 md:mt-0"
                    whileHover={{ x: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{experience.location}</span>
                    </div>
                    <motion.a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/20 hover:border-purple-500/30 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </motion.a>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    {experience.description.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-gray-300 group/item"
                      >
                        <motion.span 
                          className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="group-hover/item:text-white transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    animate={{ height: expandedCard === index ? "auto" : "0" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4">
                      <h4 className="text-lg font-semibold text-white">Skills & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "rgba(14, 165, 233, 0.2)",
                            }}
                            className={`px-3 py-1 text-sm text-white rounded-full bg-gradient-to-r ${experience.gradient} opacity-80 cursor-pointer`}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="flex items-center gap-2 px-4 py-2 mt-4 text-sm text-white rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 transition-all group/button"
                  >
                    <span>{expandedCard === index ? "Show Less" : "Show More"}</span>
                    <motion.div
                      animate={{ rotate: expandedCard === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="transition-transform group-hover/button:translate-x-1"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
