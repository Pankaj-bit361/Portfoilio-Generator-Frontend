import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Award, ArrowRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './preview.css';
import { getPortfolioData } from './fileUpload';

const PortfolioPreview = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const portfolioId = urlParams.get("portfolioId");
        let userData = JSON.parse(localStorage.getItem("portfolioUser"));

        if (!portfolioId || !userData) {
          throw new Error("Missing required parameters");
        }

        const data = await getPortfolioData({
          portfolioId: portfolioId,
          userId: userData.userId,
        });

        if (!data) {
          throw new Error("Failed to fetch portfolio data");
        }

        setPortfolioData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadAsPDF = async () => {
    try {
      const element = document.getElementById("p-preview-content");
      if (!element) throw new Error("Content not found");

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("portfolio.pdf");
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-preview-loading-overlay">
        <div className="p-preview-loading-content">
          <div className="p-preview-loading-spinner"></div>
          <p className="p-preview-loading-text">Creating your masterpiece...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-preview-error-overlay">
        <div className="p-preview-error-content">
          <h2 className="p-preview-error-title">Something's not quite right</h2>
          <p className="p-preview-error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="p-preview-retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="p-preview-empty-overlay">
        <div className="p-preview-empty-content">
          <h2 className="p-preview-empty-title">No Portfolio Data</h2>
          <p className="p-preview-empty-message">Please provide valid portfolio data to display.</p>
        </div>
      </div>
    );
  }

  const { contact, home, education, certificates, skills, projects } = portfolioData;

  return (
    <div className="p-preview-wrapper" style={{ marginTop : '70px'}}>
      <div id="p-preview-content" className="p-preview-container">
        {/* Sidebar */}
        <aside className="p-preview-sidebar">
          <div className="p-preview-sidebar-content">
            {/* Profile Section */}
            <div className="p-preview-profile-section">
              <div className="p-preview-profile-image">
                <div className="p-preview-profile-placeholder">
                  {home?.name?.charAt(0) || 'P'}
                </div>
              </div>
              <h1 className="p-preview-profile-name">{home?.name}</h1>
              <p className="p-preview-profile-tagline">{home?.tagline}</p>
            </div>

            {/* Contact Section */}
            <div className="p-preview-contact-section">
              {contact?.email && (
                <a href={`mailto:${contact.email}`} className="p-preview-contact-link">
                  <Mail className="p-preview-icon" />
                  <span className="p-preview-contact-text">{contact.email}</span>
                </a>
              )}
              {contact?.phone && (
                <a href={`tel:${contact.phone}`} className="p-preview-contact-link">
                  <Phone className="p-preview-icon" />
                  <span className="p-preview-contact-text">{contact.phone}</span>
                </a>
              )}
              {contact?.location && (
                <div className="p-preview-contact-link">
                  <MapPin className="p-preview-icon" />
                  <span className="p-preview-contact-text">{contact.location}</span>
                </div>
              )}
            </div>

            {/* Social Section */}
            <div className="p-preview-social-section">
              {contact?.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-preview-social-link">
                  <Github className="p-preview-icon" />
                  <span className="p-preview-social-text">GitHub</span>
                </a>
              )}
              {contact?.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-preview-social-link">
                  <Linkedin className="p-preview-icon" />
                  <span className="p-preview-social-text">LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-preview-main">
          {/* Hero Section */}
          <section className="p-preview-hero-section">
            <h2 className="p-preview-section-title">About Me</h2>
            <p className="p-preview-hero-text">{home?.summary}</p>
          </section>

          {/* Skills Section */}
          <section className="p-preview-skills-section">
            <h2 className="p-preview-section-title">Expertise</h2>
            <div className="p-preview-skills-container">
              {skills?.technical?.advanced?.length > 0 && (
                <div className="p-preview-skill-category">
                  <h3 className="p-preview-category-title">Advanced Skills</h3>
                  <div className="p-preview-skill-tags">
                    {skills.technical.advanced.map((skill, index) => (
                      <span key={index} className="p-preview-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills?.technical?.intermediate?.length > 0 && (
                <div className="p-preview-skill-category">
                  <h3 className="p-preview-category-title">Growing Expertise</h3>
                  <div className="p-preview-skill-tags">
                    {skills.technical.intermediate.map((skill, index) => (
                      <span key={index} className="p-preview-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills?.technical?.tools?.length > 0 && (
                <div className="p-preview-skill-category">
                  <h3 className="p-preview-category-title">Tools & Technologies</h3>
                  <div className="p-preview-skill-tags">
                    {skills.technical.tools.map((tool, index) => (
                      <span key={index} className="p-preview-skill-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Projects Section */}
          <section className="p-preview-projects-section">
            <h2 className="p-preview-section-title">Featured Projects</h2>
            <div className="p-preview-projects-grid">
              {projects?.map((project, index) => (
                <div key={index} className="p-preview-project-card">
                  <div className="p-preview-project-content">
                    <h3 className="p-preview-project-title">{project.title}</h3>
                    <p className="p-preview-project-description">{project.description}</p>

                    {project.techStack?.length > 0 && (
                      <div className="p-preview-project-tech">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="p-preview-tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}

                    <div className="p-preview-project-links">
                      {project.githubRepo && (
                        <a
                          href={project.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-preview-project-link"
                        >
                          <span>View Code</span>
                          <ArrowRight className="p-preview-icon" size={16} />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-preview-project-link"
                        >
                          <span>Live Demo</span>
                          <ArrowRight className="p-preview-icon" size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="p-preview-education-section">
            <h2 className="p-preview-section-title">Education & Certifications</h2>
            <div className="p-preview-education-grid">
              {education?.map((edu, index) => (
                <div key={index} className="p-preview-education-card">
                  <div className="p-preview-education-content">
                    <h3 className="p-preview-education-degree">{edu.degree}</h3>
                    <p className="p-preview-education-school">{edu.school}</p>
                    {/* <p className="p-preview-education-date">{edu.dates}</p> */}
                  </div>
                </div>
              ))}
            </div>

            {certificates?.length > 0 && (
              <div className="p-preview-certificates-container">
                <h3 className="p-preview-subsection-title">Certifications</h3>
                <div className="p-preview-certificates-grid">
                  {certificates.map((cert, index) => (
                    <div key={index} className="p-preview-certificate-card">
                      <Award className="p-preview-cert-icon" />
                      <div className="p-preview-certificate-content">
                        <h4 className="p-preview-cert-title">{cert.title}</h4>
                        <p className="p-preview-cert-issuer">{cert.issuer}</p>
                        <p className="p-preview-cert-date">{cert.date}</p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-preview-cert-link"
                          >
                            <span>View Certificate</span>
                            <ArrowRight className="p-preview-icon" size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Download Button */}
          <button onClick={downloadAsPDF} className="p-preview-download-button">
            Download Portfolio PDF
          </button>
        </main>
      </div>
    </div>
  );
};

export default PortfolioPreview;