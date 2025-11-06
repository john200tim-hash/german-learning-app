// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

// Custom hook to consume ThemeContext
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', or 'high-contrast'
  const [textSize, setTextSize] = useState('base'); // 'sm', 'base', or 'lg'
  const [isColorBlend, setColorBlend] = useState(false);

  useEffect(() => {
    // On initial load, check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    const savedTextSize = localStorage.getItem('textSize');
    const savedColorBlend = localStorage.getItem('isColorBlend') === 'true';

    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedTextSize) {
      setTextSize(savedTextSize);
    }
    setColorBlend(savedColorBlend);
  }, []);

  useEffect(() => {
    // Apply the theme class to the root element and save to localStorage
    // Apply theme and text size classes to the root element
    const root = document.documentElement;
    const body = document.body;

    root.className = ''; // Clear existing classes
    root.classList.add(theme);
    body.classList.remove("text-sm", "text-base", "text-lg");
    body.classList.add(`text-${textSize}`);

    if (isColorBlend) {
      root.classList.add('color-blend-mode');
    } else {
      root.classList.remove('color-blend-mode');
    }

    localStorage.setItem('theme', theme);
    localStorage.setItem('textSize', textSize);
    localStorage.setItem('isColorBlend', isColorBlend);
  }, [theme, textSize, isColorBlend]);

  // This function allows setting the theme directly
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  // Provide the context value
  const value = {
    theme,
    textSize,
    isColorBlend,
    handleThemeChange, // Provide the new function
    setTextSize,
    setColorBlend,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
