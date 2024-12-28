import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Building2, Code, ExternalLink, Calendar, MapPin, ChevronDown, ArrowRight } from "lucide-react";

const WorkExperience = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
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

  return (
    <section 
      id="experience"
      ref={containerRef} 
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden min-h-screen"
    >
      {/* Enhanced Background Effects */}
      <AnimatePresence>
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" 
               style={{ backgroundSize: '14px 24px' }} />
          
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-72 h-72 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl opacity-20"
              style={{ y: parallaxY }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: i * 5
              }}
              initial={{
                left: `${i * 30}%`,
                top: `${i * 20}%`,
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          style={{ y: parallaxY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 relative group"
          >
            <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Building2 className="w-10 h-10 text-white relative z-10" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Work Experience
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            My professional journey and contributions in the tech industry.
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 group ${
                expandedCard === index ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onMouseMove={handleMouseMove}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <motion.div
                className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(600px circle at ${mouseX} ${mouseY}, rgba(79, 70, 229, 0.1), transparent 40%)`
                }}
              />
              
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: expandedCard === index ? 180 : 0 }}
                className="absolute top-6 right-6 text-gray-400 transition-colors group-hover:text-white"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all">
                      {experience.role}
                    </h3>
                    <p className="text-purple-400 font-medium">{experience.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                      <Calendar className="w-4 h-4" />
                      {experience.duration}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2 justify-end group-hover:text-gray-300 transition-colors">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="space-y-3">
                        {experience.description.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-gray-300 group/item"
                          >
                            <ArrowRight className="w-4 h-4 mt-1 text-purple-400 group-hover/item:text-purple-300" />
                            <span className="group-hover/item:text-white transition-colors">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {experience.skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-300 border border-white/5 hover:border-white/20 transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>

                      {experience.website && (
                        <motion.a
                          href={experience.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Website
                        </motion.a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
