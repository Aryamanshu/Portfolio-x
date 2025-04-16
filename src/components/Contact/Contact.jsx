import React, { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiSend, FiUser, FiMessageSquare, FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";
import styles from "./Contact.module.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isFormInView = useInView(formRef, { once: false, amount: 0.3 });

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData);
    alert("Thanks for your message! This is a demo, so no actual message was sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactLinks = [
    {
      icon: <FiMail size={24} />,
      text: "aryamanshumishra@gmail.com",
      href: "mailto:aryamanshumishra@gmail.com",
      color: "rgba(239, 68, 68, 0.2)",
      iconColor: "rgb(239, 68, 68)",
      label: "Email"
    },
    {
      icon: <FiLinkedin size={24} />,
      text: "linkedin.com/in/aryamanshu",
      href: "https://www.linkedin.com/in/aryamanshu-mishra-0ab5ab247/",
      color: "rgba(59, 130, 246, 0.2)",
      iconColor: "rgb(59, 130, 246)",
      label: "LinkedIn"
    },
    {
      icon: <FiGithub size={24} />,
      text: "github.com/Aryamanshu",
      href: "https://github.com/Aryamanshu",
      color: "rgba(168, 85, 247, 0.2)",
      iconColor: "rgb(168, 85, 247)",
      label: "GitHub"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.footer
      id="contact"
      ref={sectionRef}
      className={styles.container}
      style={{ y, opacity }}
    >
      <div>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scaleIn}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: false }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Feel free to reach out if you have any questions or want to work together!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div
              className={styles.formContainer}
              animate={isFormInView ? {
                boxShadow: ["0 20px 50px rgba(0, 0, 0, 0.25)", "0 25px 55px rgba(0, 0, 0, 0.3)", "0 20px 50px rgba(0, 0, 0, 0.25)"]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              <h3 className={styles.formTitle}>Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                <motion.div
                  className={styles.inputGroup}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: false }}
                >
                  <label className={styles.label}>
                    <FiUser /> Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div
                  className={styles.inputGroup}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  <label className={styles.label}>
                    <FiMail /> Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="john@example.com"
                  />
                </motion.div>
                <motion.div
                  className={styles.inputGroup}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  <label className={styles.label}>
                    <FiMessageSquare /> Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className={styles.textarea}
                    placeholder="Hello, I'd like to discuss a project..."
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: false }}
                >
                  <FiSend /> Send Message <FiArrowRight />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className={styles.formTitle}>Connect With Me</h3>

            <motion.div
              className={styles.connectContainer}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <p className={styles.connectText}>
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out through any of these platforms:
              </p>

              <motion.div
                className={styles.socialGrid}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                    style={{ backgroundColor: link.color }}
                    variants={fadeInUp}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                      backgroundColor: link.color.replace('0.2', '0.3'),
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={styles.socialIcon}
                      style={{ color: link.iconColor }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {link.icon}
                    </motion.div>
                    <span className={styles.socialLabel}>{link.label}</span>
                    <span className={styles.socialText}>{link.text}</span>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                className={styles.availabilityBadge}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={styles.availabilityDot}></span>
                <span>Available for freelance projects</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: false }}
        >
          <p>© {new Date().getFullYear()} Aryamanshu Mishra. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};