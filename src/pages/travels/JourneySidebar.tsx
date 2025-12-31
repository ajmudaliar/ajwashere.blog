import { LIVED_LOCATIONS, UNIQUE_TRAVELED_LOCATIONS, type Location } from './travel-data'

interface JourneySidebarProps {
  onLocationSelect: (location: Location) => void
  selectedLocation: Location | null
}

export function JourneySidebar({ onLocationSelect, selectedLocation }: JourneySidebarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
        width: '200px',
        background: 'rgba(10, 10, 18, 0.8)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '4px',
        padding: '1rem',
        fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.6)',
        zIndex: 50,
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
    >
      {/* Journey Section - Lived */}
      <div style={{ marginBottom: '1rem' }}>
        <h3
          style={{
            margin: '0 0 0.75rem 0',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(99, 179, 237, 0.8)',
            fontWeight: 600,
          }}
        >
          Journey
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {LIVED_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onLocationSelect(loc)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.35rem 0.5rem',
                background: selectedLocation?.id === loc.id ? 'rgba(99, 179, 237, 0.2)' : 'transparent',
                border: selectedLocation?.id === loc.id ? '1px solid rgba(99, 179, 237, 0.5)' : '1px solid transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                color: selectedLocation?.id === loc.id ? 'rgb(99, 179, 237)' : loc.current ? 'rgb(99, 179, 237)' : 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedLocation?.id !== loc.id) {
                  e.currentTarget.style.background = 'rgba(99, 179, 237, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLocation?.id !== loc.id) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: loc.current ? 'rgb(99, 179, 237)' : 'rgba(99, 179, 237, 0.5)',
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{loc.name}</span>
              {loc.current && (
                <span style={{ fontSize: '0.6rem', color: 'rgb(99, 179, 237)' }}>now</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '0.75rem 0',
        }}
      />

      {/* Traveled Section */}
      <div>
        <h3
          style={{
            margin: '0 0 0.75rem 0',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(16, 185, 129, 0.8)',
            fontWeight: 600,
          }}
        >
          Traveled
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {UNIQUE_TRAVELED_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onLocationSelect(loc)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.35rem 0.5rem',
                background: selectedLocation?.id === loc.id ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                border: selectedLocation?.id === loc.id ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                color: selectedLocation?.id === loc.id ? 'rgb(16, 185, 129)' : 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedLocation?.id !== loc.id) {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLocation?.id !== loc.id) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.6)',
                  flexShrink: 0,
                }}
              />
              <span>{loc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
