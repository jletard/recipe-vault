// src/hooks/useAddRecipe.ts
// Gotham-grade hook: Manages Add Recipe form state and stealthy form submission handling.
// Sleek, modular, mobile-first.

import { useState } from "react";
import { NewRecipe } from "@/types/recipe";

interface UseAddRecipeProps {
  onSuccess: () => void;
}

export function useAddRecipe({ onSuccess }: UseAddRecipeProps) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(["", "", ""]);
  const [procedure, setProcedure] = useState<string[]>(["", "", ""]);
  const [notes, setNotes] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false); // 🆕 add saving state

  const handleNameChange = (value: string) => setRecipeName(value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleNotesChange = (value: string) => setNotes(value);

  const handleIngredientChange = (index: number, value: string) => {
    setIngredients((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, ""]);
  };

  const handleProcedureChange = (index: number, value: string) => {
    setProcedure((prev) => prev.map((item, idx) => (idx === index ? value : item)));
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
    return recipeName.trim() !== "" && selectedTags.length > 0;
  };

  const handleSubmit = async () => {
    if (isSaving) return; // 🛡️ Prevent double-clicks
    if (!validateForm()) {
      if (recipeName.trim() === "") {
        alert("Recipe requires a name.");
      } else if (selectedTags.length === 0) {
        alert("Recipe requires at least one tag.");
      }
      return;
    }

    const newRecipe: NewRecipe = {
      name: recipeName.trim(),
      description: description.trim(),
      ingredients: ingredients.filter((line) => line.trim() !== "").join("\n"),
      instructions: procedure.filter((step) => step.trim() !== "").join("\n"),
      notes: notes.trim(),
      tags: selectedTags,
    };

    setIsSaving(true);
    try {
      const res = await fetch("/api/add-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (!res.ok) {
        throw new Error("Failed to add recipe");
      }

      // Success - reset everything
      setRecipeName("");
      setDescription("");
      setIngredients(["", "", ""]);
      setProcedure(["", "", ""]);
      setNotes("");
      setSelectedTags([]);

      onSuccess(); // Close the modal after success
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding the recipe.");
    } finally {
      setIsSaving(false);
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
    isSaving, // 🆕 expose for AddRecipeModal spinner
    setSelectedTags,
  };
}
