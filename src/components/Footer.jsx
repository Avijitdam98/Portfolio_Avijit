import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, Mail, Phone, ArrowRight, ArrowUp, ExternalLink, MapPin, Calendar, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/Avijitdam98',
      label: 'GitHub',
      color: 'hover:text-gray-400',
      hoverBg: 'group-hover:bg-gray-800',
      tooltip: 'Check out my repositories'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/in/avijit-dam-b12221213',
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
      hoverBg: 'group-hover:bg-blue-600',
      tooltip: 'Connect with me on LinkedIn'
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: 'https://twitter.com/AvijitDam98',
      label: 'Twitter',
      color: 'hover:text-sky-400',
      hoverBg: 'group-hover:bg-sky-600',
      tooltip: 'Follow me on Twitter'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:avijitdam003@gmail.com',
      label: 'Email',
      color: 'hover:text-purple-400',
      hoverBg: 'group-hover:bg-purple-600',
      tooltip: 'Send me an email'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: 'tel:+919593189913',
      label: 'Phone',
      color: 'hover:text-green-400',
      hoverBg: 'group-hover:bg-green-600',
      tooltip: 'Call me'
    }
  ];

  const footerLinks = [
    { label: 'Home', href: '#hero', icon: <Code className="w-4 h-4" /> },
    { label: 'About', href: '#about', icon: <ExternalLink className="w-4 h-4" /> },
    { label: 'Experience', href: '#work-experience', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Projects', href: '#projects', icon: <Github className="w-4 h-4" /> },
    { label: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`relative mt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" 
             style={{ backgroundSize: '14px 24px' }} />
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Enhanced Top Border with Gradient Animation */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="container mx-auto px-4">
        {/* Enhanced Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute right-8 -top-6 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          <motion.div
            className="absolute inset-0 rounded-full bg-white opacity-25"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Enhanced Brand Section */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.div className="relative inline-block group">
              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Avijit Dam
              </motion.h3>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer passionate about creating beautiful and functional web applications.
            </p>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  className="relative"
                  onHoverStart={() => setHoveredLink(link.label)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-2 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'} transition-all duration-300`}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`text-gray-600 dark:text-gray-400 transition-colors duration-300 ${link.color}`}>
                      {link.icon}
                    </span>
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-10"
                      initial={false}
                      whileHover={{ 
                        background: `linear-gradient(90deg, transparent, ${link.hoverBg})`,
                        opacity: 0.1 
                      }}
                    />
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
                    />
                  </motion.a>
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -8 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap"
                      >
                        {link.tooltip}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quick Links */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  variants={itemVariants}
                >
                  <motion.a
                    href={link.href}
                    className={`group flex items-center space-x-2 text-sm ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-colors duration-300 relative overflow-hidden rounded-lg p-2`}
                    whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  >
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="text-blue-500"
                    >
                      {link.icon}
                    </motion.span>
                    <span>{link.label}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Get in Touch</h4>
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              <motion.a 
                href="mailto:avijitdam003@gmail.com"
                className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-lg relative overflow-hidden"
                whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15 }}
                  className="text-blue-500"
                >
                  <Mail className="w-4 h-4" />
                </motion.span>
                <span>avijitdam003@gmail.com</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-blue-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a 
                href="tel:+919593189913"
                className="group flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 p-2 rounded-lg relative overflow-hidden"
                whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15 }}
                  className="text-green-500"
                >
                  <Phone className="w-4 h-4" />
                </motion.span>
                <span>+91 9593189913</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-green-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.div
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 p-2 rounded-lg"
              >
                <motion.span
                  animate={{ 
                    y: [0, -2, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-red-500"
                >
                  <MapPin className="w-4 h-4" />
                </motion.span>
                <span>India</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Copyright Section */}
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-800/10 dark:border-gray-700/50"
          variants={itemVariants}
        >
          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} group`}>
            {currentYear} Avijit Dam. Made with{' '}
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-block text-red-500 group-hover:text-pink-500"
            >
              <Heart className="w-4 h-4 inline-block" />
            </motion.span>
            {' '}in{' '}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.1 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-white to-green-500 text-transparent bg-clip-text">
                India
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-white/20 to-green-500/20 blur-sm"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
