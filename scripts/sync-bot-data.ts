#!/usr/bin/env npx tsx
/**
 * Sync data from the app to the ADK bot tools.
 * Run: npx tsx scripts/sync-bot-data.ts
 *
 * This ensures the bot's tools have the same data as the app.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { READING_LIST } from "../src/pages/library/reading-list";
import { LIVED_LOCATIONS, UNIQUE_TRAVELED_LOCATIONS, HOME_LOCATION } from "../src/pages/travels/travel-data";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BOT_TOOLS_DIR = path.join(__dirname, "../NPC-bot/src/tools");

// Transform books data
const books = READING_LIST.map(b => ({
  title: b.title,
  author: b.author,
  status: b.status,
}));

// Transform places data
const places = {
  current: { city: HOME_LOCATION.name, country: HOME_LOCATION.country },
  lived: LIVED_LOCATIONS.map(l => ({ city: l.name, country: l.country })),
  traveled: UNIQUE_TRAVELED_LOCATIONS.map(l => ({ city: l.name, country: l.country })),
};

// Generate getBooks.ts
const getBooksContent = `import { Autonomous, z } from "@botpress/runtime";

// Auto-generated from /src/pages/library/reading-list.ts
// Run: npx tsx scripts/sync-bot-data.ts
const BOOKS = ${JSON.stringify(books, null, 2)};

export const getBooksTool = new Autonomous.Tool({
  name: "getBooks",
  description: "Get AJ's reading list. Use this when asked about books.",
  input: z.object({
    status: z.enum(["Reading", "Finished", "Postponed", "Have not started", "Later", "all"]).optional().describe("Filter by status"),
  }),
  output: z.object({
    books: z.array(z.object({
      title: z.string(),
      author: z.string(),
      status: z.string(),
    })),
  }),
  handler: async ({ status }) => {
    const filter = status || "all";
    const filtered = filter === "all" ? BOOKS : BOOKS.filter(b => b.status === filter);
    return { books: filtered };
  },
});
`;

// Generate getPlaces.ts
const getPlacesContent = `import { Autonomous, z } from "@botpress/runtime";

// Auto-generated from /src/pages/travels/travel-data.ts
// Run: npx tsx scripts/sync-bot-data.ts
const PLACES = ${JSON.stringify(places, null, 2)};

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
`;

// Write files
fs.writeFileSync(path.join(BOT_TOOLS_DIR, "getBooks.ts"), getBooksContent);
fs.writeFileSync(path.join(BOT_TOOLS_DIR, "getPlaces.ts"), getPlacesContent);

console.log("✅ Synced bot tools with app data:");
console.log(`   - ${books.length} books`);
console.log(`   - ${places.lived.length} places lived`);
console.log(`   - ${places.traveled.length} places traveled`);
