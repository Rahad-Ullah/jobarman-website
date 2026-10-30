"use client";

import { Download, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { formatUrl } from "utils/formatUrl";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ fileUrl, fileName, isDownloadable = true }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(Math.min(800, window.innerWidth - 4));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!fileUrl) {
    return (
      <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        No resume document URL available.
      </div>
    );
  }

  const downloadUrl = formatUrl(fileUrl);
  const resolvedUrl = fileUrl.startsWith("blob:")
    ? fileUrl
    : fileUrl.startsWith("http")
    ? fileUrl
    : `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileUrl}`;

  const lowerUrl = (fileUrl || "").toLowerCase();
  const isWordDoc = lowerUrl.endsWith(".doc") || lowerUrl.endsWith(".docx");
  const ext = isWordDoc
    ? lowerUrl.endsWith(".docx")
      ? ".docx"
      : ".doc"
    : ".pdf";

  const sanitizedFileName = fileName
    ? `${fileName.replace(/[/\\?%*:|"<>]/g, "_").trim()}${ext}`
    : `resume${ext}`;

  const handleDownloadClick = async (e) => {
    if (!downloadUrl) return;
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = sanitizedFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.download = sanitizedFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      {isDownloadable && !isWordDoc && (
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={handleDownloadClick}
            className="bg-[#FF5900] hover:bg-[#FF5900]/90 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      )}

      {isWordDoc ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-12 text-center my-4 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Word Document Resume
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            In-browser preview is only supported for PDF documents. You can download and open your Word resume file (.doc / .docx) directly.
          </p>
          <button
            type="button"
            onClick={handleDownloadClick}
            className="inline-flex items-center gap-2 bg-[#FF5900] hover:bg-[#FF5900]/90 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume Document</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <Document
            file={resolvedUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="p-8 text-center text-gray-500">
                Loading document preview...
              </div>
            }
            error={
              <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl my-4">
                <p className="font-medium text-gray-700 mb-1">
                  Preview unavailable for this document.
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Please download the file using the button below to view it.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadClick}
                  className="inline-flex items-center gap-2 bg-[#FF5900] hover:bg-[#FF5900]/90 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File</span>
                </button>
              </div>
            }
          >
            {numPages &&
              Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="flex justify-center border-b last:border-b-0 border-gray-100">
                  <Page
                    pageNumber={index + 1}
                    width={width}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
          </Document>
        </div>
      )}
    </div>
  );
}
