// src/app/api/edit-recipe/route.ts
// API route to edit a recipe record in Airtable (Gotham-grade hardened).

import { NextRequest, NextResponse } from "next/server";
import { EditRecipePayload, FIELD_NAMES } from "@/types/api";

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as EditRecipePayload;
    const { id, name, description, ingredients, instructions, notes, tags } = body;

    if (!id || !name.trim() || !tags || tags.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      throw new Error("Airtable environment variables are missing");
    }

    const updateFields: Record<string, unknown> = {
      [FIELD_NAMES.NAME]: name,
      [FIELD_NAMES.DESCRIPTION]: description,
      [FIELD_NAMES.INGREDIENTS]: ingredients,
      [FIELD_NAMES.INSTRUCTIONS]: instructions,
      [FIELD_NAMES.NOTES]: notes,
      [FIELD_NAMES.TAGS]: JSON.stringify(tags),
    };

    const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: updateFields }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Airtable PATCH error:", errorBody);
      return NextResponse.json({ error: "Failed to update Airtable" }, { status: 500 });
    }

    return NextResponse.json({ message: "Recipe updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Server error during PATCH:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
