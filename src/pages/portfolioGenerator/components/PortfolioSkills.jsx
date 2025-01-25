import { BookOpen, Code, Contact2, Wrench } from "lucide-react";
import React from "react";
import SkillSection from "./subcomponents/SkillSection";
import SoftSkillSection from "./subcomponents/SoftSkillSection";
import General from "../../../config/general";
import { toast } from "react-toastify";

const PortfolioSkills = ({ formData, setFormData, setFlag }) => {
  const addSkill = (category) => {
    const newFormData = { ...formData };

    if (category === "soft") {
      newFormData.skills.soft.push({
        category: "",
        skills: [],
      });
    } else {
      newFormData.skills.technical[category].push({
        name: "",
        proficiency: "",
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

  const updateApiskills = async () => {
    if (!formData && !formData.home) return;

    try {
      const response = await General.updateSkills(formData.skills);

      if (response.success) {
        toast.success("Personal Information Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white ">Skills</h3>

      <div className="space-y-8">
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-300">
            Technical Skills
          </h4>

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

        <div className="flex justify-end">
          <button
            type="button"
            onClick={updateApiskills}
            className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg text-white font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transform hover:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Contact2 size={20} />
            Update Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSkills;
