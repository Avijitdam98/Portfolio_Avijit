import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemePreference = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [preference, setPreference] = useState('system');

  useEffect(() => {
    // Show popup on first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const handlePreferenceChange = (newPreference) => {
    setPreference(newPreference);
    if (newPreference === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark !== isDark) {
        toggleTheme();
      }
    } else {
      const shouldBeDark = newPreference === 'dark';
      if (shouldBeDark !== isDark) {
        toggleTheme();
      }
    }
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-20 right-4 z-[9997] p-4 rounded-lg shadow-lg backdrop-blur-lg border ${
            isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'
          }`}
        >
          <div className="flex flex-col gap-4">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Choose Theme Preference
            </h3>
            <div className="flex flex-col gap-2">
              <ThemeOption
                icon={<Sun className="w-5 h-5" />}
                label="Light"
                isSelected={preference === 'light'}
                onClick={() => handlePreferenceChange('light')}
                isDark={isDark}
              />
              <ThemeOption
                icon={<Moon className="w-5 h-5" />}
                label="Dark"
                isSelected={preference === 'dark'}
                onClick={() => handlePreferenceChange('dark')}
                isDark={isDark}
              />
              <ThemeOption
                icon={<Monitor className="w-5 h-5" />}
                label="System"
                isSelected={preference === 'system'}
                onClick={() => handlePreferenceChange('system')}
                isDark={isDark}
              />
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className={`text-sm ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ThemeOption = ({ icon, label, isSelected, onClick, isDark }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
      isSelected
        ? isDark
          ? 'bg-blue-500/20 text-blue-400'
          : 'bg-blue-500/10 text-blue-600'
        : isDark
        ? 'hover:bg-gray-800 text-gray-300'
        : 'hover:bg-gray-100 text-gray-600'
    }`}
  >
    {icon}
    <span>{label}</span>
    {isSelected && (
      <motion.div
        layoutId="selected-pill"
        className={`ml-auto px-2 py-1 text-xs rounded-full ${
          isDark ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-500/20 text-blue-600'
        }`}
      >
        Active
      </motion.div>
    )}
  </motion.button>
);

export default ThemePreference;
