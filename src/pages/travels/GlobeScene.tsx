import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import ThreeGlobe from 'three-globe'
import * as THREE from 'three'
import { LIVED_LOCATIONS, UNIQUE_TRAVELED_LOCATIONS, TRAVEL_ARCS, HOME_LOCATION, type Location } from './travel-data'

// Colors - RGB values for interpolation
const BLUE_RGB = '99,179,237'
const GREEN_RGB = '16,185,129'
const ATMOSPHERE_COLOR = '#63b3ed'

// Earth texture URLs
const EARTH_URL = '//unpkg.com/three-globe/example/img/earth-day.jpg'
const EARTH_TOPOLOGY_URL = '//unpkg.com/three-globe/example/img/earth-topology.png'

// Convert lat/lng to globe rotation
function lngToRotationY(lng: number): number {
  return -lng * (Math.PI / 180)
}

function latToRotationX(lat: number): number {
  return lat * (Math.PI / 180)
}

interface GlobeProps {
  onLocationClick?: (location: Location | null) => void
  targetLocation?: Location | null
  onTargetReached?: () => void
}

export function Globe({ onLocationClick, targetLocation, onTargetReached }: GlobeProps) {
  const globeRef = useRef<ThreeGlobe | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const targetRotationYRef = useRef<number | null>(null)
  const targetRotationXRef = useRef<number | null>(null)
  const isAutoRotating = useRef(true)

  // Initialize globe
  const globe = useMemo(() => {
    const g = new ThreeGlobe({ animateIn: false })

    // Globe appearance
    g.globeImageUrl(EARTH_URL)
    g.bumpImageUrl(EARTH_TOPOLOGY_URL)
    g.showGlobe(true)
    g.showAtmosphere(true)
    g.atmosphereColor(ATMOSPHERE_COLOR)
    g.atmosphereAltitude(0.3)

    // Rings/Ripples - only for places lived
    const ringsData = LIVED_LOCATIONS.map(loc => ({
      lat: loc.lat,
      lng: loc.lng,
      maxR: 3,
      propagationSpeed: 0.8,
      repeatPeriod: 1000,
      color: BLUE_RGB,
    }))

    g.ringsData(ringsData)
    g.ringLat('lat')
    g.ringLng('lng')
    g.ringColor((d: object) => {
      const ring = d as { color: string }
      return (t: number) => `rgba(${ring.color},${1 - t})`
    })
    g.ringMaxRadius('maxR')
    g.ringPropagationSpeed('propagationSpeed')
    g.ringRepeatPeriod('repeatPeriod')

    // Center points/markers - thin and tall pins (no animation)
    const allLocations = [...LIVED_LOCATIONS, ...UNIQUE_TRAVELED_LOCATIONS]
    g.pointsData(allLocations)
    g.pointLat('lat')
    g.pointLng('lng')
    g.pointColor((d: object) => {
      const loc = d as Location
      return loc.type === 'lived' ? `rgb(${BLUE_RGB})` : `rgb(${GREEN_RGB})`
    })
    g.pointAltitude(0.10)
    g.pointRadius(0.08)
    g.pointsMerge(true)
    g.pointsTransitionDuration(0)

    // Labels - using three-globe's built-in labels
    g.labelsData(allLocations)
    g.labelLat('lat')
    g.labelLng('lng')
    g.labelText('name')
    g.labelSize(1)
    g.labelDotRadius(0.5)
    g.labelColor((d: object) => {
      const loc = d as Location
      return loc.type === 'lived' ? `rgb(${BLUE_RGB})` : `rgb(${GREEN_RGB})`
    })
    g.labelAltitude(0.10)
    g.labelsTransitionDuration(0)

    // Arcs from each origin to destination
    const arcsWithColor = TRAVEL_ARCS.map(arc => ({
      ...arc,
      color: [`rgba(${GREEN_RGB},0.6)`, `rgba(${GREEN_RGB},0.6)`],
    }))
    g.arcsData(arcsWithColor)
    g.arcStartLat('startLat')
    g.arcStartLng('startLng')
    g.arcEndLat('endLat')
    g.arcEndLng('endLng')
    g.arcColor('color')
    g.arcStroke(0.5)
    g.arcDashLength(0.4)
    g.arcDashGap(3)
    g.arcDashInitialGap(() => Math.random() * 5)
    g.arcDashAnimateTime(1000)

    return g
  }, [])

  // Customize globe material
  useEffect(() => {
    if (globe) {
      const material = globe.globeMaterial() as THREE.MeshPhongMaterial
      material.bumpScale = 5
      material.shininess = 10
      globeRef.current = globe
    }
  }, [globe])

  // Set initial rotation to face Montreal
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = lngToRotationY(HOME_LOCATION.lng)
      groupRef.current.rotation.x = latToRotationX(HOME_LOCATION.lat)
    }
  }, [])

  // Handle target location change - rotate to that location
  useEffect(() => {
    if (targetLocation && groupRef.current) {
      isAutoRotating.current = false
      targetRotationYRef.current = lngToRotationY(targetLocation.lng)
      targetRotationXRef.current = latToRotationX(targetLocation.lat)
    }
  }, [targetLocation])

  // Animation loop
  const baseDistance = 300
  useFrame(() => {
    if (!groupRef.current) return

    // If we have a target rotation, smoothly rotate towards it
    const hasTargetY = targetRotationYRef.current !== null
    const hasTargetX = targetRotationXRef.current !== null

    if (hasTargetY || hasTargetX) {
      let yDone = !hasTargetY
      let xDone = !hasTargetX

      // Handle Y rotation (longitude)
      if (hasTargetY) {
        const currentY = groupRef.current.rotation.y
        const targetY = targetRotationYRef.current!
        let diffY = targetY - currentY
        while (diffY > Math.PI) diffY -= Math.PI * 2
        while (diffY < -Math.PI) diffY += Math.PI * 2

        if (Math.abs(diffY) < 0.01) {
          groupRef.current.rotation.y = targetY
          targetRotationYRef.current = null
          yDone = true
        } else {
          groupRef.current.rotation.y += diffY * 0.05
        }
      }

      // Handle X rotation (latitude)
      if (hasTargetX) {
        const currentX = groupRef.current.rotation.x
        const targetX = targetRotationXRef.current!
        const diffX = targetX - currentX

        if (Math.abs(diffX) < 0.01) {
          groupRef.current.rotation.x = targetX
          targetRotationXRef.current = null
          xDone = true
        } else {
          groupRef.current.rotation.x += diffX * 0.05
        }
      }

      // Both done - re-enable auto rotation
      if (yDone && xDone) {
        isAutoRotating.current = false // Don't auto-rotate after focusing
        onTargetReached?.()
      }
    }

    // Scale markers based on zoom
    if (globeRef.current) {
      const currentDistance = camera.position.length()
      const scale = currentDistance / baseDistance
      globeRef.current.pointRadius(0.08 * scale)
      globeRef.current.ringMaxRadius(6 * scale)
    }
  })

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 300)
  }, [camera])

  // Handle click on globe
  const handleClick = (event: THREE.Event) => {
    if (!onLocationClick || !globeRef.current) return

    const threeEvent = event as unknown as { point?: THREE.Vector3 }
    if (!threeEvent.point) return

    const point = threeEvent.point.clone().normalize()
    const lat = Math.asin(point.y) * (180 / Math.PI)
    const lng = Math.atan2(point.x, point.z) * (180 / Math.PI)

    const allLocations = [...LIVED_LOCATIONS, ...UNIQUE_TRAVELED_LOCATIONS]
    let closestLocation: Location | null = null
    let closestDistance = Infinity

    for (const loc of allLocations) {
      const distance = Math.sqrt(
        Math.pow(lat - loc.lat, 2) + Math.pow(lng - loc.lng, 2)
      )
      if (distance < closestDistance && distance < 15) {
        closestDistance = distance
        closestLocation = loc
      }
    }

    onLocationClick(closestLocation)
  }

  return (
    <group ref={groupRef}>
      <primitive object={globe} onClick={handleClick} />
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight position={[100, 50, 100]} intensity={2} color="#ffffff" />
      <directionalLight position={[-100, -50, -100]} intensity={0.8} color="#87ceeb" />
    </group>
  )
}
