# The Idea

A Pokemon-style overworld as a personal website. Visitors control a sprite, walk around, and discover content by exploring a world — not clicking nav links.

---

## Core Concept

- **Top-down pixel art world** (Game Boy / SNES era aesthetic)
- **WASD / arrow keys** to move
- **Interact button** (spacebar? enter?) to engage with objects/NPCs
- **The world IS the portfolio** — exploration replaces navigation

---

## The Setting

- **Floating island** — contained, curated, dreamy
- Abstract, not hyper-literal
- Cozy, nostalgic, playful vibe
- Lo-fi music in the background
- Surrounded by sky/clouds/void — "your own corner of the internet"

---

## Map Layout

```
                    ☁️                        ☁️
        ☁️
                    ╭─────────────────────────────╮
                   ╱    🌲      [VIEWPOINT]        ╲
                  ╱       🌲    (travel map)    🌲  ╲
        ☁️       │    ╭───────╮                     │
                │    │  LAB  │     🌲              │
                │    ╰───────╯                     │
                │                  ╭───────╮       │
                │    🌲            │ HOME  │       │
                │                  ╰───────╯       │
                │  ╭────────╮           ⭐         │
                │  │LIBRARY │        (spawn)       │
                │  ╰────────╯                      │
                │        🌲  [BILLBOARD]  [GYM]    │
                │              📺          ⚡      │
                 ╲    🌲                          ╱
                  ╲      [DOCK]                  ╱
                   ╲        ⛵                  ╱
                    ╰─────────────────────────╯
                            ☁️
        ☁️                              ☁️
```

### Zones

- **Spawn (⭐)** — near Home, you "arrive home"
- **Home** — center, the heart. Bio/about, welcome NPC (you)
- **Lab** — top left, tucked away workshop for projects
- **Library** — left side, cozy reading nook, pulls from Notion
- **Billboard** — digital display showing latest blog/content
- **Gym** — open area with equipment sprites, training logs
- **Viewpoint** — top of island, highest point. Travel map with photos pinned to locations
- **Dock** — bottom edge, boat that goes nowhere *yet* (future expansion? contact island?)

### Wandering Characters

- **Two ragdoll cats** — pixel versions of AJ's cats, wandering the island
- Can interact with them? Maybe they say something cute

---

## Interactions Detail

| Object/Place | Content | Experience |
|--------------|---------|------------|
| Lab (building) | Code projects | Walk inside, browse experiments |
| Library (building) | Reading list | Pulls from Notion, cozy shelves |
| Home (building) | Bio / about | NPC version of you gives context |
| Billboard | Blog / latest content | Scrolling digital display |
| Gym area | Training logs | Equipment sprites, data viz |
| Viewpoint | Travel map | Photos pinned to locations visited |
| Dock + boat | Future / contact? | Teaser for expansion |
| Ragdoll cats (x2) | Personality | Wander around, interactable |

---

## Secrets & Easter Eggs

- **Hidden path behind trees** — leads to a clearing or cave with easter eggs
- **"Under construction" sign** — path that leads to... nothing? Or does it?
- **Interactable random objects** — jokes, quotes, surprises
- **Something in the water?** — edge of island, look down, see something
- **Konami code?** — unlock something silly

---

## Visual Style

- **Game Boy / Pokemon aesthetic** — limited palette, pixel art, nostalgic
- **Transitions** — circle wipe (black dot grows to fill screen, then new page loads)
- **Character** — an adventurer sprite (abstract, not literally AJ)

---

## Mobile Experience

**Desktop = full experience** — walk around, explore, discover

**Mobile = illustrated map fallback:**
- Same island, viewed from above like a treasure map
- Tap zones directly instead of walking
- Same circle transition to content
- Intentional, not a broken desktop site

---

## Vibe Check

- Cozy
- Nostalgic
- Playful
- "This person builds things"
- Memorable — you don't forget the portfolio you walked around in

---

## Audio

- Lo-fi background music
- Different tracks per zone/room

---

## Open Questions

- Room/page UI style (pixel art or modern?) — TBD
- What engine/library? (Phaser? custom canvas? React-based?)
- What are the cats' names?

---

## Content Sources

- **Notion API** → reading list (Library)
- **LinkedIn** → billboard feed (workaround needed, no public API)
- **Photos** → TBD
- **Projects** → TBD
- **Gym data** → TBD

---

## Implementation Plan

### Phase 1: Proof of Concept ✅
- [x] Phaser 3 running in React
- [x] Simple tilemap (hardcoded grass/water/trees)
- [x] Character sprite that moves with arrow keys
- [x] Camera follows character
- **Validate:** Can you walk around a basic island? ✅

### Phase 2: The World ✅
- [x] Design island map in Tiled
- [x] Import tilemap JSON into Phaser
- [x] Collision detection (trees, buildings, water)
- [x] Interaction zones (press E near objects)
- **Validate:** Does the island feel right? ✅

### Phase 3: Transitions ✅
- [x] Fade transition (black overlay)
- [x] Hook interactions to React navigation
- [ ] Return to game at same position (currently reloads)
- **Validate:** Full loop — walk, interact, view, return ✅

### Phase 4: Polish & Content 🚧
- [x] Real pixel art assets (Fantasy Tileset Premium)
- [ ] Two ragdoll cats (wandering NPCs)
- [x] Lo-fi background music
- [ ] Different tracks per zone
- [x] Particle effects (fireflies, falling leaves)
- [ ] Secrets & easter eggs
- [ ] Mobile illustrated map fallback
- [x] Content pages (Projects, Reading List, Blog, Travels) — all under construction
- [x] Welcome message sequence on game start
- [x] Adventure zone auto-dialogue (bottom-right of map)
- [x] NPC with cycling dialogue
- [x] Logo click triggers character speech
- [x] Burger menu navigation
- [ ] Socials integration
- [ ] Contact/leads form
