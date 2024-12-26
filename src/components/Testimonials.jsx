import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Testimonials = () => {
  const { isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "John Doe",
      role: "Senior Developer at Tech Corp",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      content: "Working with Avijit was a fantastic experience. His attention to detail and problem-solving skills are exceptional. He consistently delivered high-quality code and was always ready to tackle new challenges.",
      rating: 5
    },
    {
      name: "Sarah Smith",
      role: "Project Manager at Digital Solutions",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "Avijit is an exceptional developer who brings both technical expertise and creative thinking to every project. His ability to understand complex requirements and translate them into elegant solutions is remarkable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO at StartUp Inc",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: "I've had the pleasure of working with Avijit on several projects. His dedication to quality and ability to meet deadlines while maintaining high standards is impressive. A true professional!",
      rating: 5
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setIsAutoPlaying(false);
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  return (
    <section id="testimonials" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent inline-block"
            whileHover={{ scale: 1.05 }}
          >
            What People Say
          </motion.h2>
          <motion.p 
            className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Testimonials from people I've worked with
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto perspective">
          <div className="relative h-[400px] md:h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  rotateY: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className={`absolute w-full ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-2xl p-6 md:p-8 shadow-xl will-change-transform`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-tl-2xl rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-br-2xl rounded-tl-full" />

                <div className="relative flex flex-col items-center text-center">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <Quote className={`w-10 h-10 md:w-12 md:h-12 ${
                      isDark ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-base md:text-lg mb-6 md:mb-8 relative z-10 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    "{testimonials[activeIndex].content}"
                  </motion.p>

                  {/* Rating */}
                  <motion.div 
                    className="flex gap-1 mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-current text-yellow-400"
                      />
                    ))}
                  </motion.div>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75 blur-md"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <motion.img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full relative border-2 border-white dark:border-gray-800"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      />
                    </div>
                    <h4 className={`font-semibold text-base md:text-lg mt-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className={`text-sm md:text-base ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {testimonials[activeIndex].role}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className={`z-10 p-2 md:p-3 rounded-full ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              } shadow-lg transform -translate-x-2 md:-translate-x-6 transition-all duration-300 hover:shadow-xl focus:outline-none group`}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className={`z-10 p-2 md:p-3 rounded-full ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              } shadow-lg transform translate-x-2 md:translate-x-6 transition-all duration-300 hover:shadow-xl focus:outline-none group`}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? isDark
                      ? 'bg-blue-500 w-8'
                      : 'bg-blue-600 w-8'
                    : isDark
                    ? 'bg-gray-700 w-2 hover:bg-gray-600'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`mt-6 px-4 py-2 rounded-full text-sm ${
              isDark
                ? isAutoPlaying ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'
                : isAutoPlaying ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            } transition-colors mx-auto block`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? 'Pause Auto-play' : 'Start Auto-play'}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
