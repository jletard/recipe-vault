// src/types/recipe.ts
//  Typescript data type that matches our airtable structure.

export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
    notes: string;
    tags: string[];
  }
  