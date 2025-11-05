// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', or 'high-contrast'
  const [textSize, setTextSize] = useState('base'); // 'sm', 'base', or 'lg'
  const [isColorBlend, setColorBlend] = useState(false);

  // On initial load, get settings from localStorage or set defaults
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedTextSize = localStorage.getItem('textSize') || 'base';
    const savedColorBlend = localStorage.getItem('colorBlend') === 'true';
    setTheme(savedTheme);
    setTextSize(savedTextSize);
    setColorBlend(savedColorBlend);
  }, []);

  // Apply classes to the document whenever state changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Theme classes on <html>
    root.classList.remove('dark', 'high-contrast');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'high-contrast') {
      root.classList.add('high-contrast');
    }
    localStorage.setItem('theme', theme);

    // Text size classes on <body>
    body.classList.remove('text-sm', 'text-base', 'text-lg');
    body.classList.add(`text-${textSize}`);
    localStorage.setItem('textSize', textSize);

    // Color blend class on <body>
    if (isColorBlend) {
      body.classList.add('color-blend-active');
    } else {
      body.classList.remove('color-blend-active');
    }
    localStorage.setItem('colorBlend', isColorBlend);

  }, [theme, textSize, isColorBlend]);

  const value = {
    theme, setTheme,
    textSize, setTextSize,
    isColorBlend, setColorBlend,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};