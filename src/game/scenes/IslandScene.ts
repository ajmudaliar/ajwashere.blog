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

export class IslandScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key }
  private moveSpeed = 100
  private currentDirection = 'down'
  private map!: Phaser.Tilemaps.Tilemap

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
            const sprite = this.add.sprite(
              (obj.x || 0) + (obj.width || 0) / 2,
              (obj.y || 0) - (obj.height || 0) / 2,
              textureKey
            )
            // Use Y position for depth sorting (higher Y = rendered on top)
            sprite.setDepth(obj.y || 0)
          }
        }
      }
    }

    // Create animations
    this.createAnimations()

    // Spawn player at tile (23, 23) - center of island
    const spawnX = 21 * 16 + 8  // +8 to center in tile
    const spawnY = 22 * 16 + 8
    this.player = this.add.sprite(spawnX, spawnY, 'character_idle')
    this.player.play('idle_down')
    this.player.setScale(1) // Native size for 16px tile map
    this.player.setDepth(spawnY) // Initial depth based on Y

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
    '###########....####.........#.......##............#......###', // y=9
    '###########.................####....#............##.....####', // y=10
    '########....................####..###............#......####', // y=11
    '########.......................#....##############.....#####', // y=12
    '########...............................................#####', // y=13
    '########.......#...#...................................#####', // y=14
    '########......##...######..............................#####', // y=15
    '########.....##.........###....#....#############......#####', // y=16
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

      for (let y = 0; y < this.mapHeightTiles; y++) {
        for (let x = 0; x < this.mapWidthTiles; x++) {
          const walkable = this.collisionMap[y]?.[x]
          // Red = blocked, Green = walkable (semi-transparent)
          this.debugOverlay.fillStyle(walkable ? 0x00ff00 : 0xff0000, 0.3)
          this.debugOverlay.fillRect(x * 16, y * 16, 16, 16)
        }
      }
      console.log('Collision debug ON - red=blocked, green=walkable')
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
