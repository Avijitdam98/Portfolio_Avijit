import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Education from "./components/Education";
import WorkExperience from "./components/WorkExperience";

import Testimonials from "./components/Testimonials";

const App = () => {
  const [theme, setTheme] = useState("dark"); // Default to dark mode

  // Set theme based on user preference or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // If no theme is saved, default to dark
    if (!savedTheme) {
      document.documentElement.classList.add("dark");
    } else {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // Toggle dark/light mode and store preference
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save preference in localStorage
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Dark/Light Mode Button */}
      <button
        onClick={toggleTheme}
        className="fixed z-50 p-3 text-lg text-gray-900 transition-all duration-300 bg-gray-200 rounded-full shadow-md top-4 right-4 dark:bg-gray-800 dark:text-white hover:scale-110"
        style={{
          zIndex: 9999, // Ensures button stays on top of other content
        }}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* Sections */}
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="testimonial">
        <Testimonials /> {/* Testimonial Section */}
      </div>
      <div id="education">
        <Education />
      </div>
      <div id="work-experience">
        <WorkExperience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default App;
