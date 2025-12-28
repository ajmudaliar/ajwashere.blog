import { useState, useRef, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { Book as BookType } from './types'
import { BOOK_CONSTANTS } from './constants'
import { getBookCoverPath, hasCover } from './book-covers'
import { COVER_ASSIGNMENTS } from './cover-assignments'

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

// Book with cover texture
function BookWithCover({ book, position, coverId }: BookProps & { coverId: string }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  const coverUrl = getBookCoverPath(coverId)

  // Load the cover texture
  const texture = useTexture(coverUrl)

  // Configure texture
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
    }
  }, [texture])

  const { positionY, positionZ, rotationX } = useSpring({
    positionY: hovered ? 0.15 : 0,
    positionZ: hovered ? 0.3 : 0,
    rotationX: hovered ? -0.15 : BASE_LEAN,
    config: { mass: 1, tension: 280, friction: 20 },
  })

  return (
    <animated.group
      position-x={position[0]}
      position-y={positionY.to((y) => position[1] + y)}
      position-z={positionZ.to((z) => position[2] + z)}
      rotation-x={rotationX}
    >
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
        {/* 6 faces: right, left, top, bottom, front (cover), back */}
        <meshStandardMaterial attach="material-0" color={book.color} roughness={0.7} />
        <meshStandardMaterial attach="material-1" color={book.color} roughness={0.7} />
        <meshStandardMaterial attach="material-2" color={book.color} roughness={0.7} />
        <meshStandardMaterial attach="material-3" color={book.color} roughness={0.7} />
        <meshStandardMaterial attach="material-4" map={texture} roughness={0.5} />
        <meshStandardMaterial attach="material-5" color={book.color} roughness={0.7} />
      </mesh>
    </animated.group>
  )
}

// Book without cover (text inscription)
function BookWithText({ book, position }: BookProps) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  const { positionY, positionZ, rotationX } = useSpring({
    positionY: hovered ? 0.15 : 0,
    positionZ: hovered ? 0.3 : 0,
    rotationX: hovered ? -0.15 : BASE_LEAN,
    config: { mass: 1, tension: 280, friction: 20 },
  })

  const displayTitle = truncate(book.title, 40)
  const displayAuthor = truncate(book.author, 25)

  return (
    <animated.group
      position-x={position[0]}
      position-y={positionY.to((y) => position[1] + y)}
      position-z={positionZ.to((z) => position[2] + z)}
      rotation-x={rotationX}
    >
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

// Main Book component - chooses between cover texture or text
export function Book({ book, position }: BookProps) {
  // Look up cover ID from assignments, fallback to book's googleBooksId
  const coverId = COVER_ASSIGNMENTS[book.id] || book.googleBooksId

  // Use cover texture only if we have a real cover downloaded
  if (coverId && hasCover(coverId)) {
    return <BookWithCover book={book} position={position} coverId={coverId} />
  }
  return <BookWithText book={book} position={position} />
}

// Re-export constants for convenience
export { BOOK_CONSTANTS } from './constants'
