import React from "react";
import { Briefcase } from "lucide-react";
import ExperienceCard from "./subcomponents/ExperienceCard";

const PortFolioExperience = ({ formData, setFormData, setFlag }) => {
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          role: "",
          company: "",
          location: "",
          type: "",
          startDate: "",
          endDate: "",
          description: "",
          responsibilities: [],
          achievements: [],
        },
      ],
    }));
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white ">Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
        >
          <Briefcase className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {formData?.experiences?.length === 0 ? (
        <div className="text-center py-8 bg-transparent rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-400">
            No experience added yet. Click the button above to add your work
            experience.
          </p>
        </div>
      ) : (
        formData?.experiences?.map((exp, index) => (
          <ExperienceCard
            key={index}
            exp={exp}
            index={index}
            formData={formData}
            setFormData={setFormData}
            setFlag={setFlag}
          />
        ))
      )}
    </div>
  );
};

export default PortFolioExperience;
