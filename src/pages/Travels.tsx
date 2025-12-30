import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Globe } from './travels/GlobeScene'
import { JourneySidebar } from './travels/JourneySidebar'
import { LIVED_LOCATIONS, UNIQUE_TRAVELED_LOCATIONS, type Location } from './travels/travel-data'

// Calculate stats
const countriesLived = [...new Set(LIVED_LOCATIONS.map(l => l.country))].length
const citiesLived = LIVED_LOCATIONS.length
const destinationsTraveled = UNIQUE_TRAVELED_LOCATIONS.length
const countriesTraveled = [...new Set(UNIQUE_TRAVELED_LOCATIONS.map(l => l.country))].length

export function Travels() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [targetLocation, setTargetLocation] = useState<Location | null>(null)

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setTargetLocation(location)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#0a0a12',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 300],
          fov: 50,
          near: 1,
          far: 1000,
        }}
        style={{ width: '100%', height: '100%' }}
        onPointerMissed={() => setSelectedLocation(null)}
      >
        <Globe
          onLocationClick={setSelectedLocation}
          targetLocation={targetLocation}
          onTargetReached={() => setTargetLocation(null)}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={150}
          maxDistance={500}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      <JourneySidebar
        onLocationSelect={handleLocationSelect}
        selectedLocation={selectedLocation}
      />

      {/* Back link */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          color: '#10b981',
          textDecoration: 'none',
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: '0.9rem',
          padding: '0.5rem 1rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '4px',
          background: 'rgba(10, 10, 18, 0.8)',
          transition: 'all 0.2s ease',
          zIndex: 50,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(10, 10, 18, 0.8)'
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
        }}
      >
        &larr; Back to the island
      </Link>

      {/* Stats Card */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '2rem',
          transform: 'translateY(-50%)',
          background: 'rgba(10, 10, 18, 0.8)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '4px',
          padding: '1.25rem',
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'rgb(99, 179, 237)' }}>
              {citiesLived}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              cities lived
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: 'rgb(99, 179, 237)' }}>
              {countriesLived}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              countries called home
            </div>
          </div>
          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#10b981' }}>
              {destinationsTraveled}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              destinations explored
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 600, color: '#10b981' }}>
              {countriesTraveled}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              countries visited
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.6)',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgb(99, 179, 237)' }} />
          <span>Places I've lived</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          <span>Places I've traveled</span>
        </div>
      </div>
    </div>
  )
}
