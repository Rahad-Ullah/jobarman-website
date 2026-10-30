"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { myFetch } from "utils/myFetch";
import { revalidate } from "utils/revalidateTags";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const DISALLOWED_EXTENSIONS = [
  ".csv",
  ".xls",
  ".xlsx",
  ".xlsm",
  ".xlsb",
  ".ods",
  ".tsv",
  ".txt",
  ".png",
  ".jpg",
  ".jpeg",
  ".zip",
  ".rar",
];

/**
 * Validates whether a file is a valid PDF or Word document.
 * Returns { valid: boolean, error?: string }
 */
export const validateResumeFile = (file) => {
  if (!file) {
    return { valid: false, error: "Please select a resume file." };
  }

  const fileName = file.name || "";
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return {
      valid: false,
      error: "File has no extension. Please upload a PDF or Word document (.pdf, .doc, .docx).",
    };
  }

  const ext = fileName.slice(lastDotIndex).toLowerCase();

  // Explicit rejection for spreadsheet / tabular / image formats
  if (DISALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file format (${ext}). Please upload a PDF or Word document (.pdf, .doc, .docx).`,
    };
  }

  // Must have an allowed extension
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: "Only PDF and Word documents (.pdf, .doc, .docx) are allowed.",
    };
  }

  // Check MIME type if available
  const lowerMime = (file.type || "").toLowerCase();
  if (
    lowerMime.includes("csv") ||
    lowerMime.includes("excel") ||
    lowerMime.includes("spreadsheet")
  ) {
    return {
      valid: false,
      error: "CSV and Excel files are not supported. Please upload a PDF or Word document (.pdf, .doc, .docx).",
    };
  }

  // Max file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size exceeds 10MB limit. Please upload a smaller document.",
    };
  }

  return { valid: true, error: null };
};

const UploadResume = ({ resume }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Instant validation on file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setFileError(null);
      return;
    }

    const validation = validateResumeFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      setFileError(validation.error);
      setSelectedFile(null);
      e.target.value = ""; // Clear invalid file from input
      return;
    }

    setSelectedFile(file);
    setFileError(null);
  };

  const onSubmit = async (data) => {
    // When creating a new resume, a file is required
    if (!resume && !selectedFile) {
      const msg = "Please select a resume file (.pdf, .doc, .docx).";
      toast.error(msg);
      setFileError(msg);
      return;
    }

    // If a file is selected (for new or update), ensure it passes validation
    if (selectedFile) {
      const validation = validateResumeFile(selectedFile);
      if (!validation.valid) {
        toast.error(validation.error);
        setFileError(validation.error);
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", data.name);
    if (selectedFile) {
      formData.append("resume", selectedFile);
    }

    let url = "/resume/external-resume";
    let method = "POST";

    if (resume) {
      url = `/resume/external-resume/${resume._id}`;
      method = "PATCH";
    }

    try {
      const res = await myFetch(url, {
        method,
        body: formData,
        tags: ["resume"],
      });

      if (res.success) {
        toast.success(res.message || "Resume uploaded successfully.");
        await revalidate("resume");
        reset();
        setSelectedFile(null);
        setFileError(null);
        document.getElementById("cancel")?.click();
      } else {
        toast.error(res.message || "Resume upload failed.");
      }
    } catch (err) {
      toast.error(err.message || "Resume upload failed.");
    }
  };

  useEffect(() => {
    if (resume) {
      reset({
        name: resume.resume_name || "",
      });
    }
  }, [resume, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      {/* Resume Name */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1.5">
          Resume Name <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="e.g. Software Engineer Resume"
          className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          {...register("name", {
            required: "Resume name is required",
          })}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1.5">
          Select Resume File {!resume && <span className="text-red-500">*</span>}
        </Label>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="w-full border border-gray-300 text-sm px-3 py-2 rounded-lg cursor-pointer file:cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">
          Accepted formats: <span className="font-medium text-gray-700">PDF, DOC, DOCX</span> (Max 10MB)
        </p>
        {fileError && (
          <p className="text-xs text-red-500 mt-1 font-medium">
            {fileError}
          </p>
        )}
        {selectedFile && !fileError && (
          <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
            ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-2.5 sm:py-3 px-3 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? "Uploading..." : resume ? "Update Resume" : "Upload Resume"}
      </button>
    </form>
  );
};

export default UploadResume;
