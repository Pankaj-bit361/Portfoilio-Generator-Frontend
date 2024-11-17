import { useState } from "react";
import { GradientText, ThreeScene } from "./ThreeScene";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react";

export const Hero = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black">
      <ThreeScene />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full"
        >
          {/* Glowing Effect Card */}
          <motion.div
            variants={itemVariants}
            className="relative backdrop-blur-xl bg-black/30 p-12 rounded-2xl border border-purple-500/20 shadow-2xl"
            style={{
              boxShadow: isHovered 
                ? "0 0 40px rgba(147, 51, 234, 0.3)" 
                : "0 0 20px rgba(147, 51, 234, 0.1)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Floating Sparkle Icons */}
            <motion.div
              className="absolute -top-6 -right-6"
              animate={{ y: [0, -10, 0], rotate: [0, 45, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-purple-400 opacity-70" />
            </motion.div>

            {/* Main Content */}
            <motion.div variants={itemVariants}>
              <motion.h1 className="text-7xl font-bold mb-6">
                Hi, I'm{" "}
                <GradientText>{data?.home?.name}</GradientText>
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-semibold mb-6 text-purple-300">
                {data?.home?.profession}
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {/* {data?.home?.summary} */}
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-8"
            >
              {[
                { icon: Github, href: data?.contact?.socialMedia?.github },
                { icon: Linkedin, href: data?.contact?.socialMedia?.linkedin },
                { icon: Mail, href: `mailto:${data?.contact?.email}` }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity blur" />
                  <div className="relative p-2 bg-black bg-opacity-80 rounded-lg transform transition-all duration-200 group-hover:scale-105">
                    <item.icon className="w-6 h-6 text-white group-hover:text-purple-400" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-purple-400 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

// Add to your global CSS
const styles = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
`;