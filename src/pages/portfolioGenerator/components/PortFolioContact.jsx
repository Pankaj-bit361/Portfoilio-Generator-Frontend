import axios from "axios";
import {
  Contact,
  Contact2,
  Earth,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Trash2,
  Twitter,
  UserRound,
} from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { config } from "../../../config/api";

const PortFolioContact = ({ formData, setFormData, setFlag }) => {
  const updateHomeDetails = async ({}) => {
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

  return (
    <div className="form-section">
      <h3 className="form-title">Contact Information</h3>
      <div className="form-grid">
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

        <div className="input-group">
          <Phone className="input-icon" />
          <input
            type="tel"
            placeholder="Phone"
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
            className="form-input"
          />
        </div>

        {/* Social Media Links */}
        <div className="input-group">
          <Github className="input-icon" />
          <input
            type="text"
            placeholder="GitHub URL"
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
            className="form-input"
          />
        </div>

        <div className="input-group">
          <Linkedin className="input-icon" />
          <input
            type="url"
            placeholder="LinkedIn URL"
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
            className="form-input"
          />
        </div>

        <div className="input-group">
          <Twitter className="input-icon" />
          <input
            type="text"
            placeholder="Twitter URL"
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
            className="form-input"
          />
        </div>

        <div className="input-group">
          <Earth className="input-icon" />
          <input
            type="url"
            placeholder="website Link"
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
            className="form-input"
          />
        </div>

        <div className="input-group full-width">
          <MapPin className="input-icon" />
          <input
            type="text"
            placeholder="Location"
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
            className="form-input"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <button
            type="button"
            onClick={updateHomeDetails}
            className="add-button"
          >
            <Contact2 size={"16px"} /> Update Contact{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortFolioContact;
