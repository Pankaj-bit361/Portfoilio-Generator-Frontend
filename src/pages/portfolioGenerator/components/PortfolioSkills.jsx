import { BookOpen, Brain, Code, Trash2, Wrench } from "lucide-react";
import React from "react";
import SkillSection from "./subcomponents/SkillSection";
import SoftSkillSection from "./subcomponents/SoftSkillSection";

const PortfolioSkills = ({ formData, setFormData, setFlag }) => {
    const addSkill = (category) => {
      const newFormData = { ...formData };
      
      if (category === "soft") {
        newFormData.skills.soft.push({
          category: "",
          skills: []
        });
      } else {
        newFormData.skills.technical[category].push({
          name: "",
          proficiency: ""
        });
      }
      
      setFormData(newFormData);
    };
  
    const removeSkill = (category, index) => {
      const newFormData = { ...formData };
      
      if (category === "soft") {
        newFormData.skills.soft.splice(index, 1);
      } else {
        newFormData.skills.technical[category].splice(index, 1);
      }
      
      setFormData(newFormData);
    };
  
    const updateSkill = (category, index, field, value) => {
      const newFormData = { ...formData };
      
      if (category === "soft") {
        newFormData.skills.soft[index][field] = value;
      } else {
        newFormData.skills.technical[category][index][field] = value;
      }
      
      setFormData(newFormData);
    };
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-8">
        <h3 className="text-2xl font-bold text-gray-800">Skills</h3>
  
        <div className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-700">Technical Skills</h4>
            
            <SkillSection
              title="Languages"
              icon={Code}
              skills={formData?.skills?.technical?.languages}
              category="languages"
              addSkill={addSkill}
              removeSkill={removeSkill}
              updateSkill={updateSkill}
            />
  
            <SkillSection
              title="Frameworks"
              icon={BookOpen}
              skills={formData?.skills?.technical?.frameworks}
              category="frameworks"
              addSkill={addSkill}
              removeSkill={removeSkill}
              updateSkill={updateSkill}
            />
  
            <SkillSection
              title="Tools"
              icon={Wrench}
              skills={formData?.skills?.technical?.tools}
              category="tools"
              addSkill={addSkill}
              removeSkill={removeSkill}
              updateSkill={updateSkill}
            />
          </div>
  
          <div className="pt-6 border-t border-gray-200">
            <SoftSkillSection
              skills={formData?.skills?.soft}
              addSkill={addSkill}
              removeSkill={removeSkill}
              updateSkill={updateSkill}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default PortfolioSkills;
