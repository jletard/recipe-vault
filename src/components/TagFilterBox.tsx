// src/components/TagFilterBox.tsx
// Displays a list of tag badges with checkboxes for filtering recipes by tags.

"use client";

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
    <div className="w-full max-w-md bg-gray-700 p-4 rounded mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag) => (
          <label
            key={tag}
            className={`flex items-center gap-1 ${tagColors[tag] || "bg-gray-600"} text-white px-3 py-1 rounded-full cursor-pointer`}
          >
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => onTagToggle(tag)}
              className="form-checkbox"
            />
            {tag}
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={onCheckAll} className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded">
          Check All
        </button>
        <button onClick={onUncheckAll} className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded">
          Uncheck All
        </button>
      </div>
    </div>
  );
}
