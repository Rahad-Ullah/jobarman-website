import { Plus, Trash2, Calendar, Building, Briefcase } from "lucide-react";
import React from "react";

export default function Exprience({
  register,
  expArray,
  errors = {},
  watch,
}) {
  const expErrors = errors?.workExperiences;

  const hasContent = (item) =>
    Boolean(
      item?.title?.trim() ||
        item?.company?.trim() ||
        item?.designation?.trim() ||
        item?.startDate ||
        item?.endDate ||
        item?.description?.trim()
    );

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Work Experience</h2>

      {expArray.fields.length === 0 && (
        <div className="text-center py-5 border border-dashed border-gray-200 rounded-lg bg-gray-50 mb-4">
          <p className="text-sm text-gray-500">No work experience added.</p>
        </div>
      )}

      {expArray.fields.map((item, i) => {
        const err = expErrors?.[i];
        const isCurrentJob = watch
          ? watch(`workExperiences.${i}.isCurrentJob`)
          : false;

        return (
          <div
            key={item.id}
            className="border border-gray-200 p-4 rounded-xl mb-4 bg-white shadow-sm hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Briefcase size={14} className="text-blue-600" />
                Experience #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => expArray.remove(i)}
                className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 transition-colors p-1 rounded"
                title="Remove experience"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  {...register(`workExperiences.${i}.title`, {
                    validate: (val, formValues) => {
                      const exp = formValues?.workExperiences?.[i];
                      if (!hasContent(exp)) return true;
                      if (!val || !val.trim()) return "Job title is required";
                      if (val.trim().length < 2) {
                        return "Title must be at least 2 characters";
                      }
                      return true;
                    },
                  })}
                  placeholder="e.g. Senior Software Engineer"
                  className={`border px-3 py-2 rounded-lg outline-none text-sm bg-white transition-colors ${
                    err?.title
                      ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                      : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }`}
                />
                {err?.title && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {err.title.message}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <div
                  className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
                    err?.company
                      ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                      : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                  }`}
                >
                  <Building
                    size={16}
                    className={err?.company ? "text-red-400" : "text-gray-400"}
                  />
                  <input
                    {...register(`workExperiences.${i}.company`, {
                      validate: (val, formValues) => {
                        const exp = formValues?.workExperiences?.[i];
                        if (!hasContent(exp)) return true;
                        if (!val || !val.trim())
                          return "Company name is required";
                        return true;
                      },
                    })}
                    placeholder="e.g. Microsoft Corporation"
                    className="flex-1 outline-none text-sm bg-transparent"
                  />
                </div>
                {err?.company && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {err.company.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-3">
              {/* Designation */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Designation / Department
                </label>
                <input
                  {...register(`workExperiences.${i}.designation`)}
                  placeholder="e.g. Full Stack Development"
                  className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none text-sm bg-white transition-colors"
                />
              </div>

              {/* Start Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div
                  className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
                    err?.startDate
                      ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                      : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                  }`}
                >
                  <Calendar
                    size={16}
                    className={
                      err?.startDate ? "text-red-400" : "text-gray-400"
                    }
                  />
                  <input
                    type="date"
                    {...register(`workExperiences.${i}.startDate`, {
                      validate: (val, formValues) => {
                        const exp = formValues?.workExperiences?.[i];
                        if (!hasContent(exp)) return true;
                        if (!val) return "Start date is required";
                        return true;
                      },
                    })}
                    className="flex-1 outline-none text-sm bg-transparent"
                  />
                </div>
                {err?.startDate && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {err.startDate.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-blue-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register(`workExperiences.${i}.isCurrentJob`)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Present</span>
                  </label>
                </div>
                <div
                  className={`flex items-center gap-2 border px-3 py-2 rounded-lg transition-colors ${
                    isCurrentJob
                      ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-75"
                      : err?.endDate
                      ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                      : "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                  }`}
                >
                  <Calendar
                    size={16}
                    className={err?.endDate ? "text-red-400" : "text-gray-400"}
                  />
                  <input
                    type="date"
                    disabled={isCurrentJob}
                    {...register(`workExperiences.${i}.endDate`, {
                      validate: (val, formValues) => {
                        const current =
                          formValues?.workExperiences?.[i]?.isCurrentJob;
                        if (current) return true;
                        const exp = formValues?.workExperiences?.[i];
                        if (!hasContent(exp)) return true;
                        if (!val) {
                          return "End date is required (or check Present)";
                        }
                        const start =
                          formValues?.workExperiences?.[i]?.startDate;
                        if (start && val && new Date(val) < new Date(start)) {
                          return "End date cannot be earlier than start date";
                        }
                        return true;
                      },
                    })}
                    className="flex-1 outline-none text-sm bg-transparent disabled:cursor-not-allowed"
                  />
                </div>
                {err?.endDate && !isCurrentJob && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {err.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col mt-3">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Description & Key Achievements
              </label>
              <textarea
                rows={3}
                {...register(`workExperiences.${i}.description`)}
                placeholder="• Spearheaded development of core microservices&#10;• Improved API response times by 40%&#10;• Mentored junior engineers..."
                className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2.5 rounded-lg outline-none text-sm bg-white resize-y"
              />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          expArray.append({
            title: "",
            company: "",
            designation: "",
            startDate: "",
            endDate: "",
            description: "",
            isCurrentJob: false,
          })
        }
        className="text-blue-600 hover:text-blue-700 font-medium w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed border-blue-300 hover:border-blue-500 rounded-lg transition-colors text-sm"
      >
        <Plus size={16} /> Add Experience
      </button>
    </section>
  );
}
