// components/fileUpload.js
import axios from "axios";
import { config } from "../config/api";

export const GenerateDataFromApi = async (resumeText) => {
  if (!resumeText) return null;

  try {
    const response = await axios.post(
      `${config.BASE_URL}api/portfolio/generate?userId=u-4fd96b42-e27f-4726-8b11-e3932c061ddc`,
      { resumeText }
    );
    console.log("API Response:", response.data);

    // If successful, immediately fetch the generated portfolio
    if (response.data.success && response.data.data.portfolioId) {
      const portfolioData = await getPortfolioData(
        response.data.data.portfolioId
      );
      return portfolioData;
    }
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
};

export const getPortfolioData = async (portfolioId) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}api/portfolio/${portfolioId}?userId=u-4fd96b42-e27f-4726-8b11-e3932c061ddc`
    );

    if (response.data.success) {
      // Transform the API response to match the form structure
      const transformedData = {
        contact: {
          phone: response.data.data.contact.phone || "",
          email: response.data.data.contact.email || "",
          location: response.data.data.contact.location || "",
          github: response.data.data.contact.socialMedia.github || "",
          linkedin: response.data.data.contact.socialMedia.linkedin || ""
        },
        home: {
          name: response.data.data.home.name || "",
          tagline: response.data.data.home.tagline || "",
          summary: response.data.data.home.summary || ""
        },
        education: response.data.data.education.map((edu) => ({
          degree: edu.degree || "",
          school: edu.school || "",
          dates: `${edu.startDate} - ${edu.endDate}`,
          grade: ""
        })),
        certificates:
          response.data.data.certifications?.map((cert) => ({
            title: cert.title || "",
            issuer: cert.issuer || "",
            date: cert.date || "",
            credentialUrl: cert.credentialUrl || ""
          })) || [],
        skills: {
          technical: {
            advanced: response.data.data.skills.technical.languages
              .filter((lang) => lang.proficiency === "Advanced")
              .map((lang) => lang.name),
            intermediate: response.data.data.skills.technical.languages
              .filter((lang) => lang.proficiency === "Intermediate")
              .map((lang) => lang.name),
            tools: response.data.data.skills.technical.tools.map(
              (tool) => tool.name
            )
          },
          soft: response.data.data.skills.soft.flatMap(
            (category) => category.skills
          )
        },
        projects: response.data.data.projects.map((project) => ({
          title: project.title || "",
          description: project.description || "",
          techStack: project.tools || [],
          features: project.features || [],
          githubRepo: project.links.github || "",
          liveDemo: project.links.live || ""
        }))
      };

      return transformedData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};
