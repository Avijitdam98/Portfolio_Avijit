import React from "react";
import { motion } from "framer-motion";
import { Building2, CodeIcon } from "lucide-react";

const workExperiences = [
  {
    company: "Wipro Pvt Ltd",
    role: "Project Engineer",
    duration: "April 2022 - Jan 2023",
    description: [
      "Collaborated on enterprise-level software development projects",
      "Implemented robust technical solutions and optimized system performance",
      "Worked closely with cross-functional teams to deliver high-quality software products",
      "Gained valuable experience in software development methodologies and best practices",
    ],
    icon: Building2,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    company: "Bavistech Pvt Ltd",
    role: "Opcenter Teamcenter Developer Intern | React.js Developer",
    duration: "Sep 2024 - Apr 2024",
    description: [
      "Developed responsive web applications using React.js",
      "Implemented Opcenter and Teamcenter solutions",
      "Gained hands-on experience in modern web development technologies",
    ],
    icon: CodeIcon,
    gradient: "from-green-400 to-cyan-500",
  },
];

const WorkExperience = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-800 via-black to-gray-900">
      <div className="container relative z-10 px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-5xl font-extrabold text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600"
        >
          Professional Journey
        </motion.h2>

        <div className="space-y-8">
          {workExperiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 150,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 15, // 3D rotation on hover
                transition: { duration: 0.3 },
              }}
              className="overflow-hidden transition-all duration-500 border border-gray-800 shadow-xl bg-gray-900/80 backdrop-blur-lg rounded-3xl group perspective-[1500px]"
            >
              <div className="relative flex items-start p-8">
                {/* Company Icon with Gradient Background */}
                <div
                  className={`mr-6 bg-gradient-to-br ${experience.gradient}
                                 p-5 rounded-full opacity-80 group-hover:opacity-100 transition-all`}
                >
                  <experience.icon className="w-10 h-10 text-white" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-semibold text-white"
                      >
                        {experience.company}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-400"
                      >
                        {experience.role}
                      </motion.p>
                    </div>
                    <span className="px-4 py-1 text-sm text-gray-500 bg-gray-800 rounded-full">
                      {experience.duration}
                    </span>
                  </div>

                  <ul className="space-y-3 text-gray-300">
                    {experience.description.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + pointIndex * 0.1,
                        }}
                        className="flex items-start"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4 mt-1 mr-2 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
