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

// const data = {
//   home: {
//     name: "Ayushi Vashisth",
//     profession: "Full Stack Web Developer",
//     summary:
//       "Highly skilled Full Stack Web Developer proficient in MERN stack. Collaborative and creative problem solver with extensive experience in building scalable web applications. Expertise in Node.js, Express.js, React.js, and MongoDB. Strong teamwork and communication skills with a proactive and self-motivated attitude.",
//   },
//   contact: {
//     email: "ayushivashisth22@gmail.com",
//     phone: "+91-8219187422",
//     location: "New Delhi",
//     socialMedia: {
//       github: "https://github.com/AyushiVashisth",
//       linkedin: "https://www.linkedin.com/in/ayushi-vashisth",
//       website: "https://ayushivashisth.github.io/",
//     },
//   },
//   skills: {
//     technical: {
//       languages: [
//         { name: "JavaScript", proficiency: "Intermediate" },
//         { name: "Python", proficiency: "Intermediate" },
//       ],
//       frameworks: [
//         { name: "Node.js", proficiency: "Intermediate" },
//         { name: "Express.js", proficiency: "Intermediate" },
//         { name: "React", proficiency: "Intermediate" },
//       ],
//       tools: [{ name: "MongoDB", proficiency: "Intermediate" }],
//     },
//     soft: [
//       {
//         category: "Teamwork",
//         skills: ["Collaboration", "Communication"],
//       },
//       {
//         category: "Time Management",
//         skills: [],
//       },
//     ],
//   },
//   projects: [
//     {
//       title: "BlissfulAbodes",
//       description:
//         "Developed a hotel booking platform with Generative AI integration. Features include user authentication, searching, filtering, sorting, and secure payment systems.",
//       tools: ["Angular", "Python", "MongoDB", "Generative AI"],
//       links: {
//         live: "https://blissful-abodes.vercel.app/",
//         github: "https://github.com/AyushiVashisth/BlissfulAbodes",
//       },
//     },
//     {
//       title: "Eyecare",
//       description:
//         "Created an Indian online eyewear retailer website with home trials. Features include user onboarding, admin panel, and visually appealing UI.",
//       tools: ["ReactJS", "Chakra UI", "NodeJS", "MongoDB"],
//       links: {
//         live: "https://eyescare.vercel.app/",
//         github: "https://github.com/AyushiVashisth/eyecare",
//       },
//     },
//     {
//       title: "MediGreen",
//       description:
//         "Developed a pharmaceutical e-commerce website with seamless user experience and efficient admin panel for product management.",
//       tools: ["ReactJS", "Chakra UI", "NodeJS", "MongoDB"],
//       links: {
//         live: "https://medigreenhealth.netlify.app/",
//         github: "https://github.com/AyushiVashisth/medi-green-health",
//       },
//     },
//   ],
//   educations: [
//     {
//       degree: "Full Stack Web Development",
//       school: "Masai School",
//       startDate: "May 2022",
//       endDate: "July 2023",
//     },
//     {
//       degree: "Bachelor of Technology",
//       school: "Eternal University",
//       startDate: "August 2016",
//       endDate: "November 2020",
//     },
//   ],
//   experiences: [],
// };

function Creative() {
    const [creativePorfoliodata, setCreativePortFolioData] = useState(null);  
  
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const portfolioId = urlParams.get("portfolioId");
        let userData = JSON.parse(localStorage.getItem("portfolioUser"));
  
        if (!portfolioId) {
          throw new Error("Missing required parameters");
        }
  
        const data = await getPortfolioData2({
          portfolioId: portfolioId,
          // userId: userData.userId,
        });
        console.log("data", data);
  
        if (!data) {
          throw new Error("Failed to fetch portfolio data");
        }
        setCreativePortFolioData(data);
      } catch (error) {
        console.log(error);
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