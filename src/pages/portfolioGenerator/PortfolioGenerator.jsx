import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PDFUploader from "../../components/PDFUploader";
import TemplateSelector from "../../components/TemplateSelector";
import AIAssistant from "../../components/AIAssistant";
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
import { getPortfolioData } from "../../components/fileUpload";
import "./portfoliogenerator.css";
import { data } from "autoprefixer";
import { toast } from "react-toastify";
import { config } from "../../config/api";
import { TbVariableMinus } from "react-icons/tb";
import axios from "axios";
import GlassLoader from "../../components/GlassLoader";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PortFolioHome from "./components/PortFolioHome";
import PortFolioContact from "./components/PortFolioContact";
import PortFolioEducation from "./components/PortFolioEducation";
import PortFolioExperience from "./components/PortFolioExperience";
import PortFolioProject from "./components/PortFolioProject";
import PortfolioSkills from "./components/PortfolioSkills";
import General from "../../config/general";
import PortFolioTheme from "./components/PortFolioTheme";

function PortfolioGenerator({ setPortfolioData, type }) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [extractedContent, setExtractedContent] = useState("");
  const [isLoading, setIsLoading] = useState(type == "edit");
  const [flag, setFlag] = useState(false);

  const [formData, setFormData] = useState({
    contact: {
      phone: "",
      email: "",
      location: "",
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
        primary: "",
        secondary: "",
        primaryHover: "",
        accent: "",
        bgGradient: "",
        bg: "",
        text: "",
        textLight: "",
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
        setIsLoading(true);

        if (General.getPortfolioId()) {
          const data = await getPortfolioData({
            portfolioId: General.getPortfolioId(),
            userId: General.getUserId(),
          });
          if (data) {
            setFormData(data);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
        setIsLoading(false);
      }
    };

    type == "edit" && fetchData();
  }, [flag]);

  const handleTemplateSelect = (template) => setSelectedTemplate(template);
  const handleAISuggestion = (suggestions) =>
    setFormData((prev) => ({ ...prev, ...suggestions }));
  const handlePDFData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPortfolioData(formData);
    // navigate("/preview");
  };

  const generatePortfolio = async () => {
    console.log("hsbmjndjhsbd fmsfd");
    if (!extractedContent) {
      toast.error("please upload the resume pdf");
      return;
    }
    const body = {
      resumeText: extractedContent,
      template: selectedTemplate,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${
          config.BASE_URL
        }api/portfolio/generate?userId=${General.getUserId()}`,
        body
      );
      if (response.data.success) {
        toast.success("PortFolio Generated Successfully");
        navigate("/portfolios");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="generator"
      >
        {isLoading && <GlassLoader />}
        <div className="generator-container">
          <h2 className="generator-title">Create Your Portfolio</h2>

          <PDFUploader
            onDataExtracted={handlePDFData}
            setExtractedText={setExtractedContent}
          />
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
          />
          <AIAssistant
            portfolioData={formData}
            onSuggest={handleAISuggestion}
          />

          {type == "edit" && (
            <form onSubmit={handleSubmit} className="generator-form">
              <PortFolioHome
                formData={formData}
                setFormData={setFormData}
                setFlag={setFlag}
              />

              <PortFolioContact formData={formData} setFormData={setFormData} />

              <PortFolioEducation
                formData={formData}
                setFormData={setFormData}
                setFlag={setFlag}
              />

              <PortFolioExperience
                formData={formData}
                setFormData={setFormData}
                setFlag={setFlag}
              />

              <PortFolioProject
                setFormData={setFormData}
                formData={formData}
                setFlag={setFlag}
              />

              <PortfolioSkills
                setFormData={setFormData}
                setFlag={setFlag}
                formData={formData}
              />

              {/* Theme Customization Section */}
              <PortFolioTheme
                setFormData={setFormData}
                setFlag={setFlag}
                formData={formData}
              />
            </form>
          )}
          {type == "create" && (
            <button
              onClick={() => generatePortfolio()}
              className="submit-button"
            >
              Generate Portfolio
            </button>
          )}
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default PortfolioGenerator;
