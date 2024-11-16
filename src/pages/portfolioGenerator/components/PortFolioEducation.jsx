import { GraduationCap, Trash2 } from "lucide-react";
import React from "react";
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

  const updateEductaion = () => {
    if (formData.education.length == 0) return;
    console.log(formData.education);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3 className="form-title">Education</h3>
        <button type="button" onClick={addEducation} className="add-button">
          <GraduationCap className="icon" /> Add Education
        </button>
      </div>

      {formData?.education?.map((edu, index) => (
        <EducationCard
          index={index}
          key={index}
          removeEducation={removeEducation}
          educationData={edu}
          formData={formData}
          setFormData={setFormData}
          setFlag={setFlag}
        />
      ))}

      <button
        type="button"
        onClick={updateEductaion}
        className="add-button ml-auto"
      >
        <GraduationCap className="icon" /> Update Education
      </button>
    </div>
  );
};

export default PortFolioEducation;
