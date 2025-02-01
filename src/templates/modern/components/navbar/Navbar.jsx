
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useScroll } from "../../context/ScrollProvider";

const Navbar = ({ data }) => {
  const { theme, getEffectClasses, convertTailwindToRgb, getColorWithOpacity } = useTheme();
  const { scrollToSection } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    data.home && { name: "Home", href: "#home", section: "home" },
    data.about && { name: "About", href: "#about", section: "about" },
    data.projects && { name: "Projects", href: "#projects", section: "projects" },
    data.experience && { name: "Experience", href: "#experience", section: "experience" },
    data.contact && { name: "Contact", href: "#contact", section: "contact" },
  ].filter(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      setIsScrolled(window.scrollY > 20);

      // Update scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Update active section
      const sections = navLinks.map(link => link.section);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 150; // Adjust this value based on your needs
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 768;
      setIsDesktop(newIsDesktop);
      if (newIsDesktop) setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [navLinks]);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    scrollToSection(section);
    if (!isDesktop) {
      setIsMobileMenuOpen(false);
    }
  };

  const navbarStyle = {
    backgroundColor: isScrolled 
      ? getColorWithOpacity(convertTailwindToRgb(theme.bg), 0.7)
      : 'transparent',
    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
    backdropFilter: isScrolled ? 'blur(8px)' : 'none',
  };

  const getLinkStyle = (isActive) => ({
    color: isActive 
      ? convertTailwindToRgb(theme.primary)
      : convertTailwindToRgb(theme.textLight),
    position: 'relative',
  });

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={navbarStyle}
      className="fixed w-full z-50 transition-all duration-300"
    >
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5"
        style={{ 
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, ${convertTailwindToRgb(theme.primary)}, ${getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.5)})`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => handleNavClick(e, "home")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 font-bold text-2xl"
          >
            <motion.span
              style={{ color: convertTailwindToRgb(theme.primary) }}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &lt;
            </motion.span>
            <span style={{ color: convertTailwindToRgb(theme.text) }}>
              {data.home?.name?.split(" ")[0] || "Portfolio"}
            </span>
            <motion.span
              style={{ color: convertTailwindToRgb(theme.primary) }}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              /&gt;
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className={`items-center space-x-8 ${isDesktop ? "flex" : "hidden"}`}>
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.section)}
                style={getLinkStyle(activeSection === link.section)}
                whileHover={{ y: -2 }}
                className="font-medium transition-colors relative"
              >
                {link.name}
                {activeSection === link.section && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{ backgroundColor: convertTailwindToRgb(theme.primary) }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
            {data.contact?.resume && (
              <motion.a
                href={data.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backgroundColor: convertTailwindToRgb(theme.primary),
                  color: '#ffffff',
                }}
                className="px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Resume
              </motion.a>
            )}
          </div>

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: convertTailwindToRgb(theme.textLight) }}
              className="p-2 rounded-lg transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {!isDesktop && isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: getColorWithOpacity(convertTailwindToRgb(theme.bg), 0.95),
                backdropFilter: 'blur(8px)',
              }}
              className="rounded-b-2xl shadow-lg overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="px-4 py-4 space-y-4"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.section)}
                    whileHover={{ x: 10 }}
                    style={getLinkStyle(activeSection === link.section)}
                    className="block font-medium py-2"
                  >
                    {link.name}
                  </motion.a>
                ))}
                {data.contact?.resume && (
                  <motion.a
                    href={data.contact.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: convertTailwindToRgb(theme.primary),
                      color: '#ffffff',
                    }}
                    className="block w-full text-center px-4 py-2 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Resume
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
