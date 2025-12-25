import Phaser from 'phaser'

// GID to texture key mapping (generated from tilemap analysis)
const GID_TO_KEY: Record<number, string> = {
  291: 'obj_marketstand_2_yellow',
  440: 'obj_tower_bluewood_1_3',
  453: 'obj_house_redwood_1_4',
  881: 'obj_barrel_medium_water',
  882: 'obj_barrel_medium_covered',
  885: 'obj_barrel_medium_cloth',
  887: 'obj_barrel_horizontal_1',
  893: 'obj_basket_apples',
  922: 'obj_bench_1',
  923: 'obj_bench_2',
  924: 'obj_bench_3',
  925: 'obj_bench_4',
  926: 'obj_bench_5',
  927: 'obj_bench_6',
  928: 'obj_bench_7',
  974: 'obj_chest_gold_1',
  976: 'obj_chest_gold_3',
  977: 'obj_chest_steel_1',
  978: 'obj_chest_steel_2',
  996: 'obj_crate_wide_hay_1',
  1002: 'obj_crate_small_flowers_red',
  1010: 'obj_crate_steel_2',
  1012: 'obj_crate_water_2',
  1033: 'obj_package_1',
  1057: 'obj_sack_4',
  1162: 'obj_vase_1',
  1163: 'obj_vase_2',
  1202: 'obj_crate_steel_3',
  1221: 'obj_barrel_small_covered',
  1222: 'obj_barrel_small_empty',
  1224: 'obj_barrel_small_fish',
  1300: 'obj_dyedcloth_big_green',
  1304: 'obj_dyedcloth_medium_green',
  1307: 'obj_table_large_yellow',
  1322: 'obj_dyedcloth_medium_yellow',
  1323: 'obj_dyeingpowder_yellow',
  1328: 'obj_dyeingpowder_green',
  1375: 'obj_banner_medium_green',
  1376: 'obj_banner_medium_green_stripe',
  1381: 'obj_banner_medium_yellow',
  1382: 'obj_banner_medium_yellow_stripe',
  1389: 'obj_dyedcloth_medium_white',
  1390: 'obj_dyedcloth_big_white',
  1398: 'obj_package_3',
  1412: 'obj_table_vertical_green_stripe',
  1421: 'obj_lantern_2',
  1430: 'obj_chair_front_yellow',
  1433: 'obj_chair_left_green',
  1459: 'obj_woodcart_1',
  1471: 'obj_woodstack_1',
  1481: 'obj_armorstand_green',
  1503: 'obj_bulletinboard_2',
  1504: 'obj_cartwheel_1',
  1523: 'obj_floatinggrass_1_green',
  1524: 'obj_floatinggrass_2_green',
  1527: 'obj_floatinggrass_5_green',
  1532: 'obj_lamppost_1',
  1533: 'obj_lamppost_2',
  1535: 'obj_lamppost_4',
  1536: 'obj_lamppost_5',
  1542: 'obj_lilypad_1_green',
  1543: 'obj_lilypad_2_green',
  1545: 'obj_lilypad_4_green',
  1546: 'obj_lilypad_5_green',
  1602: 'obj_sign_2',
  1630: 'obj_streetdecoration_2_green',
  1634: 'obj_streetdecoration_2_yellow',
  1642: 'obj_treelog_1',
  1645: 'obj_treelog_3',
  1655: 'obj_treestump_lantern_1',
  1658: 'obj_treestump_small_lantern',
  1663: 'obj_banner_stick_1_blue',
  12944: 'obj_tree_emerald_2',
  12945: 'obj_tree_emerald_3',
  12946: 'obj_tree_emerald_4',
  12947: 'obj_tree_light_1',
  12948: 'obj_tree_light_2',
  12950: 'obj_tree_light_4',
  12953: 'obj_bush_dark_3',
  12961: 'obj_bush_emerald_4',
  12963: 'obj_bush_emerald_6',
  12967: 'obj_bush_light_3',
  12972: 'obj_tree_dark_1',
  12973: 'obj_tree_dark_2',
  12974: 'obj_tree_dark_3',
  12975: 'obj_tree_dark_4',
  12976: 'obj_tree_emerald_1',
  12997: 'obj_leavybush_emerald_2',
  12998: 'obj_leavybush_emerald_3',
  13025: 'obj_tree_dark_5',
  13026: 'obj_tree_emerald_5',
  13027: 'obj_tree_light_5',
  13046: 'obj_tree_dark_7',
  13047: 'obj_tree_emerald_6',
  13048: 'obj_tree_emerald_7',
  13049: 'obj_tree_light_6',
  13050: 'obj_tree_light_7',
  13051: 'obj_tree_dark_6',
  13053: 'obj_birch_dark_1',
  13054: 'obj_birch_dark_2',
  13055: 'obj_birch_dark_3',
  13056: 'obj_birch_dark_4',
  13057: 'obj_birch_emerald_1',
  13058: 'obj_birch_emerald_2',
  13060: 'obj_birch_emerald_4',
  13061: 'obj_birch_light_1',
  13062: 'obj_birch_light_2',
  13063: 'obj_birch_light_3',
  13064: 'obj_bush_emerald_9',
  13065: 'obj_bush_light_8',
  13068: 'obj_bush_dark_9',
  13073: 'obj_rock_brown_4',
  13100: 'obj_rock_gray_water_2',
  13101: 'obj_rock_gray_water_3',
  13102: 'obj_rock_gray_water_4',
  13103: 'obj_rock_gray_water_5',
  13116: 'obj_rock_gray_water_14',
  13143: 'obj_rock_gray_grass_11',
}

// Interactive buildings config
const INTERACTIVE_BUILDINGS: Record<string, { label: string; section: string; offsetX?: number; offsetY?: number }> = {
  'obj_tower_bluewood_1_3': { label: 'Projects and stuff', section: 'projects', offsetX: 15, offsetY: 160 },
  'obj_marketstand_2_yellow': { label: 'What I\'m reading', section: 'readinglist', offsetY: 30 },
  'obj_bulletinboard_2': { label: 'Blog', section: 'blog', offsetY: 10 },
}

// Dialogue zones config (bounds in tiles, multiply by 16 for pixels)
const DIALOGUE_ZONES_CONFIG = {
  adventure: {
    bounds: { x1: 50, y1: 24, x2: 60, y2: 36 },  // bottom right corner
    messages: [
      "Hmm...",
      "I wonder what awaits\nfor me next...",
      "The path continues,\nbut that's a story\nfor another day.",
    ],
  },
  cats: {
    bounds: { x1: 28, y1: 2, x2: 37, y2: 8 },  // top center
    messages: [
      "Oh, my cats!",
      "That's Eevee in the box.\nNamed after the Pokémon.",
      "And that's Eden.\nNamed after a musician\nI really like.",
      "Best coworkers ever.\nZero productivity though.",
    ],
  },
}

// Reusable dialogue zone system
interface DialogueZoneConfig {
  bounds: { x1: number; y1: number; x2: number; y2: number }  // in pixels
  messages: string[]
}

class DialogueZone {
  private scene: Phaser.Scene
  private bounds: DialogueZoneConfig['bounds']
  private messages: string[]
  private triggered = false
  private dialogueIndex = 0
  private bubble: Phaser.GameObjects.Container | null = null
  private timer: Phaser.Time.TimerEvent | null = null
  private getPlayerPos: () => { x: number; y: number }

  constructor(
    scene: Phaser.Scene,
    config: DialogueZoneConfig,
    getPlayerPos: () => { x: number; y: number }
  ) {
    this.scene = scene
    this.bounds = config.bounds
    this.messages = config.messages
    this.getPlayerPos = getPlayerPos
  }

