import {
  MapPin,
  Phone,
  Mail,
  Link,
  Briefcase,
  User,
  ChevronsLeftRightEllipsis,
  Handshake,
  Sparkles,
} from "lucide-react";

export default function PersonalInfo({ register, errors = {} }) {
  const pErrors = errors?.personalInfo || {};

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
              pErrors.full_name
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            }`}
          >
            <User
              size={18}
              className={pErrors.full_name ? "text-red-400" : "text-gray-400"}
            />
            <input
              {...register("personalInfo.full_name", {
                validate: (val) => {
                  if (!val || !val.trim()) return true;
                  if (val.trim().length < 2) {
                    return "Full name must be at least 2 characters";
                  }
                  if (val.trim().length > 80) {
                    return "Full name cannot exceed 80 characters";
                  }
                  return true;
                },
              })}
              placeholder="e.g. John Doe"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {pErrors.full_name && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {pErrors.full_name.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Address / Location
          </label>
          <div
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
              pErrors.address
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            }`}
          >
            <MapPin
              size={18}
              className={pErrors.address ? "text-red-400" : "text-gray-400"}
            />
            <input
              {...register("personalInfo.address", {
                validate: (val) => {
                  if (!val || !val.trim()) return true;
                  if (val.trim().length < 2) {
                    return "Address must be at least 2 characters";
                  }
                  return true;
                },
              })}
              placeholder="e.g. Seattle, WA, USA"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {pErrors.address && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {pErrors.address.message}
            </p>
          )}
        </div>

        {/* Contact / Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <div
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
              pErrors.phone
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            }`}
          >
            <Phone
              size={18}
              className={pErrors.phone ? "text-red-400" : "text-gray-400"}
            />
            <input
              type="tel"
              {...register("personalInfo.phone", {
                validate: (val) => {
                  if (!val || !val.trim()) return true;
                  const phonePattern =
                    /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
                  return (
                    phonePattern.test(val.trim()) ||
                    "Please enter a valid phone number (e.g. +1 234 567 8900)"
                  );
                },
              })}
              placeholder="+1 234 567 8900"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {pErrors.phone && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {pErrors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
              pErrors.email
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            }`}
          >
            <Mail
              size={18}
              className={pErrors.email ? "text-red-400" : "text-gray-400"}
            />
            <input
              type="email"
              {...register("personalInfo.email", {
                validate: (val) => {
                  if (!val || !val.trim()) return true;
                  const emailPattern =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  return (
                    emailPattern.test(val.trim()) ||
                    "Please enter a valid email address (e.g. user@example.com)"
                  );
                },
              })}
              placeholder="user@example.com"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {pErrors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {pErrors.email.message}
            </p>
          )}
        </div>

        {/* Social Media Link */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            LinkedIn / Social Media
          </label>
          <div
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
              pErrors.social_media_link
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            }`}
          >
            <Link
              size={18}
              className={pErrors.social_media_link ? "text-red-400" : "text-gray-400"}
            />
            <input
              {...register("personalInfo.social_media_link", {
                validate: (val) => {
                  if (!val || !val.trim()) return true;
                  const urlPattern =
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
                  return (
                    urlPattern.test(val.trim()) ||
                    "Please enter a valid URL (e.g. https://linkedin.com/in/username)"
                  );
                },
              })}
              placeholder="https://linkedin.com/in/username"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {pErrors.social_media_link && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {pErrors.social_media_link.message}
            </p>
          )}
        </div>

        {/* Portfolio / GitHub Link */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Portfolio / GitHub Link
          </label>
          <div
            className={`flex items-center gap-2 border px-3 py-2 rounded-lg bg-white transition-colors ${
              pErrors.portfolio
                ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                : "border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            }`}
          >
            <ChevronsLeftRightEllipsis
              size={18}
              className={pErrors.portfolio ? "text-red-400" : "text-gray-400"}
            />
            <input
              {...register("personalInfo.portfolio", {
                validate: (val) => {
                  if (!val || !val.trim()) return true;
                  const urlPattern =
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
                  return (
                    urlPattern.test(val.trim()) ||
                    "Please enter a valid URL (e.g. https://github.com/username)"
                  );
                },
              })}
              placeholder="https://github.com/username"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {pErrors.portfolio && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {pErrors.portfolio.message}
            </p>
          )}
        </div>

        {/* Work Authorization */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Work Authorization
          </label>
          <div className="flex items-center gap-2 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-3 py-2 rounded-lg bg-white transition-colors">
            <Handshake size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.work_authorization")}
              placeholder="e.g. US Citizen / Green Card"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Clearance */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Security Clearance
          </label>
          <div className="flex items-center gap-2 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-3 py-2 rounded-lg bg-white transition-colors">
            <Sparkles size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.clearance")}
              placeholder="e.g. None / DoD Secret"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Open to Work */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Open to Work
          </label>
          <div className="flex items-center gap-2 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 px-3 py-2 rounded-lg bg-white transition-colors">
            <Briefcase size={18} className="text-gray-400" />
            <input
              {...register("personalInfo.open_to_work")}
              placeholder="e.g. Remote / Full-time"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
