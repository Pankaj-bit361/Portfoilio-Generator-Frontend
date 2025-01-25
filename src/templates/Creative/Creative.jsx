import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { getPortfolioData2 } from "../../components/fileUpload";

gsap.registerPlugin(ScrollTrigger);

function Creative() {
    const [creativePorfoliodata, setCreativePortFolioData] = useState(null);  
  
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const portfolioId = urlParams.get("portfolioId");
        // let userData = JSON.parse(localStorage.getItem("portfolioUser"));
  
        if (!portfolioId) {
          throw new Error("Missing required parameters");
        }
  
        const data = await getPortfolioData2({
          portfolioId: portfolioId,
          // userId: userData.userId,
        });
        // console.log("data", data);
  
        if (!data) {
          throw new Error("Failed to fetch portfolio data");
        }
        setCreativePortFolioData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    useEffect(() => {
      gsap.to("body", {
        backgroundColor: "#000",
        duration: 0,
      });
  
      gsap.fromTo(
        ".scroll-trigger",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".scroll-trigger",
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, []);
  
    return (
      <div className="bg-black min-h-screen text-white">
        <Cursor />
        <Navbar
          data={{
            home: creativePorfoliodata?.home || {},
            about: creativePorfoliodata?.skills || {},
            projects: creativePorfoliodata?.projects || [],
            experience: [
              ...(creativePorfoliodata?.experiences || []),
              ...(creativePorfoliodata?.educations || []),
            ],
            contact: creativePorfoliodata?.contact || {},
          }}
        />
        <Hero data={creativePorfoliodata || {}} />
        <About data={creativePorfoliodata || {}} />
        <Skills data={creativePorfoliodata?.skills || {}} />
        <Projects data={creativePorfoliodata?.projects || []} />
        <Experience
          data={{
            education: creativePorfoliodata?.educations || [],
            experience: creativePorfoliodata?.experiences || [],
          }}
        />
        <Contact data={creativePorfoliodata?.contact || {}} />
      </div>
    );
  }
  
  export default Creative;