# Decisions

Non-trivial decisions, newest first. Preserves the "why" so future-AJ doesn't have to guess.

---

### Phaser 3 as game engine
**Decided:** Early project
**Decision:** Use Phaser 3 over raw Canvas or CSS-based approaches.
**Rationale:** Mature 2D game framework with built-in tilemap support, sprite animations, camera system, and physics. The project needs real game mechanics (collision, interaction zones, NPC movement) — rolling this from scratch on Canvas would take 10x longer. Phaser also has good React integration patterns via refs.

### Tiled for map design
**Decided:** Phase 2
**Decision:** Use Tiled editor to design the island map, export as JSON.
**Rationale:** Visual map editor is dramatically faster than hand-coding tile positions. Tiled JSON is natively supported by Phaser. Separates map design (creative) from code (technical).

### React overlay for UI instead of Phaser UI
**Decided:** Phase 2
**Decision:** Render menus, logos, and navigation as HTML/CSS overlays on top of the Phaser canvas, not as Phaser game objects.
**Rationale:** Phaser's built-in UI tools are limited. HTML/CSS is better for text, menus, and responsive design. Fixed positioning means overlays aren't affected by camera zoom or movement. Also allows standard React routing for page navigation.

### CustomEvent bridge for React-Phaser communication
**Decided:** Phase 2
**Decision:** Use `window.dispatchEvent(new CustomEvent(...))` for React-to-Phaser communication, `window.location.href` for Phaser-to-React navigation.
**Rationale:** Avoids tight coupling between React and Phaser. CustomEvents are simple, native, and don't require a state management library. Good enough for the limited communication needed (menu triggers, navigation).

### Botpress ADK for NPC chatbot
**Decided:** Phase 4
**Decision:** Use Botpress Agent Development Kit for the NPC conversation bot instead of a direct LLM API call.
**Rationale:** Botpress provides conversation management, persona configuration, and a hosted runtime — no need to manage API keys client-side or build conversation state handling. The ADK's TypeScript-first approach fits the project stack.

### Fade transition instead of circle wipe
**Decided:** Phase 3
**Decision:** Use a simple black fade overlay for page transitions instead of the originally planned circle wipe.
**Rationale:** Circle wipe (iris transition) was the original vision but a simple fade looked clean enough and was much simpler to implement. Can revisit later if it feels worth the effort.

### Click-to-move alongside keyboard controls
**Decided:** Phase 4
**Decision:** Add click/tap-to-move pathfinding in addition to WASD/arrow key movement.
**Rationale:** Makes the game more accessible — not everyone is comfortable with keyboard controls, and it's essential for touchscreen devices until the mobile map fallback is built.

### Bot persona as AJ's representative, not AJ himself
**Decided:** Phase 4
**Decision:** The NPC bot introduces itself as AJ's representative/assistant rather than pretending to be AJ.
**Rationale:** More honest — visitors know they're talking to an AI. Avoids uncanny valley of an AI pretending to be a real person. The bot can still share AJ's info, preferences, and personality while being transparent about what it is.
