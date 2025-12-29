import { useState, useRef, useMemo, useEffect, createContext, useContext } from 'react'
import { useSpring, animated } from '@react-spring/three'
import { Text, useTexture, Html } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
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

// Create a procedural "pages" texture for book edges
function createPagesTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Cream/off-white base for pages
  ctx.fillStyle = '#f5f0e6'
  ctx.fillRect(0, 0, 128, 256)

  // Add subtle horizontal lines to simulate page edges
  ctx.strokeStyle = '#e8e0d0'
  ctx.lineWidth = 1
  for (let y = 0; y < 256; y += 2) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(128, y)
    ctx.stroke()
  }

  // Add slight noise/variation
  const imageData = ctx.getImageData(0, 0, 128, 256)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 10
    data[i] = Math.max(0, Math.min(255, data[i] + noise))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// Singleton pages texture
let pagesTexture: THREE.CanvasTexture | null = null
function getPagesTexture(): THREE.CanvasTexture {
  if (!pagesTexture) {
    pagesTexture = createPagesTexture()
  }
  return pagesTexture
}

// Selection context
interface BookSelectionContextType {
  selectedBookId: string | null
  selectBook: (book: BookType | null) => void
}

const BookSelectionContext = createContext<BookSelectionContextType>({
  selectedBookId: null,
  selectBook: () => {},
})

export const BookSelectionProvider = BookSelectionContext.Provider
export const useBookSelection = () => useContext(BookSelectionContext)

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
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const { selectedBookId, selectBook } = useBookSelection()
  const { camera } = useThree()

  const isSelected = selectedBookId === book.id
  const coverUrl = getBookCoverPath(coverId)

  // Load the cover texture
  const texture = useTexture(coverUrl)
  const pagesTexture = useMemo(() => getPagesTexture(), [])

  // Configure texture
  useMemo(() => {
    if (texture) texture.colorSpace = THREE.SRGBColorSpace
  }, [texture])

  // Calculate center position (in front of camera)
  const centerPosition = useMemo(() => {
    const cameraZ = camera.position.z
    return { x: 0, y: 0, z: cameraZ - 3 }
  }, [camera.position.z])

  const { posX, posY, posZ, rotationX, scale } = useSpring({
    posX: isSelected ? centerPosition.x : position[0],
    posY: isSelected ? centerPosition.y : (hovered ? position[1] + 0.15 : position[1]),
    posZ: isSelected ? centerPosition.z : (hovered ? position[2] + 0.3 : position[2]),
    rotationX: isSelected ? 0 : (hovered ? -0.15 : BASE_LEAN),
    scale: isSelected ? 2.5 : 1,
    config: { mass: 1, tension: 200, friction: 26 },
  })

  // Slow rotation when selected
  useFrame((_, delta) => {
    if (groupRef.current && isSelected) {
      groupRef.current.rotation.y += delta * 0.3 // Slow rotation
    }
  })

  // Reset rotation when deselected
  useEffect(() => {
    if (!isSelected && groupRef.current) {
      groupRef.current.rotation.y = 0
    }
  }, [isSelected])

  return (
    <animated.group
      position-x={posX}
      position-y={posY}
      position-z={posZ}
      rotation-x={rotationX}
      scale={scale}
    >
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation()
            selectBook(isSelected ? null : book)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (!isSelected) setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'default'
          }}
        >
          <boxGeometry args={[BOOK_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
          {/* 6 faces: right, left, top, bottom, front (cover), back (cover) */}
          <meshStandardMaterial attach="material-0" color={book.color} roughness={0.7} />
          <meshStandardMaterial attach="material-1" color={book.color} roughness={0.7} />
          <meshStandardMaterial attach="material-2" color={book.color} roughness={0.7} />
          <meshStandardMaterial attach="material-3" color={book.color} roughness={0.7} />
          <meshStandardMaterial attach="material-4" map={texture} roughness={0.5} />
          <meshStandardMaterial attach="material-5" map={texture} roughness={0.5} />
        </mesh>
      </group>
    </animated.group>
  )
}

// Book without cover (text inscription)
function BookWithText({ book, position }: BookProps) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const { selectedBookId, selectBook } = useBookSelection()
  const { camera } = useThree()

  const isSelected = selectedBookId === book.id

  // Calculate center position (in front of camera)
  const centerPosition = useMemo(() => {
    const cameraZ = camera.position.z
    return { x: 0, y: 0, z: cameraZ - 3 }
  }, [camera.position.z])

  const { posX, posY, posZ, rotationX, scale } = useSpring({
    posX: isSelected ? centerPosition.x : position[0],
    posY: isSelected ? centerPosition.y : (hovered ? position[1] + 0.15 : position[1]),
    posZ: isSelected ? centerPosition.z : (hovered ? position[2] + 0.3 : position[2]),
    rotationX: isSelected ? 0 : (hovered ? -0.15 : BASE_LEAN),
    scale: isSelected ? 2.5 : 1,
    config: { mass: 1, tension: 200, friction: 26 },
  })

  // Slow rotation when selected
  useFrame((_, delta) => {
    if (groupRef.current && isSelected) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  // Reset rotation when deselected
  useEffect(() => {
    if (!isSelected && groupRef.current) {
      groupRef.current.rotation.y = 0
    }
  }, [isSelected])

  const displayTitle = truncate(book.title, 40)
  const displayAuthor = truncate(book.author, 25)

  return (
    <animated.group
      position-x={posX}
      position-y={posY}
      position-z={posZ}
      rotation-x={rotationX}
      scale={scale}
    >
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation()
            selectBook(isSelected ? null : book)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (!isSelected) setHovered(true)
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
      </group>
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