  update(): void {
    const player = this.getPlayerPos()
    const inZone = player.x > this.bounds.x1 && player.x < this.bounds.x2 &&
                   player.y > this.bounds.y1 && player.y < this.bounds.y2

    if (inZone && !this.triggered && !this.bubble) {
      this.triggered = true
      this.dialogueIndex = 0
      this.showNextDialogue()
    } else if (!inZone && this.triggered) {
      this.reset()
    }

    // Update bubble position to follow player
    if (this.bubble) {
      this.bubble.setPosition(player.x, player.y - 30)
    }
  }

  private reset(): void {
    this.triggered = false
    if (this.timer) {
      this.timer.destroy()
      this.timer = null
    }
    if (this.bubble) {
      this.bubble.destroy()
      this.bubble = null
    }
  }

  private showNextDialogue(): void {
    // Clean up previous bubble
    if (this.bubble) {
      this.bubble.destroy()
      this.bubble = null
    }

    // Check if we're done
    if (this.dialogueIndex >= this.messages.length) {
      return
    }

    const message = this.messages[this.dialogueIndex]
    const player = this.getPlayerPos()

    // Create bubble above player
    const container = this.scene.add.container(player.x, player.y - 30)
    container.setDepth(30000)
    container.setAlpha(0)
    this.bubble = container

    const padding = 8

    const text = this.scene.add.text(0, -padding, '', {
      fontSize: '7px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#2d2d2d',
      align: 'center',
      lineSpacing: 4,
      resolution: 4,
    })
    text.setOrigin(0.5, 1)

    const bubble = this.scene.add.graphics()
    container.add([bubble, text])

    // Fade in
    this.scene.tweens.add({
      targets: this.bubble,
      alpha: 1,
      duration: 150,
    })

    const typingDuration = this.typewriterEffect(text, message, bubble, padding)

    // Auto-advance to next dialogue
    const readingDelay = Math.max(1500, message.split(/\s+/).length * 300)
    const totalDelay = 150 + typingDuration + readingDelay

    this.timer = this.scene.time.delayedCall(totalDelay, () => {
      this.dialogueIndex++
      this.showNextDialogue()
    })
  }

  private typewriterEffect(
    textObj: Phaser.GameObjects.Text,
    fullMessage: string,
    bubble: Phaser.GameObjects.Graphics,
    padding: number
  ): number {
    const charDelay = 30
    let currentIndex = 0
    const tailHeight = 10

    const redrawBubble = () => {
      if (!textObj || !bubble || !textObj.active || !bubble.active) return

      const bubbleWidth = Math.max(textObj.width + padding * 2, 40)
      const bubbleHeight = textObj.height + padding * 2

      bubble.clear()
      bubble.fillStyle(0xffffff, 0.95)
      bubble.lineStyle(2, 0x3d3d3d, 1)
      bubble.fillRoundedRect(-bubbleWidth / 2, -bubbleHeight, bubbleWidth, bubbleHeight, 6)
      bubble.strokeRoundedRect(-bubbleWidth / 2, -bubbleHeight, bubbleWidth, bubbleHeight, 6)

      bubble.fillStyle(0xffffff, 1)
      bubble.fillTriangle(-6, -1, 6, -1, 0, tailHeight)
      bubble.lineStyle(2, 0x3d3d3d, 1)
      bubble.lineBetween(-6, 0, 0, tailHeight)
      bubble.lineBetween(6, 0, 0, tailHeight)
    }

    const typeNextChar = () => {
      if (!textObj || !bubble || !textObj.active || !bubble.active) return

      if (currentIndex < fullMessage.length) {
        currentIndex++
        textObj.setText(fullMessage.substring(0, currentIndex))
        redrawBubble()
        this.scene.time.delayedCall(charDelay, typeNextChar)
      }
    }

    textObj.setText('')
    redrawBubble()
    typeNextChar()

    return fullMessage.length * charDelay
  }
}

