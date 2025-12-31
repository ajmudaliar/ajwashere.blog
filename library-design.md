# Library Page Design

## Concept: Scattered Table

A bird's-eye view of books casually scattered on a wooden desk surface. Personal, intimate, like peeking at someone's reading spot.

---

## Visual Design

### The Surface
- Warm wooden table/desk texture fills viewport
- Soft ambient lighting
- Slight vignette at edges for focus

### The Books
- Scattered naturally - different angles, some overlapping
- Not a grid - intentional "mess"
- Various sizes based on book type (novel vs article vs paper?)
- Cover images from Notion

### Props (optional, adds life)
- Coffee mug in corner
- Reading glasses
- A pen or pencil
- Maybe a small plant
- Bookmark ribbons peeking out

---

## Interactions

### Parallax
- Mouse movement creates subtle depth shift
- Books on different "layers" move at different speeds
- Creates sense of 3D space on 2D surface

### Hover
- Book rises slightly (scale + shadow)
- Soft shadow deepens
- Optional: gentle wobble or tilt toward cursor

### Click
- Book slides to center or flips open
- Reveals details panel:
  - Cover (larger)
  - Title & Author
  - Your notes/thoughts
  - Rating (if any)
  - Status: reading / finished / want to read
  - Link to Notion (optional)

### Browse (stretch goal)
- Drag to push books aside
- Reveal books underneath
- Or: scroll to see more of the table

---

## Data Source

Pulls from **Notion API**:
- Book covers (image URL)
- Title
- Author
- Status (reading, finished, want to read)
- Notes/highlights
- Rating
- Date added/finished

---

## Technical Considerations

- [ ] Notion API integration
- [ ] Parallax effect (CSS transforms or JS)
- [ ] Book positioning algorithm (natural scatter, not grid)
- [ ] Image loading/optimization for covers
- [ ] Detail panel/modal design
- [ ] Mobile: tap instead of hover, simplified layout?

---

## Vibe

- Cozy
- Intimate
- Analog feeling in digital space
- "This person actually reads"
- Contrast to pixel game world - stepping into a photograph

---

## Open Questions

- How many books visible at once? (10? 20? paginated?)
- Categories/filtering? (by status, genre, year)
- Animation on page load? (books "fall" into place?)
- Sound? (subtle page rustle on hover?)
- What happens on mobile?
