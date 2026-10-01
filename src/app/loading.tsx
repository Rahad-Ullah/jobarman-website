import { Loader } from "lucide-react";

export default function GuestLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-180px)] flex flex-col items-center justify-center bg-white px-4">
      {/* Subtle Top Loading Line */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-50 z-50 overflow-hidden">
        <div className="h-full w-1/3 bg-[#123499] rounded-full animate-indeterminate" />
      </div>

      {/* Centered Loading Indicator */}
      <div className="flex flex-col items-center justify-center gap-3">
        <Loader className="w-8 h-8 text-[#123499] animate-spin" />
        <span className="text-sm font-medium text-gray-500 tracking-wider">
          Loading...
        </span>
      </div>
    </div>
  );
}
