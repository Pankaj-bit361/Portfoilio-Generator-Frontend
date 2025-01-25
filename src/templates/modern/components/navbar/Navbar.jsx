import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ data }) => {
  const { theme, getEffectClasses } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    data.home && { name: "Home", href: "#" },
    data.about && { name: "About", href: "#about" },
    data.projects && { name: "Projects", href: "#projects" },
    data.experience && { name: "Experience", href: "#experience" },
    data.contact && { name: "Contact", href: "#contact" },
  ].filter(Boolean);


  // console.log(data)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? `backdrop-blur-lg bg-white/70 shadow-lg ${getEffectClasses("nav")}`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className={`text-2xl font-bold text-${
              theme.text
            } flex items-center space-x-2 ${
              theme.glass ? "drop-shadow-sm" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-${theme.primary}`}>&lt;</span>
            <span>{data.home?.name?.split(" ")[0] || "Portfolio"}</span>
            <span className={`text-${theme.primary}`}>/&gt;</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div
            className={`items-center space-x-8 ${
              isDesktop ? "flex" : "hidden"
            }`}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-${theme.textLight} hover:text-${
                  theme.primary
                } transition-colors font-medium 
                ${theme.glass ? "hover:drop-shadow-sm" : ""}`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
            {data.contact && (
              <motion.a
                href={data.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 bg-${theme.primary} text-white rounded-lg 
                  hover:bg-${theme.primaryHover} transition-all duration-300
                  ${
                    theme.glass
                      ? "backdrop-blur-sm bg-opacity-90 hover:bg-opacity-100 shadow-lg"
                      : ""
                  } 
                  ${getEffectClasses("button")}`}
              >
                Resume
              </motion.a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className={isDesktop ? "hidden" : "block"}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg text-${theme.textLight} hover:text-${
                theme.primary
              } 
                focus:outline-none transition-all duration-300
                ${
                  theme.glass ? "hover:backdrop-blur-sm hover:bg-white/10" : ""
                }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {!isDesktop && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className={`${
              theme.glass ? "backdrop-blur-md bg-white/60" : `bg-${theme.bg}`
            } 
              rounded-b-2xl shadow-lg ${getEffectClasses("card")}`}
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block text-${theme.textLight} hover:text-${
                    theme.primary
                  } 
                    transition-all duration-300 font-medium
                    ${theme.glass ? "hover:bg-white/20 p-2 rounded-lg" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {data.contact && (
                <a
                  href={data.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-4 py-2 bg-${
                    theme.primary
                  } text-white rounded-lg 
                    hover:bg-${theme.primaryHover} transition-all duration-300
                    ${
                      theme.glass
                        ? "backdrop-blur-sm bg-opacity-90 hover:bg-opacity-100 shadow-lg"
                        : ""
                    } 
                    ${getEffectClasses("button")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;