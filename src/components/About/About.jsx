import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { FiCode, FiServer, FiLayout, FiUser, FiArrowRight, FiExternalLink, FiBriefcase, FiAward } from "react-icons/fi";
import styles from "./About.module.css";
import aboutImage from "../../../assets/about/boy.png";

// Particle component for background effect
const Particle = ({ index }) => {
  const size = Math.random() * 4 + 2;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  return (
    <motion.div
      className={styles.particle}
      style={{
        width: size,
        height: size,
        x: `${initialX}%`,
        y: `${initialY}%`,
        opacity: Math.random() * 0.5 + 0.3
      }}
      animate={{
        y: [`${initialY}%`, `${initialY + (Math.random() * 20 - 10)}%`],
        x: [`${initialX}%`, `${initialX + (Math.random() * 20 - 10)}%`],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay
      }}
    />
  );
};

// Typing text animation component
const TypedText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView && !isTyping && currentIndex < text.length) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        setIsTyping(false);
      }, 50); // Speed of typing
      return () => clearTimeout(timeout);
    }

    if (!isInView) {
      setDisplayedText('');
      setCurrentIndex(0);
    }
  }, [isInView, currentIndex, isTyping, text]);

  return (
    <motion.span
      ref={inViewRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayedText}
      {isInView && currentIndex < text.length && (
        <span className={styles.cursor}>|</span>
      )}
    </motion.span>
  );
};

export const About = () => {
  const ref = React.useRef(null);
  const imageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8]);

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => i);

  // 3D parallax effect for the image
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (imageRef.current) {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    {
      title: "Frontend Developer",
      description: "I craft responsive and engaging user interfaces with React, bringing designs to life with smooth animations and intuitive interactions.",
      icon: <FiCode size={24} />,
      color: "#4A8FE7"
    },
    {
      title: "Backend Developer",
      description: "I build robust server-side applications and RESTful APIs using Node.js and Express, ensuring scalable and efficient data handling.",
      icon: <FiServer size={24} />,
      color: "#7C5CE6"
    },
    {
      title: "UI Designer",
      description: "I design clean, modern interfaces with a focus on user experience, creating visually appealing and functional design systems.",
      icon: <FiLayout size={24} />,
      color: "#E45858"
    },
    {
      title: "Problem Solver",
      description: "I approach complex challenges with analytical thinking and creativity, developing elegant solutions through efficient code.",
      icon: <FiUser size={24} />,
      color: "#2CC66D"
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
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: (color) => ({
      y: -15,
      scale: 1.05,
      boxShadow: `0 20px 30px rgba(0, 0, 0, 0.2), 0 0 10px ${color}30`,
      transition: { duration: 0.3, ease: "easeOut" }
    })
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

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.section
      ref={ref}
      className={styles.container}
      id="about"
      style={{ opacity, scale }}
    >
      {/* Floating particles background */}
      <div className={styles.particlesContainer}>
        {particles.map((index) => (
          <Particle key={index} index={index} />
        ))}
      </div>

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
        <motion.div
          className={styles.subtitle}
          variants={textRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <TypedText text="I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences." />
        </motion.div>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          ref={imageRef}
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className={styles.imageContainer}
          style={{
            perspective: "1000px"
          }}
        >
          {/* Animated decorative elements */}
          <motion.div
            className={styles.decorCircle}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className={styles.decorSquare}
            animate={{
              rotate: [0, 180, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

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

          {/* 3D parallax image */}
          <motion.div
            className={styles.image3DContainer}
            style={{
              rotateY: mousePosition.x * 20,
              rotateX: -mousePosition.y * 20,
              transformStyle: "preserve-3d"
            }}
          >
            <motion.img
              src={aboutImage}
              alt="Me sitting with a laptop"
              className={styles.aboutImage}
              style={{
                translateZ: "20px"
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
            />
          </motion.div>

          {/* Floating badges */}
          <motion.div
            className={`${styles.imageBadge} ${styles.badge1}`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            variants={floatingVariants}
            animate="visible"
          >
            <span>Full Stack</span>
            <span>Developer</span>
          </motion.div>

          <motion.div
            className={`${styles.imageBadge} ${styles.badge2}`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            variants={floatingVariants}
            animate="visible"
          >
            <FiAward size={16} />
            <span>Problem Solver</span>
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
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className={styles.skillsTitle}
          >
            <span className={styles.highlight}>My Expertise</span>
          </motion.h3>

          <motion.div
            className={styles.skillsList}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                custom={skill.color} /* Using color for the hover effect */
                viewport={{ once: false, amount: 0.1 }}
                className={styles.skillItem}
                style={{
                  borderTop: `3px solid ${skill.color}`
                }}
              >
                <motion.div
                  className={styles.iconContainer}
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, -5, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  {skill.icon}
                </motion.div>
                <div className={styles.skillContent}>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  >
                    {skill.title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  >
                    {skill.description}
                  </motion.p>
                </div>

                {/* Animated corner decoration */}
                <motion.div
                  className={styles.cardCorner}
                  style={{ borderColor: skill.color }}
                  animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#projects"
            className={styles.projectsLink}
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View my projects <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};