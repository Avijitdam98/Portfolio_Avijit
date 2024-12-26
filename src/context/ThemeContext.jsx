import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    try {
      // First try to get from localStorage
      const savedTheme = localStorage.getItem('isDarkTheme');
      if (savedTheme !== null) {
        return JSON.parse(savedTheme);
      }
      // If no saved preference, use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
      return true; // Default to dark theme if there's an error
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('isDarkTheme', JSON.stringify(isDark));
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
    
    // Update root element classes and CSS variables
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.setProperty('--background-start', '#000000');
      root.style.setProperty('--background-end', '#111827');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#9ca3af');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--background-start', '#ffffff');
      root.style.setProperty('--background-end', '#f3f4f6');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#4b5563');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      primary: isDark ? '#3b82f6' : '#2563eb',
      secondary: isDark ? '#8b5cf6' : '#7c3aed',
      accent: isDark ? '#ec4899' : '#db2777',
      background: {
        primary: isDark ? '#000000' : '#ffffff',
        secondary: isDark ? '#111827' : '#f3f4f6',
      },
      text: {
        primary: isDark ? '#ffffff' : '#111827',
        secondary: isDark ? '#9ca3af' : '#4b5563',
      },
      border: isDark ? '#1f2937' : '#e5e7eb',
      hover: isDark ? '#374151' : '#f9fafb',
    },
    shadows: {
      sm: isDark ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: isDark ? '0 10px 15px rgba(0, 0, 0, 0.5)' : '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    gradients: {
      primary: isDark
        ? 'linear-gradient(to right, #3b82f6, #8b5cf6)'
        : 'linear-gradient(to right, #2563eb, #7c3aed)',
      secondary: isDark
        ? 'linear-gradient(to right, #8b5cf6, #ec4899)'
        : 'linear-gradient(to right, #7c3aed, #db2777)',
      background: isDark
        ? 'linear-gradient(to bottom right, #000000, #111827)'
        : 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
