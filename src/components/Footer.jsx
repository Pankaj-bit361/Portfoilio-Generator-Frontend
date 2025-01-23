import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(66,153,225,0.1),transparent)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-12 mb-12"
        >
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 mb-6"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                PortfolioGen
              </h3>
            </motion.div>
            <p className="text-gray-400 mb-6">
              Create stunning portfolios that capture attention and showcase
              your professional journey.
            </p>
            <div className="flex space-x-4">
              {[FaGithub, FaTwitter, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{
                    scale: 1.1,
                    color: "#4299e1",
                    boxShadow: "0 0 20px rgba(66, 153, 225, 0.3)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/5"
                >
                  <Icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* {["Features", "Resources", "Company"].map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h4 className="font-semibold mb-4 text-lg">{title}</h4>
              <ul className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>
                        {title} Link {item}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))} */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-white/10 text-center text-gray-400"
        >
          <p>© 2024 PortfolioGen. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
