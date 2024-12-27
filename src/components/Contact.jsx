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

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" 
             style={{ backgroundSize: '14px 24px' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-30 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-400"
                      required
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        layoutId="input-focus"
                        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-400"
                      required
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        layoutId="input-focus"
                        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Message"
                      rows="4"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-gray-400 resize-none"
                      required
                    />
                    {focusedField === 'message' && (
                      <motion.div
                        layoutId="input-focus"
                        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 text-white font-medium transition-all ${
                    isSubmitting
                      ? 'bg-purple-500/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-4 rounded-lg ${
                      submitStatus === 'success'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Message sent successfully!'
                      : 'Failed to send message. Please try again.'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 group transition-all hover:bg-white/10"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${info.color} mr-4`}>
                    {info.icon}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {info.text}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-lg bg-gradient-to-r ${social.color} text-white hover:shadow-lg transition-all`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
