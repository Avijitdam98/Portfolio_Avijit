import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Palette, Server, Database, Brain, Rocket, ChevronRight, User, ArrowRight, Star, Coffee, Heart } from "lucide-react";

const skills = [
  { 
    name: "Frontend Development",
    technologies: ["React", "JavaScript", "TypeScript", "Next.js", "HTML5", "CSS3", "Redux"],
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    description: "Building responsive and interactive user interfaces with modern frameworks"
  },
  {
    name: "UI/UX Design",
    technologies: ["Figma",  "Tailwind CSS", "Material-UI", "Framer Motion"],
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    description: "Creating beautiful, accessible, and intuitive user experiences"
  },
  {
    name: "Backend Development",
    technologies: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Python"],
    icon: Server,
    color: "from-green-500 to-emerald-500",
    description: "Developing scalable server-side applications and APIs"
  },
  {
    name: "Database Management",
    technologies: ["MongoDB", "PostgreSQL", "MySQL","Supabse","Firebase"],
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    description: "Designing and optimizing database systems for performance"
  },
  {
    name: "PLM Solutions",
    technologies: ["Teamcenter", "Opcenter", "MES", "Product Lifecycle Management", "Digital Twin"],
    icon: Brain,
    color: "from-red-500 to-pink-500",
    description: "Implementing end-to-end product lifecycle management solutions"
  },
  {
    name: "DevOps & Cloud",
    technologies: ["Git", "Docker"],
    icon: Rocket,
    color: "from-indigo-500 to-purple-500",
    description: "Implementing cloud infrastructure and deployment automation"
  }
];

const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Line animation variants
  const lineVariants = {
    hidden: (custom) => ({
      scaleX: 0,
      x: custom === "left" ? "-100%" : "100%",
    }),
    visible: {
      scaleX: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black dark:from-gray-900 dark:to-black min-h-screen z-10"
    >
      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            custom={i % 2 === 0 ? "left" : "right"}
            variants={lineVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: i * 0.1 }}
            className={`absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform ${
              scrollDirection === "down" ? "translate-y-full" : "-translate-y-full"
            }`}
            style={{
              top: `${(i + 1) * 5}%`,
              left: i % 2 === 0 ? "0" : "auto",
              right: i % 2 === 0 ? "auto" : "0",
              width: "100%",
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" 
             style={{ backgroundSize: '14px 24px' }} />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container relative px-4 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header with enhanced animations */}
          <motion.div 
            className="text-center mb-16 relative"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block p-3 mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden group"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <User className="w-6 h-6 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h2
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 text-transparent bg-clip-text relative group"
              whileHover={{ scale: 1.05 }}
            >
              About Me
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.h2>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
              variants={itemVariants}
            >
              A passionate Full Stack Developer with expertise in modern web technologies and PLM solutions. 
              I love creating beautiful, efficient, and user-friendly applications that solve real-world problems.
            </motion.p>
          </motion.div>

          {/* Skills Grid with enhanced interactions */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onHoverStart={() => setSelectedSkill(skill.name)}
                onHoverEnd={() => setSelectedSkill(null)}
              >
                <motion.div
                  className={`p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 relative overflow-hidden group transition-all duration-300 h-full`}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        `linear-gradient(0deg, transparent, ${skill.color.split(' ')[1]})`,
                        `linear-gradient(90deg, transparent, ${skill.color.split(' ')[1]})`,
                        `linear-gradient(180deg, transparent, ${skill.color.split(' ')[1]})`,
                        `linear-gradient(270deg, transparent, ${skill.color.split(' ')[1]})`,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ opacity: 0.1 }}
                  />

                  {/* Icon with enhanced animation */}
                  <motion.div
                    className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-r ${skill.color} p-0.5 relative group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="w-full h-full rounded-xl bg-gray-900/80 backdrop-blur-sm flex items-center justify-center relative z-10">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Content with improved typography */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Technologies with staggered animation */}
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${skill.color} bg-opacity-10 text-white relative overflow-hidden group cursor-pointer`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10">{tech}</span>
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced hover effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ skewX: -20 }}
                  />
                </motion.div>

                {/* Floating indicators */}
                <AnimatePresence>
                  {selectedSkill === skill.name && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: -20 }}
                        className="absolute -top-2 -right-2 z-10"
                      >
                        <div className="p-1 rounded-full bg-yellow-500/20 backdrop-blur-sm">
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="absolute -bottom-2 -right-2 z-10"
                      >
                        <div className="p-1 rounded-full bg-red-500/20 backdrop-blur-sm">
                          <Heart className="w-4 h-4 text-red-500" />
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Fun Facts with enhanced styling */}
          <motion.div
            className="mt-16 text-center"
            variants={containerVariants}
          >
            <motion.div 
              className="inline-flex items-center space-x-3 text-gray-400 relative p-4 rounded-full bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Coffee className="w-5 h-5 text-yellow-500" />
                <motion.div
                  className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <span className="text-sm sm:text-base">Fueled by coffee and passion for coding</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
