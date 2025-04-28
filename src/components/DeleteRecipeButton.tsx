// src/components/DeleteRecipeButton.tsx
// Button for deleting a recipe with confirmation modal.

"use client";

import { useState } from "react";

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
      const res = await fetch(`/api/delete-recipe?id=${recipeId}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete recipe");
      }
  
      setShowConfirm(false);
      onDelete(); // Tell parent to refresh
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Delete button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Delete Recipe
      </button>

      {/* Confirmation Modal */}
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
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
