import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPalette, FaTimes, FaMagic } from "react-icons/fa";
import General from "../config/general";
import { config } from "../config/api";
import { toast } from "react-toastify";
import axios from "axios";

function AIAssistant({ portfolioData, onSuggest }) {
  const [isThinking, setIsThinking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("https://");
  const [error, setError] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const generateSuggestions = () => {
    setIsThinking(true);

    setTimeout(() => {
      const suggestions = {
        home: {
          ...portfolioData.home,
          tagline: enhanceTagline(portfolioData.home.tagline),
          summary: enhanceSummary(portfolioData.home.summary),
        },
        skills: enhanceSkills(portfolioData.skills),
        projects: enhanceProjects(portfolioData.projects),
      };

      onSuggest(suggestions);
      setIsThinking(false);
    }, 1500);
  };

  const handleUrlChange = (e) => {
    let url = e.target.value;
    // If user deletes the https://, add it back
    if (!url.startsWith("https://")) {
      url = "https://" + url.replace("http://", "");
    }
    setWebsiteUrl(url);
  };

  const handleModalOpen = () => {
    setWebsiteUrl("https://");
    setError("");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setWebsiteUrl("https://");
    setError("");
    setIsModalOpen(false);
  };

  const handleExtractTheme = async () => {
    if (!websiteUrl || websiteUrl === "https://") {
      setError("Please enter a website URL");
      return;
    }

    try {
      setIsExtracting(true);
      setError("");

      const json = {
        url: websiteUrl,
      };

      const response = await axios.patch(
        `${
          config.BASE_URL
        }api/theme/${General.getPortfolioId()}/extract?userId=${General.getUserId()}`,
        json
      );

      if (response.data.success) {
        toast.success("Theme extracted successfully!");
        handleModalClose();
      } else {
        toast.error(response.data.error || "Failed to extract theme");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to extract theme";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsExtracting(false);
    }
  };

  const enhanceTagline = (tagline) => {
    return tagline + " | Innovation Driven Developer";
  };

  const enhanceSummary = (summary) => {
    return summary + " Passionate about creating impactful solutions.";
  };

  const enhanceSkills = (skills) => {
    return skills;
  };

  const enhanceProjects = (projects) => {
    return projects;
  };

  return (
    <div className="relative p-2 sm:p-3 md:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 sm:space-y-5 md:space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-tr from-blue-500 to-teal-500 rounded-lg">
              <FaRobot className="text-xl sm:text-2xl text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              AI Assistant
            </h3>
          </div>

          {/* Action Button */}
          <motion.div className="flex gap-2 sm:gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-1 sm:gap-2 
                        px-3 sm:px-4 md:px-5 lg:px-6 
                        py-2 sm:py-2.5 md:py-3 
                        bg-gradient-to-r from-blue-500 to-teal-500 
                        text-white rounded-lg 
                        text-sm sm:text-base
                        font-medium shadow-lg shadow-blue-500/20 
                        hover:shadow-blue-500/30 transition-all"
              onClick={handleModalOpen}
            >
              <FaPalette className="text-base sm:text-lg" />
              <span>Extract Theme</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
        >
          <h4 className="font-medium text-blue-400 mb-2 sm:mb-3 text-sm sm:text-base">Tips:</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-300">
            <motion.li
              whileHover={{ x: 2 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
              Use action verbs in project descriptions
            </motion.li>
            <motion.li
              whileHover={{ x: 2 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
              Highlight key achievements and metrics
            </motion.li>
            <motion.li
              whileHover={{ x: 2 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
              Keep descriptions concise and impactful
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[90%] sm:max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  Extract Theme
                </h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <FaTimes className="text-base sm:text-lg" />
                </motion.button>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* URL Input */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter website URL"
                    value={websiteUrl}
                    onChange={handleUrlChange}
                    disabled={isExtracting}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 
                             border border-gray-700 rounded-lg text-sm sm:text-base
                             text-white placeholder-gray-400 focus:outline-none 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                             transition-all"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 
                             rounded-lg text-red-400 text-sm sm:text-base"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleModalClose}
                    disabled={isExtracting}
                    className="px-3 sm:px-4 py-2 bg-gray-800 text-gray-300 
                             text-sm sm:text-base rounded-lg hover:bg-gray-700 
                             transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExtractTheme}
                    disabled={isExtracting}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 
                             bg-gradient-to-r from-blue-500 to-teal-500 
                             text-white rounded-lg font-medium text-sm sm:text-base
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExtracting ? (
                      <>
                        <FaMagic className="animate-spin text-base sm:text-lg" />
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <FaPalette className="text-base sm:text-lg" />
                        <span>Extract Theme</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AIAssistant;
