import { Autonomous, z } from "@botpress/runtime";

// Auto-generated from /src/pages/travels/travel-data.ts
// Run: npx tsx scripts/sync-bot-data.ts
const PLACES = {
  "current": {
    "city": "Montreal",
    "country": "Canada"
  },
  "lived": [
    {
      "city": "Ahmedabad",
      "country": "India"
    },
    {
      "city": "Mumbai",
      "country": "India"
    },
    {
      "city": "Bangalore",
      "country": "India"
    },
    {
      "city": "Delhi",
      "country": "India"
    },
    {
      "city": "Chennai",
      "country": "India"
    },
    {
      "city": "Pune",
      "country": "India"
    },
    {
      "city": "Manchester",
      "country": "UK"
    },
    {
      "city": "Vancouver",
      "country": "Canada"
    },
    {
      "city": "Montreal",
      "country": "Canada"
    }
  ],
  "traveled": [
    {
      "city": "Singapore",
      "country": "Singapore"
    },
    {
      "city": "Kuala Lumpur",
      "country": "Malaysia"
    },
    {
      "city": "Bangkok",
      "country": "Thailand"
    },
    {
      "city": "Tokyo",
      "country": "Japan"
    },
    {
      "city": "Dubai",
      "country": "UAE"
    },
    {
      "city": "London",
      "country": "UK"
    },
    {
      "city": "New York",
      "country": "USA"
    },
    {
      "city": "Nairobi",
      "country": "Kenya"
    },
    {
      "city": "Halifax",
      "country": "Canada"
    }
  ]
};

export const getPlacesTool = new Autonomous.Tool({
  name: "getPlaces",
  description: "Get places AJ has lived in or traveled to. Use this for questions about travel or where AJ is from.",
  input: z.object({
    type: z.enum(["lived", "traveled", "current", "all"]).optional().describe("Filter by type"),
  }),
  output: z.object({
    current: z.object({ city: z.string(), country: z.string() }).optional(),
    lived: z.array(z.object({ city: z.string(), country: z.string() })).optional(),
    traveled: z.array(z.object({ city: z.string(), country: z.string() })).optional(),
  }),
  handler: async ({ type }) => {
    const filter = type || "all";
    if (filter === "current") return { current: PLACES.current };
    if (filter === "lived") return { lived: PLACES.lived };
    if (filter === "traveled") return { traveled: PLACES.traveled };
    return PLACES;
  },
});
