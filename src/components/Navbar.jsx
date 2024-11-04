// Navbar.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => logout();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar ${isOpen ? "menu-open" : ""}`}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Portfolio Generator
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span
            className={`navbar-toggle-icon ${isOpen ? "active" : ""}`}
          ></span>
          <span
            className={`navbar-toggle-icon ${isOpen ? "active" : ""}`}
          ></span>
          <span
            className={`navbar-toggle-icon ${isOpen ? "active" : ""}`}
          ></span>
        </div>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/portfolios" className="navbar-link" onClick={toggleMenu}>
            Portfolios
          </Link>

          {user ? (
            <div className="profile-menu">
              <div className="profile-info" onClick={toggleMenu}>
                <img
                  src={
                    user.profileImage
                      ? user.profileImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                  }
                  alt="Profile"
                  className="profile-pic"
                />
                <span className="username">{user.name}</span>
                <button className="logout-Btn" onClick={handleLogout}>
                  <div className="logout-sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 143-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" onClick={toggleMenu}>
              <button className="login-Btn">
                <div className="login-sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 143-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="login-text">Login</div>
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
