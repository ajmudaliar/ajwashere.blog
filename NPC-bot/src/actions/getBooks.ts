import { Action, z } from "@botpress/runtime";

// Source of truth - keep in sync with /data/books.json
// TODO: Make this dynamic via API or build step
const BOOKS = [
  { title: "Foundation", author: "Isaac Asimov", status: "Reading" },
  { title: "An Elegant Puzzle: Systems of Engineering Management", author: "Will Larson", status: "Finished" },
  { title: "The Dark Forest", author: "Cixin Liu", status: "Finished" },
  { title: "My years at general motors", author: "Alfred P. Sloan", status: "Have not started", recommendedBy: "a16z podcast" },
  { title: "Thinking Fast and Slow", author: "Daniel Kahneman", status: "Finished" },
  { title: "Permutation City", author: "Greg Egan", status: "Postponed", recommendedBy: "Lisha Li (Founder Rosebud AI)" },
  { title: "The Black Swan", author: "Nassim Nicholas Taleb", status: "Finished" },
  { title: "Fooled by Randomness", author: "Nassim Nicholas Taleb", status: "Later" },
  { title: "Anti-fragile", author: "Nassim Nicholas Taleb", status: "Postponed" },
  { title: "Zero to One", author: "Peter Thiel", status: "Finished" },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", status: "Finished" },
  { title: "Shoe Dog", author: "Phil Knight", status: "Finished" },
  { title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt", status: "Finished" },
  { title: "Clean Code", author: "Robert C. Martin", status: "Finished" },
  { title: "The Three-Body Problem", author: "Cixin Liu", status: "Finished" },
  { title: "Death's End", author: "Cixin Liu", status: "Later" },
  { title: "Meditations", author: "Marcus Aurelius", status: "Finished" },
  { title: "Letters from a Stoic", author: "Seneca", status: "Later" },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", status: "Finished" },
];

export default new Action({
  name: "getBooks",
  description: "Get AJ's reading list. Can filter by status: 'Reading' (currently reading), 'Finished', 'Have not started', 'Later', 'Postponed'",
  input: z.object({
    status: z.enum(["Reading", "Finished", "Have not started", "Later", "Postponed", "all"]).optional().describe("Filter by reading status. Defaults to 'all'"),
  }),
  output: z.object({
    books: z.array(
      z.object({
        title: z.string(),
        author: z.string(),
        status: z.string(),
        recommendedBy: z.string().optional(),
      })
    ),
  }),
  async handler({ input }) {
    const status = input.status || "all";
    const filtered = status === "all" ? BOOKS : BOOKS.filter(book => book.status === status);
    return { books: filtered };
  },
});
