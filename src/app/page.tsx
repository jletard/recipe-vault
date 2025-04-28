// src/app/page.tsx
// Homepage that fetches and displays recipes from our internal API.

"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const res = await fetch("/api/recipes");
        const data: Recipe[] = await res.json();

        // Sort recipes alphabetically by name
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

        setRecipes(sorted);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    loadRecipes();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">The Unseen Chef Archive</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full max-w-md p-3 mb-10 rounded bg-gray-800 text-white placeholder-gray-400"
        disabled
      />

      <div className="flex flex-col items-center w-full gap-6">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes loaded yet.</p>
        ) : (
          recipes.map((recipe) => (
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
                    className="bg-gray-600 text-white text-sm font-medium px-3 py-1 rounded-full"
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
