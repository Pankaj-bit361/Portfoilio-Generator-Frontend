import React, { useState } from "react";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Trash2,
  Users,
  FileText,
  Plus,
  ListChecks,
  Trophy,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../../../config/api";
import DeleteCard from "./DeleteCard";
import General from "../../../../config/general";

const inputClass =
  "w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors";

const ExperienceCard = ({ index, exp, formData, setFormData, setFlag }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const removeExperience = (index) => {
    if (exp.experienceId) {
      setIsDeleted(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        experiences: prev.experiences.filter((_, i) => i !== index),
      }));
    }
  };

  const addResponsibility = () => {
    const newExperiences = [...formData.experiences];
    newExperiences[index].responsibilities = [
      ...newExperiences[index].responsibilities,
      { description: "", achievements: [], _id: Date.now().toString() },
    ];
    setFormData({
      ...formData,
      experiences: newExperiences,
    });
  };

  const removeResponsibility = (respIndex) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index].responsibilities = newExperiences[
      index
    ].responsibilities.filter((_, i) => i !== respIndex);
    setFormData({
      ...formData,
      experiences: newExperiences,
    });
  };

  const addAchievement = (respIndex) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index].responsibilities[respIndex].achievements = [
      ...newExperiences[index].responsibilities[respIndex].achievements,
      "",
    ];
    setFormData({
      ...formData,
      experiences: newExperiences,
    });
  };

  const removeAchievement = (respIndex, achieveIndex) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index].responsibilities[respIndex].achievements =
      newExperiences[index].responsibilities[respIndex].achievements.filter(
        (_, i) => i !== achieveIndex
      );
    setFormData({
      ...formData,
      experiences: newExperiences,
    });
  };

  const updateExpericeCard = async () => {
    if (!exp.role || !exp.company) {
      toast.error("Role and Company are required fields");
      return;
    }

    if (!exp.experienceId) {
      addExperienceCard();
      return;
    }

    try {
      const response = await axios.patch(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/experience/${
          exp.experienceId
        }?userId=${General.getUserId()}`,
        exp
      );

      if (response.data.success) {
        toast.success("Experience Information Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const addExperienceCard = async () => {
    try {
      const response = await axios.post(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/experience?userId=${General.getUserId()}`,
        exp
      );

      if (response.data.success) {
        toast.success("Added Exprience Information");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const removeExperinceCardFromApi = async () => {
    if (!exp && !exp.experienceId) return;

    try {
      const headers = {
        token: General.getAccessToken(),
      };

      const response = await axios.delete(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/experience/${
          exp.experienceId
        }?userId=${General.getUserId()}`,
        { headers }
      );

      if (response.data.success) {
        toast.success("Experience Information Removed Successfully");
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
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 mb-6">
      {isDeleted && (
        <DeleteCard
          callback={() => removeExperinceCardFromApi()}
          cancelCallback={() => setIsDeleted(false)}
          title={"Remove Experience"}
          desc={"Are you sure you want to remove this experience?"}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Role/Position
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your role"
              value={exp.role}
              onChange={(e) => {
                const newExperiences = [...formData.experiences];
                newExperiences[index].role = e.target.value;
                setFormData({
                  ...formData,
                  experiences: newExperiences,
                });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Company Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter company name"
              value={exp.company}
              onChange={(e) => {
                const newExperiences = [...formData.experiences];
                newExperiences[index].company = e.target.value;
                setFormData({
                  ...formData,
                  experiences: newExperiences,
                });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Location Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter location"
              value={exp.location}
              onChange={(e) => {
                const newExperiences = [...formData.experiences];
                newExperiences[index].location = e.target.value;
                setFormData({
                  ...formData,
                  experiences: newExperiences,
                });
              }}
              className={inputClass}
            />
          </div>
        </div>

        {/* Employment Type Select */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Employment Type
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={exp.type}
              onChange={(e) => {
                const newExperiences = [...formData.experiences];
                newExperiences[index].type = e.target.value;
                setFormData({
                  ...formData,
                  experiences: newExperiences,
                });
              }}
              className="w-full pl-10 pr-10 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-white"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Date Inputs */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter start date"
              value={exp.startDate}
              onChange={(e) => {
                const newExperiences = [...formData.experiences];
                newExperiences[index].startDate = e.target.value;
                setFormData({
                  ...formData,
                  experiences: newExperiences,
                });
              }}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter end date"
              value={exp.endDate}
              onChange={(e) => {
                const newExperiences = [...formData.experiences];
                newExperiences[index].endDate = e.target.value;
                setFormData({
                  ...formData,
                  experiences: newExperiences,
                });
              }}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <textarea
            placeholder="Describe your role and responsibilities..."
            value={exp.description}
            onChange={(e) => {
              const newExperiences = [...formData.experiences];
              newExperiences[index].description = e.target.value;
              setFormData({
                ...formData,
                experiences: newExperiences,
              });
            }}
            className="w-full pl-10 pr-4 py-2 min-h-[120px] text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors"
            rows={4}
          />
        </div>
      </div>

      {/* Improved Responsibilities Section */}
      <div className="space-y-4 bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <ListChecks className="text-gray-400 w-5 h-5" />
            <h3 className="text-base font-medium text-gray-700">
              Key Responsibilities & Achievements
            </h3>
          </div>
          <button
            type="button"
            onClick={addResponsibility}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <Plus className="w-4 h-4" />
            Add Responsibility
          </button>
        </div>

        <div className="space-y-6">
          {exp.responsibilities?.map((resp, respIndex) => (
            <div
              key={resp._id || respIndex}
              className="bg-white rounded-lg border border-gray-200 p-4 space-y-4"
            >
              {/* Responsibility Input */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="text-gray-400 w-4 h-4" />
                  <label className="text-sm font-medium text-gray-600">
                    Responsibility {respIndex + 1}
                  </label>
                  <button
                    type="button"
                    onClick={() => removeResponsibility(respIndex)}
                    className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  placeholder="Describe your responsibility..."
                  value={resp.description}
                  onChange={(e) => {
                    const newExperiences = [...formData.experiences];
                    newExperiences[index].responsibilities[
                      respIndex
                    ].description = e.target.value;
                    setFormData({
                      ...formData,
                      experiences: newExperiences,
                    });
                  }}
                  className="w-full p-3 min-h-[80px] text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors"
                  rows={2}
                />
              </div>

              {/* Achievements Section */}
              <div className="pl-4 border-l-2 border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-gray-400 w-4 h-4" />
                    <label className="text-sm font-medium text-gray-600">
                      Key Achievements
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => addAchievement(respIndex)}
                    className="text-sm text-gray-600 hover:text-[#7153dc] transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {resp.achievements?.map((achievement, achieveIndex) => (
                    <div key={achieveIndex} className="relative group">
                      <textarea
                        placeholder="Describe your achievement..."
                        value={achievement}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].responsibilities[
                            respIndex
                          ].achievements[achieveIndex] = e.target.value;
                          setFormData({
                            ...formData,
                            experiences: newExperiences,
                          });
                        }}
                        className="w-full p-3 min-h-[60px] text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors pr-8"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeAchievement(respIndex, achieveIndex)
                        }
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {resp.achievements?.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      No achievements added yet. Click 'Add' to include your key
                      achievements.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {exp.responsibilities?.length === 0 && (
            <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">
                No responsibilities added yet. Click the button above to add
                your key responsibilities.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={updateExpericeCard}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <Save className="w-4 h-4" />
          Save
        </button>

        <button
          type="button"
          onClick={() => removeExperience(index)}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-red-600"
        >
          <Trash2 className="w-4 h-4" />
          Remove Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
