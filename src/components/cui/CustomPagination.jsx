"use client";
import React, { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Helper to compute the sequence of pagination buttons to display.
 * Generates a stable 7-item window when totalPages > 7, always anchoring
 * the first page (1) and last page (totalPages) with ellipses for omitted ranges.
 */
const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // When near the beginning
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  // When near the end
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // When in the middle
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

const CustomPaginationSuspense = ({
  totalPages = 1,
  totalItems,
  itemLabel = "items",
  showPageInfo = true,
  className = "",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage =
    isNaN(pageParam) || pageParam < 1
      ? 1
      : Math.min(pageParam, Math.max(1, totalPages));

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePageChange = (newPage) => {
    const targetPage = Math.min(Math.max(1, newPage), totalPages);
    if (targetPage === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-100 ${className}`}
    >
      {/* Current page & total count display */}
      {showPageInfo && (
        <div className="text-sm text-gray-600 font-medium">
          Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
          <span className="font-semibold text-gray-900">
            {totalPages.toLocaleString()}
          </span>
          {typeof totalItems === "number" && totalItems > 0 && (
            <span className="text-gray-500 ml-1">
              ({totalItems.toLocaleString()} total {itemLabel})
            </span>
          )}
        </div>
      )}

      {/* Pagination controls */}
      <nav
        aria-label="Pagination Navigation"
        className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center"
      >
        {/* Previous page button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 transition-colors"
          aria-label="Previous page"
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page numbers and ellipses */}
        {paginationItems.map((item, index) => {
          if (item === "...") {
            const isLeftEllipsis = index < 3;
            const jumpTarget = isLeftEllipsis
              ? Math.max(1, currentPage - 5)
              : Math.min(totalPages, currentPage + 5);

            return (
              <button
                key={`ellipsis-${index}`}
                type="button"
                onClick={() => handlePageChange(jumpTarget)}
                className="h-10 min-w-10 px-2 rounded font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center text-sm"
                title={isLeftEllipsis ? "Jump back 5 pages" : "Jump forward 5 pages"}
                aria-label={
                  isLeftEllipsis ? "Jump back 5 pages" : "Jump forward 5 pages"
                }
              >
                ...
              </button>
            );
          }

          const isActive = currentPage === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handlePageChange(item)}
              aria-current={isActive ? "page" : undefined}
              className={`h-10 min-w-10 px-3 rounded font-semibold text-sm transition-colors flex items-center justify-center ${
                isActive
                  ? "bg-[#0066CC] text-white shadow-sm"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {item}
            </button>
          );
        })}

        {/* Next page button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 transition-colors"
          aria-label="Next page"
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
};

export default function CustomPagination({
  totalPages = 1,
  totalItems,
  itemLabel = "items",
  showPageInfo = true,
  className = "",
}) {
  return (
    <Suspense
      fallback={
        <div className="py-4 text-center text-sm text-gray-500">
          Loading pagination...
        </div>
      }
    >
      <CustomPaginationSuspense
        totalPages={totalPages}
        totalItems={totalItems}
        itemLabel={itemLabel}
        showPageInfo={showPageInfo}
        className={className}
      />
    </Suspense>
  );
}
