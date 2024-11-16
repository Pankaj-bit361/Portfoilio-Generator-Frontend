import {
  Contact,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  UserRound,
  Award,
  Contact2,
  TagIcon,
} from "lucide-react";
import React from "react";
import { config } from "../../../config/api";
import axios from "axios";
import { toast } from "react-toastify";

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
      const urlParams = new URLSearchParams(window.location.search);
      const portfolioId = urlParams.get("portfolioId");
      let userData = JSON.parse(localStorage.getItem("portfolioUser"));

      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/home?userId=${userData?.userId}`,
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

  return (
    <div className="form-section">
      <h3 className="form-title">Personal Information</h3>
      <div className="form-grid">
        <div className="input-group full-width">
          <UserRound className="input-icon" />
          <input
            type="text"
            placeholder="Name"
            value={formData.home.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                home: { ...formData.home, name: e.target.value },
              })
            }
            className="form-input"
          />
        </div>

        <div className="input-group">
          <Mail className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={formData?.contact?.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: {
                  ...formData.contact,
                  email: e.target.value,
                },
              })
            }
            className="form-input"
          />
        </div>

        <div className="input-group full-width">
          <Contact className="input-icon" />
          <input
            type="text"
            placeholder="Profession"
            value={formData?.home?.profession}
            onChange={(e) =>
              setFormData({
                ...formData,
                home: {
                  ...formData.home,
                  profession: e.target.value,
                },
              })
            }
            className="form-input"
          />
        </div>

        <div className="input-group full-width">
          <TagIcon className="input-icon" />
          <input
            type="text"
            placeholder="Tag Line"
            value={formData?.home?.tagline}
            onChange={(e) =>
              setFormData({
                ...formData,
                home: {
                  ...formData.home,
                  tagline: e.target.value,
                },
              })
            }
            className="form-input"
          />
        </div>

        <div className="input-group full-width">
          <Contact className="input-icon" />
          <input
            type="text"
            placeholder="Years of Experience"
            value={formData?.home?.yearsOfExperience}
            onChange={(e) =>
              setFormData({
                ...formData,
                home: {
                  ...formData.home,
                  yearsOfExperience: +e.target.value,
                },
              })
            }
            className="form-input"
          />
        </div>

        <div className="input-group full-width">
          <textarea
            placeholder="Professional Summary"
            value={formData?.home?.summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                home: { ...formData.home, summary: e.target.value },
              })
            }
            className="form-textarea"
            rows={4}
          />
        </div>

        {/* Improved Highlights Section */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 full-width p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Award className="" />
              <h4 className="text-lg font-semibold text-gray-800">
                Career Highlights
              </h4>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addHighlight}
                className="add-button"
              >
                <Plus className="w-4 h-4" />
                <span>Add Highlight</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {formData?.home?.highlights?.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">
                  No highlights added yet. Click the button above to add your
                  first career highlight.
                </p>
              </div>
            )}

            {formData?.home?.highlights?.map((highlight, index) => (
              <div
                key={index}
                className="group q-input-career relative flex items-center gap-3 p-3 transition-all duration-200"
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
                  className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-md transition-opacity duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <button
            type="button"
            onClick={updateHomeDetails}
            className="add-button"
          >
            <Contact2 size={"16px"} /> Update Personal Details{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortFolioHome;
