import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-gradient-to-br from-gray-800 via-black to-gray-900 animate-fadeIn">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Personal Branding */}
          <div className="mb-6 text-center md:mb-0 md:text-left">
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Avijit Dam
            </h3>
            <p className="mt-2 text-lg tracking-wide text-gray-400">
              Building digital experiences with passion
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex mt-6 space-x-6 md:mt-0">
            <a
              href="https://github.com/your-username"
              className="transition-transform transform hover:scale-110 hover:text-blue-500"
              aria-label="Github"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/your-username"
              className="transition-transform transform hover:scale-110 hover:text-blue-500"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="https://twitter.com/your-username"
              className="transition-transform transform hover:scale-110 hover:text-blue-500"
              aria-label="Twitter"
            >
              <FaTwitter size={26} />
            </a>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-800 md:flex-row">
          <div className="mb-4 text-sm text-center text-gray-400 md:mb-0 md:text-left">
            &copy; {new Date().getFullYear()} Avijit Dam. All rights reserved.
          </div>

          <nav className="flex mt-4 space-x-6 md:mt-0">
            <a
              href="#hero"
              className="text-gray-400 transition-colors transform hover:text-white hover:scale-105"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-400 transition-colors transform hover:text-white hover:scale-105"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-400 transition-colors transform hover:text-white hover:scale-105"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-400 transition-colors transform hover:text-white hover:scale-105"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
