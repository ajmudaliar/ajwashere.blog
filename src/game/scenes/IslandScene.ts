import Phaser from 'phaser'

// Tile types
const VOID = 0      // Sky/emptiness around island
const GRASS = 1     // Main ground level
const PLATEAU = 2   // Upper elevated area

// Island map: 70 wide × 45 tall
// Features: upper plateau, pronounced west bay, dock peninsula, irregular coastline
const MAP_DATA = [
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............................^^^^..^^^^.................................#########...................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............................^^^^..^^^^................................###########...................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.........................^^^^^^^^^^^^^^^^............................##############..................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.........................^^^^^^^^^^^^^^^^.............................#############..................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.......................^^^^^^^^^^^^^^^^^^^^^^.........................############...................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.......................^^^^^^^^^^^^^^^^^^^^^^...........................#############..................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '......................^^^^^^^^^^^^^^^^^^^^^^^^............................#############..............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '......................^^^^^^^^^^^^^^^^^^^^^^^^.#########...................#############................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................^^^^^^^^^^^^^^^^^^^^^^^^#################...............############.............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................^^^^^^^^^^^^^^^^^^^^^^^^########################............#######................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..................####################################################................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..................#####################################################...............................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '................##########################################################............................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '................###########################################################...........................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..............##################################################################......................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..............###################################################################.....................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..............####################################################################....................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............#########################################....##############################..............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............#########################################....###############################.............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............#########################################....###############################.............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.............######################################........############################..............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.............######################################........############################..............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.............######################################........#############################.............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '...............######################################..........##########################............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '...............######################################..........##########################............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.................###################################............########################..............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.................###################################............########################..............'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '...................#################################..............####################................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '...................#################################..............####################................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.....................#############################................################....................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.....................#############################................################....................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.......................#########################....................############......................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '.......................#########################....................############......................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..........................###################........................########........................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..........................###################........................########........................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............................#############............................######..........................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '............................#############............................######..........................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..............................########................................####............................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '..............................########................................####............................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '................................####..................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '................................####..................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
  '....................................................................................................'.split('').map(c => c === '.' ? 0 : c === '^' ? 2 : 1),
]

const TILE_SIZE = 16
const MAP_WIDTH = MAP_DATA[0].length
const MAP_HEIGHT = MAP_DATA.length

