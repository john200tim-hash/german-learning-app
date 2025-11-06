// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', or 'high-contrast'

  useEffect(() => {
    // On initial load, check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply the theme class to the root element and save to localStorage
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast'); // Clear old theme classes
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // This function allows setting the theme directly
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const value = {
    theme,
    handleThemeChange, // Provide the new function
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
