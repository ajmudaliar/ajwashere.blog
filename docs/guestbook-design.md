# Guestbook Design

Inspired by [ephraimduncan.com/guestbook](https://ephraimduncan.com/guestbook).

A guestbook where visitors can leave a message and a hand-drawn signature. Simple, personal, memorable.

---

## Core Concept

- Visitors **sign in with GitHub** (OAuth)
- They write a short message and draw a signature on a canvas
- Entry gets saved and displayed in a grid alongside other visitors
- Low friction, high personality

---

## What Each Entry Shows

- Message text
- Author name + GitHub username/avatar
- Timestamp
- Hand-drawn signature image

---

## Interactions

### Signing
1. Click "Sign the guestbook" → GitHub OAuth
2. Write a message (short, maybe 280 char limit?)
3. Draw signature on a canvas element
4. Submit → entry appears in the grid

### Browsing
- Card grid layout (2 columns on desktop, 1 on mobile)
- "Load more" pagination or infinite scroll
- Newest first

---

## How It Fits This Project

The guestbook could live at the **Dock** zone on the island — the boat that "goes nowhere yet." Visitors walk to the dock, interact, and get taken to a `/guestbook` page. Thematically: signing the island's visitor log before sailing off.

Alternatively: a physical guestbook object near the Home building.

---

## Technical Considerations

- [ ] GitHub OAuth (could use a lightweight auth provider or serverless function)
- [ ] Database for entries (Supabase? Vercel KV? simple JSON API?)
- [ ] Canvas drawing → image storage (Vercel Blob, Cloudinary, or S3)
- [ ] Rate limiting / spam prevention
- [ ] Moderation (manual review? auto-publish?)

---

## Visual Style

Two directions to consider:

1. **Pixel art style** — matches the game world. Entries look like notes pinned to a board. Pixel font. Canvas draws with a chunky pixel brush.
2. **Clean modern style** — contrast with the game world, like the Library and Travels pages. Cards with shadows, GitHub avatars, smooth typography.

Leaning toward option 1 for cohesion, but either could work.

---

## Open Questions

- Does the signature canvas feel too gimmicky, or is it the thing that makes it special?
- Should there be a "featured" or "pinned" section for friends/notable visitors?
- Max message length?
- Does it need moderation before publishing?
