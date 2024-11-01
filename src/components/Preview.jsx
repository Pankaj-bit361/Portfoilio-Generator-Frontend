import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Preview({ portfolioData }) {
  if (!portfolioData) {
    return (
      <div className="preview">
        <div className="preview-container">
          <h1 className="preview-name">Portfolio Data Not Available</h1>
          <p className="preview-text">
            Please provide valid portfolio data to display.
          </p>
        </div>
      </div>
    );
  }

  const downloadAsPDF = async () => {
    const element = document.getElementById("portfolio-content");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("portfolio.pdf");
  };

  const { contact, home, education, certificates, skills, projects } =
    portfolioData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="preview"
    >
      <div id="portfolio-content" className="preview-container">
        {/* Header Section */}
        <header className="preview-header">
          <h1 className="preview-name">{home.name}</h1>
          <h2 className="preview-tagline">{home.tagline}</h2>
          <p className="preview-text max-w-2xl mx-auto">{home.summary}</p>

          {/* Contact Information */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Mail className="w-4 h-4" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
            )}
            {contact.location && (
              <span className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                {contact.location}
              </span>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* Education Section */}
        <section className="preview-section">
          <h3 className="preview-section-title">Education</h3>
          <div className="grid gap-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.school}</p>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>{edu.dates}</span>
                  <span>{edu.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section className="preview-section">
          <h3 className="preview-section-title">Certificates</h3>
          <div className="grid gap-4">
            {certificates.map((cert, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{cert.title}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Award className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="preview-section">
          <h3 className="preview-section-title">Skills</h3>
          <div className="space-y-4">
            {skills.technical.advanced.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Advanced</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.advanced.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.technical.intermediate.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Intermediate</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.intermediate.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.technical.tools.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.tools.map((tool, index) => (
                    <span key={index} className="skill-tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section className="preview-section">
          <h3 className="preview-section-title">Projects</h3>
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-semibold">{project.title}</h4>
                  <div className="flex gap-2">
                    {project.githubRepo && (
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-gray-600">{project.description}</p>

                {project.techStack?.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.features?.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Key Features:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={downloadAsPDF}
          className="preview-button"
        >
          Download Portfolio as PDF
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Preview;
