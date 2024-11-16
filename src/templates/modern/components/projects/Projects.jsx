import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Enhanced Placeholder Component with Glass Effects
const ProjectPlaceholder = ({ title, theme }) => {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-${theme.primary} to-${
        theme.primaryHover
      } 
      flex items-center justify-center p-8 relative overflow-hidden
      ${theme.glass ? "backdrop-blur-lg bg-opacity-50" : ""}`}
    >
      <div
        className={`absolute inset-0 
        ${theme.glass ? "bg-white/5 backdrop-blur-sm" : ""}`}
      />
      <div className="relative flex flex-col items-center justify-center z-10">
        <h3 className="text-white text-center font-medium">{title}</h3>
      </div>
    </div>
  );
};

const Projects = ({ data }) => {
  const { theme, getEffectClasses } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const projectCategories = data.map((project) => project.category).filter(Boolean);
  const uniqueCategories = [...new Set(projectCategories)];

  const categories = uniqueCategories.length > 0
    ? [
        { id: "all", label: "All Projects" },
        ...uniqueCategories.map((category) => ({
          id: category,
          label: category,
        })),
      ]
    : [{ id: "all", label: "All Projects" }];

  const filteredProjects =
    selectedFilter === "all"
      ? data
      : data.filter((project) => project.category === selectedFilter);



  return (
    <section className={`py-32 bg-gradient-to-br ${theme.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center space-y-4 mb-16 
            ${theme.glass ? "p-8 rounded-2xl backdrop-blur-sm bg-white/5" : ""}
            ${getEffectClasses("card")}`}
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold text-${theme.text}
            ${theme.glass ? "drop-shadow-lg" : ""}`}
          >
            Projects
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-24 h-2 bg-${theme.primary} mx-auto rounded-full
              ${theme.glass ? "shadow-lg" : ""}`}
          />
          <p
            className={`text-${theme.textLight} max-w-2xl mx-auto text-lg
            ${theme.glass ? "drop-shadow-md" : ""}`}
          >
            Showcasing my latest work and side projects
          </p>
        </motion.div>

        {/* Enhanced Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 
          ${theme.glass ? "p-4 rounded-xl backdrop-blur-sm bg-white/5" : ""}
          ${getEffectClasses("card")}`}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(category.id)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 
                ${
                  selectedFilter === category.id
                    ? `bg-${theme.primary} text-white shadow-lg ${
                        theme.glass ? "bg-opacity-90" : ""
                      }`
                    : `${
                        theme.glass
                          ? "bg-white/10 hover:bg-white/20"
                          : `bg-white text-${theme.textLight} hover:bg-${theme.accent}`
                      }`
                }
                ${theme.glass ? "backdrop-blur-sm" : ""}
                ${getEffectClasses("button")}`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.projectId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl
                  ${theme.glass ? "backdrop-blur-md bg-white/10" : "bg-white"} 
                  shadow-lg hover:shadow-xl transition-all duration-300
                  ${getEffectClasses("card")}`}
              >
                {/* Project Image or Placeholder */}
                <div className="relative h-48 overflow-hidden">
                  <ProjectPlaceholder title={project.title} theme={theme} />
                </div>

                {/* Enhanced Project Content */}
                <div
                  className={`p-8 space-y-4 
                  ${theme.glass ? "backdrop-blur-sm bg-white/5" : ""}`}
                >
                  <h3
                    className={`text-xl font-bold text-${theme.text}
                    ${theme.glass ? "drop-shadow-md" : ""}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-${theme.textLight} line-clamp-3
                    ${theme.glass ? "drop-shadow-sm" : ""}`}
                  >
                    {project.description}
                  </p>

                  {/* Enhanced Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`px-3 py-1 text-sm rounded-full
                          ${
                            theme.glass
                              ? "backdrop-blur-sm bg-white/10 text-white"
                              : `bg-${theme.accent} text-${theme.primary}`
                          }
                          ${getEffectClasses("button")}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced Links */}
                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full
                        ${
                          theme.glass
                            ? "hover:bg-white/10 backdrop-blur-sm"
                            : `text-${theme.textLight} hover:text-${theme.primary}`
                        }
                        transition-all duration-300`}
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full
                          ${
                            theme.glass
                              ? "hover:bg-white/10 backdrop-blur-sm"
                              : `text-${theme.textLight} hover:text-${theme.primary}`
                          }
                          transition-all duration-300`}
                      >
                        <ExternalLink className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;