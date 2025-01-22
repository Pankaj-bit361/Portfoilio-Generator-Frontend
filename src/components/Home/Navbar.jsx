import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, logout } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => logout();

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className="fixed w-full top-0 z-50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              PortfolioGen
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-8"
          >
            <motion.a
              href="portfolios"
              className="relative text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Portfolios</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
            {user ? (
              <div className="relative flex align-middle items-center gap-2 cursor-pointer">
                <div
                  className="flex align-middle items-center gap-2"
                  onClick={toggleMenu}
                >
                  <img
                    src={
                      user.profileImage
                        ? user.profileImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                  <span className="font-semibold text-white">{user.name}</span>
                  <button
                    className="flex items-center justify-center gap-2 border-2 border-red-500 rounded-full overflow-hidden bg-red-500 text-white w-10 h-10 cursor-pointer shadow-lg "
                    onClick={handleLogout}
                  >
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
                <button className="flex items-center justify-center gap-2 px-4 py-2  bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl text-white font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transform hover:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full">
                  <div className="login-sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 143-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="login-text">Login</div>
                </button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
