import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

async function extractContentFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";
    let allAnnotations = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");

      const annotations = await page.getAnnotations();
      const pageAnnotations = annotations
        .filter((annotation) => annotation.subtype === "Link" && annotation.url)
        .map((annotation) => ({
          url: annotation.url,
          rect: annotation.rect,
          pageNumber: i,
        }));

      fullText += pageText + "\n";
      allAnnotations = [...allAnnotations, ...pageAnnotations];
    }

    let processedText = fullText;
    allAnnotations.forEach((annotation) => {
      processedText += `\nLink: ${annotation.url}`;
    });

    return processedText.trim();
  } catch (error) {
    console.error("Error extracting content from PDF:", error);
    throw error;
  }
}

async function extractContentFromTxt(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error reading .txt file"));
    reader.readAsText(file);
  });
}

function PDFUploader({ onDataExtracted, setExtractedText }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [extractedContent, setExtractedContent] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setExtractedContent(null);
    setExtractedText(null);

    if (selectedFile) {
      setIsProcessing(true);
      setIsComplete(false);

      try {
        let extractedText = "";
        if (selectedFile.type.includes("pdf")) {
          extractedText = await extractContentFromPdf(selectedFile);
        } else if (selectedFile.type.includes("text/plain")) {
          extractedText = await extractContentFromTxt(selectedFile);
        } else {
          setError("Please upload a valid PDF or TXT file");
          return;
        }

        setExtractedContent(extractedText);
        setExtractedText(extractedText);
        console.log("Extracted content:", extractedText);
      } catch (error) {
        console.error("Error processing file:", error);
        setError("Error processing file");
      } finally {
        setIsProcessing(false);
        setIsComplete(true);
      }
    }
  };

  return (
    <div className="uploader">
      <input
        type="file"
        accept=".pdf, .txt"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="uploader-label">
        {isComplete ? (
          <>
            <CheckCircle className="w-5 h-5" /> File Processed
          </>
        ) : isProcessing ? (
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 animate-pulse" />
            Processing File...
          </div>
        ) : (
          <div className="uploader-label-section">
            <button className="upload-resume-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                className="svgIcon"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
              </svg>
            </button>
            <p>Upload File (.pdf, .txt)</p>
          </div>
        )}
      </label>
      {file && <p className="uploader-text mt-2">Uploaded: {file.name}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {extractedContent && (
        <div
          className="mt-4 p-4 bg-gray-50 rounded-md"
          style={{ display: "none" }}
        >
          <pre className="whitespace-pre-wrap text-sm">{extractedContent}</pre>
        </div>
      )}
    </div>
  );
}

export default PDFUploader;
