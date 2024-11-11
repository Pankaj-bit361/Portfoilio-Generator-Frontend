import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Experience from "./components/experience/Experience";
import Contact from "./components/contact/Contact";
import { getPortfolioData2 } from "../../components/fileUpload";
import GlassLoader from "../../components/GlassLoader";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import Hero from "./components/hero/Hero";

const Modern = () => {
  const [moderPorfoliodata, setModernPortFolioData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const portfolioId = urlParams.get("portfolioId");
      let userData = JSON.parse(localStorage.getItem("portfolioUser"));

      if (!portfolioId || !userData) {
        throw new Error("Missing required parameters");
      }

      const data = await getPortfolioData2({
        portfolioId: portfolioId,
        userId: userData.userId,
      });

      if (!data) {
        throw new Error("Failed to fetch portfolio data");
      }
      setLoading(false);
      setModernPortFolioData(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navbarData = {
    home: moderPorfoliodata?.home,
    about: moderPorfoliodata?.skills,
    projects: moderPorfoliodata?.projects,
    experience: [...(moderPorfoliodata?.experiences || []), ...(moderPorfoliodata?.educations || [])],
    contact: moderPorfoliodata?.contact,
  };

  const heroData = {
    home: moderPorfoliodata?.home,
    contact: moderPorfoliodata?.contact,
    projects: moderPorfoliodata?.projects,
  };

  const aboutData = {
    home: moderPorfoliodata?.home,
    skills: moderPorfoliodata?.skills,
    contact: moderPorfoliodata?.contact,
  };

  const projectsData = moderPorfoliodata?.projects || [];

  const experienceData = {
    education: moderPorfoliodata?.educations || [],
    experience: moderPorfoliodata?.experiences || [],
  };

  return (
    <div className="q-modern-portfolio">
      {loading && <GlassLoader />}
      <ThemeProvider>
        <div className="min-h-screen">
          <Navbar data={navbarData} />
          <Hero data={heroData} />
          <About data={aboutData} />
          <Projects data={projectsData} />
          <Experience data={experienceData} />
          <Contact />
          <ThemeSwitcher />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Modern;