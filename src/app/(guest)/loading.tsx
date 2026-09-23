import {
    Search,
    SlidersHorizontal,
    ArrowRight,
    Layers,
    Briefcase,
} from "lucide-react";

export default function GuestLoading() {
    return (
        <div className="w-full min-h-screen bg-white text-gray-800 antialiased overflow-hidden">
            {/* 1. Top Indeterminate Progress Bar */}
            <div className="w-full h-1 bg-blue-100/60 overflow-hidden fixed top-0 z-50">
                <div className="h-full w-1/3 bg-gradient-to-r from-[#123499] via-blue-500 to-orange-400 rounded-full animate-indeterminate" />
            </div>

            {/* 2. Hero Section Skeleton */}
            <section className="relative py-12 sm:py-16 lg:py-20 bg-[#E1F6FF] overflow-hidden">
                {/* Soft background ambient gradient glows */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">
                        {/* Left Content Skeleton */}
                        <div className="space-y-6">
                            {/* Badge Skeleton */}
                            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/90 border border-blue-200/80 shadow-xs">
                                <div className="w-4 h-4 rounded-full skeleton-shimmer shrink-0" />
                                <div className="h-3.5 w-36 rounded skeleton-shimmer" />
                                <div className="w-2 h-2 rounded-full skeleton-shimmer shrink-0" />
                            </div>

                            {/* Title Skeleton Lines */}
                            <div className="space-y-3">
                                <div className="h-9 sm:h-12 lg:h-14 w-11/12 rounded-xl skeleton-shimmer-blue" />
                                <div className="h-9 sm:h-12 lg:h-14 w-4/5 rounded-xl skeleton-shimmer-blue" />
                            </div>

                            {/* Subtitle / Paragraph Skeletons */}
                            <div className="space-y-2.5 max-w-xl">
                                <div className="h-4 w-full rounded-md skeleton-shimmer-blue" />
                                <div className="h-4 w-11/12 rounded-md skeleton-shimmer-blue" />
                                <div className="h-4 w-3/4 rounded-md skeleton-shimmer-blue" />
                            </div>

                            {/* Action Buttons Skeletons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                                <div className="h-12 px-6 rounded-lg bg-gradient-to-r from-[#123499] to-[#2A57DE] flex items-center justify-center gap-2.5 shadow-md w-full sm:w-auto min-w-[190px]">
                                    <div className="w-4 h-4 rounded bg-white/30 animate-pulse" />
                                    <div className="h-4 w-28 bg-white/40 rounded animate-pulse" />
                                </div>
                                <div className="h-12 px-5 rounded-lg border border-blue-300/80 bg-white/60 flex items-center justify-center w-full sm:w-auto min-w-[140px]">
                                    <div className="h-4 w-24 bg-blue-200/70 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Trust Badges Skeletons */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 pt-3">
                                {[
                                    "w-28",
                                    "w-32",
                                    "w-28",
                                    "w-24",
                                ].map((width, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-white/75 backdrop-blur-xs px-3 py-2 rounded-lg border border-blue-100/80 shadow-2xs"
                                    >
                                        <div className="w-4 h-4 rounded-full skeleton-shimmer shrink-0" />
                                        <div className={`h-3.5 ${width} rounded skeleton-shimmer`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Interactive AI Mockup Card Skeleton */}
                        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                            {/* Floating Top Pill Badge Skeleton */}
                            <div className="absolute -top-3.5 right-4 z-20 bg-white/95 rounded-full shadow-lg border border-blue-100 px-3.5 py-1.5 flex items-center gap-2">
                                <div className="w-3.5 h-3.5 rounded-full skeleton-shimmer" />
                                <div className="h-3 w-20 rounded skeleton-shimmer" />
                            </div>

                            {/* Glassmorphic AI Job Card Skeleton */}
                            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-xl border border-white/80 space-y-5">
                                {/* Company & Role Header Skeleton */}
                                <div className="flex items-center gap-3.5">
                                    <div className="w-13 h-13 rounded-xl skeleton-shimmer shrink-0 shadow-xs" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-36 rounded-md skeleton-shimmer" />
                                        <div className="h-3 w-24 rounded-md skeleton-shimmer" />
                                    </div>
                                    <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                                        <div className="h-3 w-10 rounded skeleton-shimmer" />
                                    </div>
                                </div>

                                {/* Job Title & Salary Skeletons */}
                                <div className="space-y-2 pt-1">
                                    <div className="h-5 w-4/5 rounded-md skeleton-shimmer" />
                                    <div className="h-3.5 w-1/2 rounded skeleton-shimmer" />
                                </div>

                                {/* Pills Row Skeleton */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                    <div className="h-6 w-20 rounded-md skeleton-shimmer" />
                                    <div className="h-6 w-24 rounded-md skeleton-shimmer" />
                                    <div className="h-6 w-16 rounded-md skeleton-shimmer" />
                                </div>

                                {/* AI Compatibility Analysis Meter Skeleton */}
                                <div className="pt-2 border-t border-gray-100/90 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="h-3 w-32 rounded skeleton-shimmer" />
                                        <div className="h-3 w-14 rounded skeleton-shimmer" />
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                                        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 animate-indeterminate" />
                                    </div>
                                </div>

                                {/* 1-Click Auto Apply CTA Preview Skeleton */}
                                <div className="pt-1">
                                    <div className="h-11 w-full rounded-xl bg-gradient-to-r from-[#123499] to-[#2A57DE] flex items-center justify-center gap-2 shadow-sm">
                                        <div className="w-4 h-4 rounded bg-white/40 animate-pulse" />
                                        <div className="h-4 w-32 rounded bg-white/40 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Bottom Live Notification Badge Skeleton */}
                            <div className="absolute -bottom-3.5 left-4 z-20 bg-white/95 rounded-xl shadow-md border border-gray-100 px-3.5 py-2 flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full skeleton-shimmer" />
                                <div className="h-3 w-48 rounded skeleton-shimmer" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Search Bar Section Skeleton */}
            <section className="py-8 sm:py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-2 mb-6 sm:mb-8">
                        <div className="h-7 sm:h-8 w-64 sm:w-80 rounded-lg skeleton-shimmer mx-auto" />
                        <div className="h-4 w-48 sm:w-64 rounded-md skeleton-shimmer mx-auto" />
                    </div>

                    <div className="flex flex-row items-center rounded-xl overflow-hidden border border-gray-200 shadow-sm p-1.5 bg-gray-50/70 gap-2">
                        <div className="flex-1 flex items-center gap-2.5 px-3">
                            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 shrink-0" />
                            <div className="h-4 w-40 sm:w-56 rounded skeleton-shimmer" />
                        </div>

                        <div className="p-2 text-gray-400 border-l border-gray-200">
                            <SlidersHorizontal className="w-4 sm:w-5 h-4 sm:h-5" />
                        </div>

                        <div className="h-10 sm:h-11 px-5 sm:px-7 rounded-lg bg-gradient-to-r from-[#123499] to-[#2A57DE] flex items-center justify-center text-white shadow-xs">
                            <div className="h-4 w-20 bg-white/50 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How It Works Steps Skeleton */}
            <section className="py-12 sm:py-16 bg-[#FFF6F6] border-y border-rose-100/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-2 mb-10 sm:mb-12">
                        <div className="h-7 sm:h-8 w-60 sm:w-72 rounded-lg skeleton-shimmer mx-auto" />
                        <div className="h-4 w-72 sm:w-96 rounded-md skeleton-shimmer mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div
                                key={step}
                                className="rounded-2xl py-6 px-4 bg-rose-50/70 border border-rose-100/80 flex flex-col items-center text-center space-y-3 shadow-2xs"
                            >
                                <div className="h-3 w-12 rounded skeleton-shimmer" />
                                <div className="w-14 h-14 rounded-full bg-white border border-rose-100 flex items-center justify-center shadow-xs">
                                    <Layers className="w-6 h-6 text-rose-300 animate-pulse" />
                                </div>
                                <div className="h-4 w-24 rounded skeleton-shimmer" />
                                <div className="space-y-1.5 w-full">
                                    <div className="h-3 w-full rounded skeleton-shimmer" />
                                    <div className="h-3 w-4/5 rounded skeleton-shimmer mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Popular Categories Skeleton */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-2 mb-10 sm:mb-12">
                        <div className="h-7 sm:h-8 w-48 sm:w-56 rounded-lg skeleton-shimmer mx-auto" />
                        <div className="h-4 w-64 sm:w-80 rounded-md skeleton-shimmer mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                        {[1, 2, 3, 4, 5, 6].map((cat) => (
                            <div
                                key={cat}
                                className="p-5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4 bg-gray-50/40"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                    <Briefcase className="w-5 h-5 text-blue-300 animate-pulse" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-32 rounded skeleton-shimmer" />
                                    <div className="h-3 w-20 rounded skeleton-shimmer" />
                                </div>
                                <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <div className="h-10 w-36 rounded-lg border-2 border-blue-600/40 flex items-center justify-center gap-2">
                            <div className="h-4 w-20 bg-blue-200/70 rounded animate-pulse" />
                            <ArrowRight className="w-4 h-4 text-blue-600/40" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
