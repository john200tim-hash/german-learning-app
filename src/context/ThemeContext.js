// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', or 'high-contrast'
  const [textSize, setTextSize] = useState('base'); // 'sm', 'base', 'lg', 'xl', 'xxl'
  const [colorMode, setColorMode] = useState('A'); // 'A', 'B', or 'C'
  const [isColorBlend, setColorBlend] = useState(false);

  useEffect(() => {
    // On initial load, check for saved settings in localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedTextSize = localStorage.getItem('textSize');
    const savedColorMode = localStorage.getItem('colorMode');
    const savedColorBlend = localStorage.getItem('isColorBlend') === 'true';

    if (savedTheme) setTheme(savedTheme);
    if (savedTextSize) setTextSize(savedTextSize);
    if (savedColorMode) setColorMode(savedColorMode);
    setColorBlend(savedColorBlend);
  }, []);

  useEffect(() => {
    // Apply theme and text size classes to the root element
    const root = document.documentElement;
    const body = document.body;

    // Apply theme to <html> tag
    root.className = ''; // Clear all previous classes
    root.classList.add(theme);
    root.classList.add(`mode-${colorMode.toLowerCase()}`); // Add color mode class e.g., 'mode-a'

    // Apply text size to <body> tag
    body.classList.remove("text-sm", "text-base", "text-lg", "text-xl", "text-xxl");
    body.classList.add(`text-${textSize}`);

    // Apply color blend mode
    if (isColorBlend) {
      root.classList.add('color-blend-mode');
    } else {
      root.classList.remove('color-blend-mode');
    }

    // Save all settings to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('textSize', textSize);
    localStorage.setItem('colorMode', colorMode);
    localStorage.setItem('isColorBlend', String(isColorBlend));
  }, [theme, textSize, isColorBlend, colorMode]);

  // This function allows setting the theme directly
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // This function allows setting the color mode directly
  const handleColorModeChange = (newMode) => {
    setColorMode(newMode);
  };

  const value = {
    theme,
    textSize,
    isColorBlend,
    colorMode,
    handleThemeChange,
    setTextSize,
    setColorBlend,
    handleColorModeChange,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
