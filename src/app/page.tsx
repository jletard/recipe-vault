// src/app/page.tsx
// Homepage that fetches and displays recipes from our internal API.

"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import SearchBar from "@/components/SearchBar";
import TagFilterBox from "@/components/TagFilterBox";
import { useTagFilter } from "@/hooks/useTagFilter";
import { buildTagColors } from "@/utils/tagColors";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagColors, setTagColors] = useState<{ [tag: string]: string }>({});

  const {
    selectedTags,
    handleTagToggle,
    handleCheckAll,
    handleUncheckAll,
    filterRecipes,
    setSelectedTags,
  } = useTagFilter(allTags);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const res = await fetch("/api/recipes");
        const data: Recipe[] = await res.json();

        // Sort recipes alphabetically by name
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setRecipes(sorted);

        // Extract all unique tags, sorted alphabetically
        const tags = new Set<string>();
        data.forEach((recipe) => {
          recipe.tags.forEach((tag) => tags.add(tag));
        });

        const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));
        setAllTags(sortedTags);
        setTagColors(buildTagColors(sortedTags)); // Assign colors once here
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    loadRecipes();
  }, []);

  useEffect(() => {
    if (allTags.length > 0) {
      setSelectedTags(allTags);
    }
  }, [allTags, setSelectedTags]);

  // 🆕 New filtering logic
  const tagFiltered = filterRecipes(recipes);

  const fullyFiltered = tagFiltered.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">The Unseen Chef Archive</h1>

      {/* Search Bar Component */}
      <SearchBar searchText={searchText} onSearchChange={setSearchText} />

      {/* Tag Filter Box Component */}
      <TagFilterBox
        allTags={allTags}
        tagColors={tagColors}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onCheckAll={handleCheckAll}
        onUncheckAll={handleUncheckAll}
      />

      <div className="flex flex-col items-center w-full gap-6">
        {fullyFiltered.length === 0 ? (
          <p className="text-center text-gray-500">No recipes loaded yet.</p>
        ) : (
          fullyFiltered.map((recipe) => (
            <div
              key={recipe.id}
              className="w-full max-w-md bg-gray-400 text-black rounded-lg p-6 shadow"
            >
              <h2 className="text-2xl font-semibold text-center mb-4">
                {recipe.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${tagColors[tag] || "bg-gray-600"} text-white text-sm font-medium px-3 py-1 rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
