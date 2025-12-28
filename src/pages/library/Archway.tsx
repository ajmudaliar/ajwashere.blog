import * as THREE from 'three'

// Warm wood colors
const FRAME_COLOR = '#8B6914' // Warm golden brown
const FRAME_DARK = '#5D4E37' // Darker wood for depth
const FRAME_INNER = '#4A3F30' // Inner passage walls

// Frame dimensions
const FRAME_THICKNESS = 0.4 // Thick wooden frame
const PASSAGE_DEPTH = 0.8 // Depth of the doorway passage

interface ArchwayProps {
  position?: [number, number, number]
  openingWidth?: number
  openingHeight?: number
}

export function Archway({
  position = [0, 0, 0],
  openingWidth = 8,
  openingHeight = 6
}: ArchwayProps) {

  return (
    <group position={position}>
      {/* Left frame pillar - extends beyond screen top/bottom */}
      <mesh position={[-(openingWidth / 2 + FRAME_THICKNESS / 2), 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[FRAME_THICKNESS, 20, PASSAGE_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.7} />
      </mesh>

      {/* Right frame pillar - extends beyond screen top/bottom */}
      <mesh position={[(openingWidth / 2 + FRAME_THICKNESS / 2), 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[FRAME_THICKNESS, 20, PASSAGE_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.7} />
      </mesh>

      {/* Top beam - extends beyond screen sides */}
      <mesh position={[0, openingHeight / 2 + FRAME_THICKNESS / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[20, FRAME_THICKNESS, PASSAGE_DEPTH]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.7} />
      </mesh>

      {/* Inner frame edge - left (creates the "molding" effect) */}
      <mesh position={[-openingWidth / 2 + 0.05, 0, PASSAGE_DEPTH / 2 - 0.1]} receiveShadow>
        <boxGeometry args={[0.1, openingHeight, 0.2]} />
        <meshStandardMaterial color={FRAME_DARK} roughness={0.8} />
      </mesh>

      {/* Inner frame edge - right */}
      <mesh position={[openingWidth / 2 - 0.05, 0, PASSAGE_DEPTH / 2 - 0.1]} receiveShadow>
        <boxGeometry args={[0.1, openingHeight, 0.2]} />
        <meshStandardMaterial color={FRAME_DARK} roughness={0.8} />
      </mesh>

      {/* Inner frame edge - top */}
      <mesh position={[0, openingHeight / 2 - 0.05, PASSAGE_DEPTH / 2 - 0.1]} receiveShadow>
        <boxGeometry args={[openingWidth, 0.1, 0.2]} />
        <meshStandardMaterial color={FRAME_DARK} roughness={0.8} />
      </mesh>

      {/* Passage walls - left */}
      <mesh position={[-openingWidth / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[0.08, openingHeight, PASSAGE_DEPTH]} />
        <meshStandardMaterial color={FRAME_INNER} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Passage walls - right */}
      <mesh position={[openingWidth / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[0.08, openingHeight, PASSAGE_DEPTH]} />
        <meshStandardMaterial color={FRAME_INNER} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Passage ceiling */}
      <mesh position={[0, openingHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[openingWidth, 0.08, PASSAGE_DEPTH]} />
        <meshStandardMaterial color={FRAME_INNER} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Decorative crown molding */}
      <mesh position={[0, openingHeight / 2 + FRAME_THICKNESS + 0.1, PASSAGE_DEPTH / 2 + 0.05]} castShadow>
        <boxGeometry args={[openingWidth + FRAME_THICKNESS * 2 + 0.2, 0.12, 0.15]} />
        <meshStandardMaterial color={FRAME_DARK} roughness={0.75} />
      </mesh>
    </group>
  )
}
