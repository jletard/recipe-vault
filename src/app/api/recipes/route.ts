// src/app/api/recipes/route.ts
// API route to fetch all recipes from Airtable (Gotham-grade hardened).

import { NextResponse } from "next/server";
import { fetchRecipes } from "@/lib/airtable";

export async function GET() {
  try {
    const recipes = await fetchRecipes();
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.error("Server error during GET /api/recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
