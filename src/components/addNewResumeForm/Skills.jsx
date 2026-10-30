import { Plus, Trash2 } from "lucide-react";
import React from "react";

export default function Skills({ register, skillArray, errors = {} }) {
  const skillErrors = errors?.core_features;

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Core Skills
      </h2>

      <div className="mb-5 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4">
        {skillArray.fields.length === 0 && (
          <div className="text-center py-5 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">No skills added yet.</p>
          </div>
        )}

        {skillArray.fields.map((field, i) => {
          const err = skillErrors?.[i];

          return (
            <div
              key={field.id}
              className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500">
                  Skill #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => skillArray.remove(i)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors flex items-center gap-1 text-xs"
                  title="Remove skill"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Skill Title
                  </label>
                  <input
                    {...register(`core_features.${i}.title`, {
                      validate: (val, formValues) => {
                        const item = formValues?.core_features?.[i];
                        const hasContent = Boolean(
                          item?.title?.trim() || item?.description?.trim()
                        );
                        if (!hasContent) return true;
                        if (!val || !val.trim()) {
                          return "Skill title is required";
                        }
                        if (val.trim().length < 2) {
                          return "Title must be at least 2 characters";
                        }
                        return true;
                      },
                    })}
                    placeholder="e.g. React.js, Python, Project Management"
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

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Description / Proficiency
                  </label>
                  <textarea
                    rows={1}
                    {...register(`core_features.${i}.description`)}
                    className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none text-sm bg-white resize-y"
                    placeholder="e.g. 5+ years experience building web applications"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 font-medium w-full flex items-center justify-center gap-1 py-2 border border-dashed border-blue-300 hover:border-blue-500 rounded-lg transition-colors text-sm"
          onClick={() => {
            skillArray.append({
              title: "",
              description: "",
            });
          }}
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>
    </section>
  );
}
