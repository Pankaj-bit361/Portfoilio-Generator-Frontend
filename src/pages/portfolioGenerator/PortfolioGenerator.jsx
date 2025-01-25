import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PDFUploader from "../../components/PDFUploader";
import TemplateSelector from "../../components/TemplateSelector";
import AIAssistant from "../../components/AIAssistant";
import { toast } from "react-toastify";
import GlassLoader from "../../components/GlassLoader";
import Footer from "../../components/Footer";
import PortFolioHome from "./components/PortFolioHome";
import PortFolioContact from "./components/PortFolioContact";
import PortFolioEducation from "./components/PortFolioEducation";
import PortFolioExperience from "./components/PortFolioExperience";
import PortFolioProject from "./components/PortFolioProject";
import PortfolioSkills from "./components/PortfolioSkills";
import General from "../../config/general";
import PortFolioTheme from "./components/PortFolioTheme";
import Navbar from "../../components/Home/Navbar";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

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

        const portfolioId = General.getPortfolioId();
        if (portfolioId) {
          const data = await General.getPortfolioData(portfolioId);
          if (data.success) {
            setFormData(data.data);
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

  const handleTemplateSelect = async (template) => {
    try {
      const portfolioId = General.getPortfolioId();
      await General.createPortfolioTemplate(portfolioId, template);
      setSelectedTemplate(template);
    } catch (err) {
      console.log(err);
      toast.info(
        "Firs time,Don't change template selected. After that you can change it."
      );
    }
  };

  const handlePDFData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPortfolioData(formData);
  };

  const generatePortfolio = async () => {
    if (!extractedContent) {
      toast.error("Please upload your resume PDF");
      return;
    }

    try {
      setIsLoading(true);
      const response = await General.generatePortfolio({
        resumeText: extractedContent,
        template: selectedTemplate,
      });

      if (response.success) {
        await General.createPortfolioTemplate(
          response.data.portfolioId,
          selectedTemplate
        );

        toast.success("Portfolio Generated Successfully");
        navigate("/portfolios");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate portfolio");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const portfolioId = General.getPortfolioId();

        if (portfolioId) {
          const portfolioData = await General.getPortfolioData(portfolioId);
          if (portfolioData.success) {
            setFormData(portfolioData.data);
          }

          const templateResponse = await General.getPortfolioTemplate(
            portfolioId
          );
          if (templateResponse.success) {
            setSelectedTemplate(templateResponse.data);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
        setIsLoading(false);
      }
    };

    if (type === "edit") {
      fetchData();
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/20 to-black">
      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        {isLoading && <GlassLoader />}

        <motion.div
          variants={itemVariants}
          className="text-center mb-4 lg:mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-tr from-blue-500 to-teal-500  bg-clip-text text-transparent mb-4">
            {type === "edit"
              ? "Edit Your Portfolio"
              : "Generate Your Portfolio"}
          </h1>
          <p className="text-gray-300 text-lg p-2">
            Transform your resume into a stunning portfolio website
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-8 mb-0">
          {type !== "edit" ? (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <PDFUploader
                onDataExtracted={handlePDFData}
                setExtractedText={setExtractedContent}
              />
            </div>
          ) : null}

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelect={handleTemplateSelect}
              portfolioId={General.getPortfolioId()}
            />
          </div>

          <div className="rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <AIAssistant />
          </div>
        </motion.div>

        {type === "edit" ? (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-8 mt-10"
          >
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-8">
                <PortFolioHome
                  formData={formData}
                  setFormData={setFormData}
                  setFlag={setFlag}
                />
                <PortFolioContact
                  formData={formData}
                  setFormData={setFormData}
                  setFlag={setFlag}
                />
                <PortFolioEducation
                  formData={formData}
                  setFormData={setFormData}
                  setFlag={setFlag}
                />
              </div>
              <div className="space-y-8">
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
              </div>
            </div>
            <PortFolioTheme
              setFormData={setFormData}
              setFlag={setFlag}
              formData={formData}
            />
          </motion.form>
        ) : (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <button
              onClick={generatePortfolio}
              className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg text-white font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transform hover:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full"
            >
              Generate Portfolio
            </button>
          </motion.div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
}

export default PortfolioGenerator;
