// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Theme Effects Utilities
export const themeEffects = {
  glass: {
    card: "backdrop-blur-md bg-opacity-50",
    button: "backdrop-blur-sm bg-opacity-70",
    nav: "backdrop-blur-lg bg-opacity-30",
  },
  neon: {
    text: "drop-shadow-[0_0_10px_currentColor]",
    button: "shadow-[0_0_15px_currentColor]",
    card: "shadow-[0_0_30px_currentColor]",
  },
};

// Theme Definitions
export const themes = {
  // Professional Themes
  blue: {
    name: "Ocean Blue",
    description: "Clean and professional",
    colors: {
      primary: "blue-600",
      primaryHover: "blue-700",
      secondary: "blue-100",
      accent: "blue-50",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-blue-50/90 to-white",
    },
  },
  emerald: {
    name: "Fresh Emerald",
    description: "Natural and energetic",
    colors: {
      primary: "emerald-600",
      primaryHover: "emerald-700",
      secondary: "emerald-100",
      accent: "emerald-50",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-emerald-50/90 to-white",
    },
  },

  // Dark Themes
  darkBlue: {
    name: "Midnight Blue",
    description: "Professional dark mode",
    colors: {
      primary: "blue-500",
      primaryHover: "blue-400",
      secondary: "blue-900",
      accent: "blue-800",
      text: "gray-100",
      textLight: "gray-300",
      bg: "gray-900",
      bgGradient: "from-gray-900 to-gray-800",
    },
  },
  darkEmerald: {
    name: "Dark Forest",
    description: "Natural dark theme",
    colors: {
      primary: "emerald-500",
      primaryHover: "emerald-400",
      secondary: "emerald-900",
      accent: "emerald-800",
      text: "gray-100",
      textLight: "gray-300",
      bg: "gray-900",
      bgGradient: "from-gray-900 to-gray-800",
    },
  },

  // Gradient Themes
  sunsetGradient: {
    name: "Sunset Gradient",
    description: "Warm and inviting",
    colors: {
      primary: "orange-500",
      primaryHover: "orange-400",
      secondary: "pink-500",
      accent: "yellow-500",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-orange-400 via-pink-500 to-purple-500",
    },
  },
  oceanGradient: {
    name: "Ocean Gradient",
    description: "Calm and peaceful",
    colors: {
      primary: "cyan-500",
      primaryHover: "cyan-400",
      secondary: "blue-500",
      accent: "teal-500",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-cyan-400 via-blue-500 to-teal-500",
    },
  },

  // Glass Themes
  glassLight: {
    name: "Glass Light",
    description: "Modern transparency",
    colors: {
      primary: "blue-500",
      primaryHover: "blue-400",
      secondary: "white/50",
      accent: "white/30",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-white/80 to-white/60",
      glass: true,
    },
  },
  glassDark: {
    name: "Glass Dark",
    description: "Sleek transparency",
    colors: {
      primary: "blue-400",
      primaryHover: "blue-300",
      secondary: "black/50",
      accent: "black/30",
      text: "white",
      textLight: "gray-300",
      bg: "gray-900",
      bgGradient: "from-black/80 to-black/60",
      glass: true,
    },
  },


  neonPink: {
    name: "Neon Pink",
    description: "Bold and vibrant",
    colors: {
      primary: "pink-500",
      primaryHover: "pink-400",
      secondary: "pink-900",
      accent: "pink-800",
      text: "white",
      textLight: "pink-100",
      bg: "gray-900",
      bgGradient: "from-gray-900 to-pink-900",
      neon: true,
    },
  },

  // Special Themes
  forest: {
    name: "Forest",
    description: "Natural and calming",
    colors: {
      primary: "green-600",
      primaryHover: "green-700",
      secondary: "green-100",
      accent: "green-50",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-green-50/90 to-emerald-50/90",
    },
  },
  autumn: {
    name: "Autumn",
    description: "Warm and cozy",
    colors: {
      primary: "amber-600",
      primaryHover: "amber-700",
      secondary: "orange-100",
      accent: "yellow-50",
      text: "gray-900",
      textLight: "gray-600",
      bg: "white",
      bgGradient: "from-amber-50/90 to-orange-50/90",
    },
  },
};

// Create Context
const ThemeContext = createContext(undefined);

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "blue";
    }
    return "blue";
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("portfolio-theme", currentTheme);
  }, [currentTheme]);

  const theme = themes[currentTheme];

  // Apply theme effects if specified
  const getEffectClasses = (element) => {
    if (theme.colors.glass) {
      return themeEffects.glass[element];
    }
    if (theme.colors.neon) {
      return themeEffects.neon[element];
    }
    return "";
  };

  const value = {
    currentTheme,
    setCurrentTheme,
    theme: theme.colors,
    themeData: theme,
    getEffectClasses,
    availableThemes: Object.entries(themes).map(([id, theme]) => ({
      id,
      ...theme,
    })),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom Hook for using theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
