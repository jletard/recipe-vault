// src/components/TagFilterBox.tsx
// Gotham Style Tag Filter: Stronger pills, proper selection logic, polished buttons.

"use client";

import TagPill from "@/components/TagPill";

interface TagFilterBoxProps {
  allTags: string[];
  tagColors: { [tag: string]: string };
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onCheckAll: () => void;
  onUncheckAll: () => void;
}

export default function TagFilterBox({
  allTags,
  tagColors,
  selectedTags,
  onTagToggle,
  onCheckAll,
  onUncheckAll,
}: TagFilterBoxProps) {
  return (
    <div className="w-full max-w-md bg-gray-700 pt-2 px-4 p-4 rounded-lg shadow-md mb-6 text-black">
      <h3 className="text-center text-lg font-semibold text-black mb-2">
        Filter by Tag
      </h3>

      {/* Tag Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <label
              key={tag}
              className="cursor-pointer animate-in fade-in transition-all duration-500"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onTagToggle(tag)}
                className="hidden"
              />
              <TagPill
                tag={tag}
                isSelected={isSelected}
                colorClass={tagColors[tag]}
              />
            </label>
          );
        })}
      </div>

      {/* Select All / Clear All */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onCheckAll}
          className="bg-black hover:bg-gray-800 text-gray-300 text-sm font-semibold tracking-wide px-4 py-1 rounded transition-colors"
        >
          Select All
        </button>
        <button
          onClick={onUncheckAll}
          className="bg-black hover:bg-red-800 text-gray-300 text-sm font-semibold tracking-wide px-4 py-1 rounded transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
