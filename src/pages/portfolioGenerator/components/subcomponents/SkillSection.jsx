import React from "react";
import {
  Brain,
  Code,
  Trash2,
  Wrench,
  Plus,
  X,
  BookOpen,
  PenTool,
} from "lucide-react";

const SkillSection = ({ title, icon: Icon, skills, category, addSkill, removeSkill, updateSkill }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-500" />
          <h5 className="text-lg font-medium text-gray-700">{title}</h5>
        </div>
        <button
          type="button"
          onClick={() => addSkill(category)}
          className="inline-flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <Plus className="w-4 h-4" />
          Add {title}
        </button>
      </div>

      <div className="space-y-3">
        {skills?.map((skill, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200 group"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`${title} Name`}
                  value={skill.name}
                  onChange={(e) => updateSkill(category, index, "name", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors"
                />
              </div>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={skill.proficiency}
                  onChange={(e) => updateSkill(category, index, "proficiency", e.target.value)}
                  className="w-full pl-10 pr-10 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-white"
                >
                  <option value="">Select Proficiency</option>
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeSkill(category, index)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {(!skills || skills.length === 0) && (
          <p className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            No {title.toLowerCase()} added yet. Click the button above to add one.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillSection