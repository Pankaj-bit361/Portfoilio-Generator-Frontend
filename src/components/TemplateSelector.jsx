import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import General from "../config/general";
import GlassLoader from "./GlassLoader";
import { BookOpen, Palette, Briefcase } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const templateOptions = [
  {
    id: "modern",
    name: "Modern",
    description: "Sleek, clean design with maximum impact and simplicity",
    icon: BookOpen,
    features: [
      "Responsive grid layout",
      "Subtle animations",
      "Dark mode support"
    ],
    accentColor: "from-blue-900 to-teal-800"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Dynamic, narrative-driven portfolio with interactive elements",
    icon: Palette,
    features: [
      "Scroll-triggered animations",
      "Interactive project showcases",
      "Microinteractions"
    ],
    accentColor: "from-blue-900 to-teal-800"
  },
  {
    id: "professional",
    name: "Professional Executive",
    description: "Sophisticated, data-driven presentation with executive appeal",
    icon: Briefcase,
    features: [
      "Advanced data visualizations",
      "Professional color schemes",
      "Performance metrics integration"
    ],
    accentColor: "from-blue-900 to-teal-800"
  }
];

function TemplateSelector({
  selectedTemplate,
  onSelect,
  portfolioId,
  isEditable = true,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const handleTemplateUpdate = async (template) => {
    if (!portfolioId) return;

    try {
      setIsUpdating(true);
      const response = await General.updatePortfolioTemplate(
        portfolioId,
        template
      );

      if (response.success) {
        onSelect(template);
        toast.success("Template updated successfully");
      } else {
        toast.error(response.error || "Failed to update template");
      }
    } catch (error) {
      console.error("Template update error:", error);
      toast.error("Failed to update template");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 relative"
    >
      {isUpdating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <GlassLoader />
        </div>
      )}

      <motion.h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10 lg:mb-12 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
        Select Your Portfolio Canvas
      </motion.h3>

      <motion.div
        className={`
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4 sm:gap-6 lg:gap-8 
          max-w-full sm:max-w-2xl lg:max-w-6xl 
          mx-auto 
          ${isUpdating ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {templateOptions.map((template) => {
          const TemplateIcon = template.icon;
          return (
            <motion.div
              key={template.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() =>
                isEditable
                  ? portfolioId
                    ? handleTemplateUpdate(template.id)
                    : onSelect(template.id)
                  : null
              }
              className={`
                relative overflow-hidden 
                p-4 sm:p-5 lg:p-6 
                rounded-xl sm:rounded-2xl 
                cursor-pointer
                border-2 transition-all duration-300 group
                ${
                  selectedTemplate === template.id
                    ? `border-blue-500 bg-gradient-to-br ${template.accentColor} bg-opacity-20`
                    : "border-gray-700/30 hover:border-blue-500/50 bg-gray-800/50"
                }
                backdrop-blur-md
                transform hover:shadow-2xl
                h-full flex flex-col
              `}
            >
              {selectedTemplate === template.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500"
                />
              )}

              <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex items-center mb-3 sm:mb-4">
                  <TemplateIcon 
                    className={`
                      w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4
                      ${
                        selectedTemplate === template.id
                          ? "text-white"
                          : "text-gray-400 group-hover:text-blue-400"
                      }
                      transition-colors
                    `}
                  />
                  <h4 className={`
                    text-lg sm:text-xl font-semibold
                    ${
                      selectedTemplate === template.id
                        ? "text-white"
                        : "text-white group-hover:text-blue-300"
                    }
                    transition-colors
                  `}>
                    {template.name}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4 flex-grow">
                  {template.description}
                </p>

                <div className="mt-auto">
                  <div className="border-t border-gray-700/50 pt-3 sm:pt-4">
                    <h5 className="text-2xs sm:text-xs uppercase tracking-wider text-gray-500 mb-1 sm:mb-2">
                      Key Features
                    </h5>
                    <ul className="space-y-1">
                      {template.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className={`
                            text-2xs sm:text-xs
                            ${
                              hoveredTemplate === template.id
                                ? "text-white"
                                : "text-gray-400"
                            }
                            transition-colors
                          `}
                        >
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`
                absolute inset-0 bg-gradient-to-br 
                ${template.accentColor}
                opacity-0 group-hover:opacity-10 
                transition-opacity duration-500
              `} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default TemplateSelector;