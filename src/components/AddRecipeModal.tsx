// src/components/AddRecipeModal.tsx
// Centered modal for adding a new recipe.

"use client";

import { useRef, useEffect, useState } from "react";
import { useAddRecipe } from "@/hooks/useAddRecipe";

interface AddRecipeModalProps {
  allTags: string[];
  onClose: () => void;
  reloadRecipes: () => Promise<void>;
}

export default function AddRecipeModal({
  allTags,
  onClose,
  reloadRecipes,
}: AddRecipeModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Form handling from custom hook
  const {
    recipeName,
    description,
    ingredients,
    procedure,
    notes,
    selectedTags,
    handleNameChange,
    handleDescriptionChange,
    handleNotesChange,
    handleIngredientChange,
    handleAddIngredient,
    handleProcedureChange,
    handleAddProcedure,
    handleTagToggle,
    handleSubmit,
    setSelectedTags, // Needed for adding new tags
  } = useAddRecipe({
    allTags,
    onSuccess: async () => {
      await reloadRecipes(); // First reload everything
      onClose(); // Then close the modal
    },
  });

  // New tag input state
  const [newTagInput, setNewTagInput] = useState("");

  const handleNewTagAdd = () => {
    const trimmed = newTagInput.trim();
    if (trimmed) {
      const formatted = trimmed
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
  
      if (!selectedTags.includes(formatted)) {
        setSelectedTags((prev) => [...prev, formatted]);
      }
    }
    setNewTagInput(""); // Clear input after adding
  };

  // Close modal if clicking outside the content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        onClose();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  const combinedTags = Array.from(
    new Set([...allTags, ...selectedTags])
  ).sort();

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-black max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Recipe</h2>

        {/* Form Section */}
        <div className="flex flex-col gap-4">
          {/* Recipe Name */}
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => handleNameChange(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="flex flex-col gap-2">
              {ingredients.map((line, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-lg">•</span>
                  <input
                    type="text"
                    value={line}
                    onChange={(e) =>
                      handleIngredientChange(idx, e.target.value)
                    }
                    className="border p-2 rounded flex-1"
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Procedure */}
          <div>
            <h3 className="font-semibold mb-2">Procedure:</h3>
            <ul className="flex flex-col gap-2">
              {procedure.map((step, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-lg">{idx + 1}.</span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleProcedureChange(idx, e.target.value)}
                    className="border p-2 rounded flex-1"
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddProcedure}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
              + Add Step
            </button>
          </div>

          {/* Notes */}
          <textarea
            placeholder="Notes (Optional)"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {combinedTags.map((tag) => (
                <label key={tag} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>

            {/* New Tag Input */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="New tag"
                className="p-2 rounded bg-gray-600 text-white flex-1"
              />
              <button
                type="button"
                onClick={handleNewTagAdd}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add Tag
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
