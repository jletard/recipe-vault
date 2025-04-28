// src/components/ExpandContractButton.tsx
// Button to toggle expanding and collapsing a recipe card.

"use client";

interface ExpandContractButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExpandContractButton({
  isExpanded,
  onToggle,
}: ExpandContractButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded ml-2 text-sm"
    >
      {isExpanded ? "▲" : "▼"}
    </button>
  );
}
