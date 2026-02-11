import type { VercelRequest, VercelResponse } from "@vercel/node";

const AIRTABLE_BASE_ID = "appyNPb4VK9PumxF6";
const AIRTABLE_TABLE_ID = "tblSx3Zt0lrKjZEgf";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, roles, locations } = req.body as {
    email?: string;
    roles?: string[];
    locations?: string[];
  };

  if (!email || !roles?.length || !locations?.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: email,
                // Airtable multi-select fields expect an array of option names
                "Positions": roles,
                "Locations": locations,
              },
            },
          ],
        }),
      }
    );

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text();
      console.error("Airtable error:", errorText);
      return res.status(500).json({ error: "Failed to save to Airtable" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

