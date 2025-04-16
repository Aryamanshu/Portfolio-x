import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import styles from "./Education.module.css";
import education from "../../data/education.json";
import { FiBookOpen, FiCalendar, FiCheck, FiMapPin, FiAward, FiExternalLink } from "react-icons/fi";

export const Education = () => {
  const sectionRef = useRef(null);
  useInView(sectionRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [50, 0, 0, 30]);

  // Timeline animation refs
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.1 });

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1 + 0.3
      }
    })
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.container}
      id="education"
      style={{ opacity, y }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={styles.header}
      >
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My academic journey and educational background
        </motion.p>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.educationSection}
          ref={timelineRef}
        >
          <motion.h3
            variants={itemVariants}
            className={styles.sectionTitle}
          >
            Academic Journey
          </motion.h3>

          <motion.div
            className={styles.timeline}
            variants={timelineVariants}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
          >
            <motion.div
              className={styles.timelineLine}
              initial={{ height: 0 }}
              animate={{ height: timelineInView ? "100%" : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {education.map((eduItem, id) => {
              const eduImageUrl = `/assets/${eduItem.imageSrc}`;
              return (
                <motion.div
                  key={id}
                  custom={id}
                  variants={timelineItemVariants}
                  className={styles.timelineItem}
                >
                  <motion.div
                    className={styles.timelineDot}
                    initial={{ scale: 0 }}
                    animate={{ scale: timelineInView ? 1 : 0 }}
                    transition={{ delay: id * 0.2 + 0.5, duration: 0.5 }}
                  />

                  <motion.div
                    className={styles.timelineCard}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className={styles.timelineHeader}>
                      <div className={styles.institutionLogo}>
                        <img
                          src={eduImageUrl}
                          alt={`${eduItem.institution} Logo`}
                        />
                      </div>
                      <div className={styles.educationInfo}>
                        <h4 className={styles.degreeTitle}>{eduItem.degree}</h4>
                        <div className={styles.institutionInfo}>
                          <FiBookOpen className={styles.icon} />
                          <span>{eduItem.institution}</span>
                        </div>
                        <div className={styles.institutionInfo}>
                          <FiMapPin className={styles.icon} />
                          <span>{eduItem.location}</span>
                        </div>
                        <div className={styles.dateInfo}>
                          <FiCalendar className={styles.icon} />
                          <span>{`${eduItem.startDate} - ${eduItem.endDate}`}</span>
                        </div>
                        <div className={styles.educationMeta}>
                          {(eduItem.cgpa || eduItem.percentage) && (
                            <motion.div
                              className={styles.gpaInfo}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            >
                              <span className={styles.gpaLabel}>{eduItem.cgpa ? 'CGPA:' : 'Percentage:'}</span>
                              <span className={styles.gpaValue}>{eduItem.cgpa || eduItem.percentage}</span>
                            </motion.div>
                          )}

                          {eduItem.certificateLink && (
                            <motion.a
                              href={eduItem.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.certificateLink}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4, duration: 0.5 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <FiAward className={styles.certificateIcon} />
                              <span>View Certificate</span>
                              <FiExternalLink size={14} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>

                    <ul className={styles.achievements}>
                      {eduItem.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          className={styles.achievementItem}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                        >
                          <FiCheck className={styles.checkIcon} />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
