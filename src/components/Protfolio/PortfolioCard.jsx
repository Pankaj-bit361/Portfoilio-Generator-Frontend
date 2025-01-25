import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash2, Lock, Globe, Calendar, Code } from "lucide-react";
import { Tilt } from "react-tilt";
import General from "../../config/general";

const defaultTiltOptions = {
  max: 25,
  scale: 1.05,
  speed: 1000,
};

const PortfolioCard = ({ portfolio, onEdit, onView, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-teal-500",
      inactive: "bg-blue-500",
      draft: "bg-teal-500",
    };
    return colors[status.toLowerCase()] || "bg-blue-500";
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await General.deletePortfolio(portfolio.portfolioId);
      onDelete(portfolio.portfolioId);
    } catch (error) {
      console.error(
        "Error deleting portfolio:",
        error.response?.data || error.message
      );
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Tilt options={defaultTiltOptions}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="from-black via-blue-900 to-black bg-[radial-gradient(circle_at_100%_120%,rgba(66,153,225,0.1),transparent)] bg-opacity-20 rounded-lg overflow-hidden backdrop-blur-lg transform-gpu p-6 transition-all duration-300 hover:shadow-[0_4px_15px_0_rgba(56,189,248,0.8)]  shadow-teal-500/20 border-teal-500/20 border-2"
        onClick={() => onView(portfolio)}
      >
        <div className="flex justify-between items-center mb-6">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
              portfolio.template
            )}`}
          >
            {portfolio.template}
          </span>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/5 hover:bg-teal-500/10"
              onClick={(e) => {
                e.stopPropagation();
                onView(portfolio);
              }}
            >
              <Eye size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/5 hover:bg-teal/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(portfolio);
              }}
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/5 hover:bg-red-500/10 transition-colors"
              onClick={(e) => handleDelete(e, portfolio)}
              disabled={isDeleting}
            >
              <Trash2
                size={18}
                className={isDeleting ? "text-gray-500" : "text-red-500"}
              />
            </motion.button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
              {portfolio.home.name}
            </h2>
            <p className="text-gray-400">{portfolio.home.profession}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Code size={18} className="text-blue-400" />
              <span className="text-sm">Template: {portfolio.template}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar size={18} className="text-blue-400" />
              <span className="text-sm">
                Created: {formatDate(portfolio.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              {portfolio.visibility === "public" ? (
                <Globe size={18} className="text-blue-400" />
              ) : (
                <Lock size={18} className="text-blue-500" />
              )}
              <span className="text-sm">
                {portfolio.visibility.charAt(0).toUpperCase() +
                  portfolio.visibility.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-xs">
                ID
              </div>
              <span className="text-sm font-mono">
                {portfolio.portfolioId.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default PortfolioCard;
