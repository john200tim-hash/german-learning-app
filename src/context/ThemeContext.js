// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', or 'high-contrast'
  const [textSize, setTextSize] = useState('medium'); // 'small', 'medium', 'large'
  const [colorMode, setColorMode] = useState('a'); // 'a', 'b', 'c', 'd'
  const [isColorBlend, setColorBlend] = useState(false);

  useEffect(() => {
    // On initial load, check for saved settings in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedTextSize = localStorage.getItem('fontSize') || 'medium';
    const savedColorMode = localStorage.getItem('colorMode') || 'a';
    const savedColorBlend = localStorage.getItem('isColorBlend') === 'true';

    setTheme(savedTheme);
    setTextSize(savedTextSize);
    setColorMode(savedColorMode);
    setColorBlend(savedColorBlend);
  }, []);

  useEffect(() => {
    // Apply theme, text size, and color mode classes to the root <html> element
    const root = document.documentElement; // The <html> tag

    // Clean up old classes before adding new ones to prevent conflicts
    root.classList.remove('light', 'dark', 'high-contrast', 'color-blend');
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.remove('mode-a', 'mode-b', 'mode-c', 'mode-d');

    // Add the current, correct classes
    root.classList.add(theme);
    root.classList.add(`font-size-${textSize}`);
    root.classList.add(`mode-${colorMode}`);
    if (isColorBlend) {
      root.classList.add('color-blend');
    }

    // Save settings to localStorage whenever they change
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', textSize);
    localStorage.setItem('colorMode', colorMode);
    localStorage.setItem('isColorBlend', isColorBlend);
  }, [theme, textSize, colorMode, isColorBlend]);

  const value = {
    theme, setTheme,
    textSize, setTextSize,
    colorMode, setColorMode,
    isColorBlend, setColorBlend
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};