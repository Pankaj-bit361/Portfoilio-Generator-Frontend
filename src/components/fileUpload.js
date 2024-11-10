// components/fileUpload.js
import axios from "axios";
import { config } from "../config/api";
import { useAuth } from "../Context/AuthContext";

export const GenerateDataFromApi = async (resumeText) => {
  const { user } = useAuth();
  console.log("user", user, resumeText);
  if (!resumeText) return null;

  try {
    const response = await axios.post(
      `${config.BASE_URL}api/portfolio/generate?userId=${user.userId}`,
      { resumeText }
    );
    console.log("API Response:", response.data);

    if (response.data.success && response.data.data.portfolioId) {
      const portfolioData = await getPortfolioData(
        response.data.data.portfolioId
      );
      console.log("Portfolio Data:", portfolioData);
      return portfolioData;
    }
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    return null;
  }
};

const transformSkills = (skillsData) => {
  if (!skillsData) return null;

  const getAllSkillsByProficiency = (skills = [], frameworks = []) => {
    const combined = [...skills, ...frameworks];
    return {
      expert: combined
        .filter((item) => item.proficiency === "Expert")
        .map((item) => item.name),
      advanced: combined
        .filter((item) => item.proficiency === "Advanced")
        .map((item) => item.name),
      intermediate: combined
        .filter((item) => item.proficiency === "Intermediate")
        .map((item) => item.name)
    };
  };

  const technical = getAllSkillsByProficiency(
    skillsData.technical?.languages || [],
    skillsData.technical?.frameworks || []
  );

  return {
    technical: {
      expert: technical.expert || [],
      advanced: technical.advanced || [],
      intermediate: technical.intermediate || [],
      tools: skillsData.technical?.tools?.map((tool) => tool.name) || []
    },
    soft: skillsData.soft?.flatMap((category) => category.skills) || []
  };
};

const transformTheme = (themeData) => {
  if (!themeData) return null;

  return {
    colors: {
      primary: themeData.colors?.primary || "#3B82F6", // Default blue
      secondary: themeData.colors?.secondary || "#10B981", // Default green
      accent: themeData.colors?.accent || "#6366F1", // Default indigo
      background: themeData.colors?.background || "#FFFFFF", // Default white
      text: themeData.colors?.text || "#111827" // Default dark gray
    },
    fonts: {
      primary: themeData.fonts?.primary || "Inter",
      secondary: themeData.fonts?.secondary || "Roboto"
    },
    themeId: themeData.themeId || ""
  };
};

export const getPortfolioData = async ({ portfolioId, userId }) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}api/portfolio/${portfolioId}?userId=${userId}`
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
        education: response.data.data.educations.map((edu) => ({
          degree: edu.degree || "",
          school: edu.school || "",
          dates: `${edu.startDate} - ${edu.endDate}`,
          grade: ""
        })),
        theme: transformTheme(response.data.data.theme),
        certificates:
          response.data.data.certifications?.map((cert) => ({
            title: cert.title || "",
            issuer: cert.issuer || "",
            date: cert.date || "",
            credentialUrl: cert.credentialUrl || ""
          })) || [],
        skills: transformSkills(response.data.data.skills),
        projects: response.data.data.projects.map((project) => ({
          title: project.title || "",
          description: project.description || "",
          techStack: project.tools || [],
          features: project.features || [],
          githubRepo: project.links.github || "",
          liveDemo: project.links.live || ""
        }))
      };
      console.log("Transformed Data:", transformedData);

      return transformedData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};


export const getPortfolioData2 = async ({ portfolioId, userId }) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}api/portfolio/${portfolioId}?userId=${userId}`
    );

    if (response.data.success) {

      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};