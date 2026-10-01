import { Loader } from "lucide-react";
import React from "react";

interface SectionLoaderProps {
  title?: string;
  subtitle?: string;
  titleColor?: string;
  label?: string;
}

export default function SectionLoader({
  title,
  subtitle,
  titleColor = "text-gray-900",
  label = "Loading...",
}: SectionLoaderProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold ${titleColor} mb-3 text-balance`}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto text-balance">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader className="w-8 h-8 text-[#123499] animate-spin" />
          <span className="text-sm font-medium text-gray-500 tracking-wider">
            {label}
          </span>
        </div>
      </div>
    </section>
  );
}
