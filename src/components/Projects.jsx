import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Globe,
  MessageCircle,
  ShoppingCart,
  Utensils,
  FileText,
  ClipboardList,
  Code,
  Eye,
  Star,
  GitFork,
} from "lucide-react";
import ProjectImage from "./ProjectImage";

const projects = [
  {
    title: "Project Management Tool",
    description:
      "Comprehensive project management solution with task tracking, team collaboration, and real-time updates",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    features: [
      "Real-time task updates",
      "Team collaboration",
      "Project analytics",
      "Drag-and-drop kanban",
      "User authentication"
    ],
    github: "https://github.com/Avijitdam98/Project_Managment_tool",
    live: "https://project-managment-tool-one.vercel.app/login",
    image: {
      src: "/images/projects/project-management.webp",
      gradient: {
        from: "#3B82F6",
        via: "#6366F1",
        to: "#8B5CF6"
      }
    },
    icon: ClipboardList,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    stats: {
      stars: 12,
      forks: 5
    }
  },
  {
    title: "Invoice Generator",
    description:
      "Professional invoice generation tool with customizable templates and PDF export functionality",
    technologies: ["React", "PDF Generation", "Tailwind CSS", "LocalStorage"],
    features: [
      "Custom invoice templates",
      "PDF export",
      "Client management",
      "Tax calculations",
      "Invoice history"
    ],
    github: "https://github.com/Avijitdam98/Invoice_genrator",
    live: "https://invoice-genrator-rosy.vercel.app",
    image: {
      src: "/images/projects/invoice-generator.webp",
      gradient: {
        from: "#06B6D4",
        via: "#0EA5E9",
        to: "#2563EB"
      }
    },
    icon: FileText,
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    stats: {
      stars: 8,
      forks: 3
    }
  },
  {
    title: "Full Stack Real-Time Chat App",
    description:
      "A robust real-time communication platform with advanced messaging features",
    technologies: ["React", "Node.js", "Socket.IO", "MongoDB"],
    features: [
      "Real-time messaging",
      "User authentication",
      "Group chats",
      "File sharing",
      "Typing indicators"
    ],
    github: "https://github.com/Avijitdam98/fullstackchatapp",
    live: "https://fullstackchatapp-29xc.onrender.com",
    image: {
      src: "/images/projects/chat-app.webp",
      gradient: {
        from: "#3B82F6",
        via: "#6366F1",
        to: "#8B5CF6"
      }
    },
    icon: MessageCircle,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    stats: {
      stars: 10,
      forks: 4
    }
  },
  {
    title: "Food Recipe Web App",
    description:
      "Discover, save, and explore a world of culinary delights and recipes",
    technologies: ["Next.js", "Tailwind CSS", "API Integration"],
    features: [
      "Recipe search",
      "Recipe saving",
      "Recipe categorization",
      "Nutrition information",
      "User authentication"
    ],
    github: "https://github.com/Avijitdam98/food_app",
    live: "https://food-app-navy.vercel.app/",
    image: {
      src: "/images/projects/food-app.webp",
      gradient: {
        from: "#06B6D4",
        via: "#0EA5E9",
        to: "#2563EB"
      }
    },
    icon: Utensils,
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    stats: {
      stars: 9,
      forks: 2
    }
  },
  {
    title: "E-Commerce Platform",
    description:
      "Modern, responsive e-commerce platform with seamless shopping experience",
    technologies: ["React", "Redux", "Firebase", "Tailwind CSS"],
    features: [
      "Product catalog",
      "Shopping cart",
      "Checkout process",
      "Order management",
      "User authentication"
    ],
    github: "https://github.com/Avijitdam98/ecommerce_site_clone",
    live: "https://ecommerce-site-clone.pages.dev/",
    image: {
      src: "/images/projects/ecommerce.webp",
      gradient: {
        from: "#F43F5E",
        via: "#EC4899",
        to: "#7C3AED"
      }
    },
    icon: ShoppingCart,
    gradient: "from-rose-500 via-pink-500 to-purple-600",
    stats: {
      stars: 11,
      forks: 6
    }
  },
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        delay: index * 0.1,
        duration: 0.5
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-gray-900/60 backdrop-blur-lg border border-gray-800 hover:border-gray-700 transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
        <ProjectImage
          src={project.image.src}
          alt={project.title}
          gradient={project.image.gradient}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
          className="absolute top-4 left-4 z-20 flex items-center gap-4"
        >
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{project.stats.stars}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
            <GitFork className="w-4 h-4 text-blue-500" />
            <span>{project.stats.forks}</span>
          </div>
        </motion.div>

        {/* Project Icon */}
        <div className={`absolute top-4 right-4 z-20 bg-gradient-to-br ${project.gradient} p-3 rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110`}>
          <project.icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="p-6">
        {/* Title with gradient on hover */}
        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 text-sm text-white rounded-full bg-gradient-to-r ${project.gradient} opacity-80 hover:opacity-100 transition-all duration-300`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Features List */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-gray-400"
                  >
                    <Code className="w-4 h-4 text-blue-400" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Links */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
          <motion.button
            onClick={() => setShowFeatures(!showFeatures)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:${project.gradient} transition-all duration-300`}
          >
            <Eye className="w-4 h-4" />
            <span>{showFeatures ? "Hide Features" : "View Features"}</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:${project.gradient} transition-all duration-300 group/link`}
            >
              <Github className="w-4 h-4 transition-transform duration-300 group-hover/link:rotate-[360deg]" />
              <span>Code</span>
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:${project.gradient} transition-all duration-300 group/link`}
            >
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              <span>Demo</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-black min-h-screen">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-80 bg-gradient-to-br from-gray-900 via-[#0f1729] to-black animate-gradient"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-1"
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl font-black text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-4 animate-gradient-x"
          >
            Innovative Projects
          </motion.h2>
          <p className="text-lg text-gray-400 md:text-xl">
            Showcasing my latest work and technical expertise
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
