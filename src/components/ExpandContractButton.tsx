// src/components/ExpandContractButton.tsx
// Button to toggle expanding and collapsing a recipe card (Batman Theme Approved, Arrow Upgraded).

"use client";

import { ChevronUp, ChevronDown } from "lucide-react";

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
      className="bg-black hover:bg-gray-800 text-white rounded-full p-2 transition-colors"
    >
      {isExpanded ? (
        <ChevronUp className="w-5 h-5" />
      ) : (
        <ChevronDown className="w-5 h-5" />
      )}
    </button>
  );
}
