import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PDFUploader from "../components/PDFUploader";
import TemplateSelector from "../components/TemplateSelector";
import AIAssistant from "../components/AIAssistant";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  Contact,
  UserRound
} from "lucide-react";
import { getPortfolioData } from "../components/fileUpload";

function PortfolioGenerator({ setPortfolioData }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [formData, setFormData] = useState({
    contact: { phone: "", email: "", location: "", github: "", linkedin: "" },
    home: { name: "", tagline: "", summary: "" },
    education: [
      {
        degree: "",
        school: "",
        dates: "",
        grade: ""
      }
    ],
    certificates: [
      {
        title: "",
        issuer: "",
        date: "",
        credentialUrl: ""
      }
    ],
    skills: {
      technical: { advanced: [], intermediate: [], tools: [] },
      soft: []
    },
    projects: [
      {
        title: "",
        description: "",
        techStack: [],
        features: [],
        githubRepo: "",
        liveDemo: ""
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const portfolioId = urlParams.get("portfolioId");

        if (portfolioId) {
          const data = await getPortfolioData(portfolioId);
          if (data) {
            console.log("Fetched Portfolio Data:", data);
            setFormData(data);
          }
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTemplateSelect = (template) => setSelectedTemplate(template);
  const handleAISuggestion = (suggestions) =>
    setFormData((prev) => ({ ...prev, ...suggestions }));
  const handlePDFData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPortfolioData(formData);
    navigate("/preview");
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const removeCertificates = (index) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", school: "", dates: "", grade: "" } // Each field initialized
      ]
    }));
  };

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        { title: "", issuer: "", date: "", credentialUrl: "" }
      ]
    }));
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          techStack: [],
          features: [],
          githubRepo: "",
          liveDemo: ""
        }
      ]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="generator"
    >
      <div className="generator-container">
        <h2 className="generator-title">Create Your Portfolio</h2>

        <PDFUploader onDataExtracted={handlePDFData} />
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={handleTemplateSelect}
        />
        <AIAssistant portfolioData={formData} onSuggest={handleAISuggestion} />

        <form onSubmit={handleSubmit} className="generator-form">
          {/* Personal Information */}
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
                      home: { ...formData.home, name: e.target.value }
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
                  value={formData.contact.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value }
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
                  value={formData.home.profession}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      home: { ...formData.home, profession: e.target.value }
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
                  value={formData.contact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <Github className="input-icon" />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.contact.github}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, github: e.target.value }
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
                  value={formData.contact.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, linkedin: e.target.value }
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
                  value={formData.contact.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, location: e.target.value }
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="form-title">Education</h3>
              <button
                type="button"
                onClick={addEducation}
                className="add-button"
              >
                <GraduationCap className="icon" /> Add Education
              </button>
            </div>

            {formData.education.map((edu, index) => (
              <div key={index} className="project-card">
                <div className="project-card-content">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].degree = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="form-input"
                  />

                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].school = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Dates"
                    value={edu.dates}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].dates = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Grade/CGPA"
                    value={edu.grade}
                    onChange={(e) => {
                      const newEducation = [...formData.education];
                      newEducation[index].grade = e.target.value;
                      setFormData({ ...formData, education: newEducation });
                    }}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="remove-button"
                  >
                    <Trash2 className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Certificates Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="form-title">Certificates</h3>
              <button
                type="button"
                onClick={addCertificate}
                className="add-button"
              >
                <Award className="icon" /> Add Certificate
              </button>
            </div>

            {formData.certificates.map((cert, index) => (
              <div key={index} className="project-card">
                <div className="project-card-content">
                  <input
                    type="text"
                    placeholder="Title"
                    value={cert.title}
                    onChange={(e) => {
                      const newCertificates = [...formData.certificates];
                      newCertificates[index].title = e.target.value;
                      setFormData({
                        ...formData,
                        certificates: newCertificates
                      });
                    }}
                    className="form-input"
                  />

                  <input
                    type="text"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCertificates = [...formData.certificates];
                      newCertificates[index].issuer = e.target.value;
                      setFormData({
                        ...formData,
                        certificates: newCertificates
                      });
                    }}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => {
                      const newCertificates = [...formData.certificates];
                      newCertificates[index].date = e.target.value;
                      setFormData({
                        ...formData,
                        certificates: newCertificates
                      });
                    }}
                    className="form-input"
                  />
                  <input
                    type="url"
                    placeholder="Credential URL"
                    value={cert.credentialUrl}
                    onChange={(e) => {
                      const newCertificates = [...formData.certificates];
                      newCertificates[index].credentialUrl = e.target.value;
                      setFormData({
                        ...formData,
                        certificates: newCertificates
                      });
                    }}
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertificates(index)}
                    className="remove-button"
                  >
                    <Trash2 className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="form-title">Projects</h3>
              <button type="button" onClick={addProject} className="add-button">
                <Plus className="icon" /> Add Project
              </button>
            </div>

            {formData.projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-card-content">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].title = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="form-input"
                  />

                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].description = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="form-textarea"
                  ></textarea>
                  <input
                    type="text"
                    placeholder="Tech Stack"
                    value={project.techStack.join(", ")}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].techStack = e.target.value.split(", ");
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="form-input"
                  />
                  <input
                    type="url"
                    placeholder="GitHub Repo"
                    value={project.githubRepo}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].githubRepo = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="form-input"
                  />
                  <input
                    type="url"
                    placeholder="Live Demo"
                    value={project.liveDemo}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].liveDemo = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="form-input"
                  />

                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="remove-button"
                  >
                    <Trash2 className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">
            Generate Portfolio
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default PortfolioGenerator;