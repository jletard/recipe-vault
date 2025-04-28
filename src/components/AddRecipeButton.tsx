// src/components/AddRecipeButton.tsx
// Floating "+" button that opens the Add Recipe Modal.

"use client";

interface AddRecipeButtonProps {
  onClick: () => void;
}

export default function AddRecipeButton({ onClick }: AddRecipeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white text-4xl rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all"
      aria-label="Add Recipe"
    >
      +
    </button>
  );
}
