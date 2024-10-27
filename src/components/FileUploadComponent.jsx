import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, CheckCircle, Copy, Download } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import { Card, CardContent } from "./CardComoponet";
import { GenerateDataFromApi } from "./fileUpload";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileUploadComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const extractTextFromPDF = async (file) => {
    try {
      const fileURL = URL.createObjectURL(file);
      const pdf = await pdfjs.getDocument(fileURL).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }

      URL.revokeObjectURL(fileURL);
      return fullText;
    } catch (err) {
      console.error("Error processing PDF:", err);
      throw new Error("Failed to extract text from PDF");
    }
  };

  const extractTextFromTXT = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error("Failed to read text file"));
      reader.readAsText(file);
    });
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    setError("");

    try {
      let text;
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (file.type === "text/plain") {
        text = await extractTextFromTXT(file);
      }

      setExtractedText(text);
      setIsComplete(true);
    } catch (err) {
      console.error("Error processing file:", err);
      setError(
        `Failed to extract text from ${
          file.type === "application/pdf" ? "PDF" : "text"
        } file.`
      );
      setFileName("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type === "text/plain")
    ) {
      setFileName(file.name);
      processFile(file);
    } else {
      setError("Please upload a PDF or TXT file.");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type === "text/plain")
    ) {
      setFileName(file.name);
      processFile(file);
    } else {
      setError("Please upload a PDF or TXT file.");
    }
  };

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    }
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.replace(/\.(pdf|txt)$/, "")}_extracted.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFileIcon = () => {
    if (fileName.endsWith(".pdf")) {
      return "pdf";
    } else if (fileName.endsWith(".txt")) {
      return "txt";
    }
    return "file";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="w-full bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <motion.div
            className={`relative border-3 border-dashed rounded-xl p-10 text-center
              ${
                isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-300"
              }
              ${error ? "border-red-300" : ""}
              transition-colors duration-300 hover:border-blue-400`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.txt"
            />

            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-full ${
                    error ? "bg-red-50" : "bg-blue-50"
                  }`}
                >
                  <Upload
                    className={`w-16 h-16 ${
                      error
                        ? "text-red-400"
                        : isDragging
                        ? "text-blue-500"
                        : "text-blue-400"
                    }`}
                  />
                </motion.div>
              )}

              <div className="mt-2">
                {fileName ? (
                  <motion.div
                    className="flex items-center gap-3 text-sm font-medium bg-white px-4 py-2 rounded-lg shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FileText
                      className={`w-4 h-4 ${
                        getFileIcon() === "pdf"
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    />
                    <span className="text-gray-700">{fileName}</span>
                    <button
                      onClick={() => {
                        setFileName("");
                        setExtractedText("");
                        setIsComplete(false);
                        setError("");
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg ${
                        error
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      Choose a PDF or TXT file
                    </button>
                    <p className="text-sm text-gray-500">
                      or drag and drop your file here
                    </p>
                  </div>
                )}

                {error && (
                  <motion.p
                    className="text-sm text-red-500 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {isProcessing && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Processing your {fileName.endsWith(".pdf") ? "PDF" : "text"}{" "}
                  file...
                </p>
              </motion.div>
            )}
          </motion.div>

          {extractedText && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Extracted Text
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={downloadText}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download as text file"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <textarea
                  ref={textAreaRef}
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm text-gray-700 bg-gray-50"
                  placeholder="Extracted text will appear here..."
                />
              </div>
              <button
                onClick={() =>
                  GenerateDataFromApi({
                    resumeText: extractedText,
                  })
                }
                className={`px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg ${
                  error
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Generate Data
              </button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadComponent;
