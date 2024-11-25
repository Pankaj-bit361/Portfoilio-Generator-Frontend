import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaMagic,
  FaLightbulb,
  FaPalette,
  FaTimes,
} from "react-icons/fa";
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
    if (!url.startsWith('https://')) {
      url = 'https://' + url.replace('http://', '');
    }
    setWebsiteUrl(url);
  };

  const handleModalOpen = () => {
    setWebsiteUrl('https://');
    setError('');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setWebsiteUrl('https://');
    setError('');
    setIsModalOpen(false);
  };

  const handleExtractTheme = async () => {
    if (!websiteUrl || websiteUrl === 'https://') {
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
        `${config.BASE_URL}api/theme/${General.getPortfolioId()}/extract?userId=${General.getUserId()}`,
        json
      );

      if (response.data.success) {
        toast.success("Theme extracted successfully!");
        handleModalClose();
      } else {
        toast.error(response.data.error || "Failed to extract theme");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Failed to extract theme";
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-2xl text-blue-600" />
        <h3 className="text-xl font-semibold">AI Assistant</h3>
      </div>

      <div className="flex gap-3 mb-6">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-dark)]"
          onClick={handleModalOpen}
        >
          <FaPalette /> Extract Theme
        </motion.button>
      </div>

      <div className="text-sm text-gray-600">
        <p className="font-medium mb-2">Tips:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use action verbs in project descriptions</li>
          <li>Highlight key achievements and metrics</li>
          <li>Keep descriptions concise and impactful</li>
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Extract Theme</h3>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter website URL"
                value={websiteUrl}
                onChange={handleUrlChange}
                disabled={isExtracting}
                className="w-full px-4 bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-dark)]"
              />

              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleModalClose}
                  disabled={isExtracting}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExtractTheme}
                  disabled={isExtracting}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--primary-dark)] disabled:opacity-50"
                >
                  {isExtracting ? (
                    <>
                      <FaMagic className="animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <FaPalette />
                      Extract Theme
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;