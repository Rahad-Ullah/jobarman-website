import { Plus, Trash2, GraduationCap } from "lucide-react";
import React from "react";

export default function Education({ register, eduArray, errors = {} }) {
  const eduErrors = errors?.educations;

  const hasContent = (edu) =>
    Boolean(
      edu?.degree?.trim() ||
        edu?.institution?.trim() ||
        edu?.grade?.trim() ||
        edu?.passingYear?.trim()
    );

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Education
      </h2>

      <div className="mb-5 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4">
        {eduArray.fields.length === 0 && (
          <div className="text-center py-5 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">No education entries added.</p>
          </div>
        )}

        {eduArray.fields.map((edu, i) => {
          const err = eduErrors?.[i];

          return (
            <div
              key={edu.id}
              className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-blue-600" />
                  Education #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => eduArray.remove(i)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors flex items-center gap-1 text-xs"
                  title="Remove education"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                {/* Degree */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Degree / Qualification
                  </label>
                  <input
                    {...register(`educations.${i}.degree`, {
                      validate: (val, formValues) => {
                        const item = formValues?.educations?.[i];
                        if (!hasContent(item)) return true;
                        if (!val || !val.trim()) {
                          return "Degree name is required";
                        }
                        if (val.trim().length < 2) {
                          return "Degree must be at least 2 characters";
                        }
                        return true;
                      },
                    })}
                    placeholder="e.g. B.Sc. in Computer Science"
                    className={`border px-3 py-2 rounded-lg outline-none text-sm bg-white transition-colors ${
                      err?.degree
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }`}
                  />
                  {err?.degree && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {err.degree.message}
                    </p>
                  )}
                </div>

                {/* Institution */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    University / College
                  </label>
                  <input
                    {...register(`educations.${i}.institution`, {
                      validate: (val, formValues) => {
                        const item = formValues?.educations?.[i];
                        if (!hasContent(item)) return true;
                        if (!val || !val.trim()) {
                          return "University or college is required";
                        }
                        if (val.trim().length < 2) {
                          return "Institution must be at least 2 characters";
                        }
                        return true;
                      },
                    })}
                    placeholder="e.g. University of Washington"
                    className={`border px-3 py-2 rounded-lg outline-none text-sm bg-white transition-colors ${
                      err?.institution
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }`}
                  />
                  {err?.institution && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {err.institution.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Grade / GPA */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Grade / GPA / Percentage
                  </label>
                  <input
                    {...register(`educations.${i}.grade`)}
                    placeholder="e.g. 3.8 / 4.0 or First Class"
                    className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none text-sm bg-white transition-colors"
                  />
                </div>

                {/* Passing Year */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Passing Year / Graduation Year
                  </label>
                  <input
                    {...register(`educations.${i}.passingYear`, {
                      validate: (val) => {
                        if (!val || !val.trim()) return true;
                        const year = Number(val.trim());
                        if (isNaN(year) || year < 1950 || year > 2100) {
                          return "Please enter a valid 4-digit year";
                        }
                        return true;
                      },
                    })}
                    placeholder="e.g. 2024"
                    className={`border px-3 py-2 rounded-lg outline-none text-sm bg-white transition-colors ${
                      err?.passingYear
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }`}
                  />
                  {err?.passingYear && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {err.passingYear.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 font-medium w-full flex items-center justify-center mt-2 gap-1 py-2 border border-dashed border-blue-300 hover:border-blue-500 rounded-lg transition-colors text-sm"
          onClick={() =>
            eduArray.append({
              degree: "",
              institution: "",
              grade: "",
              passingYear: "",
            })
          }
        >
          <Plus size={16} /> Add Education
        </button>
      </div>
    </section>
  );
}
