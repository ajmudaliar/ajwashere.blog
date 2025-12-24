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

## Project Structure

- `src/main.tsx` - Application entry point, renders App in StrictMode
- `src/App.tsx` - Root component
- `public/` - Static assets served at root
- `index.html` - HTML template with root mount point
