// src/app/page.tsx
// Primary UI for browsing and managing the recipe archive.
// Handles tag filtering, search, pagination, and modal control.


"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import SearchBar from "@/components/SearchBar";
import TagFilterBox from "@/components/TagFilterBox";
import { useTagFilter } from "@/hooks/useTagFilter";
import { buildTagColors } from "@/utils/tagColors";
import AddRecipeButton from "@/components/AddRecipeButton";
import AddRecipeModal from "@/components/AddRecipeModal";
import RecipeCard from "@/components/RecipeCard";
import PaginationCard from "@/components/PaginationCard";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchText, setSearchText] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagColors, setTagColors] = useState<{ [tag: string]: string }>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState<string | null>(null);
  const [page, setPage] = useState(1); // 🆕 Track current page number
  const [displayCount, setDisplayCount] = useState(25); // 🆕 How many recipes per page

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

  async function loadRecipes() {
    try {
      const res = await fetch("/api/recipes");
      const data: Recipe[] = await res.json();

      const sorted = data.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
      setRecipes(sorted);

      const tags = new Set<string>();
      data.forEach((recipe) => {
        (recipe.tags || []).forEach((tag) => tags.add(tag));
      });

      const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));
      setAllTags(sortedTags);
      setTagColors(buildTagColors(sortedTags));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    if (allTags.length > 0) {
      setSelectedTags(allTags);
    }
  }, [allTags, setSelectedTags]);

  // Filtering
  const tagFiltered = filterRecipes(recipes);

  const fullyFiltered = tagFiltered.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🆕 Total pages calculation
  const totalPages = Math.max(1, Math.ceil(fullyFiltered.length / displayCount));

  // 🆕 Slice recipes for current page
  const paginatedRecipes = fullyFiltered.slice(
    (page - 1) * displayCount,
    page * displayCount
  );

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-gray-300 p-8">
      <h1 className="text-4xl font-bold mb-6">The Unseen Chef Archive</h1>

      {/* Search Bar */}
      <SearchBar searchText={searchText} onSearchChange={setSearchText} />

      {/* Tag Filter Box */}
      <TagFilterBox
        allTags={allTags}
        tagColors={tagColors}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onCheckAll={handleCheckAll}
        onUncheckAll={handleUncheckAll}
      />

      {/* Pagination Controls */}
      <PaginationCard
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        displayCount={displayCount}
        setDisplayCount={setDisplayCount}
      />

      {/* Recipe Cards */}
      <div className="flex flex-col items-center w-full gap-6">
        {paginatedRecipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes loaded yet.</p>
        ) : (
          paginatedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isExpanded={expandedId === recipe.id}
              onToggle={() => handleCardClick(recipe.id)}
              loadRecipes={loadRecipes}
              tagColors={tagColors}
              isEditing={editRecipeId === recipe.id}
              onStartEdit={() => setEditRecipeId(recipe.id)}
              onCloseEdit={() => setEditRecipeId(null)}
            />
          ))
        )}
      </div>

      {/* Add Recipe Button */}
      <AddRecipeButton onClick={() => setIsModalOpen(true)} />

      {/* Add Recipe Modal */}
      {isModalOpen && (
        <AddRecipeModal
          allTags={allTags}
          tagColors={tagColors}
          onClose={() => setIsModalOpen(false)}
          reloadRecipes={loadRecipes}
        />
      )}
    </main>
  );
}
