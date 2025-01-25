import React from "react";
import {
  Trash2,
  Plus,
  BookOpen,
  PenTool,
} from "lucide-react";

const SkillSection = ({
  title,
  icon: Icon,
  skills,
  category,
  addSkill,
  removeSkill,
  updateSkill,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-500" />
          <h5 className="text-lg font-medium text-white">{title}</h5>
        </div>
        <button
          type="button"
          onClick={() => addSkill(category)}
          className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add {title}
        </button>
      </div>

      <div className="space-y-3">
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3  rounded-lg border-2 border-gray-700 group"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
              <div className="relative">
                <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`${title} Name`}
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(category, index, "name", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={skill.proficiency}
                  onChange={(e) =>
                    updateSkill(category, index, "proficiency", e.target.value)
                  }
                  className="w-full pl-10 pr-10 py-3 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-gray-800 text-white placeholder-gray-400"
                >
                  <option value="">Select Proficiency</option>
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeSkill(category, index)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {(!skills || skills.length === 0) && (
          <div className="border border-dashed border-gray-400 rounded-lg p-4">
            <p className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-400">
              No {title.toLowerCase()} added yet. Click the button above to add
              one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSection;
