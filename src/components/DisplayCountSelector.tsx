// src/components/DisplayCountSelector.tsx
// Gotham-style clean selector for display count (label is external)

"use client";

interface DisplayCountSelectorProps {
  displayCount: number;
  setDisplayCount: (count: number) => void;
}

export default function DisplayCountSelector({
  displayCount,
  setDisplayCount,
}: DisplayCountSelectorProps) {
  return (
    <select
      id="displayCount"
      value={displayCount}
      onChange={(e) => setDisplayCount(Number(e.target.value))}
      className="bg-black text-gray-300 px-2 py-1 rounded border border-gray-600 text-sm"
    >
      {[5, 10, 25, 100].map((count) => (
        <option key={count} value={count}>
          {count}
        </option>
      ))}
    </select>
  );
}
