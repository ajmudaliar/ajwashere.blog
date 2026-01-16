import { Action, z } from "@botpress/runtime";

// Source of truth - keep in sync with /data/places.json
// TODO: Make this dynamic via API or build step
const PLACES = {
  current: { city: "Montreal", country: "Canada" },
  lived: [
    { city: "Ahmedabad", country: "India" },
    { city: "Mumbai", country: "India" },
    { city: "Bangalore", country: "India" },
    { city: "Delhi", country: "India" },
    { city: "Chennai", country: "India" },
    { city: "Pune", country: "India" },
    { city: "Manchester", country: "UK" },
    { city: "Vancouver", country: "Canada" },
    { city: "Montreal", country: "Canada" },
  ],
  traveled: [
    { city: "Singapore", country: "Singapore" },
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "Bangkok", country: "Thailand" },
    { city: "Tokyo", country: "Japan" },
    { city: "Dubai", country: "UAE" },
    { city: "London", country: "UK" },
    { city: "New York", country: "USA" },
    { city: "Nairobi", country: "Kenya" },
    { city: "Halifax", country: "Canada" },
  ],
};

export default new Action({
  name: "getPlaces",
  description: "Get places AJ has lived in, currently lives, or has traveled to",
  input: z.object({
    type: z.enum(["lived", "traveled", "current", "all"]).optional().describe("Filter by type. Defaults to 'all'"),
  }),
  output: z.object({
    current: z.object({
      city: z.string(),
      country: z.string(),
    }).optional(),
    lived: z.array(
      z.object({
        city: z.string(),
        country: z.string(),
      })
    ).optional(),
    traveled: z.array(
      z.object({
        city: z.string(),
        country: z.string(),
      })
    ).optional(),
  }),
  async handler({ input }) {
    const type = input.type || "all";

    if (type === "current") return { current: PLACES.current };
    if (type === "lived") return { lived: PLACES.lived };
    if (type === "traveled") return { traveled: PLACES.traveled };

    return PLACES;
  },
});
