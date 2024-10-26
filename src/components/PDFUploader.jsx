import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

function PDFUploader({ onDataExtracted }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsProcessing(true);
      setIsComplete(false);

      try {
        const mockExtractedData = {
          contact: {
            phone: "+918219187422",
            email: "ayushivashisth22@gmail.com",
            location: "New Delhi",
            github: "",
            linkedin: ""
          },
          home: {
            name: "Ayushi Vashisth",
            tagline: "Full Stack Web Developer",
            summary:
              "Hardworking, detail-oriented and highly enthusiastic full-stack web developer/software developer. Have a strong grip on debugging and decoding the pattern. Dedicated 1000+ hours of coding and have experience in developing functional websites."
          },
          about: {
            personalBrand: {
              statement:
                "Hardworking, detail-oriented and highly enthusiastic full-stack web developer/software developer. Have a strong grip on debugging and decoding the pattern. Dedicated 1000+ hours of coding and have experience in developing functional websites.",
              strengths: ["Teamwork", "Punctual", "Creative", "Adaptable"]
            },
            education: [
              {
                degree: "Full Stack Web Development",
                school: "Masai School",
                dates: "2023"
              },
              {
                degree: "Bachelor Of Technology (CSE)",
                school: "AKTU",
                dates: "2019-2023"
              }
            ]
          },
          skills: {
            technical: {
              advanced: ["ReactJS", "NodeJS", "Express", "MongoDB"],
              intermediate: ["NextJS", "Redux", "JavaScript", "CSS", "HTML"],
              tools: ["VS Code", "GitHub", "Notion"]
            },
            soft: ["Teamwork", "Punctual", "Creative", "Adaptable"]
          }
        };

        setTimeout(() => {
          onDataExtracted(mockExtractedData);
          setIsProcessing(false);
          setIsComplete(true);
        }, 1500);
      } catch (error) {
        console.error("Error processing PDF:", error);
      }
    }
  };

  return (
    <div className="uploader">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className="uploader-label">
        {isComplete ? (
          <>
            <CheckCircle className="w-5 h-5" /> Resume Processed
          </>
        ) : isProcessing ? (
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 animate-pulse" />
            Processing Resume...
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
            <button className="upload-resume-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                class="svgIcon"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
              </svg>
              <span class="icon2"></span>
            </button>
            <p>Upload Resume(.pdf)</p>
          </div>
        )}
      </label>
      {file && <p className="uploader-text mt-2">Uploaded: {file.name}</p>}
    </div>
  );
}

export default PDFUploader;
