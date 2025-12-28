import { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import type { Book as BookType } from './types'
import { BOOK_CONSTANTS } from './constants'

// Display orientation: cover faces camera
const { BOOK_HEIGHT, BOOK_WIDTH, BOOK_DEPTH } = BOOK_CONSTANTS

// Base lean angle (books lean back against shelf - negative X rotation)
const BASE_LEAN = -0.087 // ~5 degrees backward

// Text styling
const TITLE_COLOR = '#d4c4a8'
const AUTHOR_COLOR = '#a89878'

interface BookProps {
  book: BookType
  position: [number, number, number]
}

// Truncate text to fit on book
function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen - 1) + '…'
}

export function Book({ book, position }: BookProps) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  // Spring animation for hover effect
  const { positionY, positionZ, rotationX } = useSpring({
    positionY: hovered ? 0.15 : 0,
    positionZ: hovered ? 0.3 : 0,
    rotationX: hovered ? -0.15 : BASE_LEAN,
    config: { mass: 1, tension: 280, friction: 20 },
  })

  // Format title for display - split into lines if needed
  const displayTitle = truncate(book.title, 40)
  const displayAuthor = truncate(book.author, 25)

  return (
    <animated.group
      position-x={position[0]}
      position-y={positionY.to((y) => position[1] + y)}
      position-z={positionZ.to((z) => position[2] + z)}
      rotation-x={rotationX}
    >
      {/* Book body */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry args={[BOOK_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
        <meshStandardMaterial
          color={book.color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Title text on cover */}
      <Text
        position={[0, 0.1, BOOK_DEPTH / 2 + 0.001]}
        fontSize={0.055}
        maxWidth={BOOK_WIDTH - 0.08}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={TITLE_COLOR}
        outlineWidth={0.002}
        outlineColor="#000000"
      >
        {displayTitle}
      </Text>

      {/* Author text below title */}
      <Text
        position={[0, -0.2, BOOK_DEPTH / 2 + 0.001]}
        fontSize={0.04}
        maxWidth={BOOK_WIDTH - 0.08}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={AUTHOR_COLOR}
        outlineWidth={0.001}
        outlineColor="#000000"
      >
        {displayAuthor}
      </Text>
    </animated.group>
  )
}

// Re-export constants for convenience
export { BOOK_CONSTANTS } from './constants'
