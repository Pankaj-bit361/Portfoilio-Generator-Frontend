import { Brain, PenTool, Plus, Trash2, X } from "lucide-react";

const SoftSkillSection = ({ skills, addSkill, removeSkill, updateSkill }) => {
    const addSkillToCategory = (categoryIndex) => {
      const newSkills = [...skills];
      newSkills[categoryIndex].skills.push("");
      updateSkill("soft", categoryIndex, "skills", newSkills[categoryIndex].skills);
    };
  
    const removeSkillFromCategory = (categoryIndex, skillIndex) => {
      const newSkills = [...skills];
      newSkills[categoryIndex].skills.splice(skillIndex, 1);
      updateSkill("soft", categoryIndex, "skills", newSkills[categoryIndex].skills);
    };
  
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-gray-500" />
            <h5 className="text-lg font-medium text-gray-700">Soft Skills</h5>
          </div>
          <button
            type="button"
            onClick={() => addSkill("soft")}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
  
        <div className="space-y-6">
          {skills?.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="p-4 bg-white rounded-lg border-2 border-gray-200 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category.category}
                    onChange={(e) => updateSkill("soft", categoryIndex, "category", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill("soft", categoryIndex)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
  
              <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <h6 className="text-sm font-medium text-gray-600">Skills</h6>
                  <button
                    type="button"
                    onClick={() => addSkillToCategory(categoryIndex)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-md"
                  >
                    <Plus className="w-3 h-3" />
                    Add Skill
                  </button>
                </div>
  
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Enter skill"
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...category.skills];
                            newSkills[skillIndex] = e.target.value;
                            updateSkill("soft", categoryIndex, "skills", newSkills);
                          }}
                          className="w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SoftSkillSection