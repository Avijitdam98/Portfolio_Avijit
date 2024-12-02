import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!formData.message) {
      toast.error("Please enter your message.");
      return;
    }

    const templateParams = {
      to_name: "Avijit Dam",
      from_name: formData.name,
      message: formData.message,
      reply_to: formData.email,
    };

    emailjs
      .send(
        "service_h9twkwv", // Replace with your EmailJS Service ID
        "template_inn1k6e", // Replace with your EmailJS Template ID
        templateParams,
        "CYGqw-jeKJp9xKm76" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (err) => {
          console.error("FAILED...", err);
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 via-black to-gray-900">
      <div className="container px-6 mx-auto text-white">
        <h2 className="mb-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
          Contact Me
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column: Contact Info */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold">Contact Information</h3>
            <p className="mb-4 text-lg text-gray-400">
              Reach out to me anytime! I'm available via email, phone, or social
              media.
            </p>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-center">
                <FaPhone className="text-pink-500" />
                <a
                  href="tel:+919593189913"
                  className="ml-4 text-lg hover:text-pink-500"
                >
                  +91 9593189913
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-pink-500" />
                <a
                  href="mailto:avijitdam003@gmail.com"
                  className="ml-4 text-lg hover:text-pink-500"
                >
                  avijitdam003@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-pink-500" />
                <a
                  href="https://www.google.com/maps/place/Kolkata,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-lg hover:text-pink-500"
                >
                  Kolkata, India
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex mt-8 space-x-6">
              <a
                href="#"
                className="transition-transform transform hover:scale-110 hover:text-blue-500"
                aria-label="Github"
              >
                <FaGithub size={26} />
              </a>
              <a
                href="#"
                className="transition-transform transform hover:scale-110 hover:text-blue-500"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={26} />
              </a>
              <a
                href="#"
                className="transition-transform transform hover:scale-110 hover:text-blue-500"
                aria-label="Twitter"
              >
                <FaTwitter size={26} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your Message"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-lg text-white transition-all rounded-md shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </section>
  );
};

export default Contact;
