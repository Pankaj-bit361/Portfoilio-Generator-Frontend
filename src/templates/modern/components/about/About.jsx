import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const About = ({ data }) => {
  const { theme, getEffectClasses } = useTheme();

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Languages",
      description: data.skills?.technical?.languages
        ?.map((lang) => `${lang.name} (${lang.proficiency})`)
        .join(", "),
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Frameworks",
      description: data.skills?.technical?.frameworks
        ?.map((framework) => `${framework.name} (${framework.proficiency})`)
        .join(", "),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Tools",
      description: data.skills?.technical?.tools
        ?.map((tool) => `${tool.name} `)
        .join(", "),
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Soft Skills",
      description: data.skills?.soft
        ?.map((category) => category.skills.join(", "))
        .join(" | "),
    },
  ];

  return (
    <section
      className={`relative py-32 overflow-hidden bg-gradient-to-br ${theme.bgGradient}`}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className={`absolute top-20 right-0 w-96 h-96 bg-${
            theme.primary
          }/20 rounded-full blur-3xl
            ${theme.glass ? "backdrop-blur-3xl mix-blend-overlay" : ""}`}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`absolute bottom-0 left-0 w-96 h-96 bg-${
            theme.primary
          }/10 rounded-full blur-3xl
            ${theme.glass ? "backdrop-blur-3xl mix-blend-overlay" : ""}`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-24"
        >
          {/* Enhanced Section Header */}
          <div
            className={`text-center space-y-4 mb-16 ${
              theme.glass ? "p-8 rounded-2xl backdrop-blur-sm bg-white/5" : ""
            } 
            ${getEffectClasses("card")}`}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl lg:text-5xl font-bold text-${theme.text}
                ${theme.glass ? "drop-shadow-lg" : ""}`}
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`w-24 h-2 bg-${theme.primary} mx-auto rounded-full
                ${theme.glass ? "shadow-lg" : ""}`}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-${theme.textLight} max-w-2xl mx-auto text-lg
                ${theme.glass ? "drop-shadow-md" : ""}`}
            >
              {data.home?.tagline}
            </motion.p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Enhanced Left Side */}
            <div
              className={`space-y-8 ${
                theme.glass ? "p-8 rounded-2xl backdrop-blur-sm bg-white/5" : ""
              } 
              ${getEffectClasses("card")}`}
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-3xl lg:text-4xl font-bold text-${
                  theme.text
                } leading-tight
                  ${theme.glass ? "drop-shadow-lg" : ""}`}
              >
                {data.home?.profession}
                <span className="block">with {data.home?.yearsOfExperience}+ Years of Experience</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-lg text-${theme.textLight} leading-relaxed
                  ${theme.glass ? "drop-shadow-md" : ""}`}
              >
                {data.home?.summary}
              </motion.p>

              <motion.a
                href={data.contact?.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-block px-8 py-4 bg-${
                  theme.primary
                } text-white rounded-2xl 
                  hover:bg-${theme.primaryHover} transition-all duration-300 
                  shadow-lg hover:shadow-xl relative group
                  ${
                    theme.glass
                      ? "backdrop-blur-md bg-opacity-80 hover:bg-opacity-90"
                      : ""
                  }
                  ${getEffectClasses("button")}`}
              >
                <span className="relative z-10">Download Resume</span>
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${
                    theme.glass
                      ? "bg-gradient-to-r from-white/10 to-white/5"
                      : `bg-gradient-to-r from-${theme.primary} to-${theme.primaryHover}`
                  }`}
                />
              </motion.a>
            </div>

            {/* Enhanced Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 rounded-3xl 
                    ${
                      theme.glass
                        ? "backdrop-blur-md bg-white/10"
                        : `bg-gradient-to-br from-white to-${theme.accent}`
                    } 
                    shadow-xl ${getEffectClasses("card")}`}
                  >
                    <div
                      className={`absolute inset-0 rounded-3xl transition-opacity duration-300
                      ${
                        theme.glass
                          ? "bg-white/5"
                          : `bg-gradient-to-br from-${theme.primary}/20 to-transparent`
                      }
                      opacity-0 group-hover:opacity-100`}
                    />
                  </div>

                  <div className="relative p-8 space-y-4">
                    <div
                      className={`w-16 h-16 rounded-2xl 
                      ${
                        theme.glass
                          ? "backdrop-blur-sm bg-white/20"
                          : `bg-${theme.secondary}`
                      }
                      flex items-center justify-center 
                      text-${
                        theme.primary
                      } group-hover:scale-110 transition-transform duration-300
                      ${getEffectClasses("button")}`}
                    >
                      {skill.icon}
                    </div>
                    <h3
                      className={`text-xl font-semibold text-${theme.text}
                      ${theme.glass ? "drop-shadow-md" : ""}`}
                    >
                      {skill.title}
                    </h3>
                    <p
                      className={`text-${theme.textLight} leading-relaxed
                      ${theme.glass ? "drop-shadow-sm" : ""}`}
                    >
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;