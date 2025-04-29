// src/components/DeleteRecipeButton.tsx
// Gotham-grade Delete Recipe Button (Modal separated from flex flow)

"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteRecipeButtonProps {
  recipeId: string;
  recipeName: string;
  onDelete: () => void;
}

export default function DeleteRecipeButton({
  recipeId,
  recipeName,
  onDelete,
}: DeleteRecipeButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/delete-recipe?id=${recipeId}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete recipe");
      }
      setShowConfirm(false);
      onDelete();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Pure Delete Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center justify-center gap-2 bg-black hover:bg-red-800 text-gray-300 px-4 py-2 min-h-[44px] rounded transition-colors text-sm font-semibold tracking-wide"

      >
        <Trash2 className="w-5 h-5 flex-shrink-0" />
        <span>Delete Recipe</span>
      </button>

      {/* Modal (separated from flex flow) */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm text-center">
            <p className="mb-4">
              Are you sure you want to delete
              <br />
              <strong>{recipeName}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-black hover:bg-red-800 text-white px-4 py-2 rounded"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
