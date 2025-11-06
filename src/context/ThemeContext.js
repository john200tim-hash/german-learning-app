// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// ThemeContext provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', or 'high-contrast'
  const [textSize, setTextSize] = useState('base'); // 'sm', 'base', 'lg', 'xl', 'xxl'
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
    body.classList.remove("text-sm", "text-base", "text-lg", "text-xl", "text-xxl");
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

  // This function cycles through the available themes
  const cycleTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === 'light') return 'dark';
      if (currentTheme === 'dark') return 'high-contrast';
      return 'light'; // Cycle from 'high-contrast' back to 'light'
    });
  };

  // Provide the context value
  const value = {
    theme,
    textSize,
    isColorBlend,
    cycleTheme, // Provide the new cycling function
    setTextSize,
    setColorBlend,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
