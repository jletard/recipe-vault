// src/components/EditRecipeModal.tsx
// Gotham-Grade Edit Recipe Modal

"use client";

import { useState, useRef, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import TagPill from "@/components/TagPill";

interface EditRecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  reloadRecipes: () => Promise<void>;
  tagColors: { [tag: string]: string };
}

export default function EditRecipeModal({
  recipe,
  onClose,
  reloadRecipes,
  tagColors,
}: EditRecipeModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const [recipeName, setRecipeName] = useState(recipe.name || "");
  const [description, setDescription] = useState(recipe.description || "");
  const [ingredients, setIngredients] = useState<string[]>(
    recipe.ingredients?.split("\n") || []
  );
  const [procedure, setProcedure] = useState<string[]>(
    recipe.instructions?.split("\n") || []
  );
  const [notes, setNotes] = useState(recipe.notes || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(recipe.tags || []);
  const [newTagInput, setNewTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Close if clicking outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSaving) return; // 🚫 Block closing while saving
      if (backdropRef.current && event.target === backdropRef.current) {
        onClose();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose, isSaving]);
  

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, ""]);
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleProcedureChange = (index: number, value: string) => {
    const updated = [...procedure];
    updated[index] = value;
    setProcedure(updated);
  };

  const handleAddProcedure = () => {
    setProcedure((prev) => [...prev, ""]);
  };

  const handleDeleteProcedure = (index: number) => {
    setProcedure((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleNewTagAdd = () => {
    const trimmed = newTagInput.trim();
    if (trimmed) {
      const formatted = trimmed
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      if (!selectedTags.includes(formatted)) {
        setSelectedTags((prev) => [...prev, formatted]);
        if (!tagColors[formatted]) {
          tagColors[formatted] = "bg-sky-400"; // Fresh color for new tags
        }
      }
    }
    setNewTagInput("");
  };

  const handleSubmit = async () => {
    if (!recipeName.trim()) {
      alert("Recipe requires a name.");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Recipe requires at least one tag.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/edit-recipe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recipe.id,
          name: recipeName.trim(),
          description: description.trim(),
          ingredients: ingredients.join("\n").trim(),
          instructions: procedure.join("\n").trim(),
          notes: notes.trim(),
          tags: selectedTags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit recipe");
      }

      await reloadRecipes();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const combinedTags = Array.from(
    new Set([...Object.keys(tagColors), ...selectedTags])
  ).sort();

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800 text-black rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Recipe</h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="bg-gray-700 text-black placeholder-gray-500 border border-gray-600 p-2 rounded w-full"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 text-black placeholder-gray-500 border border-gray-600 p-2 rounded w-full"
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
                    className="bg-gray-700 text-black placeholder-gray-500 border border-gray-600 p-2 rounded flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteIngredient(idx)}
                    className="bg-black hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="mt-2 bg-black hover:bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded"
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
                    className="bg-gray-700 text-black placeholder-gray-500 border border-gray-600 p-2 rounded flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteProcedure(idx)}
                    className="bg-black hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddProcedure}
              className="mt-2 bg-black hover:bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded"
            >
              + Add Step
            </button>
          </div>

          {/* Notes */}
          <textarea
            placeholder="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-gray-700 text-black placeholder-gray-500 border border-gray-600 p-2 rounded w-full"
          />

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {combinedTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <label
                    key={tag}
                    className="cursor-pointer animate-in fade-in transition-all duration-500"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleTagToggle(tag)}
                      className="hidden"
                    />
                    <TagPill
                      tag={tag}
                      isSelected={isSelected}
                      colorClass={tagColors[tag]}
                    />
                  </label>
                );
              })}
            </div>

            {/* New Tag Input */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="New tag"
                className="bg-gray-700 text-black placeholder-gray-500 border border-gray-600 p-2 rounded flex-1"
              />
              <button
                type="button"
                onClick={handleNewTagAdd}
                className="bg-black hover:bg-gray-800 text-gray-300 px-4 py-2 rounded"
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
            className="bg-gray-500 hover:bg-gray-600 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded transition-colors ${
              isSaving
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-black hover:bg-green-800 text-white"
            }`}
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
