// src/components/PaginationCard.tsx
// Gotham-style card that contains page navigation and display count selector.

"use client";

import PageNavigation from "@/components/PageNavigation";
import DisplayCountSelector from "@/components/DisplayCountSelector";

interface PaginationCardProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  displayCount: number;
  setDisplayCount: (count: number) => void;
}

export default function PaginationCard({
  page,
  totalPages,
  setPage,
  displayCount,
  setDisplayCount,
}: PaginationCardProps) {
  return (
    <div className="w-full max-w-md bg-gray-800 text-gray-300 rounded-lg p-4 mb-6 shadow mx-auto">
      <div className="flex justify-between items-center gap-6 flex-wrap">
        {/* Page Navigation on the left */}
        <PageNavigation page={page} totalPages={totalPages} setPage={setPage} />

        {/* Display Count Selector block */}
        <div className="flex flex-col items-center text-sm">
          <label htmlFor="displayCount" className="mb-1">
            Show:
          </label>
          <DisplayCountSelector
            displayCount={displayCount}
            setDisplayCount={setDisplayCount}
          />
        </div>
      </div>
    </div>
  );
}
