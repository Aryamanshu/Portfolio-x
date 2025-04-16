import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FiCode, FiServer, FiLayout, FiUser, FiArrowRight, FiExternalLink } from "react-icons/fi";
import styles from "./About.module.css";
import aboutImage from "../../../assets/about/boy.png";

export const About = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8]);

  const skills = [
    {
      title: "Frontend Developer",
      description: "I build responsive and optimized web applications using modern frameworks like React.",
      icon: <FiCode size={24} />
    },
    {
      title: "Backend Developer",
      description: "I develop fast and optimized back-end systems and APIs using Node.js and other technologies.",
      icon: <FiServer size={24} />
    },
    {
      title: "UI Designer",
      description: "I design intuitive user interfaces and create comprehensive design systems.",
      icon: <FiLayout size={24} />
    },
    {
      title: "Problem Solver",
      description: "I enjoy tackling complex problems and finding elegant solutions through code.",
      icon: <FiUser size={24} />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 0.6,
      scale: 1.1,
      transition: { duration: 1, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <motion.section
      ref={ref}
      className={styles.container}
      id="about"
      style={{ opacity, scale }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={styles.header}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.titleLine}
        />
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences.
        </motion.p>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className={styles.imageContainer}
        >
          <motion.div
            className={styles.imageGlow}
            variants={glowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={styles.imageFrame}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.div className={`${styles.imageDecoration} ${styles.decoration1}`} />
          <motion.div className={`${styles.imageDecoration} ${styles.decoration2}`} />
          <motion.img
            src={aboutImage}
            alt="Me sitting with a laptop"
            className={styles.aboutImage}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
          />
          <motion.div
            className={styles.imageBadge}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span>Full Stack</span>
            <span>Developer</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className={styles.skillsContainer}
        >
          <motion.h3
            variants={itemVariants}
            className={styles.skillsTitle}
          >
            My Expertise
          </motion.h3>

          <div className={styles.skillsList}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={styles.skillItem}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className={styles.iconContainer}
                  whileHover={{
                    rotate: [0, -10, 10, -5, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  {skill.icon}
                </motion.div>
                <div className={styles.skillContent}>
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#projects"
            className={styles.projectsLink}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            View my projects <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};