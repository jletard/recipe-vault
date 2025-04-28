// src/app/api/recipes/route.ts
// API Route to fetch recipes from Airtable.

import { NextResponse } from "next/server";
import { fetchRecipes } from "@/lib/airtable";

export async function GET() {
  try {
    const recipes = await fetchRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
