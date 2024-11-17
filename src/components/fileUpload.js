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

  return {
    technical: {
      languages: skillsData.technical?.languages?.map(lang => ({
        name: lang.name,
        proficiency: lang.proficiency
      })) || [],
      frameworks: skillsData.technical?.frameworks?.map(framework => ({
        name: framework.name,
        proficiency: framework.proficiency
      })) || [],
      tools: skillsData.technical?.tools?.map(tool => ({
        name: tool.name,
        proficiency: tool.proficiency
      })) || []
    },
    soft: skillsData.soft?.map(category => ({
      category: category.category,
      skills: category.skills
    })) || []
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
      text: themeData.colors?.text || "#111827", // Default dark gray
    },
    fonts: {
      primary: themeData.fonts?.primary || "Inter",
      secondary: themeData.fonts?.secondary || "Roboto",
    },
    themeId: themeData.themeId || "",
  };
};

const safeAccess = (obj, path, defaultValue = "") => {
  try {
    return (
      path.split(".").reduce((acc, part) => acc?.[part], obj) ?? defaultValue
    );
  } catch {
    return defaultValue;
  }
};

const transformEducation = (education = []) => {
  return (Array.isArray(education) ? education : []).map((edu) => ({
    degree: edu?.degree || "",
    school: edu?.school || "",
    startDate: edu?.startDate || "",
    endDate: edu?.endDate || "",
    location: edu?.location || "",
    field: edu?.field || "",
    educationId: edu?.educationId || "",
    relevantCourses: Array.isArray(edu?.relevantCourses)
      ? edu.relevantCourses
      : [],
  }));
};

const transformExperience = (experience = []) => {
  return (Array.isArray(experience) ? experience : []).map((exp) => ({
    role: exp?.role || "",
    company: exp?.company || "",
    startDate: exp?.startDate || "",
    endDate: exp?.endDate || "",
    location: exp?.location || "",
    type: exp?.type || "",
    description: exp?.description || "",
    experienceId: exp?.experienceId || "",
    responsibilities: Array.isArray(exp?.responsibilities)
      ? exp.responsibilities.map((res) => ({
          description: res?.description || "",
          achievements: Array.isArray(res?.achievements)
            ? res.achievements
            : [],
        }))
      : [],
    achievements: Array.isArray(exp?.achievements) ? exp.achievements : [],
  }));
};

const transformProjects = (projects = []) => {
  return (Array.isArray(projects) ? projects : []).map((project) => ({
    title: project?.title || "",
    description: project?.description || "",
    role: project?.role || "",
    type: project?.type,
    status: project?.status,
    tools: Array.isArray(project?.tools) ? project.tools : [],
    features: Array.isArray(project?.features) ? project.features : [],
    challenges: Array.isArray(project?.challenges) ? project.challenges : [],
    images: Array.isArray(project?.images) ? project.images : [],
    links: {
      github: project?.links?.github || "",
      live: project?.links?.live || "",
      documentation: project?.links?.documentation || "",
    },
    projectId: project?.projectId || "",
  }));
};

export const getPortfolioData = async ({ portfolioId }) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}api/portfolio/${portfolioId}`
    );

    if (response?.data?.success) {
      const data = response.data.data || {};

      const transformedData = {
        contact: {
          phone: safeAccess(data, "contact.phone"),
          email: safeAccess(data, "contact.email"),
          location: safeAccess(data, "contact.location"),
          socialMedia: {
            github: safeAccess(data, "contact.socialMedia.github"),
            linkedin: safeAccess(data, "contact.socialMedia.linkedin"),
            twitter: safeAccess(data, "contact.socialMedia.twitter"),
            website: safeAccess(data, "contact.socialMedia.website"),
          },
        },
        home: {
          name: safeAccess(data, "home.name"),
          tagline: safeAccess(data, "home.tagline"),
          summary: safeAccess(data, "home.summary"),
          profession: safeAccess(data, "home.profession"),
          highlights: Array.isArray(data?.home?.highlights)
            ? data.home.highlights
            : [],
          yearsOfExperience: Number(
            safeAccess(data, "home.yearsOfExperience", 0)
          ),
        },
        experiences: transformExperience(data?.experiences),
        education: transformEducation(data?.educations),
        theme: transformTheme(data?.theme || {}),
        certificates: (Array.isArray(data?.certifications)
          ? data.certifications
          : []
        ).map((cert) => ({
          title: cert?.title || "",
          issuer: cert?.issuer || "",
          date: cert?.date || "",
          credentialUrl: cert?.credentialUrl || "",
          certificateId: cert?.certificateId || "",
        })),
        skills: transformSkills(data?.skills || {}),
        projects: transformProjects(data?.projects),
      };

      console.log("Transformed Data:", transformedData);
      return transformedData;
    }
    return {
      contact: { socialMedia: {} },
      home: { highlights: [] },
      experience: [],
      education: [],
      theme: {},
      certificates: [],
      skills: {},
      projects: [],
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return {
      contact: { socialMedia: {} },
      home: { highlights: [] },
      experience: [],
      education: [],
      theme: {},
      certificates: [],
      skills: {},
      projects: [],
    };
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
