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
import General from "../../config/general";
import { ScrollProvider } from "./context/ScrollProvider";

const Modern = () => {
  const [modernPortfolioData, setModernPortfolioData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (!General.getPortfolioId()) {
        throw new Error("Missing required parameters");
      }

      const data = await getPortfolioData2({
        portfolioId: General.getPortfolioId(),
      });

      if (!data) {
        throw new Error("Failed to fetch portfolio data");
      }

      setModernPortfolioData(data);
    } catch (error) {
      console.error("Portfolio data fetch error:", error);
      toast.error("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare data for different sections
  const navbarData = {
    home: modernPortfolioData?.home,
    about: modernPortfolioData?.skills,
    projects: modernPortfolioData?.projects,
    experience: [
      ...(modernPortfolioData?.experiences || []),
      ...(modernPortfolioData?.educations || []),
    ],
    contact: modernPortfolioData?.contact,
  };

  const heroData = {
    home: modernPortfolioData?.home,
    contact: modernPortfolioData?.contact,
    projects: modernPortfolioData?.projects,
  };

  const aboutData = {
    home: modernPortfolioData?.home,
    skills: modernPortfolioData?.skills,
    contact: modernPortfolioData?.contact,
  };

  const projectsData = modernPortfolioData?.projects || [];

  const experienceData = {
    education: modernPortfolioData?.educations || [],
    experience: modernPortfolioData?.experiences || [],
  };

  const contactData = modernPortfolioData?.contact;

  return (
    <div className="q-modern-portfolio">
      <ScrollProvider>
        <ThemeProvider>
          {loading ? (
            <GlassLoader />
          ) : (
            <div className="min-h-screen">
              <Navbar data={navbarData} />
              <section id="home">
                <Hero data={heroData} />
              </section>
              <section id="about">
                <About data={aboutData} />
              </section>
              <section id="projects">
                <Projects data={projectsData} />
              </section>
              <section id="experience">
                <Experience data={experienceData} />
              </section>
              {contactData && (
                <section id="contact">
                  <Contact data={contactData} />
                </section>
              )}
              <ThemeSwitcher />
            </div>
          )}
        </ThemeProvider>
      </ScrollProvider>
    </div>
  );
};

export default Modern;
