import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink, FiInfo, FiArrowRight } from "react-icons/fi";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({
  project: { title, description, skills, demo, source, imageSrc },
  isShowcase
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Simplified animation variants for better performance
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Animation for skills with staggered delay
  const skillVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: i * 0.03
      }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${isShowcase ? styles.showcaseCard : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Project Image with Overlay */}
      <div className={styles.imageContainer}>
        <img
          src={`/assets/${imageSrc}` || '/assets/projects/project.png'}
          alt={`${title} project screenshot`}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="View live demo"
            >
              <FiExternalLink size={16} />
            </a>
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="View source code"
            >
              <FiGithub size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className={styles.content}>
        <motion.h3
          className={styles.title}
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {title}
        </motion.h3>
        <motion.p
          className={styles.description}
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>

        {/* Skills */}
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <motion.span
              key={id}
              className={styles.skill}
              variants={skillVariants}
              custom={id}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Links for mobile */}
      <div className={styles.mobileLinks}>
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileLink}
        >
          <FiExternalLink size={16} /> <span>Demo</span>
        </a>
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileLink}
        >
          <FiGithub size={16} /> <span>Code</span>
        </a>
      </div>
    </motion.div>
  );
};