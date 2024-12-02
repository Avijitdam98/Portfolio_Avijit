import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "TypeScript", level: 75 },
  { name: "UI/UX Design", level: 85 },
  { name: "Teamcenter", level: 70 },
  { name: "Opcenter", level: 65 },
  { name: "ExpressJs", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "SQL", level: 75 },
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="mb-8 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            About Me
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-center text-gray-300 md:text-xl">
            Hi, I'm <span className="font-bold text-white">Avijit Dam</span>. I
            specialize in developing modern, user-friendly web applications with
            creative solutions. I leverage innovative technologies and a broad
            skillset to craft impactful digital experiences.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-800 rounded-lg shadow-xl"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-semibold">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-4 overflow-hidden bg-gray-700 rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
