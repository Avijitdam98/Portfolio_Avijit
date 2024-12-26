import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedCursor from './components/AnimatedCursor';
import ParallaxBackground from './components/ParallaxBackground';
import ScrollProgress from './components/ScrollProgress';
import NavigationMenu from './components/NavigationMenu';
import ThemeToggle from './components/ThemeToggle';
import ThemePreference from './components/ThemePreference';
import Loading from './components/Loading';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Contact from './components/Contact';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen transition-colors duration-300"
        >
          <AnimatedCursor />
          <ThemePreference />
          <ThemeToggle />
          
          <Suspense fallback={<Loading />}>
            <div className="relative bg-black text-white min-h-screen">
              <ParallaxBackground />
              <ScrollProgress />
              <NavigationMenu />

              <AnimatePresence mode="wait">
                <motion.main
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <section id="hero" className="min-h-screen">
                    <Hero />
                  </section>

                  <section id="about" className="min-h-screen">
                    <About />
                  </section>

                  <section id="education" className="min-h-screen">
                    <Education />
                  </section>

                  <section id="work-experience" className="min-h-screen">
                    <WorkExperience />
                  </section>

                  <section id="projects" className="min-h-screen">
                    <Projects />
                  </section>

                  <section id="testimonial" className="min-h-screen">
                    <Testimonials />
                  </section>

                  <section id="contact" className="min-h-screen">
                    <Contact />
                  </section>
                </motion.main>
              </AnimatePresence>

              <ScrollToTopButton />
              <Footer />
            </div>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
