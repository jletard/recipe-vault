// src/components/EditRecipeButton.tsx
// Gotham-grade Edit Recipe Button (Corrected: No flex skew inside button group)

"use client";

import { Pencil } from "lucide-react";

interface EditRecipeButtonProps {
  onEdit: () => void;
}

export default function EditRecipeButton({ onEdit }: EditRecipeButtonProps) {
  return (
    <button
      onClick={onEdit}
      className="flex items-center justify-center gap-2 bg-black hover:bg-green-800 text-gray-300 px-4 py-2 min-h-[44px] rounded transition-colors text-sm font-semibold tracking-wide"
    >
      <Pencil className="w-5 h-5 flex-shrink-0" />
      <span>Edit Recipe</span>
    </button>
  );
}
