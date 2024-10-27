import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { GenerateDataFromApi } from "./fileUpload";

function PDFUploader({ onDataExtracted }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setIsProcessing(true);
      setIsComplete(false);

      try {
        const mockExtractedData = {
          contact: {
            phone: "+918219187422",
            email: "ayushivashisth22@gmail.com"
          },
          home: { name: "Ayushi Vashisth", tagline: "Full Stack Web Developer" }
        };

        setTimeout(async () => {
          onDataExtracted(mockExtractedData);
          await GenerateDataFromApi(mockExtractedData);
          setIsProcessing(false);
          setIsComplete(true);
        }, 1000);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center"
            }}
          >
            <button className="upload-resume-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                className="svgIcon"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
              </svg>
              <span className="icon2"></span>
            </button>
            <p>Upload Resume(.pdf)</p>
          </div>
        )}
      </label>
      {file ? (
        <p className="uploader-text mt-2">Uploaded: {file.name}</p>
      ) : (
        <p className="uploader-text mt-2">No file uploaded</p>
      )}
    </div>
  );
}

export default PDFUploader;
