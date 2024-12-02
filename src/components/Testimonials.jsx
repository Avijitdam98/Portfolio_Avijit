import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      title: "CEO, XYZ Company",
      quote:
        "Avijit is an incredible developer! His work on our project was exceptional.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      title: "Product Manager, ABC Inc.",
      quote:
        "Amazing problem-solving skills. Always delivers on time and exceeds expectations.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Mark Wilson",
      title: "CTO, Tech Solutions",
      quote:
        "One of the best developers I've worked with. Very professional and highly skilled.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-12 bg-gray-100 dark:bg-gray-800 dark:text-white"
    >
      <h2 className="mb-6 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        What People Say
      </h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-700 dark:shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-gray-500 dark:text-gray-300">
                  {testimonial.title}
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-200">
              {testimonial.quote}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
