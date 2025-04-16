import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { FiGrid, FiLayout, FiColumns, FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [50, 0, 0, 30]);

  // State for layout and filtering
  const [activeFilter, setActiveFilter] = useState("All");
  const [layoutType, setLayoutType] = useState("showcase"); // grid, masonry, showcase, or staggered
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const showcaseRef = useRef(null);

  // Extract unique skills from all projects and normalize them
  const allSkills = [...new Set(projects.flatMap(project => project.skills))]
    .map(skill => {
      // Normalize skill names for display
      if (skill.toLowerCase().includes('framer')) return 'Framer Motion';
      return skill.replace(/-/g, ' ').replace(/\.js/g, '');
    })
    .filter((skill, index, self) => self.indexOf(skill) === index) // Remove duplicates after normalization
    .sort(); // Sort alphabetically

  const filters = ["All", ...allSkills];

  // For animated filtering with AnimatePresence
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    // Animate filtering
    const filtered = activeFilter === "All"
      ? projects
      : projects.filter(project => {
          // Case-insensitive partial matching for skills
          const filterLower = activeFilter.toLowerCase();
          return project.skills.some(skill =>
            skill.toLowerCase().includes(filterLower) ||
            filterLower.includes(skill.toLowerCase())
          );
        });
    setFilteredProjects(filtered);
  }, [activeFilter]);

  // Animation variants
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
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1
      }
    })
  };

  // Simplified animations for better performance
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  // Scroll to next/previous project in showcase view
  const scrollToProject = (direction) => {
    if (!showcaseRef.current) return;

    const container = showcaseRef.current;
    const scrollAmount = 550; // Width of a project card + margin

    if (direction === 'next') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => Math.min(prev + 1, filteredProjects.length - 1));
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  // Scroll to specific project in showcase view
  const scrollToIndex = (index) => {
    if (!showcaseRef.current) return;

    const container = showcaseRef.current;
    const scrollAmount = 550 * index; // Width of a project card + margin * index

    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.container}
      id="projects"
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
          My Projects
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Check out some of my recent work
        </motion.p>
      </motion.div>

      {/* Filter and Layout Controls */}
      <div className="flex justify-between items-center mb-6 px-2">
        <motion.div
          className={styles.filterContainer}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={index}
              className={`${styles.filterButton} ${activeFilter === filter ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        <div className="flex gap-2">
          <button
            className={`p-2 rounded-md ${layoutType === 'grid' ? 'bg-primary text-white' : 'bg-dark/50 text-gray-300'}`}
            onClick={() => setLayoutType('grid')}
            aria-label="Grid layout"
            title="Grid layout"
          >
            <FiGrid size={18} />
          </button>
          <button
            className={`p-2 rounded-md ${layoutType === 'masonry' ? 'bg-primary text-white' : 'bg-dark/50 text-gray-300'}`}
            onClick={() => setLayoutType('masonry')}
            aria-label="Masonry layout"
            title="Masonry layout"
          >
            <FiLayout size={18} />
          </button>
          <button
            className={`p-2 rounded-md ${layoutType === 'showcase' ? 'bg-primary text-white' : 'bg-dark/50 text-gray-300'}`}
            onClick={() => setLayoutType('showcase')}
            aria-label="Showcase layout"
            title="Showcase layout"
          >
            <FiColumns size={18} />
          </button>
          <button
            className={`p-2 rounded-md ${layoutType === 'staggered' ? 'bg-primary text-white' : 'bg-dark/50 text-gray-300'}`}
            onClick={() => setLayoutType('staggered')}
            aria-label="Staggered layout"
            title="Staggered layout"
          >
            <FiLayout size={18} />
          </button>
        </div>
      </div>

      {/* Projects Display with different layout options */}
      <AnimatePresence mode="wait">
        {/* Standard Grid Layout */}
        {layoutType === 'grid' && (
          <motion.div
            key="grid"
            className={styles.projectsContainer}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Masonry Layout */}
        {layoutType === 'masonry' && (
          <motion.div
            key="masonry"
            className={styles.projectsContainer}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.masonryGrid}>
              {filteredProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Showcase Layout - Horizontal Scrolling */}
        {layoutType === 'showcase' && (
          <motion.div
            key="showcase"
            className={styles.projectsContainer}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.showcaseContainer} ref={showcaseRef}>
              <div className={styles.showcaseTrack}>
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className={styles.showcaseItem}>
                    <ProjectCard project={project} isShowcase={true} />
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase Navigation */}
            <div className={styles.showcaseNav}>
              <button
                className={styles.navButton}
                onClick={() => scrollToProject('prev')}
                disabled={currentIndex === 0}
                aria-label="Previous project"
              >
                <FiArrowLeft size={20} />
              </button>
              <button
                className={styles.navButton}
                onClick={() => scrollToProject('next')}
                disabled={currentIndex === filteredProjects.length - 1}
                aria-label="Next project"
              >
                <FiArrowRight size={20} />
              </button>
            </div>

            {/* Navigation Dots */}
            <div className={styles.navDots}>
              {filteredProjects.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.navDot} ${currentIndex === index ? styles.active : ''}`}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Staggered Layout */}
        {layoutType === 'staggered' && (
          <motion.div
            key="staggered"
            className={styles.projectsContainer}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.staggeredGrid}>
              {filteredProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <div className={styles.emptyMessage}>
          No projects found with the selected filter.
        </div>
      )}
    </motion.section>
  );
};