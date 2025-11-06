// src/context/ThemeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
<<<<<<< HEAD
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // On initial load, check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Apply the theme class to the root element and save to localStorage
    document.documentElement.className = '';
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
=======
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
>>>>>>> e953e6538468ce19a64292f2d188e85d901af458
};