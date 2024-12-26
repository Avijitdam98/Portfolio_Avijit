import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Palette, Server, Database, Brain, Rocket, ChevronRight, User } from "lucide-react";

const skills = [
  { 
    name: "Frontend Development",
    technologies: ["React", "JavaScript", "TypeScript", "Next.js"],
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    description: "Building responsive and interactive user interfaces"
  },
  {
    name: "UI/UX Design",
    technologies: ["Figma", "Adobe XD", "Tailwind CSS"],
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    description: "Creating beautiful and intuitive user experiences"
  },
  {
    name: "Backend Development",
    technologies: ["Node.js", "Express.js", "REST APIs"],
    icon: Server,
    color: "from-green-500 to-emerald-500",
    description: "Developing robust server-side applications"
  },
  {
    name: "Database Management",
    technologies: ["MongoDB", "SQL", "Redis"],
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    description: "Managing and optimizing database systems"
  },
  {
    name: "PLM Solutions",
    technologies: ["Teamcenter", "Opcenter", "MES"],
    icon: Brain,
    color: "from-red-500 to-pink-500",
    description: "Implementing product lifecycle management solutions"
  },
  {
    name: "DevOps",
    technologies: ["Git", "Docker", "AWS"],
    icon: Rocket,
    color: "from-indigo-500 to-purple-500",
    description: "Streamlining development and deployment processes"
  }
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black dark:from-gray-900 dark:to-black"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" 
             style={{ backgroundSize: '14px 24px' }} />
      </div>

      <div className="container relative px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block p-2 mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            >
              <User className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.h2 
              className="mb-4 text-4xl font-extrabold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About Me
            </motion.h2>

            <motion.p 
              className="max-w-3xl mx-auto mb-16 text-lg leading-relaxed text-gray-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating beautiful, functional, and user-friendly applications.
            </motion.p>

            {/* Skills Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  className="relative p-6 transition-all bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10"
                >
                  <div className={`inline-flex p-3 mb-4 rounded-lg bg-gradient-to-r ${skill.color}`}>
                    <skill.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white">{skill.name}</h3>
                  <p className="mb-4 text-sm text-gray-400">{skill.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${skill.color} opacity-80`}
                      >
                        <ChevronRight className="w-3 h-3 mr-1" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-white/10" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