export class IslandScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key }
  private collisionMap: boolean[][] = []
  private moveSpeed = 100
  private currentDirection = 'down'

  constructor() {
    super({ key: 'IslandScene' })
  }

  preload() {
    // Character sprite - 4x4 grid, 40x48 per frame
    this.load.spritesheet('character_walk', '/assets/premium/Character_Walk.png', {
      frameWidth: 40,
      frameHeight: 48,
    })
    this.load.spritesheet('character_idle', '/assets/premium/Character_Idle.png', {
      frameWidth: 40,
      frameHeight: 48,
    })
    // Ground tileset - 48 columns x 95 rows, 16x16 per tile
    this.load.spritesheet('ground', '/assets/premium/Tileset_Ground.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create() {
    // Colors for void/sky
    const VOID_COLOR = 0x1a1a2e    // Dark blue sky/void

    // Ground tileset: 768x1520px = 48 cols × 95 rows of 16x16 tiles
    // From Tiled tsx file - grass fill tiles with probability for variation:
    // First variant (dark green): tiles 384-389 (row 8), 432-437 (row 9)
    // Second variant (lighter): tiles 1056-1061 (row 22), 1104-1109 (row 23)
    const GRASS_FRAMES = [384, 385, 386, 387, 388, 389, 432, 433, 434, 435, 436, 437]
    const PLATEAU_FRAMES = [1056, 1057, 1058, 1059, 1060, 1061, 1104, 1105, 1106, 1107, 1108, 1109]

    // Build collision map and render tiles
    for (let y = 0; y < MAP_HEIGHT; y++) {
      this.collisionMap[y] = []
      for (let x = 0; x < MAP_WIDTH; x++) {
        const tile = MAP_DATA[y][x]
        const posX = x * TILE_SIZE + TILE_SIZE / 2
        const posY = y * TILE_SIZE + TILE_SIZE / 2

        let isCollision: boolean

        switch (tile) {
          case VOID:
            this.add.rectangle(posX, posY, TILE_SIZE, TILE_SIZE, VOID_COLOR)
            isCollision = true
            break
          case GRASS:
            // Random grass tile for natural variation
            const grassFrame = GRASS_FRAMES[Math.floor(Math.random() * GRASS_FRAMES.length)]
            this.add.image(posX, posY, 'ground', grassFrame)
            isCollision = false
            break
          case PLATEAU:
            // Random plateau tile for natural variation
            const plateauFrame = PLATEAU_FRAMES[Math.floor(Math.random() * PLATEAU_FRAMES.length)]
            this.add.image(posX, posY, 'ground', plateauFrame)
            isCollision = false
            break
          default:
            this.add.rectangle(posX, posY, TILE_SIZE, TILE_SIZE, VOID_COLOR)
            isCollision = true
        }

        this.collisionMap[y][x] = isCollision
      }
    }

    // Create walk animations (4 directions, 4 frames each)
    // Row 0: left, Row 1: right, Row 2: up, Row 3: down
    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('character_walk', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'walk_right',
      frames: this.anims.generateFrameNumbers('character_walk', { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('character_walk', { start: 8, end: 11 }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'walk_down',
      frames: this.anims.generateFrameNumbers('character_walk', { start: 12, end: 15 }),
      frameRate: 8,
      repeat: -1
    })

    // Create idle animations
    this.anims.create({
      key: 'idle_left',
      frames: this.anims.generateFrameNumbers('character_idle', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'idle_right',
      frames: this.anims.generateFrameNumbers('character_idle', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'idle_up',
      frames: this.anims.generateFrameNumbers('character_idle', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'idle_down',
      frames: this.anims.generateFrameNumbers('character_idle', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1
    })

    // Spawn point - center of main area
    const spawnX = 35 * TILE_SIZE + TILE_SIZE / 2
    const spawnY = 22 * TILE_SIZE + TILE_SIZE / 2

    // Create player sprite
    this.player = this.add.sprite(spawnX, spawnY, 'character_idle')
    this.player.play('idle_down')
    this.player.setDepth(1000)

    // Camera
    this.cameras.main.setZoom(1.5)
    this.cameras.main.centerOn(MAP_WIDTH * TILE_SIZE / 2, MAP_HEIGHT * TILE_SIZE / 2)

    // Controls
    this.cursors = this.input.keyboard!.createCursorKeys()
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }
  }

  update() {
    let velocityX = 0
    let velocityY = 0
    let isMoving = false
    let newDirection = this.currentDirection

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      velocityX = -this.moveSpeed
      newDirection = 'left'
      isMoving = true
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      velocityX = this.moveSpeed
      newDirection = 'right'
      isMoving = true
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      velocityY = -this.moveSpeed
      newDirection = 'up'
      isMoving = true
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      velocityY = this.moveSpeed
      newDirection = 'down'
      isMoving = true
    }

    // Update animation
    if (isMoving) {
      const walkAnim = `walk_${newDirection}`
      if (this.player.anims.currentAnim?.key !== walkAnim) {
        this.player.play(walkAnim)
      }
      this.currentDirection = newDirection
    } else {
      const idleAnim = `idle_${this.currentDirection}`
      if (this.player.anims.currentAnim?.key !== idleAnim) {
        this.player.play(idleAnim)
      }
    }

    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707
      velocityY *= 0.707
    }

    const delta = this.game.loop.delta / 1000
    const newX = this.player.x + velocityX * delta
    const newY = this.player.y + velocityY * delta

    if (!this.checkCollision(newX, this.player.y)) {
      this.player.x = newX
    }
    if (!this.checkCollision(this.player.x, newY)) {
      this.player.y = newY
    }

    this.player.setDepth(this.player.y)
  }

  private checkCollision(x: number, y: number): boolean {
    const halfSize = 5
    const corners = [
      { x: x - halfSize, y: y - halfSize },
      { x: x + halfSize, y: y - halfSize },
      { x: x - halfSize, y: y + halfSize },
      { x: x + halfSize, y: y + halfSize },
    ]

    for (const corner of corners) {
      const tileX = Math.floor(corner.x / TILE_SIZE)
      const tileY = Math.floor(corner.y / TILE_SIZE)

      if (tileX < 0 || tileX >= MAP_WIDTH || tileY < 0 || tileY >= MAP_HEIGHT) {
        return true
      }

      if (this.collisionMap[tileY]?.[tileX]) {
        return true
      }
    }

    return false
  }
}
