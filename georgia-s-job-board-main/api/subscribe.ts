import type { VercelRequest, VercelResponse } from "@vercel/node";

const AIRTABLE_BASE_ID = "appyNPb4VK9PumxF6";
const AIRTABLE_TABLE_ID = "tblSx3Zt0lrKjZEgf";

// Map clean labels from the UI to Airtable's exact multi-select option strings
const AIRTABLE_POSITIONS_MAP: Record<string, string> = {
  "Leadership & Executive": " Leadership & Executive",
  "Policy, Government & Public Affairs": "Policy, Government & Public Affairs",
  "Data, AI & Tech": "Data, AI & Tech",
  "Research, Academia & Fellowships": "Research, Academia & Fellowships",
  "Product, Design & UX": " Product, Design & UX",
  "Communications, Media & Marketing": "Communications, Media & Marketing",
  "Operators, Program & Project Management":
    " Operators, Program & Project Management",
  "Philanthropy, Fundraising & Impact Investing":
    "Philanthropy, Fundraising & Impact Investing",
  "Publishing, Journalism & Content": "Publishing, Journalism & Content",
  "Education, Training & Early Career Programs":
    "Education, Training & Early Career Programs",
};

const AIRTABLE_LOCATIONS_MAP: Record<string, string> = {
  "US - Northeast": "US - Northeast",
  "US - Midwest": "US - Midwest",
  "US - Mid Atlantic / DC Area": " US - Mid Atlantic / DC Area",
  Remote: "Remote",
  "US - West Coast": " US - West Coast",
  "UK & Ireland": "UK & Ireland",
  "Western / Central Europe": "Western / Central Europe",
  "Asia-Pacific": " Asia-Pacific",
};

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
                // Map to Airtable's exact multi-select option strings (including leading spaces)
                Positions: roles.map(
                  (role) => AIRTABLE_POSITIONS_MAP[role] ?? role
                ),
                Locations: locations.map(
                  (loc) => AIRTABLE_LOCATIONS_MAP[loc] ?? loc
                ),
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

