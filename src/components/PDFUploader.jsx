import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import { motion } from "framer-motion";

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

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const uploadButtonVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

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
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mb-4 p-4 border-2 border-dashed border-gray-400 rounded-xl text-center"
    >
      <input
        type="file"
        accept=".pdf, .txt"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <motion.label
        htmlFor="file-upload"
        className="flex flex-row items-center cursor-pointer justify-center rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg w-full lg:w-[50%] mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="relative group">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5 text-white" />
              <span>File Processed</span>
            </motion.div>
          ) : isProcessing ? (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-lg"
            >
              <FileText className="w-5 h-5" />
              <span className="text-white">Processing File...</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1 lg:gap-4 justify-center ">
              <motion.div
                variants={uploadButtonVariants}
                initial="initial"
                animate="animate"
                className="w-16 h-16 flex items-center justify-center transform transition-all duration-300 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 384 512"
                  className="fill-white"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </motion.div>
              <span className="text-sm lg:text-lg font-medium text-white">
                Upload File (.pdf, .txt)
              </span>
            </div>
          )}
        </motion.div>
      </motion.label>

      {file && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-gray-500 text-sm"
        >
          Uploaded: {file.name}
        </motion.p>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-red-500 text-sm"
        >
          {error}
        </motion.p>
      )}

      {extractedContent && (
        <div className="hidden">
          <pre className="whitespace-pre-wrap text-sm">{extractedContent}</pre>
        </div>
      )}
    </motion.div>
  );
}

export default PDFUploader;
