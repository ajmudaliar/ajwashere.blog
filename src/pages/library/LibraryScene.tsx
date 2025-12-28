import { useRef, useMemo, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { BookshelfWall, BookshelfWithAlcove, BOOKSHELF_CONSTANTS } from './Bookshelf'
import { Book, BOOK_CONSTANTS } from './Book'
import type { Book as BookType } from './types'
import { BOOKS_BY_STATUS, FEATURED_BOOK } from './reading-list'

// Create a procedural velvet texture
function createVelvetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Base color - library green
  ctx.fillStyle = '#2d5a47'
  ctx.fillRect(0, 0, 256, 256)

  // Add grainy noise for velvet texture
  const imageData = ctx.getImageData(0, 0, 256, 256)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 25
    data[i] = Math.max(0, Math.min(255, data[i] + noise * 0.6))     // R
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))   // G
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.8)) // B
  }

  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  return texture
}

// Create a procedural carpet texture
function createCarpetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // Base color - reddish maroon
  ctx.fillStyle = '#7A2830'
  ctx.fillRect(0, 0, 256, 256)

  // Add subtle noise for carpet texture
  const imageData = ctx.getImageData(0, 0, 256, 256)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 15
    data[i] = Math.max(0, Math.min(255, data[i] + noise))     // R
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.8)) // G
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.8)) // B
  }

  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(6, 6)
  return texture
}

// Carpet floor component
function Carpet({ position, width, depth }: { position: [number, number, number], width: number, depth: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.map = createCarpetTexture()
      material.needsUpdate = true
    }
  }, [])

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color="#7A2830" roughness={0.95} />
    </mesh>
  )
}

// Layout: 5 units wide, 7 shelves tall, 3 books per shelf cell
const UNITS_WIDE = 5
const BOOKS_PER_CELL = 3

// Shuffle array randomly
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Books for shelves (finished, later, postponed - excludes currently reading)
const SHELF_BOOKS = BOOKS_BY_STATUS.forLibrary

// Calculate total shelf capacity (minus alcove)
const TOTAL_SLOTS = UNITS_WIDE * BOOKS_PER_CELL * 7 - 9 // 7 rows, minus 9 alcove slots
const PLACEHOLDER_COUNT = Math.max(0, TOTAL_SLOTS - SHELF_BOOKS.length)

// Placeholder book variants
const PLACEHOLDER_TITLES = [
  'My little library',
  'Books I\'ll read',
  'Someday...',
  'On the list',
  'Future reads',
  'To be read',
  'Coming soon',
  'Next up',
  'In the queue',
  'Wishlist',
]

const PLACEHOLDER_COLORS = [
  '#3D3530', '#4A3F35', '#3A3530', '#453D38', '#3D3835',
  '#4A4540', '#3F3A35', '#454038', '#3D3A35', '#484340',
]

// Generate placeholder books for empty spaces
const PLACEHOLDER_BOOKS: BookType[] = Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
  id: `placeholder-${i}`,
  title: PLACEHOLDER_TITLES[i % PLACEHOLDER_TITLES.length],
  author: 'ajay',
  status: 'Have not started' as const,
  color: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
}))

// Shuffle real books and placeholders together
const CENTER_BOOKS = shuffle([...SHELF_BOOKS, ...PLACEHOLDER_BOOKS])

// Additional filler colors for decorative books
const DECORATIVE_COLORS = [
  '#8B4513', '#A0522D', '#6B4423', '#8B6914', '#556B2F',
  '#2F4F4F', '#4A4A6A', '#6B3A3A', '#3A5A6B', '#5D4E37',
  '#704214', '#5C4033', '#3D3D3D', '#4A3728', '#6B5344',
]

