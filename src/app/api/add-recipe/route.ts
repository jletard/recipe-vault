// src/app/api/add-recipe/route.ts
// API route for adding a new recipe to Airtable.

import { NextRequest, NextResponse } from "next/server";

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
    const body = await req.json();

    // Basic validation
    if (!body.name || !body.tags || !Array.isArray(body.tags) || body.tags.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const airtablePayload = {
      fields: {
        "Recipe Name": body.name,
        "Description": body.description || "",
        "Ingredients": body.ingredients || "",
        "Instructions": body.instructions || "",
        "Notes": body.notes || "",
        "Tags": JSON.stringify(body.tags || []),
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
