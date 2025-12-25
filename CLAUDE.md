# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun dev          # Start dev server with HMR

# Build
bun run build    # TypeScript check + Vite production build

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

## Project Structure

```text
src/
├── main.tsx              # Entry point, renders App in StrictMode
├── App.tsx               # Root component with React Router routes
├── App.css               # Global styles + page styles
├── game/
│   ├── GameComponent.tsx # React wrapper for Phaser + UI overlay (logo, menu)
│   └── scenes/
│       └── IslandScene.ts # Main Phaser scene (map, player, NPCs, interactions)
└── pages/
    ├── Projects.tsx      # Projects page (under construction)
    ├── ReadingList.tsx   # Reading list page (under construction)
    ├── Blog.tsx          # Blog page (under construction)
    └── Travels.tsx       # Travels page (under construction)

public/assets/game/           # Game assets
├── maps/                     # Tiled JSON map + collision data
├── sprites/                  # Player character spritesheets
├── music/                    # Background music (lofi)
├── buildings/, trees/, rocks/, props/  # Tileset images
└── tilesets/                 # Ground, water, road tilesets
```

## Game Architecture

- **IslandScene.ts** handles:
  - Tilemap loading and rendering (from Tiled JSON)
  - Player movement with WASD/arrow keys
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
  - Phaser game initialization and cleanup

## Key Patterns

- **React ↔ Phaser communication**: Use `window.dispatchEvent(new CustomEvent('...'))` for React-to-Phaser, and `window.location.href` for navigation
- **Interactive buildings**: Defined in `INTERACTIVE_BUILDINGS` map with labels and route sections
- **Typewriter effect**: Speech bubbles use character-by-character reveal with dynamic bubble resizing
