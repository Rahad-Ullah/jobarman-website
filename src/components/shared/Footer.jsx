import { Phone, Mail, MapPin, Linkedin as LinkedinIcon } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { myFetch } from "utils/myFetch";
import footerlogo from "public/jobarman-footer.png";
import AppDownloadLinks from "./AppDownloadLinks";

const recuiter = [
  { href: "/", label: "Home" },
  { href: "/my-job", label: "My Job" },
  { href: "/my-request", label: "My Request" },
  { href: "/career-spotlight", label: "Career Spotlight" },
  { href: "/pricing", label: "Pricing" },
  { href: "/job-post", label: "Post Job" },
];

const employee = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/my-resume", label: "My Resume" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

const withOutLogin = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

const socials = [
  {
    name: "Facebook",
    Icon: FaFacebookF,
    color: "text-blue-600",
    link: "https://www.facebook.com/profile.php?id=61585636890325",
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedinIn,
    color: "text-blue-700",
    link: "https://www.linkedin.com/company/jobarman",
  },
  {
    name: "Instagram",
    Icon: FaInstagram,
    color: "text-pink-600",
    link: "https://www.instagram.com/jobarman_llc",
  },
  {
    name: "YouTube",
    Icon: FaYoutube,
    color: "text-red-600",
    link: "https://www.youtube.com/@Jobarman_llc",
  },
  {
    name: "TikTok",
    Icon: FaTiktok,
    color: "text-gray-900",
    link: "https://www.tiktok.com/@jobarman_llc",
  },
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  const data = await myFetch("/user/profile");

  const menus = {
    RECRUITER: recuiter,
    EMPLOYEE: employee,
    GUEST: withOutLogin,
  };

  const role = data?.data?.role;
  const menu = menus[role] || menus?.GUEST;

  return (
    <footer className="relative bg-gradient-to-r from-[#123499] to-[#2A57DE] text-white overflow-hidden">
      {/* Soft ambient highlights */}
      <div className="absolute -top-24 -right-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-12 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* MAIN FOOTER CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* 1️⃣ Company Branding & Mission (Top Left) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src={footerlogo}
                alt="Jobarman - Supports Veterans"
                width={1000}
                height={1000}
                className="block object-contain w-52 sm:w-60 h-auto drop-shadow-sm"
                priority={false}
              />
            </Link>
            <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
              Connecting top talent with innovative employers. Dedicated to expanding career opportunities and proudly supporting our veterans.
            </p>
          </div>

          {/* 2️⃣ Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {menu?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item?.href}
                    className="text-blue-100/90 hover:text-white text-sm transition-all duration-200 inline-flex items-center hover:translate-x-1"
                  >
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3️⃣ Contact Information */}
          <div className="lg:col-span-3">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-blue-100 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Phone className="w-4 h-4" />
                </span>
                <span>
                  Phone:{" "}
                  <a
                    href="tel:+18448215151"
                    className="hover:text-white hover:underline font-medium text-white/95"
                  >
                    +1 (844) 821-5151
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Mail className="w-4 h-4" />
                </span>
                <span>
                  Email:{" "}
                  <a
                    href="mailto:info@jobarman.com"
                    className="hover:text-white hover:underline font-medium text-white/95"
                  >
                    info@jobarman.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="leading-snug">
                  2401 Fountain View Dr, Ste 464 PMB 2798, Houston, TX 77057 United States
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <LinkedinIcon className="w-4 h-4" />
                </span>
                <a
                  href="https://www.linkedin.com/company/jobarman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline font-medium text-white/95 truncate"
                >
                  linkedin.com/company/jobarman
                </a>
              </li>
            </ul>
          </div>

          {/* 4️⃣ Mobile App & Social Connect */}
          <div className="lg:col-span-3">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide mb-5">
              Our Mobile App
            </h3>

            {/* App Store Buttons */}
            <AppDownloadLinks />

            {/* Connect With Us */}
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-white/95 tracking-wide mb-3">
                Connect With Us
              </h4>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socials.map(({ name, Icon, color, link }, idx) => (
                  <Link
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200"
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6 lg:px-8 py-5">
          {/* Left Side - Copyright */}
          <div className="text-xs sm:text-sm text-blue-100/90 text-center sm:text-left">
            © {currentYear} JOBARMAN.com. All Rights Reserved.
          </div>

          {/* Right Side - Terms and Privacy Links */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-blue-100/90">
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <span className="text-white/40">•</span>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
