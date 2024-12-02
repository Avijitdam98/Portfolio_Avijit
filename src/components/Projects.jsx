import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Globe,
  MessageCircle,
  ShoppingCart,
  Utensils,
} from "lucide-react";

const projects = [
  {
    title: "Full Stack Real-Time Chat App",
    description:
      "A robust real-time communication platform with advanced messaging features",
    technologies: ["React", "Node.js", "Socket.IO", "MongoDB"],
    github: "https://github.com/Avijitdam98/fullstackchatapp",
    live: "https://fullstackchatapp-29xc.onrender.com",
    icon: MessageCircle,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Food Recipe Web App",
    description:
      "Discover, save, and explore a world of culinary delights and recipes",
    technologies: ["Next.js", "Tailwind CSS", "API Integration"],
    github: "https://github.com/Avijitdam98/food_app",
    live: "https://food-app-navy.vercel.app/",
    icon: Utensils,
    gradient: "from-green-400 to-emerald-600",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Modern, responsive e-commerce platform with seamless shopping experience",
    technologies: ["React", "Redux", "Firebase", "Tailwind CSS"],
    github: "https://github.com/Avijitdam98/ecommerce_site_clone",
    live: "https://ecommerce-site-clone.pages.dev/",
    icon: ShoppingCart,
    gradient: "from-purple-500 to-pink-600",
  },
];

const Projects = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-80 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-5xl font-extrabold text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600"
        >
          Innovative Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="overflow-hidden transition-all duration-300 border border-gray-800 shadow-2xl bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-lg rounded-3xl hover:shadow-xl hover:border-transparent group"
            >
              <div className="relative p-6">
                {/* Gradient Icon Background */}
                <div
                  className={`absolute top-4 right-4 bg-gradient-to-br ${project.gradient}
                               p-3 rounded-full opacity-80 group-hover:opacity-100 transition-all`}
                >
                  <project.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="mb-3 text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="h-20 mb-4 text-sm text-gray-400 md:text-base">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-3 mb-6 min-h-[50px]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs text-gray-300 bg-gray-800 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center justify-between mt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white group/github"
                  >
                    <Github
                      className="group-hover/github:rotate-[360deg] transition-transform"
                      size={20}
                    />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white group/live"
                  >
                    <Globe
                      className="transition-transform group-hover/live:scale-110"
                      size={20}
                    />
                    <span className="text-sm">Live Project</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
