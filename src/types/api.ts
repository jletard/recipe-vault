// src/types/api.ts
// Centralized types for Airtable API and Recipe Vault server routes.

export const FIELD_NAMES = {
    NAME: "Recipe Name",
    DESCRIPTION: "Description",
    INGREDIENTS: "Ingredients",
    INSTRUCTIONS: "Instructions",
    NOTES: "Notes",
    TAGS: "Tags",
  } as const;
  
  export interface AirtableRecipeFields {
    [FIELD_NAMES.NAME]?: string;
    [FIELD_NAMES.DESCRIPTION]?: string;
    [FIELD_NAMES.INGREDIENTS]?: string;
    [FIELD_NAMES.INSTRUCTIONS]?: string;
    [FIELD_NAMES.NOTES]?: string;
    [FIELD_NAMES.TAGS]?: string;
  }
  
  export interface AirtableRecord {
    id: string;
    fields: AirtableRecipeFields;
  }
  
  export interface AirtableResponse {
    records: AirtableRecord[];
  }
  
  export interface NewRecipe {
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
    notes: string;
    tags: string[];
  }
  
  export interface EditRecipePayload {
    id: string;
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
    notes: string;
    tags: string[];
  }
  