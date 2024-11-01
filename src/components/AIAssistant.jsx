import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaMagic, FaLightbulb } from 'react-icons/fa';

function AIAssistant({ portfolioData, onSuggest }) {
  const [isThinking, setIsThinking] = useState(false);

  const generateSuggestions = () => {
    setIsThinking(true);
    
    setTimeout(() => {
      const suggestions = {
        home: {
          ...portfolioData.home,
          tagline: enhanceTagline(portfolioData.home.tagline),
          summary: enhanceSummary(portfolioData.home.summary)
        },
        skills: enhanceSkills(portfolioData.skills),
        projects: enhanceProjects(portfolioData.projects)
      };
      
      onSuggest(suggestions);
      setIsThinking(false);
    }, 1500);
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
    <div className="ai-assistant">
      <div className="ai-header">
        <FaRobot className="ai-icon" />
        <h3 className="ai-title">AI Assistant</h3>
      </div>

      <div className="ai-actions">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ai-button"
          onClick={generateSuggestions}
          disabled={isThinking}
        >
          {isThinking ? (
            <>
              <FaMagic className="spin" /> Enhancing...
            </>
          ) : (
            <>
              <FaLightbulb /> Enhance Content
            </>
          )}
        </motion.button>
      </div>

      <div className="ai-tips">
        <p>Tips:</p>
        <ul>
          <li>Use action verbs in project descriptions</li>
          <li>Highlight key achievements and metrics</li>
          <li>Keep descriptions concise and impactful</li>
        </ul>
      </div>
    </div>
  );
}

export default AIAssistant;