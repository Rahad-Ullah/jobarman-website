"use client";

import { useState } from "react";
import { FaApple } from "react-icons/fa";
import { Smartphone, Sparkles, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Pixel-perfect official multi-colored Google Play triangle SVG
 */
const GooglePlayIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
      fill="#00E676"
    />
    <path
      d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
      fill="#00C3FF"
    />
    <path
      d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"
      fill="#FFC400"
    />
    <path
      d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
      fill="#FF3A44"
    />
  </svg>
);

export default function AppDownloadLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState("iOS");

  const handleClick = (selectedPlatform) => (e) => {
    e.preventDefault();
    setPlatform(selectedPlatform);
    setIsOpen(true);
  };

  return (
    <>
      {/* App Store Buttons - constrained width with smooth animations */}
      <div className="flex flex-col gap-2.5 mb-6 w-full max-w-[210px]">
        {/* Apple App Store */}
        <button
          type="button"
          onClick={handleClick("iOS")}
          className="group relative flex items-center justify-between w-full bg-white text-gray-900 rounded-xl px-3.5 py-2.5 shadow-sm hover:shadow-xl hover:shadow-blue-950/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] border border-white/90 hover:border-blue-200 transition-all duration-300 ease-out text-left overflow-hidden cursor-pointer"
          aria-label="Download on the App Store"
        >
          {/* Subtle light shimmer sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <FaApple className="w-6 h-6 text-gray-950 flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ease-out" />
            <div className="flex flex-col">
              <span className="text-[9px] font-medium uppercase tracking-wider text-gray-500 group-hover:text-blue-600 transition-colors duration-200 leading-none mb-1">
                Download on the
              </span>
              <span className="text-sm font-extrabold text-gray-950 leading-none tracking-tight">
                App Store
              </span>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200 ml-auto flex-shrink-0 relative z-10" />
        </button>

        {/* Google Play */}
        <button
          type="button"
          onClick={handleClick("Android")}
          className="group relative flex items-center justify-between w-full bg-white text-gray-900 rounded-xl px-3.5 py-2.5 shadow-sm hover:shadow-xl hover:shadow-blue-950/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] border border-white/90 hover:border-emerald-200 transition-all duration-300 ease-out text-left overflow-hidden cursor-pointer"
          aria-label="Get it on Google Play"
        >
          {/* Subtle light shimmer sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-50/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out">
              <GooglePlayIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8.5px] font-semibold uppercase tracking-wider text-gray-500 group-hover:text-emerald-600 transition-colors duration-200 leading-none mb-1">
                GET IT ON
              </span>
              <span className="text-sm font-extrabold text-gray-950 leading-none tracking-tight">
                Google Play
              </span>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all duration-200 ml-auto flex-shrink-0 relative z-10" />
        </button>
      </div>

      {/* Coming Soon Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-gray-100 rounded-3xl p-8 overflow-hidden shadow-2xl">
          {/* Accent Blobs for glassmorphism / gradient feel */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Animated Icon Container */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/35 transform hover:rotate-6 transition-transform duration-300">
                <Smartphone className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-white rounded-full p-1.5 shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Title & Description */}
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                {platform === "iOS"
                  ? "iOS App Coming Soon!"
                  : "Android App Coming Soon!"}
              </DialogTitle>
              <p className="text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
                We're currently developing the official Jobarman app for{" "}
                <span className="font-semibold text-gray-700">
                  {platform === "iOS" ? "iPhone & iPad (iOS)" : "Android devices"}
                </span>{" "}
                to provide a lightning-fast, seamless job search experience.
              </p>
            </DialogHeader>

            {/* Feature Teasers */}
            <div className="w-full bg-gray-50/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 my-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Instant Push Notifications
                  </p>
                  <p className="text-xs text-gray-500 leading-normal">
                    Get notified immediately for new job matches, application status, and interview invites.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    One-Tap Quick Apply
                  </p>
                  <p className="text-xs text-gray-500 leading-normal">
                    Search thousands of opportunities and submit your profile in seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              Got it, keep me posted!
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
