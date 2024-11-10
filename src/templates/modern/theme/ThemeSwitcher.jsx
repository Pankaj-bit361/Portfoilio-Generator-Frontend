// src/components/theme/ThemeSwitcher.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const themeListRef = useRef(null);

  useEffect(() => {
    if (isOpen && themeListRef.current) {
      themeListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-8 right-8 z-50"
    >
      {/* Theme Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      {/* Theme Preview Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-4 bg-white rounded-xl shadow-xl p-4 w-64 max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-3">Select Theme</h3>
            <div className="space-y-2" ref={themeListRef}>
              {availableThemes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => {
                    setCurrentTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    currentTheme === theme.id
                      ? `bg-${theme.colors.primary} text-white`
                      : `hover:bg-${theme.colors.accent}`
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-6 h-6 rounded-full bg-${theme.colors.primary}`} />
                  <div className="text-left">
                    <p className="font-medium">{theme.name}</p>
                    <p className="text-sm opacity-75">{theme.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};