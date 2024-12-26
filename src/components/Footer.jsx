import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, Mail, Phone, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/Avijitdam98',
      label: 'GitHub',
      color: 'hover:text-gray-400',
      hoverBg: 'group-hover:bg-gray-800'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/in/avijit-dam-b12221213',
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
      hoverBg: 'group-hover:bg-blue-600'
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: 'https://twitter.com/AvijitDam98',
      label: 'Twitter',
      color: 'hover:text-sky-400',
      hoverBg: 'group-hover:bg-sky-600'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:avijitdam003@gmail.com',
      label: 'Email',
      color: 'hover:text-purple-400',
      hoverBg: 'group-hover:bg-purple-600'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: 'tel:+919593189913',
      label: 'Phone',
      color: 'hover:text-green-400',
      hoverBg: 'group-hover:bg-green-600'
    }
  ];

  const footerLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#work-experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      className={`relative mt-20 ${
        isDark ? 'bg-gray-900' : 'bg-gray-100'
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Avijit Dam
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer passionate about creating beautiful and functional web applications.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} relative inline-block`}>
              Quick Links
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={index} 
                  className="relative overflow-hidden group"
                  whileHover={{ x: 10 }}
                >
                  <a
                    href={link.href}
                    className={`text-sm flex items-center space-x-1 ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-colors relative`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <motion.div
                      className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                        isDark ? 'bg-white' : 'bg-gray-900'
                      } group-hover:w-full transition-all duration-300`}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} relative inline-block`}>
              Connect With Me
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-2 rounded-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ${link.color} transition-all duration-300`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                  <motion.span
                    className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 ${link.hoverBg} transition-all duration-300`}
                  />
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className={`mt-12 pt-8 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}
        >
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentYear} Avijit Dam. All rights reserved.
            </span>
          </div>
          
          <motion.div 
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Made with
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
            </motion.div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              in India
            </span>
            <motion.div
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 group-hover:w-full transition-all duration-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
