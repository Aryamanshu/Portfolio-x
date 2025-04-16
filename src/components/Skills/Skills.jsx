import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import styles from "./Skills.module.css";
import { skillsData } from "../../data/skillsData";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiTool,
  FiLayers,
  FiMonitor
} from "react-icons/fi";

export const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [50, 0, 0, 30]);

  // State for active category tab
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryIcons = {
    frontend: <FiMonitor size={24} />,
    backend: <FiServer size={24} />,
    databases: <FiDatabase size={24} />,
    tools: <FiTool size={24} />,
    all: <FiLayers size={24} />
  };

  // Get all categories including 'all'
  const categories = ['all', ...Object.keys(skillsData)];

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all'
    ? Object.entries(skillsData).flatMap(([_, categoryData]) => categoryData.skills)
    : skillsData[activeCategory]?.skills || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.1
      }
    }),
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 }
    }
  };



  return (
    <motion.section
      ref={sectionRef}
      className={styles.container}
      id="skills"
      style={{ opacity, y }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={styles.header}
      >
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A comprehensive overview of my technical expertise and proficiency
        </motion.p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        className={styles.tabs}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`${styles.tabButton} ${activeCategory === category ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveCategory(category)}
            variants={tabVariants}
            animate={activeCategory === category ? 'active' : 'inactive'}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {categoryIcons[category]}
            <span style={{ marginLeft: '8px' }}>
              {category === 'all' ? 'All Skills' : skillsData[category].title}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {activeCategory !== 'all' && (
          <motion.div
            key={activeCategory}
            className={styles.categorySection}
            variants={categoryVariants}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIcon}>
                {categoryIcons[activeCategory]}
              </span>
              <h3 className={styles.categoryTitle}>
                {skillsData[activeCategory].title}
              </h3>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            className={styles.skillsGrid}
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredSkills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                className={styles.skillCard}
                variants={skillCardVariants}
                custom={skillIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className={styles.skillHeader}>
                  <motion.div
                    className={styles.skillIconContainer}
                    whileHover={{
                      rotate: 5,
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={styles.skillIcon}
                    />
                  </motion.div>
                  <h4 className={styles.skillName}>{skill.name}</h4>
                </div>

                <div className={styles.skillInfo}>
                  <p className={styles.skillDescription}>
                    {skill.description || `Experienced with ${skill.name} for building ${activeCategory === 'frontend' ? 'user interfaces' : activeCategory === 'backend' ? 'server-side applications' : activeCategory === 'databases' ? 'data storage solutions' : 'development workflows'}.`}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};
