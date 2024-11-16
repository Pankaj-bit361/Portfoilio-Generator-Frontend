import axios from "axios";
import { Save, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { config } from "../../../../config/api";

const EducationCard = ({
  removeEducation,
  educationData,
  formData,
  setFormData,
  index,
  setFlag,
}) => {
    
  const updateEducationCard = async () => {
    if (!educationData.degree || !educationData.school) {
      toast.error("Degree and school are required fields");
      return
    }

    if (!educationData.educationId) {
      addEducationCard();
      return 
    }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const portfolioId = urlParams.get("portfolioId");
      let userData = JSON.parse(localStorage.getItem("portfolioUser"));

      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/education/${educationData.educationId}?userId=${userData?.userId}`,
        educationData
      );

      if (response.data.success) {
        toast.success("Personal Information Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const addEducationCard = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const portfolioId = urlParams.get("portfolioId");
      let userData = JSON.parse(localStorage.getItem("portfolioUser"));

      const response = await axios.post(
        `${config.BASE_URL}api/portfolio/${portfolioId}/education/?userId=${userData?.userId}`,
        educationData
      );

      if (response.data.success) {
        toast.success("Added Education Information");
        setFlag((prev) => !prev);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const deleteEducationCard = async () => {
    if (!educationData && !educationData.educationId) return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const portfolioId = urlParams.get("portfolioId");
      let userData = JSON.parse(localStorage.getItem("portfolioUser"));

      const response = await axios.delete(
        `${config.BASE_URL}api/portfolio/${portfolioId}/education/${educationData.educationId}?userId=${userData?.userId}`
      );

      if (response.data.success) {
        toast.success("Personal Information Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div key={index} className="project-card">
      <div className="project-card-content">
        <input
          type="text"
          placeholder="Degree"
          value={educationData.degree}
          onChange={(e) => {
            const newEducation = [...formData.education];
            newEducation[index].degree = e.target.value;
            setFormData({ ...formData, education: newEducation });
          }}
          className="form-input"
        />

        <input
          type="text"
          placeholder="Field of Study"
          value={educationData.field}
          onChange={(e) => {
            const newEducation = [...formData.education];
            newEducation[index].field = e.target.value;
            setFormData({ ...formData, education: newEducation });
          }}
          className="form-input"
        />

        <input
          type="text"
          placeholder="School/University"
          value={educationData.school}
          onChange={(e) => {
            const newEducation = [...formData.education];
            newEducation[index].school = e.target.value;
            setFormData({ ...formData, education: newEducation });
          }}
          className="form-input"
        />

        <input
          type="text"
          placeholder="Location"
          value={educationData.location}
          onChange={(e) => {
            const newEducation = [...formData.education];
            newEducation[index].location = e.target.value;
            setFormData({ ...formData, education: newEducation });
          }}
          className="form-input"
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Start Date"
            value={educationData.startDate}
            onChange={(e) => {
              const newEducation = [...formData.education];
              newEducation[index].startDate = e.target.value;
              setFormData({
                ...formData,
                education: newEducation,
              });
            }}
            className="form-input"
          />
          <input
            type="text"
            placeholder="End Date"
            value={educationData.endDate}
            onChange={(e) => {
              const newEducation = [...formData.education];
              newEducation[index].endDate = e.target.value;
              setFormData({
                ...formData,
                education: newEducation,
              });
            }}
            className="form-input"
          />
        </div>

        <div className="flex flex-row gap-4 ml-auto">
          <button
            type="button"
            onClick={() => updateEducationCard()}
            className="remove-button"
          >
            <Save className="icon" />
          </button>

          <button
            type="button"
            onClick={() => deleteEducationCard()}
            className="remove-button"
          >
            <Trash2 className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
