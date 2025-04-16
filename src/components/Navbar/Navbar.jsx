import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "About", href: "#about" },
    { title: "Experience", href: "#experience" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.a
          href="/"
          className={styles.title}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Aryamanshu
        </motion.a>

        <div className={styles.menu}>
          <motion.button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </motion.button>

          <ul className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}>
            {navItems.map((item, index) => (
              <li key={index}>
                <motion.a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.title}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Overlay for mobile menu */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayActive : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
};