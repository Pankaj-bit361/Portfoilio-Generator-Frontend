import React from "react";
import {
  Contact,
  Plus,
  Trash2,
  UserRound,
  Award,
  Contact2,
  TagIcon,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../../../config/api";
import General from "../../../config/general";

const PortFolioHome = ({ formData, setFormData, setFlag }) => {
  const removeHighlight = (index) => {
    const newHighlights = [...formData.home.highlights];
    newHighlights.splice(index, 1);
    setFormData({
      ...formData,
      home: {
        ...formData.home,
        highlights: newHighlights,
      },
    });
  };

  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        highlights: [...prev.home.highlights, ""],
      },
    }));
  };

  const updateHomeDetails = async () => {
    if (!formData && !formData.home) return;

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${General.getPortfolioId()}/home?userId=${General.getUserId()}`,
        formData.home
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

  // Common input class with increased height
  const inputClass = "w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors";

  return (
    <div className="p-6 bg-white rounded-lg q-box-shawdow">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.home.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    home: { ...formData.home, name: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData?.contact?.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Profession Input */}
          <div className="space-y-2">
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
              Profession
            </label>
            <div className="relative">
              <Contact className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="profession"
                type="text"
                placeholder="Enter your profession"
                value={formData?.home?.profession}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    home: { ...formData.home, profession: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Tag Line Input */}
          <div className="space-y-2">
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
              Tag Line
            </label>
            <div className="relative">
              <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="tagline"
                type="text"
                placeholder="Enter your tagline"
                value={formData?.home?.tagline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    home: { ...formData.home, tagline: e.target.value },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Experience Input */}
        <div className="space-y-2">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <div className="relative">
            <Contact className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="experience"
              type="text"
              placeholder="Enter years of experience"
              value={formData?.home?.yearsOfExperience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  home: { ...formData.home, yearsOfExperience: +e.target.value },
                })
              }
              className={inputClass}
            />
          </div>
        </div>

        {/* Summary Textarea */}
        <div className="space-y-2">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <textarea
            id="summary"
            placeholder="Write your professional summary..."
            value={formData?.home?.summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                home: { ...formData.home, summary: e.target.value },
              })
            }
            className="w-full p-4 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors h-32"
            rows={4}
          />
        </div>

        {/* Career Highlights Section */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award className="text-gray-600 w-5 h-5" />
              <h4 className="text-lg font-semibold text-gray-800">Career Highlights</h4>
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Highlight</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData?.home?.highlights?.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">
                  No highlights added yet. Click the button above to add your first career highlight.
                </p>
              </div>
            ) : (
              formData?.home?.highlights?.map((highlight, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 h-12"
                >
                  <input
                    type="text"
                    placeholder="Enter your career highlight..."
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...formData.home.highlights];
                      newHighlights[index] = e.target.value;
                      setFormData({
                        ...formData,
                        home: {
                          ...formData.home,
                          highlights: newHighlights,
                        },
                      });
                    }}
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 text-base h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-md transition-opacity duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={updateHomeDetails}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium h-12"
          >
            <Contact2 size={16} />
            Update Personal Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortFolioHome;