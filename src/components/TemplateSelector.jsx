import { motion } from "framer-motion";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { config } from '../config/api';
import General from '../config/general';
import GlassLoader from "./GlassLoader"; 

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
    id: 'modern', 
    name: 'Modern', 
    description: 'Clean and professional design',
    image: '/path/to/modern-template-preview.jpg'
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    description: 'Bold and innovative layout',
    image: '/path/to/creative-template-preview.jpg'
  },
  { 
    id: 'professional', 
    name: 'Professional', 
    description: 'Classic and elegant style',
    image: '/path/to/professional-template-preview.jpg'
  }
];

function TemplateSelector({ 
  selectedTemplate, 
  onSelect, 
  portfolioId, 
  isEditable = true 
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTemplateUpdate = async (template) => {
    if (!portfolioId) return;
    
    try {
      setIsUpdating(true);
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/template?userId=${General.getUserId()}`,
        { template: template } 
      );
  
      if (response.data.success) {
        onSelect(template);
        toast.success('Template updated successfully');
      } else {
        toast.error(response.data.error || 'Failed to update template');
      }
    } catch (error) {
      console.error('Template update error:', error);
      toast.error('Failed to update template');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-12 px-4 relative"
    >
      {isUpdating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <GlassLoader />
        </div>
      )}

      <motion.h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
        Choose Your Template
      </motion.h3>

      <motion.div 
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-6xl mx-auto ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {templateOptions.map((template) => (
          <motion.div
            key={template.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => isEditable 
              ? (portfolioId 
                ? handleTemplateUpdate(template.id) 
                : onSelect(template.id)) 
              : null}
            className={`
              relative overflow-hidden p-6 rounded-xl cursor-pointer
              border-2 transition-all duration-300
              ${
                selectedTemplate === template.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700/30 hover:border-blue-500/50 bg-gray-800/50"
              }
              backdrop-blur-sm
              group
            `}
          >
            {selectedTemplate === template.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-500"
              />
            )}

            <motion.div className="relative z-10">
              <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                {template.name}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {template.description}
              </p>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default TemplateSelector;
