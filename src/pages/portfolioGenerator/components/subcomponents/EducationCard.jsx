import React from "react";
import {
  GraduationCap,
  Save,
  Trash2,
  BookOpen,
  Building,
  MapPin,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../../../config/api";
import General from "../../../../config/general";

export const EducationCard = ({
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
      return;
    }

    if (!educationData.educationId) {
      addEducationCard();
      return;
    }

    try {
      const response = await axios.patch(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/education/${
          educationData.educationId
        }?userId=${General.getUserId()}`,
        educationData
      );

      if (response.data.success) {
        toast.success("Education Information Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const addEducationCard = async () => {
    try {
      const response = await axios.post(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/education/?userId=${General.getUserId()}`,
        educationData
      );

      if (response.data.success) {
        toast.success("Added Education Information");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteEducationCard = async () => {
    if (!educationData && !educationData.educationId) return;

    try {
      const response = await axios.delete(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/education/${
          educationData.educationId
        }?userId=${General.getUserId()}`
      );

      if (response.data.success) {
        toast.success("Education Information Deleted Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 h-12 text-white border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent";

  return (
    <div className="space-y-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Degree
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your degree"
              value={educationData.degree}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].degree = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Field of Study Input - using BookOpen for field of study */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Field of Study
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your field of study"
              value={educationData.field}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].field = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* School Input - using Building for school/university */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            School/University
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your school/university"
              value={educationData.school}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].school = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Location Input - using MapPin for location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter location"
              value={educationData.location}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].location = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Start Date Input - using Calendar for dates */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter start date"
              value={educationData.startDate}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].startDate = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* End Date Input - using Calendar for dates */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter end date"
              value={educationData.endDate}
              onChange={(e) => {
                const newEducation = [...formData.education];
                newEducation[index].endDate = e.target.value;
                setFormData({ ...formData, education: newEducation });
              }}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={updateEducationCard}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-transparent border border-gray-300 rounded-lg transition-colors text-white "
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          type="button"
          onClick={deleteEducationCard}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-red-900 -300 rounded-lg transition-colors text-white "
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default EducationCard;
