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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const {
    selectedTags,
    handleTagToggle,
    handleCheckAll,
    handleUncheckAll,
    filterRecipes,
    setSelectedTags,
  } = useTagFilter(allTags);

  const handleCardClick = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
              onClick={() => handleCardClick(recipe.id)}
              className="w-full max-w-md bg-gray-400 text-black rounded-lg p-6 shadow cursor-pointer transition-all"
            >
              <h2 className="text-2xl font-semibold text-center mb-4">
                {recipe.name}
              </h2>
              <div className="flex flex-col items-center gap-4">
                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${
                        tagColors[tag] || "bg-gray-600"
                      } text-white text-sm font-medium px-3 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expanded Details */}
                {expandedId === recipe.id && (
                  <div className="w-full mt-4 text-left text-black bg-gray-200 p-4 rounded-lg transition-all duration-700 ease-out overflow-hidden">
                    {/* Description */}
                    {recipe.description && (
                      <div className="mb-4">
                        <h3 className="font-bold mb-2">Description:</h3>
                        <p>{recipe.description}</p>
                      </div>
                    )}

                    {/* Ingredients */}
                    {recipe.ingredients && (
                      <div className="mb-4">
                        <h3 className="font-bold mb-2">Ingredients:</h3>
                        <ul className="list-disc list-inside">
                          {recipe.ingredients.split("\n").map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Instructions */}
                    {recipe.instructions && (
                      <div className="mb-4">
                        <h3 className="font-bold mb-2">Instructions:</h3>
                        <ol className="list-decimal list-inside">
                          {recipe.instructions
                            .split("\n")
                            .map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                        </ol>
                      </div>
                    )}

                    {/* Notes */}
                    {recipe.notes && (
                      <div>
                        <h3 className="font-bold mb-2">Notes:</h3>
                        <p>{recipe.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
