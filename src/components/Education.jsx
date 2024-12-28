import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Code, GraduationCap, Trophy, ChevronRight, Star, Calendar, MapPin, ExternalLink, Book, Users, Award, ArrowRight } from "lucide-react";

const Education = () => {
  const [selectedTab, setSelectedTab] = useState('education');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  const floatingAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8 }
  };

  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Electrical Engineering",
      school: "B. P. Poddar Institute of Management and Technology",
      year: "2019 - 2022",
      location: "Kolkata, India",
      grade: "9.05 CGPA",
      highlights: [
        "Core courses in Electrical Engineering",
        "Specialization in Power Systems",
        "Minor in Computer Science",
        "Research project on Smart Grid Technologies",
        "IEEE Student Branch member",
        "Ranked in top 15% of class"
      ]
    },
    {
      degree: "Diploma in Electrical Engineering",
      field: "Engineering",
      school: "Kingston Educatinal Institute",
      year: "2016 - 2019",
      location: "Kolkata, India",
      grade: "70%",
      highlights: [
        "Electrical Engineering fundamentals",
        "Computer Science fundamentals",
        "Ranked in top 5% of class",
        "Technichal Workshop Club coordinator"
      ]
    }
  ];

  const certifications = [
    {
      name: "Full Stack Web Development",
      issuer: "Udemy",
      date: "2023",
      credential: "UC-76ed9aa7-815e-4d53-8148-If4e2a61fe02",
      skills: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      name: "Full Stack Web Development",
      issuer: "Ejob",
      date: "2023",
      credential: "by Ejob India",
      skills: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      name: "PLM Fundamentals",
      issuer: "Siemens",
      date: "2023",
      credential: "SIE-123456",
      skills: ["Teamcenter", "Product Lifecycle", "Digital Manufacturing"]
    }
  ];

  return (
    <section 
      id="education"
      ref={containerRef} 
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden min-h-screen" 
    >
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
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 relative group"
          >
            <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <GraduationCap className="w-10 h-10 text-white relative z-10" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          </motion.div>
          
          <div className="relative">
            <motion.h2 
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Education & Certifications
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              My academic journey and professional certifications that have shaped my expertise in software development and technology.
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex p-1 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
            {['education', 'certifications'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`relative px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 ${
                  selectedTab === tab 
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {selectedTab === 'education' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 group"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                            {edu.degree} in {edu.field}
                          </h3>
                          <p className="text-purple-400 font-medium mb-2 text-sm sm:text-base">{edu.school}</p>
                        </div>
                        <div className="flex flex-row sm:flex-col sm:text-right gap-4 sm:gap-2">
                          <p className="text-gray-400 flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            {edu.year}
                          </p>
                          <p className="text-gray-400 flex items-center gap-2 sm:justify-end text-sm">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            {edu.location}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-green-400 mb-2 flex items-center gap-2 text-sm sm:text-base">
                          <Trophy className="w-4 h-4 flex-shrink-0" />
                          {edu.grade}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {edu.highlights.map((highlight, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-gray-300 text-sm sm:text-base"
                            >
                              <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                              {highlight}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
                        <p className="text-purple-400">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {cert.date}
                        </p>
                        <p className="text-gray-400 text-sm">{cert.credential}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {cert.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Education;
