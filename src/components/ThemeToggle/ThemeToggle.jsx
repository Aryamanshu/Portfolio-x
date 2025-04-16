import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      className="fixed z-50 bottom-5 right-5 p-3 rounded-full bg-primary text-white shadow-lg"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? (
        <FiSun className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </motion.button>
  );
};
