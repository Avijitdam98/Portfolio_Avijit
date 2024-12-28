import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  Folder,
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
      src: "/Portfolio_Avijit/images/projects/project-management.webp",
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
      src: "/Portfolio_Avijit/images/projects/invoice-generator.webp",
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
      src: "/Portfolio_Avijit/images/projects/project-management.webp",
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
      src: "/Portfolio_Avijit/images/projects/food-app.webp",
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
      src: "/Portfolio_Avijit/images/projects/ecommerce.webp",
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
  const cardRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden group"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Project Image with Enhanced Animations */}
        <motion.div
          className="relative mb-6 overflow-hidden rounded-xl group/image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="relative aspect-video overflow-hidden rounded-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ProjectImage
              src={project.image.src}
              alt={project.title}
              gradient={project.image.gradient}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover/image:scale-110"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {/* Floating Action Buttons on Image */}
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover/image:opacity-100 transition-all duration-500 translate-y-4 group-hover/image:translate-y-0"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30 text-white"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-white"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Project Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
          className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 relative group"
        >
          <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <project.icon className="w-6 h-6 text-white relative z-10" />
          </div>
        </motion.div>

        {/* Project Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all"
        >
          {project.title}
        </motion.h3>

        {/* Project Description */}
        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-300 border border-white/5 hover:border-white/20 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Features List */}
        <div className="space-y-2 mb-6">
          {project.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300"
            >
              <Code className="w-4 h-4 text-blue-400" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Project Links with Enhanced Animations */}
        <div className="flex items-center gap-4 mt-6">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group/btn relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <Github className="w-5 h-5 text-white relative z-10" />
            <span className="text-white font-medium relative z-10">Source Code</span>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl relative overflow-hidden group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <ExternalLink className="w-5 h-5 text-white relative z-10" />
            <span className="text-white font-medium relative z-10">Live Demo</span>
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
            />
          </motion.a>
        </div>

        {/* Project Stats */}
        <div className="absolute top-6 right-6 flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{project.stats.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{project.stats.forks}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      id="projects"
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
              <Folder className="w-10 h-10 text-white relative z-10" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A showcase of my latest work and technical expertise.
          </motion.p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
