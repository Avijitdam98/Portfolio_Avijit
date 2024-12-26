import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      text: '+91 9593189913',
      href: 'tel:+919593189913',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: 'avijitdam003@gmail.com',
      href: 'mailto:avijitdam003@gmail.com',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: 'Kolkata, West Bengal, India',
      href: 'https://maps.google.com/?q=Kolkata,West Bengal,India',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      href: 'https://github.com/Avijitdam98',
      label: 'GitHub',
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://linkedin.com/in/avijit-dam-b12221213',
      label: 'LinkedIn',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      href: 'https://twitter.com/AvijitDam98',
      label: 'Twitter',
      color: 'from-sky-400 to-sky-600'
    }
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
    <div id="contact" className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="container max-w-6xl mx-auto py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div className="space-y-8">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Get in Touch
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    isDark 
                      ? 'bg-gray-800/50 hover:bg-gray-800' 
                      : 'bg-gray-100/50 hover:bg-gray-100'
                  } transition-colors group backdrop-blur-sm`}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${info.color} group-hover:scale-110 transition-transform`}
                  >
                    {info.icon}
                  </motion.div>
                  <span className="font-medium">{info.text}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="flex gap-4 mt-8"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-gradient-to-r ${link.color} text-white hover:shadow-lg transition-shadow`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={containerVariants} className="space-y-4">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name' },
                { name: 'email', type: 'email', placeholder: 'Your Email' }
              ].map((field) => (
                <motion.div
                  key={field.name}
                  variants={itemVariants}
                  className="relative"
                >
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    required
                    className={`w-full p-4 rounded-lg outline-none ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-700 focus:border-blue-500' 
                        : 'bg-gray-100/50 border-gray-200 focus:border-blue-600'
                    } border-2 transition-all backdrop-blur-sm`}
                  />
                  {focusedField === field.name && (
                    <motion.div
                      layoutId="focus-border"
                      className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  required
                  rows="6"
                  className={`w-full p-4 rounded-lg outline-none resize-none ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 focus:border-blue-500' 
                      : 'bg-gray-100/50 border-gray-200 focus:border-blue-600'
                  } border-2 transition-all backdrop-blur-sm`}
                />
                {focusedField === 'message' && (
                  <motion.div
                    layoutId="focus-border"
                    className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all ${
                isSubmitting ? 'opacity-70' : 'hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSubmitting ? 'submitting' : 'idle'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Status Messages */}
            <AnimatedStatus status={submitStatus} />
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedStatus = ({ status }) => {
  if (!status) return null;

  const statusConfig = {
    success: {
      message: 'Message sent successfully! I will get back to you soon.',
      className: 'from-green-500 to-emerald-500',
    },
    error: {
      message: 'Failed to send message. Please try again.',
      className: 'from-red-500 to-pink-500',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`bg-gradient-to-r ${config.className} text-white p-4 rounded-lg text-center mt-4`}
    >
      {config.message}
    </motion.div>
  );
};

export default Contact;
