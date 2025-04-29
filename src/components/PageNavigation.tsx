// src/components/PageNavigation.tsx
// Pagination controls with ellipsis and chevrons (no WWIV ASCII allowed)

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavigationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function PageNavigation({
  page,
  totalPages,
  setPage,
}: PageNavigationProps) {
  // Generate compressed page numbers like: 1 2 3 ... 10
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-4 flex-wrap txt-sm">
      {/* Previous Page */}
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 bg-black hover:bg-gray-700 text-gray-300 rounded disabled:opacity-40"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => setPage(p)}
            className={`px-2.5 py-1 rounded ${
              p === page
                ? "bg-green-800 text-white font-bold"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-500">
            {p}
          </span>
        )
      )}

      {/* Next Page */}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="p-2 bg-black hover:bg-gray-700 text-gray-300 rounded disabled:opacity-40"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
