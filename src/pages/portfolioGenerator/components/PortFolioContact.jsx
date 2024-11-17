import React from "react";
import {
  Contact2,
  Earth,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { toast } from "react-toastify";
import { config } from "../../../config/api";
import axios from "axios";

const PortFolioContact = ({ formData, setFormData, setFlag }) => {
  const updateHomeDetails = async () => {
    if (!formData && !formData.home) return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const portfolioId = urlParams.get("portfolioId");
      let userData = JSON.parse(localStorage.getItem("portfolioUser"));

      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/contact?userId=${userData?.userId}`,
        formData.contact
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
  

  const inputClass =
    "w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors";

  return (
    <div className=" p-6 bg-white rounded-lg q-box-shawdow">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Contact Information
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
                    contact: {
                      ...formData.contact,
                      email: e.target.value,
                    },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData?.contact?.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      phone: e.target.value,
                    },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* GitHub Input */}
          <div className="space-y-2">
            <label
              htmlFor="github"
              className="block text-sm font-medium text-gray-700"
            >
              GitHub Profile
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="github"
                type="url"
                placeholder="Enter your GitHub URL"
                value={formData?.contact?.socialMedia?.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialMedia: {
                        ...formData.contact.socialMedia,
                        github: e.target.value,
                      },
                    },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* LinkedIn Input */}
          <div className="space-y-2">
            <label
              htmlFor="linkedin"
              className="block text-sm font-medium text-gray-700"
            >
              LinkedIn Profile
            </label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="linkedin"
                type="url"
                placeholder="Enter your LinkedIn URL"
                value={formData?.contact?.socialMedia?.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialMedia: {
                        ...formData.contact.socialMedia,
                        linkedin: e.target.value,
                      },
                    },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Twitter Input */}
          <div className="space-y-2">
            <label
              htmlFor="twitter"
              className="block text-sm font-medium text-gray-700"
            >
              Twitter Profile
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="twitter"
                type="url"
                placeholder="Enter your Twitter URL"
                value={formData?.contact?.socialMedia?.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialMedia: {
                        ...formData.contact.socialMedia,
                        twitter: e.target.value,
                      },
                    },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Website Input */}
          <div className="space-y-2">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Personal Website
            </label>
            <div className="relative">
              <Earth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="website"
                type="url"
                placeholder="Enter your website URL"
                value={formData?.contact?.socialMedia?.website}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      socialMedia: {
                        ...formData.contact.socialMedia,
                        website: e.target.value,
                      },
                    },
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Location Input - Full Width */}
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="location"
              type="text"
              placeholder="Enter your location"
              value={formData?.contact?.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    location: e.target.value,
                  },
                })
              }
              className={inputClass}
            />
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
            Update Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortFolioContact;