// Glass Case display for featured "Currently Reading" book
function FeaturedBookDisplay() {
  const { UNIT_WIDTH, SHELF_HEIGHT } = BOOKSHELF_CONSTANTS
  // Alcove is 1 column wide × 3 rows tall
  const alcoveWidth = UNIT_WIDTH
  const alcoveHeight = 3 * SHELF_HEIGHT
  const velvetRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (velvetRef.current) {
      const material = velvetRef.current.material as THREE.MeshStandardMaterial
      material.map = createVelvetTexture()
      material.needsUpdate = true
    }
  }, [])

  return (
    <group>
      {/* Velvet backing - at the back of the deep recess */}
      <mesh ref={velvetRef} position={[0, 0, -1.0]}>
        <boxGeometry args={[alcoveWidth - 0.1, alcoveHeight - 0.1, 0.1]} />
        <meshStandardMaterial
          color="#2d5a47"
          roughness={0.92}
          metalness={0}
        />
      </mesh>

      {/* Wooden valance that hides the light */}
      <mesh position={[0, alcoveHeight / 2 - 0.075, 0]}>
        <boxGeometry args={[alcoveWidth, 0.15, 0.1]} />
        <meshStandardMaterial color="#5D4E42" roughness={0.85} />
      </mesh>

      {/* Hidden light behind the valance */}
      <pointLight
        position={[0, alcoveHeight / 2 - 0.05, -0.3]}
        intensity={5}
        color="#ffcc77"
        distance={3}
        decay={1.5}
      />

      {/* Display shelf inside alcove */}
      <mesh position={[0, -0.6, -0.4]}>
        <boxGeometry args={[1.2, 0.06, 0.8]} />
        <meshStandardMaterial color="#5D4E42" roughness={0.85} />
      </mesh>

      {/* Single book - resting on the shelf */}
      <Book book={FEATURED_BOOK} position={[0, -0.6 + 0.03 + 0.425, -0.4]} />
    </group>
  )
}



// Alcove bounds - center column (2), rows 2,3,4
const ALCOVE_COL = 2
const ALCOVE_ROW_START = 2
const ALCOVE_ROW_END = 4

interface BooksProps {
  books: BookType[]
  bookshelfZ?: number
  skipAlcove?: boolean
}

function Books({ books, bookshelfZ = 0, skipAlcove = false }: BooksProps) {
  const { UNIT_WIDTH, SHELF_HEIGHT, SHELF_THICKNESS, SHELF_COUNT } = BOOKSHELF_CONSTANTS
  const { BOOK_WIDTH, BOOK_HEIGHT } = BOOK_CONSTANTS

  const totalWidth = UNITS_WIDE * UNIT_WIDTH
  const totalHeight = SHELF_COUNT * SHELF_HEIGHT
  const bookGap = 0.08

  const bookPositions = useMemo(() => {
    let bookIndex = 0
    const positions: { book: BookType; position: [number, number, number] }[] = []

    // Fill row by row, left to right
    for (let shelfRow = 0; shelfRow < SHELF_COUNT && bookIndex < books.length; shelfRow++) {
      for (let unitCol = 0; unitCol < UNITS_WIDE && bookIndex < books.length; unitCol++) {
        for (let posInUnit = 0; posInUnit < BOOKS_PER_CELL && bookIndex < books.length; posInUnit++) {
          // Skip alcove area
          if (skipAlcove && unitCol === ALCOVE_COL && shelfRow >= ALCOVE_ROW_START && shelfRow <= ALCOVE_ROW_END) {
            continue
          }

          const book = books[bookIndex++]

          // X position
          const unitCenterX = (unitCol + 0.5) * UNIT_WIDTH - totalWidth / 2
          const bookOffsetX = (posInUnit - 1) * (BOOK_WIDTH + bookGap)
          const bookX = unitCenterX + bookOffsetX

          // Y position
          const shelfBaseY = shelfRow * SHELF_HEIGHT - totalHeight / 2 + SHELF_THICKNESS / 2
          const bookY = shelfBaseY + BOOK_HEIGHT / 2

          // Z position
          const bookZ = bookshelfZ - 0.02

          positions.push({ book, position: [bookX, bookY, bookZ] })
        }
      }
    }

    return positions
  }, [books, UNIT_WIDTH, SHELF_HEIGHT, SHELF_THICKNESS, totalWidth, totalHeight, BOOK_WIDTH, BOOK_HEIGHT, bookshelfZ, skipAlcove])

  return (
    <>
      {bookPositions.map(({ book, position }) => (
        <Book key={book.id} book={book} position={position} />
      ))}
    </>
  )
}

