import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThreeScene } from "./ThreeScene";

export const Hero = ({ data }) => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <ThreeScene />
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl backdrop-blur-lg bg-black bg-opacity-30 p-8 rounded-lg"
        >
          <motion.h1
            className="text-6xl font-bold mb-4 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="gradient-text">{data.home.name}</span>
          </motion.h1>
          <motion.h2
            className="text-3xl text-purple-300 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {data.home.profession}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* {data.home.summary} */}
          </motion.p>
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              href={data.contact.socialMedia.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href={data.contact.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href={`mailto:${data.contact.email}`}
              className="text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
