// src/lib/airtable.ts
// Fetches recipes from Airtable with fully typed fields.

import { Recipe } from "@/types/recipe";
import { FIELD_NAMES, AirtableResponse } from "@/types/api";

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
  throw new Error("Missing Airtable environment variables");
}

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch(AIRTABLE_URL, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes from Airtable");
  }

  const data: AirtableResponse = await res.json();

  const recipes: Recipe[] = data.records.map((record) => ({
    id: record.id,
    name: record.fields[FIELD_NAMES.NAME] || "",
    description: record.fields[FIELD_NAMES.DESCRIPTION] || "",
    ingredients: record.fields[FIELD_NAMES.INGREDIENTS] || "",
    instructions: record.fields[FIELD_NAMES.INSTRUCTIONS] || "",
    notes: record.fields[FIELD_NAMES.NOTES] || "",
    tags: JSON.parse(record.fields[FIELD_NAMES.TAGS] || "[]"),
  }));

  return recipes;
}
