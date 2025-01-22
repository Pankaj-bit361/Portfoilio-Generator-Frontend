import { GraduationCap } from "lucide-react";
import EducationCard from "./subcomponents/EducationCard";

const PortFolioEducation = ({ formData, setFormData, setFlag }) => {
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          field: "",
          school: "",
          location: "",
          startDate: "",
          endDate: "",
          relevantCourses: [],
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white ">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
        >
          <GraduationCap className="w-5 h-5" />
          Add Education
        </button>
      </div>

      {formData?.education?.length === 0 ? (
        <div className="text-center py-8 bg-transparent rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-400">
            No education details added yet. Click the button above to add your education history.
          </p>
        </div>
      ) : (
        formData?.education?.map((edu, index) => (
          <EducationCard
            key={index}
            index={index}
            removeEducation={removeEducation}
            educationData={edu}
            formData={formData}
            setFormData={setFormData}
            setFlag={setFlag}
          />
        ))
      )}
    </div>
  );
};

export default PortFolioEducation;