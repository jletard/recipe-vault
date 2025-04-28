// src/app/api/delete-recipe/route.ts
// API route to delete a recipe record from Airtable.

import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
  throw new Error("Missing Airtable environment variables");
}

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // ✅ Pull ID from query string

    if (!id) {
      return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
    }

    const res = await fetch(`${AIRTABLE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Airtable deletion failed:", await res.text());
      return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
    }

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
