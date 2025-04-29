// src/components/TagPill.tsx
// Gotham Standard Tag Pill with Selected and Unselected States.

"use client";

interface TagPillProps {
  tag: string;
  isSelected?: boolean; // Optional: defaults to true if not provided
  colorClass?: string;   // Optional: used if selected
}

export default function TagPill({
  tag,
  isSelected = true,
  colorClass = "bg-gray-600",
}: TagPillProps) {
  const finalClasses = isSelected
    ? `${colorClass} text-black`
    : "bg-gray-600 text-gray-400";

  return (
    <span
      className={`flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-semibold transition-all ${finalClasses}`}
    >
      {tag}
    </span>
  );
}
