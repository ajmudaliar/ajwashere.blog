// Bookshelf that fills the viewport like a wall
// 5 units wide, 7 shelves tall

import { BOOKSHELF_CONSTANTS } from './constants'

const { UNIT_WIDTH, SHELF_THICKNESS, SHELF_COUNT, SHELF_HEIGHT, SIDE_PANEL_WIDTH } = BOOKSHELF_CONSTANTS
const BACK_DEPTH = 0.02

// Colors - warm walnut brown
const WOOD_COLOR = '#5D4E42'
const WOOD_DARK = '#4A3F35'
const WOOD_BACK = '#3D3530'

interface BookshelfWallProps {
  unitsWide?: number
  position?: [number, number, number]
}

export function BookshelfWall({ unitsWide = 5, position = [0, 0, 0] }: BookshelfWallProps) {
  const totalWidth = unitsWide * UNIT_WIDTH
  const totalHeight = SHELF_COUNT * SHELF_HEIGHT

  // Generate shelves for all units
  const shelves = []
  const shelfLips = []
  const verticalDividers = []

  // Lip dimensions - small raised edge to hold books
  const LIP_HEIGHT = 0.06
  const LIP_DEPTH = 0.04

  // Horizontal shelves (across entire width)
  for (let row = 0; row <= SHELF_COUNT; row++) {
    const y = row * SHELF_HEIGHT - totalHeight / 2
    shelves.push(
      <mesh key={`shelf-${row}`} position={[0, y, 0]} castShadow receiveShadow>
        <boxGeometry args={[totalWidth, SHELF_THICKNESS, 0.3]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
      </mesh>
    )
    // Add lip at front edge of each shelf (except top)
    if (row < SHELF_COUNT) {
      shelfLips.push(
        <mesh key={`lip-${row}`} position={[0, y + SHELF_THICKNESS / 2 + LIP_HEIGHT / 2, 0.15 + LIP_DEPTH / 2]} castShadow receiveShadow>
          <boxGeometry args={[totalWidth, LIP_HEIGHT, LIP_DEPTH]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
        </mesh>
      )
    }
  }

  // Vertical dividers between units
  for (let col = 0; col <= unitsWide; col++) {
    const x = col * UNIT_WIDTH - totalWidth / 2
    verticalDividers.push(
      <mesh key={`divider-${col}`} position={[x, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[SIDE_PANEL_WIDTH, totalHeight, 0.3]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
      </mesh>
    )
  }

  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 0, -0.15]} receiveShadow>
        <boxGeometry args={[totalWidth + 0.1, totalHeight + SHELF_THICKNESS, BACK_DEPTH]} />
        <meshStandardMaterial color={WOOD_BACK} roughness={0.95} />
      </mesh>

      {/* Shelves */}
      {shelves}

      {/* Shelf lips (book stoppers) */}
      {shelfLips}

      {/* Vertical dividers */}
      {verticalDividers}

      {/* Top crown */}
      <mesh position={[0, totalHeight / 2 + SHELF_THICKNESS / 2 + 0.03, 0.02]} castShadow>
        <boxGeometry args={[totalWidth + 0.1, 0.06, 0.35]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -totalHeight / 2 - SHELF_THICKNESS / 2 - 0.04, 0.02]} castShadow>
        <boxGeometry args={[totalWidth + 0.1, 0.08, 0.35]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
    </group>
  )
}

// Bookshelf with center alcove for featured books display
interface BookshelfWithAlcoveProps {
  position?: [number, number, number]
  children?: React.ReactNode // For the display content inside alcove
}

export function BookshelfWithAlcove({ position = [0, 0, 0], children }: BookshelfWithAlcoveProps) {
  const unitsWide = 5
  const totalWidth = unitsWide * UNIT_WIDTH
  const totalHeight = SHELF_COUNT * SHELF_HEIGHT

  // Alcove configuration: center column only (2), rows 2,3,4
  const alcoveStartCol = 2
  const alcoveEndCol = 2
  const alcoveStartRow = 2
  const alcoveEndRow = 4

  const alcoveWidth = (alcoveEndCol - alcoveStartCol + 1) * UNIT_WIDTH
  const alcoveHeight = (alcoveEndRow - alcoveStartRow + 1) * SHELF_HEIGHT

  // Lip dimensions
  const LIP_HEIGHT = 0.06
  const LIP_DEPTH = 0.04

  const shelves = []
  const shelfLips = []
  const verticalDividers = []

  // Horizontal shelves - split around alcove
  for (let row = 0; row <= SHELF_COUNT; row++) {
    const y = row * SHELF_HEIGHT - totalHeight / 2
    // Split shelves that go through the alcove (rows 3, 4 for alcove spanning rows 2-4)
    const isAlcoveRow = row > alcoveStartRow && row <= alcoveEndRow

    if (isAlcoveRow) {
      // Split shelf: left segment
      const leftWidth = alcoveStartCol * UNIT_WIDTH
      const leftX = -totalWidth / 2 + leftWidth / 2
      shelves.push(
        <mesh key={`shelf-${row}-left`} position={[leftX, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[leftWidth, SHELF_THICKNESS, 0.3]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
        </mesh>
      )

      // Split shelf: right segment
      const rightWidth = (unitsWide - alcoveEndCol - 1) * UNIT_WIDTH
      const rightX = totalWidth / 2 - rightWidth / 2
      shelves.push(
        <mesh key={`shelf-${row}-right`} position={[rightX, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[rightWidth, SHELF_THICKNESS, 0.3]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
        </mesh>
      )

      // Split lips too
      if (row < SHELF_COUNT) {
        shelfLips.push(
          <mesh key={`lip-${row}-left`} position={[leftX, y + SHELF_THICKNESS / 2 + LIP_HEIGHT / 2, 0.15 + LIP_DEPTH / 2]} castShadow receiveShadow>
            <boxGeometry args={[leftWidth, LIP_HEIGHT, LIP_DEPTH]} />
            <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
          </mesh>
        )
        shelfLips.push(
          <mesh key={`lip-${row}-right`} position={[rightX, y + SHELF_THICKNESS / 2 + LIP_HEIGHT / 2, 0.15 + LIP_DEPTH / 2]} castShadow receiveShadow>
            <boxGeometry args={[rightWidth, LIP_HEIGHT, LIP_DEPTH]} />
            <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
          </mesh>
        )
      }
    } else {
      // Full width shelf
      shelves.push(
        <mesh key={`shelf-${row}`} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[totalWidth, SHELF_THICKNESS, 0.3]} />
          <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
        </mesh>
      )
      if (row < SHELF_COUNT) {
        shelfLips.push(
          <mesh key={`lip-${row}`} position={[0, y + SHELF_THICKNESS / 2 + LIP_HEIGHT / 2, 0.15 + LIP_DEPTH / 2]} castShadow receiveShadow>
            <boxGeometry args={[totalWidth, LIP_HEIGHT, LIP_DEPTH]} />
            <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
          </mesh>
        )
      }
    }
  }

  // Alcove center position (needed for frame positioning)
  const alcoveCenterX = (alcoveStartCol + (alcoveEndCol - alcoveStartCol + 1) / 2) * UNIT_WIDTH - totalWidth / 2
  const alcoveCenterY = (alcoveStartRow + (alcoveEndRow - alcoveStartRow + 1) / 2) * SHELF_HEIGHT - totalHeight / 2

  // Alcove recess configuration - creates a deep box-like alcove
  const ALCOVE_DEPTH = 1.2  // How deep the recess goes back (4x shelf depth of 0.3)
  const ALCOVE_FRONT_Z = 0.15  // Front edge of alcove (flush with shelf front)
  const ALCOVE_BACK_Z = ALCOVE_FRONT_Z - ALCOVE_DEPTH  // Back of the recess
  const ALCOVE_WALL_THICKNESS = SIDE_PANEL_WIDTH  // Thickness of side walls

  // Vertical dividers - split around alcove with frame pieces
  for (let col = 0; col <= unitsWide; col++) {
    const x = col * UNIT_WIDTH - totalWidth / 2
    const isAlcoveDivider = col === alcoveStartCol || col === alcoveEndCol + 1

    if (isAlcoveDivider) {
      const isLeftEdge = col === alcoveStartCol

      // Split divider: top segment (above alcove)
      const topHeight = (SHELF_COUNT - alcoveEndRow) * SHELF_HEIGHT
      const topY = totalHeight / 2 - topHeight / 2
      verticalDividers.push(
        <mesh key={`divider-${col}-top`} position={[x, topY, 0]} castShadow receiveShadow>
          <boxGeometry args={[SIDE_PANEL_WIDTH, topHeight, 0.3]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
        </mesh>
      )

      // Split divider: bottom segment (below alcove)
      const bottomHeight = alcoveStartRow * SHELF_HEIGHT
      const bottomY = -totalHeight / 2 + bottomHeight / 2
      verticalDividers.push(
        <mesh key={`divider-${col}-bottom`} position={[x, bottomY, 0]} castShadow receiveShadow>
          <boxGeometry args={[SIDE_PANEL_WIDTH, bottomHeight, 0.3]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
        </mesh>
      )

      // Side wall: extends from front to back of alcove recess
      const wallX = isLeftEdge
        ? alcoveCenterX - alcoveWidth / 2 + ALCOVE_WALL_THICKNESS / 2
        : alcoveCenterX + alcoveWidth / 2 - ALCOVE_WALL_THICKNESS / 2
      const wallZ = ALCOVE_FRONT_Z - ALCOVE_DEPTH / 2  // Centered between front and back
      verticalDividers.push(
        <mesh key={`divider-${col}-wall`} position={[wallX, alcoveCenterY, wallZ]} castShadow receiveShadow>
          <boxGeometry args={[ALCOVE_WALL_THICKNESS, alcoveHeight, ALCOVE_DEPTH]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
        </mesh>
      )
    } else {
      // Full height divider
      verticalDividers.push(
        <mesh key={`divider-${col}`} position={[x, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[SIDE_PANEL_WIDTH, totalHeight, 0.3]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
        </mesh>
      )
    }
  }

  return (
    <group position={position}>
      {/* Back panel - split around alcove */}
      {/* Left section */}
      <mesh position={[-totalWidth / 2 + alcoveStartCol * UNIT_WIDTH / 2, 0, -0.15]} receiveShadow>
        <boxGeometry args={[alcoveStartCol * UNIT_WIDTH, totalHeight + SHELF_THICKNESS, BACK_DEPTH]} />
        <meshStandardMaterial color={WOOD_BACK} roughness={0.95} />
      </mesh>
      {/* Right section */}
      <mesh position={[totalWidth / 2 - (unitsWide - alcoveEndCol - 1) * UNIT_WIDTH / 2, 0, -0.15]} receiveShadow>
        <boxGeometry args={[(unitsWide - alcoveEndCol - 1) * UNIT_WIDTH, totalHeight + SHELF_THICKNESS, BACK_DEPTH]} />
        <meshStandardMaterial color={WOOD_BACK} roughness={0.95} />
      </mesh>
      {/* Top section (above alcove) */}
      <mesh position={[alcoveCenterX, totalHeight / 2 - (SHELF_COUNT - alcoveEndRow - 1) * SHELF_HEIGHT / 2, -0.15]} receiveShadow>
        <boxGeometry args={[alcoveWidth + 0.1, (SHELF_COUNT - alcoveEndRow - 1) * SHELF_HEIGHT, BACK_DEPTH]} />
        <meshStandardMaterial color={WOOD_BACK} roughness={0.95} />
      </mesh>
      {/* Bottom section (below alcove) */}
      <mesh position={[alcoveCenterX, -totalHeight / 2 + alcoveStartRow * SHELF_HEIGHT / 2, -0.15]} receiveShadow>
        <boxGeometry args={[alcoveWidth + 0.1, alcoveStartRow * SHELF_HEIGHT, BACK_DEPTH]} />
        <meshStandardMaterial color={WOOD_BACK} roughness={0.95} />
      </mesh>

      {/* Alcove back wall - at the back of the recess */}
      <mesh position={[alcoveCenterX, alcoveCenterY, ALCOVE_BACK_Z]} receiveShadow>
        <boxGeometry args={[alcoveWidth, alcoveHeight, 0.02]} />
        <meshStandardMaterial color={WOOD_BACK} roughness={0.95} />
      </mesh>

      {/* Alcove top wall - ceiling of the recess */}
      <mesh position={[alcoveCenterX, alcoveCenterY + alcoveHeight / 2 - SHELF_THICKNESS / 2, ALCOVE_FRONT_Z - ALCOVE_DEPTH / 2]} receiveShadow>
        <boxGeometry args={[alcoveWidth, SHELF_THICKNESS, ALCOVE_DEPTH]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
      </mesh>

      {/* Alcove bottom wall - floor of the recess */}
      <mesh position={[alcoveCenterX, alcoveCenterY - alcoveHeight / 2 + SHELF_THICKNESS / 2, ALCOVE_FRONT_Z - ALCOVE_DEPTH / 2]} receiveShadow>
        <boxGeometry args={[alcoveWidth, SHELF_THICKNESS, ALCOVE_DEPTH]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.85} />
      </mesh>

      {/* Shelves */}
      {shelves}

      {/* Shelf lips */}
      {shelfLips}

      {/* Vertical dividers */}
      {verticalDividers}

      {/* Top crown */}
      <mesh position={[0, totalHeight / 2 + SHELF_THICKNESS / 2 + 0.03, 0.02]} castShadow>
        <boxGeometry args={[totalWidth + 0.1, 0.06, 0.35]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -totalHeight / 2 - SHELF_THICKNESS / 2 - 0.04, 0.02]} castShadow>
        <boxGeometry args={[totalWidth + 0.1, 0.08, 0.35]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>

      {/* Alcove display content */}
      <group position={[alcoveCenterX, alcoveCenterY, 0]}>
        {children}
      </group>
    </group>
  )
}

// Re-export constants for convenience
export { BOOKSHELF_CONSTANTS } from './constants'
