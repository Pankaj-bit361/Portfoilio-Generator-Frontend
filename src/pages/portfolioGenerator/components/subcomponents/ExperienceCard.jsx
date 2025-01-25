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
import DeleteCard from "./DeleteCard";
import General from "../../../../config/general";

const inputClass =
  "w-full pl-10 pr-4 py-3 h-12 text-white border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent";

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

    try {
      let response;
      if (!exp.experienceId) {
        response = await General.addExperience(exp);
      } else {
        response = await General.updateExperience(exp.experienceId, exp);
      }

      if (response.success) {
        toast.success(
          exp.experienceId
            ? "Experience Information Updated Successfully"
            : "Added Experience Information"
        );
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const removeExperinceCardFromApi = async () => {
    if (!exp && !exp.experienceId) return;

    try {
      const response = await General.deleteExperience(exp.experienceId);

      if (response.success) {
        toast.success("Experience Information Removed Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6 mb-6">
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
          <label className="block text-sm font-medium text-white ">
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
          <label className="block text-sm font-medium text-white ">
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
          <label className="block text-sm font-medium text-white ">
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
          <label className="block text-sm font-medium text-white ">
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
              className="w-full pl-10 pr-10 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-gray-800 text-white placeholder-gray-400"
            >
              <option className="text-white" value="">
                Select Type
              </option>
              <option className="text-white" value="Full-time">
                Full-time
              </option>
              <option className="text-white" value="Part-time">
                Part-time
              </option>
              <option className="text-white" value="Internship">
                Internship
              </option>
              <option className="text-white" value="Contract">
                Contract
              </option>
              <option className="text-white" value="Freelance">
                Freelance
              </option>
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
          <label className="block text-sm font-medium text-white ">
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
          <label className="block text-sm font-medium text-white ">
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
        <label className="block text-sm font-medium text-white ">
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
            className="w-full pl-10 pr-4 py-2 min-h-[120px] text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent text-white placeholder-gray-400"
            rows={4}
          />
        </div>
      </div>

      {/* Improved Responsibilities Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <ListChecks className="text-gray-400 w-5 h-5" />
            <h3 className="text-base font-medium text-white ">
              Key Responsibilities & Achievements
            </h3>
          </div>
          <button
            type="button"
            onClick={addResponsibility}
            className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Responsibility
          </button>
        </div>

        <div className="space-y-6">
          {exp.responsibilities?.map((resp, respIndex) => (
            <div key={resp._id || respIndex} className="space-y-4">
              {/* Responsibility Input */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="text-gray-400 w-4 h-4" />
                  <label className="text-sm font-medium text-white ">
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
                  className="w-full p-3 min-h-[80px] text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent text-white placeholder-gray-400"
                  rows={2}
                />
              </div>

              {/* Achievements Section */}
              <div className="pl-4 border-l-2 border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="text-gray-400 w-4 h-4" />
                    <label className="text-sm font-medium text-white ">
                      Key Achievements
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => addAchievement(respIndex)}
                    className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
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
                        className="w-full p-3 min-h-[60px] text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors pr-8 bg-transparent text-white placeholder-gray-400"
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
            <div className="text-center py-6 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-400">
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
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-transparent border border-gray-300 rounded-lg border-blue-500/50 transition-colors text-blue-500"
        >
          <Save className="w-4 h-4 " />
          Save
        </button>

        <button
          type="button"
          onClick={() => removeExperience(index)}
          className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-red-500 rounded-lg hover:bg-red-700 transition-colors text-white"
        >
          <Trash2 className="w-4 h-4" />
          Remove Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
