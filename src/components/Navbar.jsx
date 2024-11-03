import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Portfolio Generator
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </div>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/login" className="navbar-link" onClick={toggleMenu}>
            Login
          </Link>
          <Link to="/generator/create" className="navbar-link" onClick={toggleMenu}>
            Create Portfolio
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
