import { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'
import type { Book as BookType } from './types'
import { BOOK_CONSTANTS } from './constants'

// Display orientation: cover faces camera
const { BOOK_HEIGHT, BOOK_WIDTH, BOOK_DEPTH } = BOOK_CONSTANTS

// Base lean angle (books lean back against shelf - negative X rotation)
const BASE_LEAN = -0.087 // ~5 degrees backward

interface BookProps {
  book: BookType
  position: [number, number, number]
}

export function Book({ book, position }: BookProps) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  // Spring animation for hover effect
  // Books lean back at rest, tilt forward on hover
  const { positionY, positionZ, rotationX } = useSpring({
    positionY: hovered ? 0.15 : 0,
    positionZ: hovered ? 0.3 : 0,
    rotationX: hovered ? -0.15 : BASE_LEAN,
    config: { mass: 1, tension: 280, friction: 20 },
  })

  return (
    <animated.mesh
      ref={meshRef}
      position-x={position[0]}
      position-y={positionY.to((y) => position[1] + y)}
      position-z={positionZ.to((z) => position[2] + z)}
      rotation-x={rotationX}
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
    </animated.mesh>
  )
}

// Re-export constants for convenience
export { BOOK_CONSTANTS } from './constants'
