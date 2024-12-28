import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Navigation from './Navigation';
import ScrollToTopButton from './ScrollToTopButton';
import AnimatedCursor from './AnimatedCursor';
import ParallaxBackground from './ParallaxBackground';
import ScrollIndicator from './ScrollIndicator';
import Education from './Education';
import WorkExperience from './WorkExperience';

const MainLayout = () => {
  return (
    <div className="relative">
      <Navigation />
      <AnimatedCursor />
      <ParallaxBackground />
      <ScrollIndicator />
      <main>
        <Hero />
        <About />
        <Education />
        <WorkExperience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
