/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ChevronLeft } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
// import TextEditor from "./TextEditor";
import PersonalInfo from "./PersonalInfo";
import Projects from "./Projects";
import Certification from "./Certification";
import Education from "./Education";
import Exprience from "./Exprience";
import { myFetch } from "../../../utils/myFetch";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Skills from "./Skills";
import { Suspense, useEffect } from "react";
import dayjs from "dayjs";
import { revalidate } from "../../../utils/revalidateTags";

/* -----------------------------------------------------------
   MAIN FORM (React Hook Form Version)
----------------------------------------------------------- */

function AddNewResumeForm2Suspense() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      resume_name: "",
      personalInfo: {
        full_name: "",
        email: "",
        phone: "",
        social_media_link: "",
        portfolio: "",
        github_link: "",
        work_authorization: "",
        clearance: "",
        open_to_work: "",
        summury: "",
        address: "",
      },
      core_features: [
        {
          title: "",
          description: "",
        },
      ],
      workExperiences: [
        {
          title: "",
          company: "",
          designation: "",
          startDate: "",
          endDate: "",
          description: "",
          isCurrentJob: false,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          link: "",
        },
      ],
      educations: [
        {
          degree: "",
          institution: "",
          grade: "",
          passingYear: "",
        },
      ],
      certifications: [{ title: "", description: "" }],
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      try {
        const res = await myFetch(`/resume/${id}`);

        if (res?.data) {
          const resume = res.data;

          const normalized = {
            resume_name: resume.resume_name || "",
            personalInfo: {
              full_name: resume.personalInfo?.full_name || "",
              email: resume.personalInfo?.email || "",
              phone: resume.personalInfo?.phone || "",
              social_media_link: resume.personalInfo?.social_media_link || "",
              portfolio:
                resume.personalInfo?.portfolio ||
                resume.personalInfo?.github_link ||
                resume.github ||
                "",
              github_link:
                resume.personalInfo?.github_link ||
                resume.personalInfo?.portfolio ||
                resume.github ||
                "",
              work_authorization:
                resume.personalInfo?.work_authorization ||
                resume.personalInfo?.nationality ||
                "",
              clearance: resume.personalInfo?.clearance || "",
              open_to_work: resume.personalInfo?.open_to_work || "",
              summury:
                resume.personalInfo?.summury ||
                resume.personalInfo?.summary ||
                resume.summary ||
                "",
              address: resume.personalInfo?.address || "",
            },
            core_features: resume.core_features?.length
              ? resume.core_features
              : [{ title: "", description: "" }],
            workExperiences: resume.workExperiences?.length
              ? resume.workExperiences.map((item) => ({
                  title: item.title || "",
                  company: item.company || "",
                  designation: item.designation || "",
                  startDate: item.startDate
                    ? dayjs(item.startDate).format("YYYY-MM-DD")
                    : "",
                  endDate: item.endDate
                    ? dayjs(item.endDate).format("YYYY-MM-DD")
                    : "",
                  description: item.description || "",
                  isCurrentJob: Boolean(item.isCurrentJob),
                }))
              : [
                  {
                    title: "",
                    company: "",
                    designation: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    isCurrentJob: false,
                  },
                ],
            projects: resume.projects?.length
              ? resume.projects
              : [{ title: "", description: "", link: "" }],
            educations: resume.educations?.length
              ? resume.educations.map((item) => ({
                  degree: item.degree || "",
                  institution: item.institution || item.university || "",
                  grade: item.grade || "",
                  passingYear: item.passingYear || "",
                }))
              : [{ degree: "", institution: "", grade: "", passingYear: "" }],
            certifications: resume.certifications?.length
              ? resume.certifications
              : [{ title: "", description: "" }],
          };

          reset(normalized);
        }
      } catch (err) {
        toast.error("Failed to load resume details");
      }
    };
    fetchResume();
  }, [id, reset]);

  // dynamic sections
  const skillArray = useFieldArray({ control, name: "core_features" });
  const expArray = useFieldArray({ control, name: "workExperiences" });
  const projArray = useFieldArray({ control, name: "projects" });
  const eduArray = useFieldArray({ control, name: "educations" });
  const certArray = useFieldArray({ control, name: "certifications" });

  const onError = (formErrors) => {
    console.warn("Validation errors:", formErrors);
    toast.error("Please correct the invalid field values in the form.");
  };

  const onSubmit = async (data) => {
    const method = id ? "PATCH" : "POST";
    const url = id ? `/resume/${id}` : "/resume";

    // Clean & sanitize data before submission
    const summaryText = data.personalInfo?.summury?.trim() || "";
    const portfolioUrl = (
      data.personalInfo?.portfolio ||
      data.personalInfo?.github_link ||
      ""
    ).trim();

    const sanitizedData = {
      resume_name: data.resume_name?.trim(),
      personalInfo: {
        ...data.personalInfo,
        full_name: data.personalInfo?.full_name?.trim(),
        email: data.personalInfo?.email?.trim().toLowerCase(),
        phone: data.personalInfo?.phone?.trim(),
        address: data.personalInfo?.address?.trim(),
        social_media_link: data.personalInfo?.social_media_link?.trim(),
        portfolio: portfolioUrl,
        github_link: portfolioUrl,
        work_authorization: data.personalInfo?.work_authorization?.trim(),
        clearance: data.personalInfo?.clearance?.trim(),
        open_to_work: data.personalInfo?.open_to_work?.trim(),
        summury: summaryText,
        summary: summaryText,
      },
      summary: summaryText,
      core_features: (data.core_features || [])
        .map((item) => ({
          title: item.title?.trim() || "",
          description: item.description?.trim() || "",
        }))
        .filter((item) => item.title.length > 0),
      workExperiences: (data.workExperiences || [])
        .map((item) => ({
          title: item.title?.trim() || "",
          company: item.company?.trim() || "",
          designation: item.designation?.trim() || "",
          startDate: item.startDate || "",
          endDate: item.isCurrentJob ? "" : (item.endDate || ""),
          isCurrentJob: Boolean(item.isCurrentJob),
          description: item.description?.trim() || "",
        }))
        .filter((item) => item.title.length > 0 || item.company.length > 0),
      projects: (data.projects || [])
        .map((item) => ({
          title: item.title?.trim() || "",
          description: item.description?.trim() || "",
          link: item.link?.trim() || "",
        }))
        .filter((item) => item.title.length > 0),
      educations: (data.educations || [])
        .map((item) => ({
          degree: item.degree?.trim() || "",
          institution: item.institution?.trim() || "",
          grade: item.grade?.trim() || "",
          passingYear: item.passingYear?.trim() || "",
        }))
        .filter(
          (item) => item.degree.length > 0 || item.institution.length > 0
        ),
      certifications: (data.certifications || [])
        .map((item) => ({
          title: item.title?.trim() || "",
          description: item.description?.trim() || "",
        }))
        .filter((item) => item.title.length > 0),
    };

    try {
      const res = await myFetch(url, {
        method: method,
        body: sanitizedData,
      });

      if (res?.success) {
        toast.success(
          res?.message ||
            (id ? "Resume updated successfully" : "Resume created successfully")
        );
        await revalidate("resume");
        router.push(`/my-resume?id=${res?.data?._id || id}`);
      } else {
        const errorMsg =
          res?.message ||
          res?.error ||
          res?.err?.[0]?.message ||
          "Resume save failed. Please check your inputs.";
        toast.error(errorMsg);
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
      className="mx-auto max-w-5xl p-4 sm:p-8 bg-white min-h-screen shadow-sm rounded-xl my-4"
    >
      {/* header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          onClick={() => router.back()}
          title="Go back"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
            {id ? "Edit Resume" : "Create New Resume"}
          </h1>
          <div className="mt-2 w-full max-w-md">
            <input
              {...register("resume_name", {
                required: "Resume title is required",
                minLength: {
                  value: 2,
                  message: "Resume title must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Resume title cannot exceed 100 characters",
                },
              })}
              placeholder="e.g. Senior Software Engineer Resume"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-center outline-none transition-colors ${
                errors.resume_name
                  ? "border-red-500 ring-1 ring-red-500 bg-red-50/20"
                  : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              }`}
            />
            {errors.resume_name && (
              <p className="text-red-500 text-xs mt-1.5 font-medium text-center">
                {errors.resume_name.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <PersonalInfo register={register} errors={errors} />

      {/* SUMMARY */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Summary
        </h2>
        <textarea
          {...register("personalInfo.summury", {
            maxLength: {
              value: 2000,
              message: "Summary cannot exceed 2000 characters",
            },
          })}
          rows={4}
          placeholder="Experienced professional with expertise in building scalable applications, improving team efficiency, and delivering customer value..."
          className={`border w-full rounded-lg p-3 outline-none text-sm bg-white resize-y transition-colors ${
            errors.personalInfo?.summury
              ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }`}
        />
        {errors.personalInfo?.summury && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {errors.personalInfo.summury.message}
          </p>
        )}
      </section>

      {/* CORE SKILLS */}
      <Skills
        register={register}
        skillArray={skillArray}
        errors={errors}
      />

      {/* EXPERIENCE */}
      <Exprience
        register={register}
        expArray={expArray}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      {/* EDUCATION */}
      <Education
        register={register}
        eduArray={eduArray}
        errors={errors}
      />

      {/* CERTIFICATION */}
      <Certification
        register={register}
        certArray={certArray}
        errors={errors}
      />

      {/* PROJECTS */}
      <Projects
        register={register}
        projArray={projArray}
        errors={errors}
      />

      {/* FORM ACTIONS */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          {isSubmitting && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isSubmitting
            ? "Saving Resume..."
            : id
            ? "Update Resume"
            : "Save Resume"}
        </button>
      </div>
    </form>
  );
}

export default function AddNewResumeForm2() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNewResumeForm2Suspense />
    </Suspense>
  );
}
