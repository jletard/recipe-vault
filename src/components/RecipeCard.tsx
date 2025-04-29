// src/components/RecipeCard.tsx
// Gotham-grade Recipe Card component (Corrected for external edit control).

"use client";

import { Recipe } from "@/types/recipe";
import TagPill from "@/components/TagPill";
import ExpandContractButton from "@/components/ExpandContractButton";
import DeleteRecipeButton from "@/components/DeleteRecipeButton";
import EditRecipeButton from "@/components/EditRecipeButton";
import EditRecipeModal from "@/components/EditRecipeModal";

interface RecipeCardProps {
  recipe: Recipe;
  isExpanded: boolean;
  onToggle: () => void;
  loadRecipes: () => Promise<void>;
  tagColors: { [tag: string]: string };
  isEditing: boolean; // 🆕 passed from page.tsx
  onStartEdit: () => void; // 🆕 passed from page.tsx
  onCloseEdit: () => void; // 🆕 passed from page.tsx
}

export default function RecipeCard({
  recipe,
  isExpanded,
  onToggle,
  loadRecipes,
  tagColors,
  isEditing,
  onStartEdit,
  onCloseEdit,
}: RecipeCardProps) {
  return (
    <div className="w-full max-w-md bg-gray-700 text-black rounded-lg p-4 shadow transition-all">
      {/* Header: Name + Expand/Contract Button */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <h2 className="text-2xl font-semibold text-center">{recipe.name}</h2>
        <ExpandContractButton isExpanded={isExpanded} onToggle={onToggle} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        {(recipe.tags || []).map((tag) => (
          <TagPill key={tag} tag={tag} colorClass={tagColors[tag]} />
        ))}
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="w-full mt-4 text-left text-black bg-gray-600 p-3 rounded-lg transition-all duration-700 ease-out overflow-hidden">
          {/* Description */}
          {recipe.description && (
            <div className="mb-2">
              <h3 className="font-bold mb-2">Description:</h3>
              <p>{recipe.description}</p>
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients && (
            <div className="mb-2">
              <h3 className="font-bold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Procedure */}
          {recipe.instructions && (
            <div className="mb-2">
              <h3 className="font-bold mb-2">Procedure:</h3>
              <ol className="list-decimal list-inside">
                {recipe.instructions.split("\n").map((step, index) => (
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

          {/* Button Group */}
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <EditRecipeButton onEdit={onStartEdit} />
            <DeleteRecipeButton
              recipeId={recipe.id}
              recipeName={recipe.name}
              onDelete={() => {
                loadRecipes();
              }}
            />
          </div>

          {/* Edit Modal */}
          {isEditing && (
            <EditRecipeModal
              recipe={recipe}
              onClose={onCloseEdit}
              reloadRecipes={loadRecipes}
              tagColors={tagColors}
            />
          )}
        </div>
      )}
    </div>
  );
}
