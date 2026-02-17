# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun dev          # Start dev server with HMR

# Build
bun run build    # Syncs bot data + Vite production build

# Lint
bun run lint     # ESLint check

# Preview production build
bun run preview
```

## Tech Stack

- React 19 with TypeScript
- Vite 7 for bundling and dev server
- Bun as package manager
- ESLint 9 with flat config (typescript-eslint, react-hooks, react-refresh)
- **Phaser 3** for the game engine
- **React Router** for page navigation
- **React Three Fiber / Three.js** for 3D visualizations (Travels globe)
- **Botpress Webchat** for NPC chatbot integration
- **Lucide React** for icons

## Project Structure

```text
src/
├── main.tsx              # Entry point, renders App in StrictMode
├── App.tsx               # Root component with React Router routes
├── App.css               # Global styles + page styles
├── game/
│   ├── GameComponent.tsx # React wrapper for Phaser + UI overlay (logo, menu, bot chat)
│   └── scenes/
│       └── IslandScene.ts # Main Phaser scene (map, player, NPCs, interactions)
└── pages/
    ├── Projects.tsx      # Projects page (under construction)
    ├── ReadingList.tsx   # Reading list wrapper → library/
    ├── Blog.tsx          # Blog page (under construction)
    ├── Travels.tsx       # Travels wrapper → travels/
    ├── library/          # Full reading list implementation
    │   ├── LibraryScene.tsx   # 3D bookshelf rendering
    │   ├── Bookshelf.tsx      # Shelf layout component
    │   ├── Book.tsx           # Individual book details
    │   ├── CoverManager.tsx   # Admin tool for cover assignments (/admin/covers)
    │   ├── reading-list.ts    # Book data
    │   ├── book-covers.ts     # Cover image mappings
    │   ├── cover-assignments.ts
    │   ├── types.ts
    │   └── constants.ts
    └── travels/          # Travels page with 3D globe
        ├── GlobeScene.tsx     # Three.js globe visualization
        ├── JourneySidebar.tsx  # Location sidebar
        └── travel-data.ts     # Cities, countries, destinations

scripts/
└── sync-bot-data.ts     # Syncs app data (books, locations) to Botpress bot

public/assets/game/           # Game assets
├── maps/                     # Tiled JSON map + collision data
├── sprites/                  # Player character spritesheets
├── music/                    # Background music (lofi)
├── buildings/, trees/, rocks/, props/  # Tileset images
├── tilesets/                 # Ground, water, road tilesets
└── book-covers/              # Reading list cover images
```

## Game Architecture

- **IslandScene.ts** handles:
  - Tilemap loading and rendering (from Tiled JSON)
  - Player movement with WASD/arrow keys + click-to-move
  - Camera follow with zoom
  - Interactive zones (press E near buildings)
  - NPC with cycling dialogue
  - Welcome message sequence on start
  - Adventure zone auto-dialogue
  - Fade transitions to pages
  - Background music and particle effects (fireflies, leaves)

- **GameComponent.tsx** provides:
  - HTML overlay for UI (fixed positioning, not affected by Phaser zoom)
  - Logo with click → character speech
  - Burger menu dropdown for navigation
  - Botpress webchat integration (NPC bot, dev/prod client IDs)
  - Phaser game initialization and cleanup

## Key Patterns

- **React ↔ Phaser communication**: Use `window.dispatchEvent(new CustomEvent('...'))` for React-to-Phaser, and `window.location.href` for navigation
- **Interactive buildings**: Defined in `INTERACTIVE_BUILDINGS` map with labels and route sections
- **Typewriter effect**: Speech bubbles use character-by-character reveal with dynamic bubble resizing
- **Bot data sync**: `scripts/sync-bot-data.ts` runs at build time to keep the Botpress bot's knowledge in sync with app data

## Documentation

Detailed docs live in `docs/`:
- **[vision.md](docs/vision.md)** — design concept, map layout, interactions
- **[roadmap.md](docs/roadmap.md)** — phase tracker, what's done, what's next
- **[decisions.md](docs/decisions.md)** — non-trivial decisions and rationale
- **[library-design.md](docs/library-design.md)** — scattered table concept for the library page
- **[guestbook-design.md](docs/guestbook-design.md)** — guestbook feature concept (future)
