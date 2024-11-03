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
  UserRound,
  Briefcase,
  Code,
  Brain,
  History,
  Wrench,
  BookOpen,
} from "lucide-react";
import { getPortfolioData } from "../components/fileUpload";
import "./portfoliogenerator.css";
import { data } from "autoprefixer";

function PortfolioGenerator({ setPortfolioData, type }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contact: {
      phone: "",
      email: "",
      location: "",
      github: "",
      linkedin: "",
      socialMedia: {
        github: "",
        linkedin: "",
        twitter: "",
        website: "",
      },
    },
    home: {
      name: "",
      profession: "",
      tagline: "",
      summary: "",
      highlights: [],
      yearsOfExperience: 0,
    },
    education: [
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
    certificates: [
      {
        title: "",
        issuer: "",
        date: "",
        credentialUrl: "",
      },
    ],
    skills: {
      technical: {
        languages: [{ name: "", proficiency: "" }],
        frameworks: [{ name: "", proficiency: "" }],
        tools: [{ name: "", proficiency: "" }],
      },
      soft: [{ category: "", skills: [] }],
    },
    projects: [
      {
        title: "",
        description: "",
        role: "",
        type: "",
        status: "",
        tools: [],
        features: [],
        challenges: [],
        links: {
          live: "",
          github: "",
          documentation: "",
        },
      },
    ],
    experiences: [
      {
        role: "",
        company: "",
        location: "",
        type: "",
        startDate: "",
        endDate: "",
        description: "",
        responsibilities: [],
        achievements: [],
      },
    ],
    theme: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#6366F1",
        background: "#FFFFFF",
        text: "#111827",
      },
      fonts: {
        primary: "Inter",
        secondary: "Roboto",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const portfolioId = urlParams.get("portfolioId");
        let userData = JSON.parse(localStorage.getItem("portfolioUser"));

        if (portfolioId) {
          const data = await getPortfolioData({
            portfolioId: portfolioId,
            userId: userData.userId,
          });
          if (data) {
            console.log("Fetched Portfolio Data:", data);
            console.log(data)
            setFormData(data);
          }
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      }
    };

    type == "edit" && fetchData();
  }, []);


  const handleTemplateSelect = (template) => setSelectedTemplate(template);
  const handleAISuggestion = (suggestions) =>
    setFormData((prev) => ({ ...prev, ...suggestions }));
  const handlePDFData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPortfolioData(formData);
    // navigate("/preview");
  };

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

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          title: "",
          issuer: "",
          date: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const removeCertificate = (index) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
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
          role: "",
          type: "",
          status: "",
          tools: [],
          features: [],
          challenges: [],
          links: {
            live: "",
            github: "",
            documentation: "",
          },
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          role: "",
          company: "",
          location: "",
          type: "",
          startDate: "",
          endDate: "",
          description: "",
          responsibilities: [],
          achievements: [],
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const addSkill = (category) => {
    if (
      category === "languages" ||
      category === "frameworks" ||
      category === "tools"
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          technical: {
            ...prev.skills.technical,
            [category]: [
              ...prev.skills.technical[category],
              { name: "", proficiency: "" },
            ],
          },
        },
      }));
    } else if (category === "soft") {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          soft: [...prev.skills.soft, { category: "", skills: [] }],
        },
      }));
    }
  };

  const removeSkill = (category, index) => {
    if (
      category === "languages" ||
      category === "frameworks" ||
      category === "tools"
    ) {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          technical: {
            ...prev.skills.technical,
            [category]: prev.skills.technical[category].filter(
              (_, i) => i !== index
            ),
          },
        },
      }));
    } else if (category === "soft") {
      setFormData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          soft: prev.skills.soft.filter((_, i) => i !== index),
        },
      }));
    }
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

  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        highlights: prev.home.highlights.filter((_, i) => i !== index),
      },
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

        {loading && (
          <form onSubmit={handleSubmit} className="generator-form">
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
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
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
                        home: { ...formData.home, profession: e.target.value },
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
                        contact: { ...formData.contact, phone: e.target.value },
                      })
                    }
                    className="form-input"
                  />
                </div>

                {/* Social Media Links */}
                <div className="input-group">
                  <Github className="input-icon" />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.contact.socialMedia.github}
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
                    value={formData.contact.socialMedia.linkedin}
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

                <div className="input-group full-width">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.contact.location}
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

                {/* Summary */}
                <div className="input-group full-width">
                  <textarea
                    placeholder="Professional Summary"
                    value={formData.home.summary}
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

                {/* Highlights */}
                <div className="input-group full-width">
                  <div className="flex justify-between items-center mb-2">
                    {/* <h4 className="text-sm font-medium">Career Highlights</h4> */}
                    {/* <button
              type="button"
              onClick={addHighlight}
              className="add-button"
            >
              <Plus className="icon" color="white" /> Add Highlight
            </button> */}
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="add-button"
                    >
                      <GraduationCap className="icon" /> Add Education
                    </button>
                  </div>
                  {formData.home.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Career Highlight"
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
                        className="form-input flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="remove-button"
                      >
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  ))}
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
                      placeholder="Field of Study"
                      value={edu.field}
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
                      placeholder="Location"
                      value={edu.location}
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
                        value={edu.startDate}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].startDate = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].endDate = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        className="form-input"
                      />
                    </div>

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

            {/* Experience Section */}
            <div className="form-section">
              <div className="section-header">
                <h3 className="form-title">Experience</h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="add-button"
                >
                  <Briefcase className="icon" /> Add Experience
                </button>
              </div>

              {formData.experiences.map((exp, index) => (
                <div key={index} className="project-card">
                  <div className="project-card-content">
                    <input
                      type="text"
                      placeholder="Role/Position"
                      value={exp.role}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].role = e.target.value;
                        setFormData({
                          ...formData,
                          experiences: newExperiences,
                        });
                      }}
                      className="form-input"
                    />

                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].company = e.target.value;
                        setFormData({
                          ...formData,
                          experiences: newExperiences,
                        });
                      }}
                      className="form-input"
                    />

                    <input
                      type="text"
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].location = e.target.value;
                        setFormData({
                          ...formData,
                          experiences: newExperiences,
                        });
                      }}
                      className="form-input"
                    />

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
                      className="form-select"
                    >
                      <option value="">Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].startDate = e.target.value;
                          setFormData({
                            ...formData,
                            experiences: newExperiences,
                          });
                        }}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].endDate = e.target.value;
                          setFormData({
                            ...formData,
                            experiences: newExperiences,
                          });
                        }}
                        className="form-input"
                      />
                    </div>

                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => {
                        const newExperiences = [...formData.experiences];
                        newExperiences[index].description = e.target.value;
                        setFormData({
                          ...formData,
                          experiences: newExperiences,
                        });
                      }}
                      className="form-textarea"
                      rows={3}
                    />

                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="remove-button"
                    >
                      <Trash2 className="icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div className="form-section">
              <h3 className="form-title">Skills</h3>

              {/* Technical Skills */}
              <div className="subsection">
                <h4 className="subsection-title">Technical Skills</h4>

                {/* Languages */}
                <div className="skill-category">
                  <div className="flex justify-between items-center mb-2">
                    <h5>Programming Languages</h5>
                    <button
                      type="button"
                      onClick={() => addSkill("languages")}
                      className="add-button"
                    >
                      <Code className="icon" /> Add Language
                    </button>
                  </div>
                  {formData.skills.technical.languages.map((lang, index) => (
                    <div key={index} className="skill-item">
                      <input
                        type="text"
                        placeholder="Language Name"
                        value={lang.name}
                        onChange={(e) => {
                          const newLangs = [
                            ...formData.skills.technical.languages,
                          ];
                          newLangs[index].name = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            skills: {
                              ...prev.skills,
                              technical: {
                                ...prev.skills.technical,
                                languages: newLangs,
                              },
                            },
                          }));
                        }}
                        className="form-input"
                      />
                      <select
                        value={lang.proficiency}
                        onChange={(e) => {
                          const newLangs = [
                            ...formData.skills.technical.languages,
                          ];
                          newLangs[index].proficiency = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            skills: {
                              ...prev.skills,
                              technical: {
                                ...prev.skills.technical,
                                languages: newLangs,
                              },
                            },
                          }));
                        }}
                        className="form-select"
                      >
                        <option value="">Select Proficiency</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeSkill("languages", index)}
                        className="remove-button"
                      >
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Frameworks - Similar structure to Languages */}
                <div className="skill-category mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5>Frameworks & Libraries</h5>
                    <button
                      type="button"
                      onClick={() => addSkill("frameworks")}
                      className="add-button"
                    >
                      <Code className="icon" /> Add Framework
                    </button>
                  </div>
                  {/* Similar mapping structure as languages */}
                </div>

                {/* Tools - Similar structure to Languages */}
                <div className="skill-category mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5>Tools & Technologies</h5>
                    <button
                      type="button"
                      onClick={() => addSkill("tools")}
                      className="add-button"
                    >
                      <Wrench className="icon" /> Add Tool
                    </button>
                  </div>
                  {/* Similar mapping structure as languages */}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="subsection mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="subsection-title">Soft Skills</h4>
                  <button
                    type="button"
                    onClick={() => addSkill("soft")}
                    className="add-button"
                  >
                    <Brain className="icon" /> Add Soft Skill
                  </button>
                </div>
                {/* Soft skills mapping similar to technical skills */}
              </div>
            </div>

            {/* Projects Section */}
            <div className="form-section">
              <div className="section-header">
                <h3 className="form-title">Projects</h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="add-button"
                >
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
                      rows={3}
                    />

                    <input
                      type="text"
                      placeholder="Your Role"
                      value={project.role}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].role = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                      className="form-input"
                    />

                    <select
                      value={project.type}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].type = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                      className="form-select"
                    >
                      <option value="">Select Project Type</option>
                      <option value="Personal">Personal</option>
                      <option value="Professional">Professional</option>
                      <option value="Academic">Academic</option>
                      <option value="Open Source">Open Source</option>
                    </select>

                    <select
                      value={project.status}
                      onChange={(e) => {
                        const newProjects = [...formData.projects];
                        newProjects[index].status = e.target.value;
                        setFormData({ ...formData, projects: newProjects });
                      }}
                      className="form-select"
                    >
                      <option value="">Select Status</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Tools & Technologies (comma-separated)"
                        value={project.tools.join(", ")}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].tools = e.target.value
                            .split(",")
                            .map((tool) => tool.trim());
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="form-input"
                      />
                    </div>

                    <div className="input-group">
                      <textarea
                        placeholder="Key Features (one per line)"
                        value={project.features.join("\n")}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].features = e.target.value
                            .split("\n")
                            .filter((feature) => feature.trim() !== "");
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="form-textarea"
                        rows={3}
                      />
                    </div>

                    <div className="input-group">
                      <textarea
                        placeholder="Challenges Faced (one per line)"
                        value={project.challenges.join("\n")}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].challenges = e.target.value
                            .split("\n")
                            .filter((challenge) => challenge.trim() !== "");
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="form-textarea"
                        rows={3}
                      />
                    </div>

                    <div className="project-links">
                      <input
                        type="url"
                        placeholder="Live Demo URL"
                        value={project.links.live}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].links.live = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="form-input"
                      />
                      <input
                        type="url"
                        placeholder="GitHub Repository URL"
                        value={project.links.github}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].links.github = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="form-input"
                      />
                      <input
                        type="url"
                        placeholder="Documentation URL"
                        value={project.links.documentation}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[index].links.documentation =
                            e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="form-input"
                      />
                    </div>

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

            {/* Theme Customization Section */}
            <div className="form-section">
              <h3 className="form-title">Theme Customization</h3>
              <div className="theme-grid">
                <div className="color-picker">
                  <label>Primary Color</label>
                  <input
                    type="color"
                    value={formData.theme.colors.primary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: {
                          ...formData.theme,
                          colors: {
                            ...formData.theme.colors,
                            primary: e.target.value,
                          },
                        },
                      })
                    }
                    className="form-color-input"
                  />
                </div>

                <div className="color-picker">
                  <label>Secondary Color</label>
                  <input
                    type="color"
                    value={formData.theme.colors.secondary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: {
                          ...formData.theme,
                          colors: {
                            ...formData.theme.colors,
                            secondary: e.target.value,
                          },
                        },
                      })
                    }
                    className="form-color-input"
                  />
                </div>

                <div className="color-picker">
                  <label>Accent Color</label>
                  <input
                    type="color"
                    value={formData.theme.colors.accent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: {
                          ...formData.theme,
                          colors: {
                            ...formData.theme.colors,
                            accent: e.target.value,
                          },
                        },
                      })
                    }
                    className="form-color-input"
                  />
                </div>

                <div className="font-selector">
                  <label>Primary Font</label>
                  <select
                    value={formData.theme.fonts.primary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        theme: {
                          ...formData.theme,
                          fonts: {
                            ...formData.theme.fonts,
                            primary: e.target.value,
                          },
                        },
                      })
                    }
                    className="form-select"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Poppins">Poppins</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Generate Portfolio
            </button>
          </form>
        )}
        <button type="submit" className="submit-button">
          Generate Portfolio
        </button>
      </div>
    </motion.div>
  );
}

export default PortfolioGenerator;
