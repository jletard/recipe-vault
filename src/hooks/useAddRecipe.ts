// src/hooks/useAddRecipe.ts
// Manages the Add Recipe form state and handles form submission.

"use client";

import { useState } from "react";
import { NewRecipe } from "@/types/recipe";

interface UseAddRecipeProps {
  allTags: string[];
  onSuccess: () => void; // Called after successful submit (ex: close modal)
}

// TODO: allTags is passed for future use (autocomplete, validation).
// Currently managed inside AddRecipeModal only.
export function useAddRecipe({ allTags, onSuccess }: UseAddRecipeProps) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(["", "", ""]);
  const [procedure, setProcedure] = useState<string[]>(["", "", ""]);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleNameChange = (value: string) => setRecipeName(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleNotesChange = (value: string) => setNotes(value);

  const handleIngredientChange = (index: number, value: string) => {
    setIngredients((prev) =>
      prev.map((item, idx) => (idx === index ? value : item))
    );
  };

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, ""]);
  };

  const handleProcedureChange = (index: number, value: string) => {
    setProcedure((prev) =>
      prev.map((item, idx) => (idx === index ? value : item))
    );
  };

  const handleAddProcedure = () => {
    setProcedure((prev) => [...prev, ""]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validateForm = (): boolean => {
    return (
      recipeName.trim() !== "" &&
      selectedTags.length > 0
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.error("Form validation failed");
      return;
    }

    const newRecipe: NewRecipe = {
        name: recipeName.trim(),
        description: description.trim(),
        ingredients: ingredients.filter(line => line.trim() !== "").join("\n"),
        instructions: procedure.filter(step => step.trim() !== "").join("\n"),
        notes: notes.trim(),
        tags: selectedTags,
      };

    try {
      const res = await fetch("/api/add-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) {
        throw new Error("Failed to add recipe");
      }

      // Success! Reset everything
      setRecipeName("");
      setDescription("");
      setIngredients(["", "", ""]);
      setProcedure(["", "", ""]);
      setNotes("");
      setSelectedTags([]);

      onSuccess(); // Close the modal after success
    } catch (error) {
      console.error(error);
    }
  };

  return {
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
    setSelectedTags,
  };
}
