// src/hooks/useTagFilter.ts
// Manages tag filtering logic for the Recipe Vault app.

import { useState } from "react";
import { Recipe } from "@/types/recipe";

export function useTagFilter(initialTags: string[]) {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCheckAll = () => {
    setSelectedTags(initialTags);
  };

  const handleUncheckAll = () => {
    setSelectedTags([]);
  };

  const filterRecipes = (recipes: Recipe[]) => {
    if (selectedTags.length === 0) return [];

    return recipes.filter((recipe) =>
      recipe.tags.some((tag) => selectedTags.includes(tag))
    );
  };

  return {
    selectedTags,
    handleTagToggle,
    handleCheckAll,
    handleUncheckAll,
    filterRecipes,
    setSelectedTags,
  };
}
