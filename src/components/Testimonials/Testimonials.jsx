import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi";
import testimonials from "../../data/testimonials.json";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="section-container py-20 bg-dark/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">What People Say</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Feedback from clients and colleagues
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Testimonial Carousel */}
        <div className="overflow-hidden relative rounded-2xl bg-gradient-to-br from-primary/10 to-dark/50 p-1">
          <div className="bg-dark/60 rounded-xl p-8 md:p-12">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <FiMessageSquare className="text-4xl" />
              </div>
            </div>

            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <blockquote className="text-xl md:text-2xl italic mb-8">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-bold">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={handlePrev}
                className="p-3 rounded-full bg-primary/20 text-white hover:bg-primary/40 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft className="text-xl" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="p-3 rounded-full bg-primary/20 text-white hover:bg-primary/40 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary w-6" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
