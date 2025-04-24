import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiDownload, FiMousePointer } from "react-icons/fi";
import styles from "./Hero.module.css";
import heroImage from "../../../assets/hero/hacker2.png";

export const Hero = () => {
  const sectionRef = useRef(null);

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <section ref={sectionRef} className={styles.container}>
      {/* Background Elements */}
      <motion.div className={styles.topBlur} style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} />
      <motion.div className={styles.bottomBlur} style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }} />

      {/* Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ y: contentY }}
      >
        <motion.div
          className={styles.preTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hello, I'm
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Aryamanshu Mishra
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          A <span className={styles.highlight}>full-stack developer</span> passionate about creating impactful web applications with modern technologies. I focus on building responsive, user-friendly interfaces and robust backend systems.
        </motion.p>

        <motion.div
          className={styles.buttonContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <motion.a
            href="#contact"
            className={styles.contactBtn}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me <FiArrowRight />
          </motion.a>

          <div className={styles.socialLinks}>
            <motion.a
              href="https://github.com/Aryamanshu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub Profile"
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/aryamanshu-mishra-0ab5ab247/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin />
            </motion.a>
            <motion.a
              href="/Resume.pdf"
              className={styles.socialLink}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Download Resume"
              download="Aryamanshu Mishra Resume.pdf"
            >
              <FiDownload />
            </motion.a>

          </div>
        </motion.div>
      </motion.div>

      {/* Hero Image with Container */}
      <motion.div
        className={styles.heroImgContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{ y: imageY }}
      >
        <div className={styles.imgGlow} />
        <div className={styles.imgBorder} />
        <motion.img
          src={heroImage}
          alt="Aryamanshu Mishra - Full Stack Developer"
          className={styles.heroImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};