export class IslandScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key }
  private moveSpeed = 100
  private currentDirection = 'down'
  private map!: Phaser.Tilemaps.Tilemap
  private buildingMarkers: Phaser.GameObjects.Container[] = []
  private interactiveZones: { x: number; y: number; section: string; label: string }[] = []
  private interactPrompt!: Phaser.GameObjects.Text
  private nearbyBuilding: { section: string; label: string } | null = null
  private interactKey!: Phaser.Input.Keyboard.Key
  private npc!: Phaser.GameObjects.Sprite
  private npcBubble: Phaser.GameObjects.Container | null = null
  private fadeOverlay!: Phaser.GameObjects.Rectangle
  private isTransitioning = false
  private bgMusic!: Phaser.Sound.BaseSound
  private musicStarted = false
  private fireflies: Phaser.GameObjects.Container[] = []
  private leaves: Phaser.GameObjects.Container[] = []
  private catIdle!: Phaser.GameObjects.Sprite
  private catBox!: Phaser.GameObjects.Sprite
  private dialogueZones: DialogueZone[] = []

  constructor() {
    super({ key: 'IslandScene' })
  }

  preload() {
    // Tilemap JSON
    this.load.tilemapTiledJSON('island', '/assets/game/maps/island.json')

    // Character sprites
    this.load.spritesheet('character_walk', '/assets/game/Character_Walk.png', {
      frameWidth: 40,
      frameHeight: 48,
    })
    this.load.spritesheet('character_idle', '/assets/game/Character_Idle.png', {
      frameWidth: 40,
      frameHeight: 48,
    })

    // Grid tilesets
    this.load.image('tileset_rockslope_1_brown', '/assets/game/tilesets/Tileset_RockSlope_1_Brown.png')
    this.load.image('tileset_ground', '/assets/game/tilesets/Tileset_Ground.png')
    this.load.image('atlas_buildings_bridges', '/assets/game/tilesets/Buildings_Bridges.png')
    this.load.image('tileset_water', '/assets/game/tilesets/Tileset_Water.png')
    this.load.image('tileset_road', '/assets/game/tilesets/Tileset_Road.png')

    // Object images (only the ones actually used in the map)
    // Props
    this.load.image('obj_table_large_yellow', '/assets/game/props/Table_Large_Yellow.png')
    this.load.image('obj_dyedcloth_medium_yellow', '/assets/game/props/DyedCloth_Medium_Yellow.png')
    this.load.image('obj_dyedcloth_big_green', '/assets/game/props/DyedCloth_Big_Green.png')
    this.load.image('obj_dyedcloth_medium_green', '/assets/game/props/DyedCloth_Medium_Green.png')
    this.load.image('obj_streetdecoration_2_yellow', '/assets/game/props/StreetDecoration_2_Yellow.png')
    this.load.image('obj_streetdecoration_2_green', '/assets/game/props/StreetDecoration_2_Green.png')
    this.load.image('obj_table_vertical_green_stripe', '/assets/game/props/Table_Vertical_Green_Stripe.png')
    this.load.image('obj_dyedcloth_big_white', '/assets/game/props/DyedCloth_Big_White.png')
    this.load.image('obj_dyeingpowder_yellow', '/assets/game/props/DyeingPowder_Yellow.png')
    this.load.image('obj_barrel_medium_covered', '/assets/game/props/Barrel_Medium_Covered.png')
    this.load.image('obj_crate_steel_2', '/assets/game/props/Crate_Steel_2.png')
    this.load.image('obj_barrel_medium_water', '/assets/game/props/Barrel_Medium_Water.png')
    this.load.image('obj_barrel_medium_cloth', '/assets/game/props/Barrel_Medium_Cloth.png')
    this.load.image('obj_chest_steel_2', '/assets/game/props/Chest_Steel_2.png')
    this.load.image('obj_crate_steel_3', '/assets/game/props/Crate_Steel_3.png')
    this.load.image('obj_barrel_small_covered', '/assets/game/props/Barrel_Small_Covered.png')
    this.load.image('obj_barrel_small_empty', '/assets/game/props/Barrel_Small_Empty.png')
    this.load.image('obj_sign_2', '/assets/game/props/Sign_2.png')
    this.load.image('obj_armorstand_green', '/assets/game/props/ArmorStand_Green.png')
    this.load.image('obj_dyeingpowder_green', '/assets/game/props/DyeingPowder_Green.png')
    this.load.image('obj_lamppost_4', '/assets/game/props/LampPost_4.png')
    this.load.image('obj_lamppost_5', '/assets/game/props/LampPost_5.png')
    this.load.image('obj_dyedcloth_medium_white', '/assets/game/props/DyedCloth_Medium_White.png')
    this.load.image('obj_crate_water_2', '/assets/game/props/Crate_Water_2.png')
    this.load.image('obj_package_1', '/assets/game/props/Package_1.png')
    this.load.image('obj_package_3', '/assets/game/props/Package_3.png')
    this.load.image('obj_bench_1', '/assets/game/props/Bench_1.png')
    this.load.image('obj_bench_7', '/assets/game/props/Bench_7.png')
    this.load.image('obj_bench_2', '/assets/game/props/Bench_2.png')
    this.load.image('obj_bench_3', '/assets/game/props/Bench_3.png')
    this.load.image('obj_bench_6', '/assets/game/props/Bench_6.png')
    this.load.image('obj_bench_5', '/assets/game/props/Bench_5.png')
    this.load.image('obj_chair_left_green', '/assets/game/props/Chair_Left_Green.png')
    this.load.image('obj_chair_front_yellow', '/assets/game/props/Chair_Front_Yellow.png')
    this.load.image('obj_bench_4', '/assets/game/props/Bench_4.png')
    this.load.image('obj_vase_1', '/assets/game/props/Vase_1.png')
    this.load.image('obj_vase_2', '/assets/game/props/Vase_2.png')
    this.load.image('obj_woodcart_1', '/assets/game/props/WoodCart_1.png')
    this.load.image('obj_chest_steel_1', '/assets/game/props/Chest_Steel_1.png')
    this.load.image('obj_chest_gold_1', '/assets/game/props/Chest_Gold_1.png')
    this.load.image('obj_cartwheel_1', '/assets/game/props/CartWheel_1.png')
    this.load.image('obj_banner_medium_yellow_stripe', '/assets/game/props/Banner_Medium_Yellow_Stripe.png')
    this.load.image('obj_banner_medium_green', '/assets/game/props/Banner_Medium_Green.png')
    this.load.image('obj_banner_medium_yellow', '/assets/game/props/Banner_Medium_Yellow.png')
    this.load.image('obj_banner_medium_green_stripe', '/assets/game/props/Banner_Medium_Green_Stripe.png')
    this.load.image('obj_lantern_2', '/assets/game/props/Lantern_2.png')
    this.load.image('obj_treelog_1', '/assets/game/props/TreeLog_1.png')
    this.load.image('obj_treelog_3', '/assets/game/props/TreeLog_3.png')
    this.load.image('obj_treestump_small_lantern', '/assets/game/props/TreeStump_Small_Lantern.png')
    this.load.image('obj_treestump_lantern_1', '/assets/game/props/TreeStump_Lantern_1.png')
    this.load.image('obj_woodstack_1', '/assets/game/props/WoodStack_1.png')
    this.load.image('obj_sack_4', '/assets/game/props/Sack_4.png')
    this.load.image('obj_bulletinboard_2', '/assets/game/props/BulletinBoard_2.png')
    this.load.image('obj_barrel_horizontal_1', '/assets/game/props/Barrel_Horizontal_1.png')
    this.load.image('obj_barrel_small_fish', '/assets/game/props/Barrel_Small_Fish.png')
    this.load.image('obj_basket_apples', '/assets/game/props/Basket_Apples.png')
    this.load.image('obj_crate_small_flowers_red', '/assets/game/props/Crate_Small_Flowers_Red.png')
    this.load.image('obj_crate_wide_hay_1', '/assets/game/props/Crate_Wide_Hay_1.png')
    this.load.image('obj_lamppost_1', '/assets/game/props/LampPost_1.png')
    this.load.image('obj_lamppost_2', '/assets/game/props/LampPost_2.png')
    this.load.image('obj_floatinggrass_1_green', '/assets/game/props/FloatingGrass_1_Green.png')
    this.load.image('obj_floatinggrass_2_green', '/assets/game/props/FloatingGrass_2_Green.png')
    this.load.image('obj_floatinggrass_5_green', '/assets/game/props/FloatingGrass_5_Green.png')
    this.load.image('obj_lilypad_5_green', '/assets/game/props/LilyPad_5_Green.png')
    this.load.image('obj_lilypad_4_green', '/assets/game/props/LilyPad_4_Green.png')
    this.load.image('obj_lilypad_2_green', '/assets/game/props/LilyPad_2_Green.png')
    this.load.image('obj_lilypad_1_green', '/assets/game/props/LilyPad_1_Green.png')
    this.load.image('obj_banner_stick_1_blue', '/assets/game/props/Banner_Stick_1_Blue.png')
    this.load.image('obj_chest_gold_3', '/assets/game/props/Chest_Gold_3.png')

    // Buildings
    this.load.image('obj_marketstand_2_yellow', '/assets/game/buildings/MarketStand_2_Yellow.png')
    this.load.image('obj_tower_bluewood_1_3', '/assets/game/buildings/Tower_BlueWood_1_3.png')
    this.load.image('obj_house_redwood_1_4', '/assets/game/buildings/House_RedWood_1_4.png')

    // Trees and Bushes
    this.load.image('obj_tree_emerald_5', '/assets/game/trees/Tree_Emerald_5.png')
    this.load.image('obj_tree_light_6', '/assets/game/trees/Tree_Light_6.png')
    this.load.image('obj_tree_dark_1', '/assets/game/trees/Tree_Dark_1.png')
    this.load.image('obj_birch_light_1', '/assets/game/trees/Birch_Light_1.png')
    this.load.image('obj_tree_dark_3', '/assets/game/trees/Tree_Dark_3.png')
    this.load.image('obj_birch_emerald_4', '/assets/game/trees/Birch_Emerald_4.png')
    this.load.image('obj_tree_dark_5', '/assets/game/trees/Tree_Dark_5.png')
    this.load.image('obj_birch_dark_3', '/assets/game/trees/Birch_Dark_3.png')
    this.load.image('obj_tree_dark_4', '/assets/game/trees/Tree_Dark_4.png')
    this.load.image('obj_birch_light_2', '/assets/game/trees/Birch_Light_2.png')
    this.load.image('obj_tree_light_2', '/assets/game/trees/Tree_Light_2.png')
    this.load.image('obj_tree_light_7', '/assets/game/trees/Tree_Light_7.png')
    this.load.image('obj_tree_dark_2', '/assets/game/trees/Tree_Dark_2.png')
    this.load.image('obj_tree_emerald_1', '/assets/game/trees/Tree_Emerald_1.png')
    this.load.image('obj_tree_emerald_3', '/assets/game/trees/Tree_Emerald_3.png')
    this.load.image('obj_tree_emerald_4', '/assets/game/trees/Tree_Emerald_4.png')
    this.load.image('obj_bush_dark_9', '/assets/game/trees/Bush_Dark_9.png')
    this.load.image('obj_birch_dark_1', '/assets/game/trees/Birch_Dark_1.png')
    this.load.image('obj_tree_emerald_6', '/assets/game/trees/Tree_Emerald_6.png')
    this.load.image('obj_birch_dark_2', '/assets/game/trees/Birch_Dark_2.png')
    this.load.image('obj_tree_light_1', '/assets/game/trees/Tree_Light_1.png')
    this.load.image('obj_tree_emerald_2', '/assets/game/trees/Tree_Emerald_2.png')
    this.load.image('obj_tree_light_4', '/assets/game/trees/Tree_Light_4.png')
    this.load.image('obj_tree_dark_6', '/assets/game/trees/Tree_Dark_6.png')
    this.load.image('obj_birch_light_3', '/assets/game/trees/Birch_Light_3.png')
    this.load.image('obj_bush_light_8', '/assets/game/trees/Bush_Light_8.png')
    this.load.image('obj_tree_light_5', '/assets/game/trees/Tree_Light_5.png')
    this.load.image('obj_leavybush_emerald_3', '/assets/game/trees/LeavyBush_Emerald_3.png')
    this.load.image('obj_birch_emerald_2', '/assets/game/trees/Birch_Emerald_2.png')
    this.load.image('obj_tree_dark_7', '/assets/game/trees/Tree_Dark_7.png')
    this.load.image('obj_bush_light_3', '/assets/game/trees/Bush_Light_3.png')
    this.load.image('obj_tree_emerald_7', '/assets/game/trees/Tree_Emerald_7.png')
    this.load.image('obj_bush_dark_3', '/assets/game/trees/Bush_Dark_3.png')
    this.load.image('obj_bush_emerald_4', '/assets/game/trees/Bush_Emerald_4.png')
    this.load.image('obj_bush_emerald_6', '/assets/game/trees/Bush_Emerald_6.png')
    this.load.image('obj_birch_emerald_1', '/assets/game/trees/Birch_Emerald_1.png')
    this.load.image('obj_leavybush_emerald_2', '/assets/game/trees/LeavyBush_Emerald_2.png')
    this.load.image('obj_bush_emerald_9', '/assets/game/trees/Bush_Emerald_9.png')
    this.load.image('obj_birch_dark_4', '/assets/game/trees/Birch_Dark_4.png')

    // Rocks
    this.load.image('obj_rock_brown_4', '/assets/game/rocks/Rock_Brown_4.png')
    this.load.image('obj_rock_gray_water_14', '/assets/game/rocks/Rock_Gray_Water_14.png')
    this.load.image('obj_rock_gray_water_2', '/assets/game/rocks/Rock_Gray_Water_2.png')
    this.load.image('obj_rock_gray_water_4', '/assets/game/rocks/Rock_Gray_Water_4.png')
    this.load.image('obj_rock_gray_water_5', '/assets/game/rocks/Rock_Gray_Water_5.png')
    this.load.image('obj_rock_gray_water_3', '/assets/game/rocks/Rock_Gray_Water_3.png')
    this.load.image('obj_rock_gray_grass_11', '/assets/game/rocks/Rock_Gray_Grass_11.png')

    // Music
    this.load.audio('bgMusic', '/assets/game/music/lofi-bg.mp3')

    // Cat sprites
    this.load.spritesheet('cat_idle', '/assets/game/sprites/cat_idle.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('cat_box', '/assets/game/sprites/cat_box.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create() {
    // Create tilemap
    this.map = this.make.tilemap({ key: 'island' })

    // Add tilesets to map
    const groundTileset = this.map.addTilesetImage('Tileset_Ground', 'tileset_ground')
    const waterTileset = this.map.addTilesetImage('Tileset_Water', 'tileset_water')
    const roadTileset = this.map.addTilesetImage('Tileset_Road', 'tileset_road')
    const rockSlopeTileset = this.map.addTilesetImage('Tileset_RockSlope_1_Brown', 'tileset_rockslope_1_brown')
    const bridgeTileset = this.map.addTilesetImage('Atlas_Buildings_Bridges', 'atlas_buildings_bridges')

    const allTilesets = [groundTileset, waterTileset, roadTileset, rockSlopeTileset, bridgeTileset].filter(Boolean) as Phaser.Tilemaps.Tileset[]

    // Build collision map from raw JSON data before creating layers
    this.buildCollisionMap()

    // Create tile layers (order matters for rendering)
    this.map.createLayer('Ground', allTilesets)
    this.map.createLayer('Water', allTilesets)
    this.map.createLayer('Road', allTilesets)
    this.map.createLayer('RockSlopes_1_Brown_Auto', allTilesets)
    this.map.createLayer('RockSlopes_Auto', allTilesets)
    this.map.createLayer('Bridge', allTilesets)

    // Create objects from object layer
    const objectLayer = this.map.getObjectLayer('Objects')
    const buildingsToMark: { x: number; y: number; height: number; key: string }[] = []

    if (objectLayer) {
      // Sort objects by Y position for proper depth ordering
      const sortedObjects = [...objectLayer.objects].sort((a, b) => (a.y || 0) - (b.y || 0))

      for (const obj of sortedObjects) {
        if (obj.gid) {
          // Mask out flip flags (top 3 bits)
          const gid = obj.gid & 0x1FFFFFFF
          const textureKey = GID_TO_KEY[gid]

          if (textureKey && this.textures.exists(textureKey)) {
            // Tiled uses bottom-left origin, Phaser uses center
            // obj.x is left edge, obj.y is bottom edge
            const spriteX = (obj.x || 0) + (obj.width || 0) / 2
            const spriteY = (obj.y || 0) - (obj.height || 0) / 2
            const sprite = this.add.sprite(spriteX, spriteY, textureKey)
            // Use Y position for depth sorting (higher Y = rendered on top)
            sprite.setDepth(obj.y || 0)

            // Track interactive buildings for markers and interaction zones
            if (INTERACTIVE_BUILDINGS[textureKey]) {
              const config = INTERACTIVE_BUILDINGS[textureKey]
              buildingsToMark.push({
                x: spriteX,
                y: (obj.y || 0) - (obj.height || 0), // Top of the building
                height: obj.height || 0,
                key: textureKey
              })
              // Store interaction zone at building base (where player walks)
              this.interactiveZones.push({
                x: spriteX,
                y: obj.y || 0, // Bottom of building (ground level)
                section: config.section,
                label: config.label
              })
            }
          }
        }
      }
    }

    // Create bouncing markers above interactive buildings
    this.createBuildingMarkers(buildingsToMark)

    // Create animations
    this.createAnimations()

    // Spawn player - restore saved position or use default
    const savedPos = sessionStorage.getItem('playerPosition')
    let spawnX = 17 * 16 + 8  // +8 to center in tile
    let spawnY = 15 * 16 + 8
    if (savedPos) {
      const pos = JSON.parse(savedPos)
      spawnX = pos.x
      spawnY = pos.y
    }
    this.player = this.add.sprite(spawnX, spawnY, 'character_idle')
    this.player.play('idle_down')
    this.player.setScale(1) // Native size for 16px tile map
    this.player.setDepth(spawnY) // Initial depth based on Y

    // Add NPC (me) standing near the red house
    const npcX = 6 * 16 + 12
    const npcY = 26 * 16 + 16
    this.npc = this.add.sprite(npcX, npcY, 'character_idle')
    this.npc.play('idle_right')
    this.npc.setScale(1)
    this.npc.setDepth(npcY)

    // Add cats (tile-based positions - 16px per tile, +8 centers in tile)
    const catIdleX = 30 * 16      // tile 30
    const catIdleY = 5 * 16 - 2   // tile ~5
    this.catIdle = this.add.sprite(catIdleX, catIdleY, 'cat_idle')
    this.catIdle.play('cat_idle_anim')
    this.catIdle.setScale(0.8)
    this.catIdle.setDepth(catIdleY)

    const catBoxX = 34 * 16       // tile 34
    const catBoxY = 3 * 16        // tile 3
    this.catBox = this.add.sprite(catBoxX, catBoxY, 'cat_box')
    this.catBox.play('cat_box_anim')
    this.catBox.setScale(0.8)
    this.catBox.setDepth(catBoxY)

    // Create "About me" marker above NPC
    this.createNpcMarker(npcX, npcY)

    // Add interaction zone at NPC position
    this.interactiveZones.push({
      x: npcX,
      y: npcY,
      section: 'about',
      label: 'About me'
    })

    // Add bridge marker and interaction zone (manual - not from tilemap)
    const bridgeX = 680
    const bridgeY = 220
    this.createBridgeMarker(bridgeX, bridgeY)
    this.interactiveZones.push({
      x: bridgeX,
      y: bridgeY, // Interaction zone at bridge entrance
      section: 'travels',
      label: 'Travels'
    })

    // Camera - zoom to fill screen nicely
    const mapWidth = this.map.widthInPixels || 960
    const mapHeight = this.map.heightInPixels || 576
    const scaleX = this.scale.width / mapWidth
    const scaleY = this.scale.height / mapHeight
    const zoom = Math.max(scaleX, scaleY) * 1.2 // Fill the screen + 20% zoom
    this.cameras.main.setZoom(zoom)
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight)

    // Controls
    this.cursors = this.input.keyboard!.createCursorKeys()
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }

    // Debug: Press C to toggle collision overlay
    this.input.keyboard!.addKey('C').on('down', () => this.toggleCollisionDebug())

    // Interaction key (E)
    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    this.interactKey.on('down', () => this.handleInteraction())

    // Interaction prompt (hidden by default)
    this.interactPrompt = this.add.text(0, 0, 'Press E', {
      fontSize: '8px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      resolution: 4,
    })
    this.interactPrompt.setOrigin(0.5, 1)
    this.interactPrompt.setDepth(20001)
    this.interactPrompt.setVisible(false)

    // Show welcome bubble on spawn (only if not seen before)
    if (!sessionStorage.getItem('welcomeSeen')) {
      this.showWelcomeBubble()
    }

    // Create fade overlay for transitions (covers entire screen, starts solid black)
    this.fadeOverlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width * 2,
      this.cameras.main.height * 2,
      0x000000
    )
    this.fadeOverlay.setScrollFactor(0) // Fixed to camera
    this.fadeOverlay.setDepth(50000) // Above everything
    this.fadeOverlay.setAlpha(1) // Start solid black

    // Fade in from black on scene start
    this.tweens.add({
      targets: this.fadeOverlay,
      alpha: 0,
      duration: 400,
      ease: 'Power2'
    })

    // Setup background music (starts on first interaction due to browser autoplay policy)
    this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.3 })

    // Start music on first interaction
    this.input.once('pointerdown', () => this.startMusic())
    this.input.keyboard!.once('keydown', () => this.startMusic())

    // Add particle effects (fireflies + falling leaves)
    this.createParticleEffects()

    // Listen for logo click from UI
    window.addEventListener('logoClicked', () => this.showLogoReply())

    // Create dialogue zones
    const getPlayerPos = () => ({ x: this.player.x, y: this.player.y })
    for (const [, config] of Object.entries(DIALOGUE_ZONES_CONFIG)) {
      const zone = new DialogueZone(
        this,
        {
          bounds: {
            x1: config.bounds.x1 * 16,
            y1: config.bounds.y1 * 16,
            x2: config.bounds.x2 * 16,
            y2: config.bounds.y2 * 16,
          },
          messages: config.messages,
        },
        getPlayerPos
      )
      this.dialogueZones.push(zone)
    }
  }

  private startMusic() {
    if (!this.musicStarted) {
      this.musicStarted = true
      this.bgMusic.play()
    }
  }

  private createParticleEffects() {
    // Create fireflies
    this.createFireflies(25)

    // Create falling leaves
    this.createFallingLeaves()
  }

  private createFireflies(count: number) {
    const mapWidth = this.map.widthInPixels
    const mapHeight = this.map.heightInPixels

    for (let i = 0; i < count; i++) {
      // Random position on the island (avoid water edges)
      const x = 100 + Math.random() * (mapWidth - 200)
      const y = 100 + Math.random() * (mapHeight - 200)

      // Create firefly glow
      const firefly = this.add.container(x, y)

      // Outer glow
      const glow = this.add.circle(0, 0, 4, 0xffff88, 0.3)
      // Inner bright core
      const core = this.add.circle(0, 0, 1.5, 0xffffcc, 0.8)

      firefly.add([glow, core])
      firefly.setDepth(15000)
      firefly.setAlpha(0)

      this.fireflies.push(firefly)

      // Animate firefly
      this.animateFirefly(firefly, i)
    }
  }

  private animateFirefly(firefly: Phaser.GameObjects.Container, index: number) {
    const startDelay = index * 200 + Math.random() * 1000

    // Pulse glow (fade in and out)
    this.tweens.add({
      targets: firefly,
      alpha: { from: 0, to: 0.8 },
      duration: 1500 + Math.random() * 1000,
      yoyo: true,
      repeat: -1,
      delay: startDelay,
      ease: 'Sine.easeInOut'
    })

    // Drift movement
    const driftFirefly = () => {
      const newX = firefly.x + (Math.random() - 0.5) * 40
      const newY = firefly.y + (Math.random() - 0.5) * 30

      this.tweens.add({
        targets: firefly,
        x: Phaser.Math.Clamp(newX, 50, (this.map.widthInPixels || 960) - 50),
        y: Phaser.Math.Clamp(newY, 50, (this.map.heightInPixels || 576) - 50),
        duration: 3000 + Math.random() * 2000,
        ease: 'Sine.easeInOut',
        onComplete: () => driftFirefly()
      })
    }

    this.time.delayedCall(startDelay, driftFirefly)
  }

  private createFallingLeaves() {
    // Spawn leaves periodically
    this.time.addEvent({
      delay: 800,
      callback: () => this.spawnLeaf(),
      loop: true
    })

    // Spawn a few initial leaves
    for (let i = 0; i < 5; i++) {
      this.time.delayedCall(i * 150, () => this.spawnLeaf())
    }
  }

  private spawnLeaf() {
    const mapWidth = this.map.widthInPixels || 960
    const mapHeight = this.map.heightInPixels || 576

    // Random X position
    const startX = 50 + Math.random() * (mapWidth - 100)
    const startY = -10

    // Create leaf
    const leaf = this.add.container(startX, startY)

    // Simple leaf shape using graphics
    const leafGraphics = this.add.graphics()
    const leafColor = Phaser.Utils.Array.GetRandom([0x4a7c3f, 0x5d8a4a, 0x6b9a56, 0x8b6b3d, 0xa67c4a])
    leafGraphics.fillStyle(leafColor, 0.7)
    leafGraphics.fillEllipse(0, 0, 4, 6)

    leaf.add(leafGraphics)
    leaf.setDepth(14000)
    leaf.setScale(0.8 + Math.random() * 0.4)

    this.leaves.push(leaf)

    // Animate falling with sway
    const fallDuration = 8000 + Math.random() * 4000
    const endY = mapHeight + 20
    const swayAmount = 30 + Math.random() * 20

    // Vertical fall
    this.tweens.add({
      targets: leaf,
      y: endY,
      duration: fallDuration,
      ease: 'Linear',
      onComplete: () => {
        leaf.destroy()
        const idx = this.leaves.indexOf(leaf)
        if (idx > -1) this.leaves.splice(idx, 1)
      }
    })

    // Horizontal sway
    this.tweens.add({
      targets: leaf,
      x: startX + swayAmount,
      duration: 1500 + Math.random() * 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })

    // Rotation
    this.tweens.add({
      targets: leaf,
      angle: 360,
      duration: 3000 + Math.random() * 2000,
      repeat: -1,
      ease: 'Linear'
    })
  }

  private welcomeBubble: Phaser.GameObjects.Container | null = null
  private welcomeMessages = [
    'Heyho friend!',
    'Welcome to my cozy corner\nof the internet.',
    'Feel free to roam around\nusing WASD and press E\nto interact with venues.',
  ]
  private currentMessageIndex = 0

  private showWelcomeBubble() {
    this.currentMessageIndex = 0
    this.showNextMessage()
  }

  private typewriterEffect(
    textObj: Phaser.GameObjects.Text,
    fullMessage: string,
    bubble: Phaser.GameObjects.Graphics,
    padding: number,
    onComplete?: () => void
  ) {
    const charDelay = 30 // ms per character
    let currentIndex = 0
    const tailHeight = 10

    const redrawBubble = () => {
      // Check if objects still exist before drawing
      if (!textObj || !bubble || !textObj.active || !bubble.active) return

      const bubbleWidth = Math.max(textObj.width + padding * 2, 40)
      const bubbleHeight = textObj.height + padding * 2

      bubble.clear()
      bubble.fillStyle(0xffffff, 0.95)
      bubble.lineStyle(2, 0x3d3d3d, 1)
      bubble.fillRoundedRect(-bubbleWidth / 2, -bubbleHeight, bubbleWidth, bubbleHeight, 6)
      bubble.strokeRoundedRect(-bubbleWidth / 2, -bubbleHeight, bubbleWidth, bubbleHeight, 6)

      // Tail
      bubble.fillStyle(0xffffff, 1)
      bubble.fillTriangle(-6, -1, 6, -1, 0, tailHeight)
      bubble.lineStyle(2, 0x3d3d3d, 1)
      bubble.lineBetween(-6, 0, 0, tailHeight)
      bubble.lineBetween(6, 0, 0, tailHeight)
    }

    const typeNextChar = () => {
      // Stop if objects have been destroyed
      if (!textObj || !bubble || !textObj.active || !bubble.active) return

      if (currentIndex < fullMessage.length) {
        currentIndex++
        textObj.setText(fullMessage.substring(0, currentIndex))
        redrawBubble()
        this.time.delayedCall(charDelay, typeNextChar)
      } else if (onComplete) {
        onComplete()
      }
    }

    textObj.setText('')
    redrawBubble() // Draw initial small bubble
    typeNextChar()

    return fullMessage.length * charDelay // Return total typing duration
  }

  private showNextMessage() {
    // Clean up previous bubble
    if (this.welcomeBubble) {
      this.welcomeBubble.destroy()
      this.welcomeBubble = null
    }

    // Check if we're done
    if (this.currentMessageIndex >= this.welcomeMessages.length) {
      sessionStorage.setItem('welcomeSeen', 'true')
      return
    }

    const message = this.welcomeMessages[this.currentMessageIndex]

    // Create container for bubble (tail points to player head)
    this.welcomeBubble = this.add.container(this.player.x, this.player.y - 30)
    this.welcomeBubble.setDepth(30000)
    this.welcomeBubble.setAlpha(0)

    const padding = 8

    // Create text (will be filled by typewriter)
    const text = this.add.text(0, -padding, '', {
      fontSize: '7px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#2d2d2d',
      align: 'center',
      lineSpacing: 4,
      resolution: 4,
    })
    text.setOrigin(0.5, 1)

    // Create bubble graphics (will be redrawn by typewriter)
    const bubble = this.add.graphics()

    this.welcomeBubble.add([bubble, text])

    // Fade in
    this.tweens.add({
      targets: this.welcomeBubble,
      alpha: 1,
      duration: 150,
    })

    // Start typewriter effect (bubble grows with text)
    const typingDuration = this.typewriterEffect(text, message, bubble, padding)

    // Auto-advance after typing completes + reading time
    const readingDelay = Math.max(1500, message.split(/\s+/).length * 300)
    const totalDelay = 150 + typingDuration + readingDelay

    this.time.delayedCall(totalDelay, () => {
      this.currentMessageIndex++
      this.showNextMessage()
    })
  }

  private createAnimations() {
    const walkFrames = { left: [0, 3], right: [4, 7], up: [8, 11], down: [12, 15] }
    const idleFrames = { left: [0, 3], right: [4, 7], up: [8, 11], down: [12, 15] }

    for (const [dir, [start, end]] of Object.entries(walkFrames)) {
      this.anims.create({
        key: `walk_${dir}`,
        frames: this.anims.generateFrameNumbers('character_walk', { start, end }),
        frameRate: 8,
        repeat: -1
      })
    }

    for (const [dir, [start, end]] of Object.entries(idleFrames)) {
      this.anims.create({
        key: `idle_${dir}`,
        frames: this.anims.generateFrameNumbers('character_idle', { start, end }),
        frameRate: 6,
        repeat: -1
      })
    }

    // Cat animations
    this.anims.create({
      key: 'cat_idle_anim',
      frames: this.anims.generateFrameNumbers('cat_idle', { start: 0, end: 9 }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'cat_box_anim',
      frames: this.anims.generateFrameNumbers('cat_box', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    })
  }

  private createBuildingMarkers(buildings: { x: number; y: number; height: number; key: string }[]) {
    for (const building of buildings) {
      const config = INTERACTIVE_BUILDINGS[building.key]
      if (!config) continue

      // Create container at building top (with optional X/Y offset)
      const markerX = building.x + (config.offsetX || 0)
      const markerY = building.y - 16 + (config.offsetY || 0) // 16px above building top
      const container = this.add.container(markerX, markerY)
      container.setDepth(20000) // Always on top

      // Create down-pointing arrow using graphics
      const arrow = this.add.graphics()
      arrow.fillStyle(0xffdd44, 1) // Golden yellow
      arrow.lineStyle(2, 0x000000, 0.5) // Dark outline

      // Draw arrow shape (down-pointing triangle with stem)
      arrow.beginPath()
      arrow.moveTo(0, 8)      // Bottom point
      arrow.lineTo(-6, -2)    // Top left
      arrow.lineTo(-3, -2)    // Inner left
      arrow.lineTo(-3, -8)    // Stem top left
      arrow.lineTo(3, -8)     // Stem top right
      arrow.lineTo(3, -2)     // Inner right
      arrow.lineTo(6, -2)     // Top right
      arrow.closePath()
      arrow.fillPath()
      arrow.strokePath()

      container.add(arrow)

      // Add text label above the arrow
      const label = this.add.text(0, -18, config.label, {
        fontSize: '8px',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
        resolution: 4, // Higher resolution for crisp text when zoomed
      })
      label.setOrigin(0.5, 1) // Center horizontally, anchor at bottom
      container.add(label)

      // Store reference
      this.buildingMarkers.push(container)

      // Add bouncing animation with slight delay offset per building
      const delay = this.buildingMarkers.length * 200
      this.tweens.add({
        targets: container,
        y: markerY - 6, // Bounce 6px up
        duration: 500,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        delay: delay
      })
    }
  }

  private createNpcMarker(npcX: number, npcY: number) {
    // Create marker above NPC's head
    const markerY = npcY - 40 // Above the NPC sprite
    const container = this.add.container(npcX, markerY)
    container.setDepth(20000)

    // Create down-pointing arrow using graphics
    const arrow = this.add.graphics()
    arrow.fillStyle(0xffdd44, 1) // Golden yellow
    arrow.lineStyle(2, 0x000000, 0.5) // Dark outline

    // Draw arrow shape (down-pointing triangle with stem)
    arrow.beginPath()
    arrow.moveTo(0, 8)      // Bottom point
    arrow.lineTo(-6, -2)    // Top left
    arrow.lineTo(-3, -2)    // Inner left
    arrow.lineTo(-3, -8)    // Stem top left
    arrow.lineTo(3, -8)     // Stem top right
    arrow.lineTo(3, -2)     // Inner right
    arrow.lineTo(6, -2)     // Top right
    arrow.closePath()
    arrow.fillPath()
    arrow.strokePath()

    container.add(arrow)

    // Add text label above the arrow
    const label = this.add.text(0, -18, 'About me', {
      fontSize: '8px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      resolution: 4,
    })
    label.setOrigin(0.5, 1)
    container.add(label)

    this.buildingMarkers.push(container)

    // Add bouncing animation
    this.tweens.add({
      targets: container,
      y: markerY - 6,
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      delay: 400 // Offset from other markers
    })
  }

  private createBridgeMarker(bridgeX: number, bridgeY: number) {
    // Create marker above the bridge
    const markerY = bridgeY - 30
    const container = this.add.container(bridgeX, markerY)
    container.setDepth(20000)

    // Create down-pointing arrow
    const arrow = this.add.graphics()
    arrow.fillStyle(0xffdd44, 1)
    arrow.lineStyle(2, 0x000000, 0.5)

    arrow.beginPath()
    arrow.moveTo(0, 8)
    arrow.lineTo(-6, -2)
    arrow.lineTo(-3, -2)
    arrow.lineTo(-3, -8)
    arrow.lineTo(3, -8)
    arrow.lineTo(3, -2)
    arrow.lineTo(6, -2)
    arrow.closePath()
    arrow.fillPath()
    arrow.strokePath()

    container.add(arrow)

    // Add text label
    const label = this.add.text(0, -18, 'Travels', {
      fontSize: '8px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
      resolution: 4,
    })
    label.setOrigin(0.5, 1)
    container.add(label)

    this.buildingMarkers.push(container)

    // Add bouncing animation
    this.tweens.add({
      targets: container,
      y: markerY - 6,
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      delay: 600
    })
  }

  update() {
    let velocityX = 0, velocityY = 0, isMoving = false
    let newDirection = this.currentDirection

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      velocityX = -this.moveSpeed; newDirection = 'left'; isMoving = true
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      velocityX = this.moveSpeed; newDirection = 'right'; isMoving = true
    }
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      velocityY = -this.moveSpeed; newDirection = 'up'; isMoving = true
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      velocityY = this.moveSpeed; newDirection = 'down'; isMoving = true
    }

    const anim = isMoving ? `walk_${newDirection}` : `idle_${this.currentDirection}`
    if (this.player.anims.currentAnim?.key !== anim) this.player.play(anim)
    if (isMoving) this.currentDirection = newDirection

    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707; velocityY *= 0.707
    }

    const delta = this.game.loop.delta / 1000
    const newX = this.player.x + velocityX * delta
    const newY = this.player.y + velocityY * delta

    // Check collision before moving
    if (this.canMoveTo(newX, newY)) {
      this.player.x = newX
      this.player.y = newY
    } else {
      // Try moving on just one axis
      if (this.canMoveTo(newX, this.player.y)) {
        this.player.x = newX
      } else if (this.canMoveTo(this.player.x, newY)) {
        this.player.y = newY
      }
    }

    // Update player depth based on Y position for proper sorting
    this.player.setDepth(this.player.y)

    // Update welcome bubble position to follow player
    if (this.welcomeBubble) {
      this.welcomeBubble.setPosition(this.player.x, this.player.y - 30)
    }

    // Update player bubble position to follow player
    if (this.playerBubble) {
      this.playerBubble.setPosition(this.player.x, this.player.y - 30)
    }

    // Check proximity to interactive buildings
    this.checkBuildingProximity()

    // Update all dialogue zones
    for (const zone of this.dialogueZones) {
      zone.update()
    }
  }

  private checkBuildingProximity() {
    const INTERACT_DISTANCE = 40 // pixels
    this.nearbyBuilding = null

    for (const zone of this.interactiveZones) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, zone.x, zone.y)
      if (dist < INTERACT_DISTANCE) {
        this.nearbyBuilding = { section: zone.section, label: zone.label }
        break
      }
    }

    // Show/hide interaction prompt
    if (this.nearbyBuilding) {
      this.interactPrompt.setPosition(this.player.x, this.player.y - 30)
      this.interactPrompt.setVisible(true)
    } else {
      this.interactPrompt.setVisible(false)
    }
  }

  private handleInteraction() {
    if (this.nearbyBuilding && !this.isTransitioning) {
      if (this.nearbyBuilding.section === 'about') {
        this.showNpcReply()
      } else {
        // Fade to black then navigate
        this.transitionToPage(`/${this.nearbyBuilding.section}`)
      }
    }
  }

  private transitionToPage(url: string) {
    this.isTransitioning = true

    // Save player position
    sessionStorage.setItem('playerPosition', JSON.stringify({
      x: this.player.x,
      y: this.player.y
    }))

    // Fade to black
    this.tweens.add({
      targets: this.fadeOverlay,
      alpha: 1,
      duration: 400,
      ease: 'Power2',
      onComplete: () => {
        window.location.href = url
      }
    })
  }

  private npcReplies = [
    "Hey there! Chat's coming soon.",
    "Still setting things up here!",
    "Check back later for a chat!",
    "Nice to meet you!",
  ]
  private lastReplyIndex = -1

  private logoReplies = [
    "That's my site!",
    "You found the logo!",
    "Yep, aj was here.",
    "Thanks for visiting!",
    "Welcome to my corner!",
  ]
  private lastLogoReplyIndex = -1

  private showNpcReply() {
    // Clean up previous bubble
    if (this.npcBubble) {
      this.npcBubble.destroy()
      this.npcBubble = null
    }

    // Pick a random reply (different from last)
    let replyIndex = Math.floor(Math.random() * this.npcReplies.length)
    if (replyIndex === this.lastReplyIndex) {
      replyIndex = (replyIndex + 1) % this.npcReplies.length
    }
    this.lastReplyIndex = replyIndex
    const message = this.npcReplies[replyIndex]

    // Create bubble above NPC
    this.npcBubble = this.add.container(this.npc.x, this.npc.y - 30)
    this.npcBubble.setDepth(30000)
    this.npcBubble.setAlpha(0)

    const padding = 8

    // Create text (will be filled by typewriter)
    const text = this.add.text(0, -padding, '', {
      fontSize: '7px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#2d2d2d',
      align: 'center',
      lineSpacing: 4,
      resolution: 4,
    })
    text.setOrigin(0.5, 1)

    // Create bubble graphics (will be redrawn by typewriter)
    const bubble = this.add.graphics()

    this.npcBubble.add([bubble, text])

    // Fade in
    this.tweens.add({
      targets: this.npcBubble,
      alpha: 1,
      duration: 150,
    })

    // Start typewriter effect (bubble grows with text)
    const typingDuration = this.typewriterEffect(text, message, bubble, padding)

    // Auto-dismiss after typing + reading time
    const dismissDelay = 150 + typingDuration + 2000
    this.time.delayedCall(dismissDelay, () => {
      if (this.npcBubble) {
        this.tweens.add({
          targets: this.npcBubble,
          alpha: 0,
          duration: 200,
          onComplete: () => {
            this.npcBubble?.destroy()
            this.npcBubble = null
          }
        })
      }
    })
  }

  private playerBubble: Phaser.GameObjects.Container | null = null
  private playerBubbleDismissTimer: Phaser.Time.TimerEvent | null = null

  private showLogoReply() {
    // Cancel any pending dismiss timer
    if (this.playerBubbleDismissTimer) {
      this.playerBubbleDismissTimer.destroy()
      this.playerBubbleDismissTimer = null
    }

    // Clean up previous bubble
    if (this.playerBubble) {
      this.playerBubble.destroy()
      this.playerBubble = null
    }

    // Cycle through replies in order
    this.lastLogoReplyIndex = (this.lastLogoReplyIndex + 1) % this.logoReplies.length
    const message = this.logoReplies[this.lastLogoReplyIndex]

    // Create bubble above player
    this.playerBubble = this.add.container(this.player.x, this.player.y - 30)
    this.playerBubble.setDepth(30000)
    this.playerBubble.setAlpha(0)

    const padding = 8

    // Create text (will be filled by typewriter)
    const text = this.add.text(0, -padding, '', {
      fontSize: '7px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#2d2d2d',
      align: 'center',
      lineSpacing: 4,
      resolution: 4,
    })
    text.setOrigin(0.5, 1)

    // Create bubble graphics (will be redrawn by typewriter)
    const bubble = this.add.graphics()

    this.playerBubble.add([bubble, text])

    // Fade in
    this.tweens.add({
      targets: this.playerBubble,
      alpha: 1,
      duration: 150,
    })

    // Start typewriter effect (bubble grows with text)
    const typingDuration = this.typewriterEffect(text, message, bubble, padding)

    // Auto-dismiss after typing + reading time
    const dismissDelay = 150 + typingDuration + 2000
    this.playerBubbleDismissTimer = this.time.delayedCall(dismissDelay, () => {
      if (this.playerBubble) {
        this.tweens.add({
          targets: this.playerBubble,
          alpha: 0,
          duration: 200,
          onComplete: () => {
            this.playerBubble?.destroy()
            this.playerBubble = null
          }
        })
      }
    })
  }

  // 60x36 collision grid: . = walkable, # = blocked
  // Edit this to fine-tune collision!
  private static readonly COLLISION_GRID = [
    '#####################################################.......', // y=0
    '################################.....################.......', // y=1
    '###############################......###############........', // y=2
    '##############################.......##############.........', // y=3
    '#############################........##############.........', // y=4
    '#############################........#............#.........', // y=5
    '#############################........#............#.........', // y=6
    '###########....##########...#.......##............#.........', // y=7
    '###########....##########...#.......##............#........#', // y=8
    '###########....##########...#.......##............#......###', // y=9
    '###########....####.........####....#............##.....####', // y=10
    '########....................####..###............#......####', // y=11
    '########.......................#....##############.....#####', // y=12
    '########...............................................#####', // y=13
    '########.......#...#...................................#####', // y=14
    '########......##...######...........##############....#####', // y=15
    '########.....##.........###....#....#..................#####', // y=16
    '#####........#............#....#....#............#......####', // y=17
    '#####........#............#....#....#............#.......###', // y=18
    '#####........#............#...##....#............#.......###', // y=19
    '#####........#............#...#.....#............#.......###', // y=20
    '##########...#...........##...#.....##...........#.......###', // y=21
    '##########...#...........#....#......#...........#.......###', // y=22
    '##########...##..........#....#......#...........##.......##', // y=23
    '###########...##.........#....#......#...........##.......##', // y=24
    '###########....###......##....#......#...........##........#', // y=25
    '#####.............##....#.....#......#............#........#', // y=26
    '#####.........#######...#.....#......#............#.........', // y=27
    '#####.........#####...........#.....##............#.........', // y=28
    '#######.......................#.....##............#.........', // y=29
    '#######......................##.....##...........##.........', // y=30
    '##########..............##############...........##..........', // y=31
    '##########..............##############..........###..........', // y=32
    '######################################..........##...........', // y=33
    '#################################################...........', // y=34
    '#################################################...........', // y=35
  ]

  private collisionMap: boolean[][] = []
  private mapWidthTiles = 60
  private mapHeightTiles = 36

  private buildCollisionMap() {
    this.mapHeightTiles = IslandScene.COLLISION_GRID.length
    this.mapWidthTiles = IslandScene.COLLISION_GRID[0]?.length || 60

    for (let y = 0; y < this.mapHeightTiles; y++) {
      this.collisionMap[y] = []
      const row = IslandScene.COLLISION_GRID[y] || ''
      for (let x = 0; x < this.mapWidthTiles; x++) {
        this.collisionMap[y][x] = row[x] !== '#'
      }
    }
    console.log('Collision map built:', this.mapWidthTiles, 'x', this.mapHeightTiles)
  }

  // Toggle with 'C' key - shows collision overlay
  private debugOverlay: Phaser.GameObjects.Graphics | null = null
  private showCollisionDebug = false

  private toggleCollisionDebug() {
    this.showCollisionDebug = !this.showCollisionDebug

    if (this.showCollisionDebug) {
      if (!this.debugOverlay) {
        this.debugOverlay = this.add.graphics()
        this.debugOverlay.setDepth(10000) // On top of everything
      }

      this.debugOverlay.clear()

      // Draw collision tiles
      for (let y = 0; y < this.mapHeightTiles; y++) {
        for (let x = 0; x < this.mapWidthTiles; x++) {
          const walkable = this.collisionMap[y]?.[x]
          // Red = blocked, Green = walkable (semi-transparent)
          this.debugOverlay.fillStyle(walkable ? 0x00ff00 : 0xff0000, 0.3)
          this.debugOverlay.fillRect(x * 16, y * 16, 16, 16)
        }
      }

      // Draw dialogue zone boundaries (iterates over DIALOGUE_ZONES_CONFIG)
      const zoneColors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ffff]  // cyan, magenta, yellow...
      let colorIndex = 0
      for (const [, config] of Object.entries(DIALOGUE_ZONES_CONFIG)) {
        const b = config.bounds
        this.debugOverlay.lineStyle(3, zoneColors[colorIndex % zoneColors.length], 1)
        this.debugOverlay.strokeRect(b.x1 * 16, b.y1 * 16, (b.x2 - b.x1) * 16, (b.y2 - b.y1) * 16)
        colorIndex++
      }

      console.log('Collision debug ON - red=blocked, green=walkable, colored outlines=dialogue zones')
    } else {
      this.debugOverlay?.clear()
      console.log('Collision debug OFF')
    }
  }

  private canMoveTo(x: number, y: number): boolean {
    // Convert world coords to tile coords
    const tileX = Math.floor(x / 16)
    const tileY = Math.floor(y / 16)

    // Check bounds
    if (tileX < 0 || tileX >= this.mapWidthTiles || tileY < 0 || tileY >= this.mapHeightTiles) {
      return false
    }

    // Check collision map
    return this.collisionMap[tileY]?.[tileX] ?? false
  }
}