// Decorative book - no hover interaction, just visual
function DecorativeBook({ position, color }: { position: [number, number, number]; color: string }) {
  const { BOOK_HEIGHT, BOOK_WIDTH, BOOK_DEPTH } = BOOK_CONSTANTS
  // Rotate 90° on Y so spine faces outward, no tilt
  return (
    <mesh position={position} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[BOOK_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
    </mesh>
  )
}

// Side bookshelf with decorative books (non-interactive, spine-out)
function SideBookshelf({
  position,
  rotation = [0, 0, 0],
  unitsWide = 2
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  unitsWide?: number
}) {
  const { UNIT_WIDTH, SHELF_HEIGHT, SHELF_THICKNESS, SHELF_COUNT } = BOOKSHELF_CONSTANTS
  const { BOOK_DEPTH, BOOK_HEIGHT } = BOOK_CONSTANTS

  const totalWidth = unitsWide * UNIT_WIDTH
  const totalHeight = SHELF_COUNT * SHELF_HEIGHT

  // Spine-out: use BOOK_DEPTH for spacing (much thinner than BOOK_WIDTH)
  const spineWidth = BOOK_DEPTH
  const bookGap = 0.02
  const booksPerRow = Math.floor(totalWidth / (spineWidth + bookGap))

  // Generate decorative book positions
  const decorativeBooks = useMemo(() => {
    const books: { position: [number, number, number]; color: string }[] = []

    for (let shelfRow = 0; shelfRow < SHELF_COUNT; shelfRow++) {
      for (let i = 0; i < booksPerRow; i++) {
        // X position: spread across shelf width
        const bookX = (i + 0.5) * (spineWidth + bookGap) - totalWidth / 2

        // Y position
        const shelfBaseY = shelfRow * SHELF_HEIGHT - totalHeight / 2 + SHELF_THICKNESS / 2
        const bookY = shelfBaseY + BOOK_HEIGHT / 2 + 0.02

        books.push({
          position: [bookX, bookY, -0.15],  // Push back so rotated books don't protrude
          color: DECORATIVE_COLORS[(shelfRow * booksPerRow + i) % DECORATIVE_COLORS.length],
        })
      }
    }
    return books
  }, [SHELF_HEIGHT, SHELF_THICKNESS, SHELF_COUNT, totalWidth, totalHeight, BOOK_HEIGHT, booksPerRow, spineWidth, bookGap])

  return (
    <group position={position} rotation={rotation}>
      <BookshelfWall unitsWide={unitsWide} position={[0, 0, 0]} />
      {decorativeBooks.map((book, i) => (
        <DecorativeBook key={i} position={book.position} color={book.color} />
      ))}
    </group>
  )
}

function Scene() {
  // Position the center bookshelf
  const centerZ = -2

  // Room dimensions
  const { SHELF_COUNT, SHELF_HEIGHT, SHELF_THICKNESS } = BOOKSHELF_CONSTANTS
  const totalHeight = SHELF_COUNT * SHELF_HEIGHT
  // Floor at bottom of bookshelf base (base is at -totalHeight/2 - SHELF_THICKNESS/2 - 0.04, with height 0.08)
  const floorY = -totalHeight / 2 - SHELF_THICKNESS / 2 - 0.08
  const ceilingY = totalHeight / 2 + 0.2
  const roomDepth = 12 // From behind camera to back wall
  const roomWidth = 12

  return (
    <>
      {/* Warm dark background */}
      <color attach="background" args={['#0d0a08']} />

      {/* Textured carpet floor */}
      <Carpet position={[0, floorY, 2]} width={roomWidth} depth={roomDepth} />

      {/* White ceiling */}
      <mesh position={[0, ceilingY, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#F5F5F0" roughness={0.95} />
      </mesh>

      {/* Simple & Clean lighting */}
      <ambientLight intensity={0.6} color="#ffe8d0" />
      <directionalLight
        position={[0, 5, 3]}
        intensity={1.2}
        color="#ffddaa"
        castShadow
        shadow-mapSize={1024}
      />

      {/* CENTER BOOKSHELF - with alcove for featured books */}
      <BookshelfWithAlcove position={[0, 0, centerZ]}>
        <FeaturedBookDisplay />
      </BookshelfWithAlcove>
      <Books books={CENTER_BOOKS} bookshelfZ={centerZ} skipAlcove />

      {/* LEFT SIDE BOOKSHELF - decorative, perpendicular to view */}
      <SideBookshelf
        position={[-4.5, 0, 4]}
        rotation={[0, Math.PI / 2, 0]}
        unitsWide={3}
      />

      {/* RIGHT SIDE BOOKSHELF - decorative, perpendicular to view */}
      <SideBookshelf
        position={[4.5, 0, 4]}
        rotation={[0, -Math.PI / 2, 0]}
        unitsWide={3}
      />
    </>
  )
}

export function LibraryScene() {
  const cameraZ = 8

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, cameraZ],
        fov: 60, // Wider FOV to see side shelves
        near: 0.1,
        far: 100,
      }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Scene />
    </Canvas>
  )
}
