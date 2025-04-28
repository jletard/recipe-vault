// src/types/recipe.ts
// Type definitions for recipes in the Recipe Vault app.

/**
 * A fully saved recipe record as returned from Airtable.
 */
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  notes: string;
  tags: string[];
}

/**
 * A new recipe being created and sent to Airtable.
 */
export interface NewRecipe {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  notes: string;
  tags: string[];
}
