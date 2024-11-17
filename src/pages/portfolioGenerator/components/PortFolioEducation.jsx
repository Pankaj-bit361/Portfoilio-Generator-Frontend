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
    <div className="p-6 bg-white rounded-lg q-box-shawdow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <GraduationCap className="w-5 h-5" />
          Add Education
        </button>
      </div>

      {formData?.education?.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">
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