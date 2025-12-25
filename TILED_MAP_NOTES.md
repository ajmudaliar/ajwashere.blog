# Tiled Map Integration Notes

## Overview
Building a portfolio website with an interactive Phaser game featuring a floating island village.
The island uses the **Fantasy Tileset Premium** from itch.io.

## Portfolio Structure
- **Tower (blue)** = Projects section
- **Billboard/Market Stall** = News/Blog
- **House (red)** = About section
- **House (other)** = TBD section

## Asset Locations
```
itch-assets/Fantasy_Tileset_Premium/The Fan-tasy Tileset (Premium)/Art/
├── Buildings/           # Individual building PNGs + Atlas
├── Ground Tilesets/     # Tileset_Ground.png, Tileset_Road.png
├── Water and Sand/      # Tileset_Water.png
├── Rock Slopes/         # Tileset_RockSlope_1_Brown.png
├── Shadows/             # Tileset_Shadow.png (in Atlas/)
├── Props/               # Individual prop PNGs (barrels, crates, etc.)
├── Trees and Bushes/    # Individual tree/bush PNGs
└── Rocks/               # Individual rock PNGs
```

Symlink exists: `public/itch-assets -> ../itch-assets`

## Tiled Map Source
- Base map: `Village Bridge.tmx` from the tileset examples
- Modified to remove graveyard
- Export to: `public/assets/game/maps/island.json`

## Tileset Types

### Grid-based (single spritesheet PNG)
These work directly with Phaser's tilemap loader:
- `Tileset_Ground` - grass, dirt tiles
- `Tileset_Water` - water tiles (animated)
- `Tileset_Road` - stone road tiles
- `Tileset_RockSlope_1_Brown` - cliff edge tiles
- `Tileset_Shadow` - shadow tiles
- `Atlas_Buildings_Bridges` - bridge tiles (animated waterfall)

### Collection-of-images (hundreds of individual PNGs)
These need manual preloading in Phaser:
- `Objects_Buildings` - houses, towers, market stalls
- `Objects_Props` - barrels, crates, benches, lanterns, etc.
- `Objects_Trees` - trees, bushes
- `Objects_Rocks` - decorative rocks
- `Objects_Shadows` - shadow sprites for objects

## Map Layer Structure
```
Ground (tilelayer)
Road (tilelayer)
Water (tilelayer)
├── Shadow (tilelayer)
└── Shadow Objects (objectgroup)
Shadows/ (group)
├── Shadow (tilelayer)
RockSlopes_1_Brown (tilelayer)
RockSlopes_1_Brown_Auto (tilelayer)
RockSlopes (tilelayer)
RockSlopes_Auto (tilelayer)
Bridge (tilelayer)
Objects (objectgroup) - 193 objects
```

## Implementation Approach

### Option A: Keep external tilesets (RECOMMENDED)
1. Export JSON from Tiled without embedding
2. Fix paths in JSON to match server structure (`/itch-assets/...`)
3. Load grid tilesets as images
4. Parse JSON to find which object images are used
5. Preload only those specific images
6. Manually render object layers as sprites

### Option B: Embed tilesets
- Pros: Single JSON file
- Cons: Huge file size, complex parsing, memory issues

## Key Technical Details

### GID (Global ID) System
- Each tile/object in Tiled has a GID
- GID = tileset.firstgid + local_tile_id
- Use GID to look up which image to load

### Object Layer Rendering
Objects in Tiled need manual sprite creation:
```typescript
for (const obj of objectLayer.objects) {
  if (obj.gid) {
    const sprite = this.add.sprite(
      obj.x + obj.width / 2,
      obj.y - obj.height / 2,  // Tiled uses bottom-left origin
      textureKey
    )
    sprite.setDepth(obj.y)  // Y-sorting for depth
  }
}
```

### Collision Options
1. **Tile properties in Tiled**: Mark tiles as collidable
2. **Separate collision layer**: Draw invisible collision shapes
3. **Code-based**: Check tile indices for water/cliffs

## Helper Scripts (in /tmp/)
- `analyze-map.js` - Shows tileset ranges and layer usage
- `extract-used-images.js` - Lists all images needed by object layers
- `generate-preload.js` - Generates Phaser preload code for objects

## Previous Issues Encountered
1. **External tileset references**: JSON had `../../../../itch-assets/...` paths that didn't work
2. **977 texture errors**: Tried to load ALL collection images instead of just used ones
3. **Pink "E" placeholders**: Missing texture indicators from Phaser
4. **Wrong folder paths**: Had to find correct subfolder structure in tileset
5. **Collision blocking movement**: Water detection was too aggressive

## Next Session TODO
1. [ ] Open Village Bridge.tmx in Tiled
2. [ ] Arrange buildings for portfolio sections
3. [ ] Add collision layer or tile properties for walkable areas
4. [ ] Add interactive zone object layer for clickable buildings
5. [ ] Export fresh JSON (File > Export As)
6. [ ] Fix paths in JSON if needed
7. [ ] Implement tilemap loading in IslandScene.ts
8. [ ] Test and iterate
