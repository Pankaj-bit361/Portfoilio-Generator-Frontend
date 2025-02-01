import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag as TagIcon,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ImageCarousel = ({ images, title, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { convertTailwindToRgb, getColorWithOpacity } = useTheme();

  if (!images?.length) {
    return <ProjectPlaceholder title={title} theme={theme} />;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative h-64 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {images.length > 1 && (
        <>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm transform -translate-x-8 group-hover:translate-x-0 transition-all duration-300 hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm transform translate-x-8 group-hover:translate-x-0 transition-all duration-300 hover:bg-white"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full
                  ${
                    idx === currentIndex
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/60 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectPlaceholder = ({ title, theme }) => {
  const { convertTailwindToRgb } = useTheme();

  return (
    <div className="relative h-64 group">
      <div
        style={{
          background: `linear-gradient(to bottom right, ${convertTailwindToRgb(
            theme.primary
          )}, ${convertTailwindToRgb(theme.primaryHover)})`,
        }}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
        <h3 className="text-white text-xl font-medium relative z-10">
          {title}
        </h3>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, theme, getEffectClasses }) => {
  const { convertTailwindToRgb, getColorWithOpacity } = useTheme();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        backgroundColor: theme.glass
          ? "rgba(255, 255, 255, 0.1)"
          : convertTailwindToRgb(theme.bg),
      }}
      className={`
        group relative overflow-hidden rounded-2xl
        h-full shadow-lg hover:shadow-2xl 
        transition-all duration-500
        transform hover:-translate-y-1
        ${getEffectClasses("card")}
      `}
    >
      <ImageCarousel
        images={project.images}
        title={project.title}
        theme={theme}
      />

      <div className="relative p-6">
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <TagIcon className="w-4 h-4" />
            <span>{project.category}</span>
          </div>
          {project.date && (
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{project.date}</span>
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <h3
            style={{
              color: theme.glass ? "#fff" : convertTailwindToRgb(theme.text),
            }}
            className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[var(--theme-primary)]"
          >
            {project.title}
          </h3>
          <p
            style={{
              color: theme.glass
                ? "rgb(209, 213, 219)"
                : convertTailwindToRgb(theme.textLight),
            }}
            className="text-sm leading-relaxed"
          >
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Layers className="w-4 h-4 mt-1 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    backgroundColor: theme.glass
                      ? "rgba(255, 255, 255, 0.1)"
                      : getColorWithOpacity(
                          convertTailwindToRgb(theme.primary),
                          0.1
                        ),
                    color: theme.glass
                      ? "rgba(255, 255, 255, 0.9)"
                      : convertTailwindToRgb(theme.primary),
                  }}
                  className="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 hover:bg-opacity-100"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200/10">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.glass
                  ? "#fff"
                  : convertTailwindToRgb(theme.textLight),
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                transition-all duration-300 group/link
                hover:text-[var(--theme-primary)]"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
            </a>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: theme.glass
                    ? "rgba(255, 255, 255, 0.1)"
                    : convertTailwindToRgb(theme.primary),
                  color: theme.glass ? "#fff" : "#fff",
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  transition-all duration-300 group/link
                  hover:bg-opacity-90"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ data }) => {
  const { theme, getEffectClasses, convertTailwindToRgb, getColorWithOpacity } =
    useTheme();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const projectCategories = data
    .map((project) => project.category)
    .filter(Boolean);
  const uniqueCategories = [...new Set(projectCategories)];
  const categories = [
    { id: "all", label: "All Projects" },
    ...uniqueCategories.map((category) => ({
      id: category,
      label: category,
    })),
  ];

  const filteredProjects =
    selectedFilter === "all"
      ? data
      : data.filter((project) => project.category === selectedFilter);

  const gridLayout = useMemo(() => {
    const count = filteredProjects.length;
    if (count <= 2) return "grid grid-cols-1 md:grid-cols-2 gap-8";
    if (count === 3) return "grid grid-cols-1 md:grid-cols-3 gap-8";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
  }, [filteredProjects.length]);

  const containerWidth = useMemo(() => {
    const count = filteredProjects.length;
    return count <= 3 ? "max-w-7xl" : "container";
  }, [filteredProjects.length]);

  const cardWidth = useMemo(() => {
    const count = filteredProjects.length;
    if (count === 1) return "max-w-3xl mx-auto";
    if (count === 2) return "w-full";
    return "";
  }, [filteredProjects.length]);

  // Define CSS variables for theme colors
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-primary",
      convertTailwindToRgb(theme.primary)
    );
  }, [theme.primary]);

  return (
    <section
      style={{
        background: `linear-gradient(to bottom right, ${theme.bgGradient})`,
      }}
      className="py-32"
    >
      <div className={`${containerWidth} mx-auto px-6`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2
            style={{ color: convertTailwindToRgb(theme.text) }}
            className="text-4xl lg:text-5xl font-bold"
          >
            Featured Projects
          </h2>
          <p
            style={{ color: convertTailwindToRgb(theme.textLight) }}
            className="max-w-2xl mx-auto text-lg"
          >
            A showcase of my latest work and creative endeavors
          </p>
        </motion.div>

        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(category.id)}
                style={{
                  backgroundColor:
                    selectedFilter === category.id
                      ? convertTailwindToRgb(theme.primary)
                      : "rgba(255, 255, 255, 0.1)",
                  color:
                    selectedFilter === category.id
                      ? "#fff"
                      : convertTailwindToRgb(theme.textLight),
                  boxShadow:
                    selectedFilter === category.id
                      ? `0 10px 15px -3px ${getColorWithOpacity(
                          convertTailwindToRgb(theme.primary),
                          0.25
                        )}`
                      : "none",
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-opacity-90"
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        )}

        <motion.div layout className={gridLayout}>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <div key={project.projectId} className={cardWidth}>
                <ProjectCard
                  project={project}
                  theme={theme}
                  getEffectClasses={getEffectClasses}
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p
              style={{ color: convertTailwindToRgb(theme.textLight) }}
              className="text-lg"
            >
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
