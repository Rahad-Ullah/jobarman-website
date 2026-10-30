import { Plus, Trash2, FolderGit2, Link as LinkIcon } from "lucide-react";
import React from "react";

export default function Projects({ register, projArray, errors = {} }) {
  const projErrors = errors?.projects;

  const hasContent = (p) =>
    Boolean(p?.title?.trim() || p?.description?.trim() || p?.link?.trim());

  return (
    <section className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Selected Projects
      </h2>

      <div className="mb-5 p-3 sm:p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4">
        {projArray.fields.length === 0 && (
          <div className="text-center py-5 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500">
              No projects added yet.
            </p>
          </div>
        )}

        {projArray.fields.map((proj, i) => {
          const err = projErrors?.[i];

          return (
            <div
              key={proj.id}
              className="p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <FolderGit2 size={14} className="text-blue-600" />
                  Project #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => projArray.remove(i)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors flex items-center gap-1 text-xs"
                  title="Remove project"
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                {/* Project Title */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    {...register(`projects.${i}.title`, {
                      validate: (val, formValues) => {
                        const item = formValues?.projects?.[i];
                        if (!hasContent(item)) return true;
                        if (!val || !val.trim()) {
                          return "Project title is required";
                        }
                        if (val.trim().length < 2) {
                          return "Title must be at least 2 characters";
                        }
                        return true;
                      },
                    })}
                    placeholder="e.g. AI-Powered Job Matcher"
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

                {/* Project Link */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Live Demo / GitHub Link
                  </label>
                  <div
                    className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
                      err?.link
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                        : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                    }`}
                  >
                    <LinkIcon
                      size={16}
                      className={err?.link ? "text-red-400" : "text-gray-400"}
                    />
                    <input
                      {...register(`projects.${i}.link`, {
                        validate: (val) => {
                          if (!val || !val.trim()) return true;
                          const urlPattern =
                            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
                          return (
                            urlPattern.test(val.trim()) ||
                            "Please enter a valid URL (e.g. https://github.com/user/repo)"
                          );
                        },
                      })}
                      placeholder="https://github.com/username/project"
                      className="flex-1 outline-none text-sm bg-transparent"
                    />
                  </div>
                  {err?.link && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {err.link.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Description & Technologies Used
                </label>
                <textarea
                  rows={2}
                  {...register(`projects.${i}.description`)}
                  className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none text-sm bg-white resize-y"
                  placeholder="Architected a Next.js and Node.js platform with 10k+ monthly active users..."
                />
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 font-medium w-full flex items-center justify-center gap-1 py-2 border border-dashed border-blue-300 hover:border-blue-500 rounded-lg transition-colors text-sm"
          onClick={() => {
            projArray.append({
              title: "",
              description: "",
              link: "",
            });
          }}
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
    </section>
  );
}
