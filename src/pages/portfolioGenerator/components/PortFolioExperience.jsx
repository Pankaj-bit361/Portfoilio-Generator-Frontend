import React from "react";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Trash2,
  Save,
  Users,
  FileText,
} from "lucide-react";
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
    <div className="p-6 bg-white rounded-lg q-box-shawdow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <Briefcase className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {formData?.experiences?.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">
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
