// src/app/api/add-recipe/route.ts
// API route for adding a new recipe to Airtable (Gotham-grade hardened).

import { NextRequest, NextResponse } from "next/server";
import { NewRecipe, FIELD_NAMES } from "@/types/api";

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export async function POST(req: NextRequest) {
  if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return NextResponse.json(
      { error: "Missing Airtable environment variables" },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as NewRecipe;

    // Validation
    if (!body.name.trim() || !body.tags || !Array.isArray(body.tags) || body.tags.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const airtablePayload = {
      fields: {
        [FIELD_NAMES.NAME]: body.name,
        [FIELD_NAMES.DESCRIPTION]: body.description || "",
        [FIELD_NAMES.INGREDIENTS]: body.ingredients || "",
        [FIELD_NAMES.INSTRUCTIONS]: body.instructions || "",
        [FIELD_NAMES.NOTES]: body.notes || "",
        [FIELD_NAMES.TAGS]: JSON.stringify(body.tags || []),
      },
    };

    const airtableResponse = await fetch(AIRTABLE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtablePayload),
    });

    if (!airtableResponse.ok) {
      const errorDetails = await airtableResponse.text();
      console.error("Airtable error:", errorDetails);
      return NextResponse.json(
        { error: "Failed to add recipe to Airtable" },
        { status: 500 }
      );
    }

    const airtableData = await airtableResponse.json();
    return NextResponse.json({ success: true, record: airtableData });
  } catch (error) {
    console.error("Error handling add-recipe POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
