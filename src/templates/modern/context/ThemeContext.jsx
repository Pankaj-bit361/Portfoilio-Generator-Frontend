import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../../config/api";
import General from "../../../config/general";

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

export const themes = {
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
    description: "Natural dark theme with deep emerald accents",
    colors: {
      primary: "emerald-500",
      primaryHover: "emerald-400",
      secondary: "emerald-700",
      accent: "emerald-800",
      text: "gray-200",
      textLight: "gray-400",
      bg: "gray-950",
      bgGradient: "from-gray-950 to-gray-900",
    },
  },
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

const hexToRgb = (hex) => {
  if (!hex || typeof hex !== "string") {
    return "0, 0, 0";
  }
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  try {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return "0, 0, 0";
    }
    return `${r}, ${g}, ${b}`;
  } catch (error) {
    console.error("Error converting hex to RGB:", error);
    return "0, 0, 0";
  }
};

const hexToTailwindTheme = (hexTheme) => {
  if (!hexTheme?.colors) {
    console.warn("Invalid theme data, using default theme");
    return themes.blue.colors;
  }

  const { colors, fonts } = hexTheme;

  try {
    const convertedColors = {
      primary: colors.primary
        ? `rgb(${hexToRgb(colors.primary)})`
        : themes.blue.colors.primary,
      primaryHover: colors.primaryHover
        ? `rgb(${hexToRgb(colors.primaryHover)})`
        : themes.blue.colors.primaryHover,
      secondary: colors.secondary
        ? `rgb(${hexToRgb(colors.secondary)})`
        : themes.blue.colors.secondary,
      accent: colors.accent
        ? `rgb(${hexToRgb(colors.accent)})`
        : themes.blue.colors.accent,
      text: colors.text
        ? `rgb(${hexToRgb(colors.text)})`
        : themes.blue.colors.text,
      textLight: colors.textLight
        ? `rgb(${hexToRgb(colors.textLight)})`
        : themes.blue.colors.textLight,
      bg: colors.bg ? `rgb(${hexToRgb(colors.bg)})` : themes.blue.colors.bg,
      bgGradient: colors.bgGradient || themes.blue.colors.bgGradient,
    };

    return {
      ...convertedColors,
      fonts: {
        primary: fonts?.primary || "Inter",
        secondary: fonts?.secondary || "Roboto",
      },
    };
  } catch (error) {
    console.error("Error converting theme:", error);
    return themes.blue.colors;
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "blue";
    }
    return "blue";
  });

  const [apiTheme, setApiTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        if (!General.getPortfolioId()) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${config.BASE_URL}api/portfolio/${General.getPortfolioId()}/theme`
        );

        if (response.data.success && response.data.data) {
          if (response.data.data.isApplied) {
            console.log("Setting single theme:", response.data.data);
            setApiTheme(response.data.data);
            setCurrentTheme("apiTheme");
            localStorage.setItem("portfolio-theme", "apiTheme");
          } else if (Array.isArray(response.data.data)) {
            const activeTheme = response.data.data.find(
              (theme) => theme.isApplied
            );
            if (activeTheme) {
              console.log("Setting active theme from array:", activeTheme);
              setApiTheme(activeTheme);
              setCurrentTheme("apiTheme");
              localStorage.setItem("portfolio-theme", "apiTheme");
            }
          }
        }
      } catch (error) {
        console.error("Theme fetch error:", error);
        setCurrentTheme("blue");
        localStorage.setItem("portfolio-theme", "blue");
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    if (currentTheme) {
      localStorage.setItem("portfolio-theme", currentTheme);
    }
  }, [currentTheme]);

  const getEffectClasses = (element) => {
    const currentColors = getCurrentThemeColors();
    if (currentColors.glass) {
      return themeEffects.glass[element];
    }
    if (currentColors.neon) {
      return themeEffects.neon[element];
    }
    return "";
  };

  const getSpecialColors = {
    "white/50": "rgba(255, 255, 255, 0.5)",
    "white/30": "rgba(255, 255, 255, 0.3)",
    "black/50": "rgba(0, 0, 0, 0.5)",
    "black/30": "rgba(0, 0, 0, 0.3)",
  };

  const convertTailwindToRgb = (color) => {
    if (color.startsWith("rgb")) {
      return color;
    }

    // Check for special colors first
    if (getSpecialColors[color]) {
      return getSpecialColors[color];
    }

    // Then check regular tailwind colors
    return tailwindColors[color] || color;
  };

  const getCurrentThemeColors = () => {
    if (currentTheme === "apiTheme" && apiTheme) {
      const convertedTheme = hexToTailwindTheme(apiTheme);
      return {
        ...convertedTheme,
        fonts: apiTheme.fonts,
      };
    }

    const themeColors = themes[currentTheme]?.colors || themes.blue.colors;

    return {
      primary: convertTailwindToRgb(themeColors.primary),
      primaryHover: convertTailwindToRgb(themeColors.primaryHover),
      secondary: convertTailwindToRgb(themeColors.secondary),
      accent: convertTailwindToRgb(themeColors.accent),
      text: convertTailwindToRgb(themeColors.text),
      textLight: convertTailwindToRgb(themeColors.textLight),
      bg: convertTailwindToRgb(themeColors.bg),
      bgGradient: themeColors.bgGradient,
      glass: themeColors.glass,
      neon: themeColors.neon,
    };
  };

  const getColorWithOpacity = (color, opacity) => {
    // Check for special colors first
    if (getSpecialColors[color]) {
      return getSpecialColors[color];
    }

    // If it's a Tailwind class name
    if (
      typeof color === "string" &&
      !color.startsWith("rgb") &&
      !color.startsWith("#")
    ) {
      color = convertTailwindToRgb(color);
    }

    // If it's an RGB color
    if (color.startsWith("rgb")) {
      return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
    }

    // If it's a hex color
    if (color.startsWith("#")) {
      const rgbColor = hexToRgb(color);
      return `rgba(${rgbColor}, ${opacity})`;
    }

    return color;
  };

  const value = {
    currentTheme,
    setCurrentTheme,
    theme: getCurrentThemeColors(),
    themeData:
      currentTheme === "apiTheme"
        ? {
            name: "Custom Theme",
            description: "Extracted from website",
            colors: getCurrentThemeColors(),
            fonts: apiTheme?.fonts || { primary: "Inter", secondary: "Roboto" },
          }
        : themes[currentTheme],
    getEffectClasses,
    getColorWithOpacity,
    convertTailwindToRgb,
    availableThemes: [
      ...Object.entries(themes).map(([id, theme]) => ({
        id,
        ...theme,
      })),
      ...(apiTheme
        ? [
            {
              id: "apiTheme",
              name: "Extracted Theme",
              description: "Custom theme from website",
              colors: hexToTailwindTheme(apiTheme),
              fonts: apiTheme.fonts,
            },
          ]
        : []),
    ],
    loading,
    apiTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const tailwindColors = {
  // Blue
  "blue-50": "rgb(239, 246, 255)",
  "blue-100": "rgb(219, 234, 254)",
  "blue-300": "rgb(147, 197, 253)",
  "blue-400": "rgb(96, 165, 250)",
  "blue-500": "rgb(59, 130, 246)",
  "blue-600": "rgb(37, 99, 235)",
  "blue-700": "rgb(29, 78, 216)",
  "blue-800": "rgb(30, 64, 175)",
  "blue-900": "rgb(30, 58, 138)",

  // Emerald
  "emerald-50": "rgb(236, 253, 245)",
  "emerald-100": "rgb(209, 250, 229)",
  "emerald-400": "rgb(52, 211, 153)",
  "emerald-500": "rgb(16, 185, 129)",
  "emerald-600": "rgb(5, 150, 105)",
  "emerald-700": "rgb(4, 120, 87)",
  "emerald-800": "rgb(6, 95, 70)",

  // Green
  "green-50": "rgb(240, 253, 244)",
  "green-100": "rgb(220, 252, 231)",
  "green-600": "rgb(22, 163, 74)",
  "green-700": "rgb(21, 128, 61)",

  // Pink
  "pink-100": "rgb(252, 231, 243)",
  "pink-400": "rgb(244, 114, 182)",
  "pink-500": "rgb(236, 72, 153)",
  "pink-800": "rgb(157, 23, 77)",
  "pink-900": "rgb(131, 24, 67)",

  // Gray
  "gray-100": "rgb(243, 244, 246)",
  "gray-200": "rgb(229, 231, 235)",
  "gray-300": "rgb(209, 213, 219)",
  "gray-400": "rgb(156, 163, 175)",
  "gray-600": "rgb(75, 85, 99)",
  "gray-900": "rgb(17, 24, 39)",
  "gray-950": "rgb(3, 7, 18)",

  // Orange
  "orange-100": "rgb(255, 237, 213)",
  "orange-400": "rgb(251, 146, 60)",
  "orange-500": "rgb(249, 115, 22)",

  // Amber
  "amber-50": "rgb(255, 251, 235)",
  "amber-600": "rgb(217, 119, 6)",
  "amber-700": "rgb(180, 83, 9)",

  // Yellow
  "yellow-50": "rgb(254, 252, 232)",
  "yellow-500": "rgb(234, 179, 8)",

  // Cyan
  "cyan-400": "rgb(34, 211, 238)",
  "cyan-500": "rgb(6, 182, 212)",

  // Teal
  "teal-500": "rgb(20, 184, 166)",

  // Purple
  "purple-500": "rgb(168, 85, 247)",

  // Base colors
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
};

const gradientMap = {
  // Basic gradients
  "from-blue-50/90 to-white": "#eff6ff90 to #ffffff",
  "from-emerald-50/90 to-white": "#ecfdf590 to #ffffff",
  "from-gray-900 to-gray-800": "#111827 to #1f2937",
  "from-gray-950 to-gray-900": "#030712 to #111827",

  // Complex gradients
  "from-orange-400 via-pink-500 to-purple-500": "#fb923c to #ec4899 to #a855f7",
  "from-cyan-400 via-blue-500 to-teal-500": "#22d3ee to #3b82f6 to #14b8a6",

  // Natural gradients
  "from-green-50/90 to-emerald-50/90": "#f0fdf490 to #ecfdf590",
  "from-amber-50/90 to-orange-50/90": "#fffbeb90 to #fff7ed90",

  // Glass effects
  "from-white/80 to-white/60": "rgba(255,255,255,0.8) to rgba(255,255,255,0.6)",
  "from-black/80 to-black/60": "rgba(0,0,0,0.8) to rgba(0,0,0,0.6)",

  // Custom theme gradients
  "from-gray-900 to-pink-900": "#111827 to #831843",
};

export default ThemeProvider;
