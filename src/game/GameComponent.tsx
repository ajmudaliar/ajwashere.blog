import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Phaser from 'phaser'
import { IslandScene } from './scenes/IslandScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#1a1a2e',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [IslandScene],
}

export function GameComponent() {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (containerRef.current && !gameRef.current) {
      gameRef.current = new Phaser.Game({
        ...config,
        parent: containerRef.current,
      })
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
        }}
      >
        {/* Burger Menu */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: '18px',
              fontFamily: 'system-ui',
              color: '#333',
              background: '#fff',
              padding: '6px 10px',
              borderRadius: '4px',
              boxShadow: '4px 4px 0px #333',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '36px',
              transition: 'transform 0.1s, box-shadow 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)'
              e.currentTarget.style.boxShadow = '6px 6px 0px #333'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '4px 4px 0px #333'
            }}
          >
            <span style={{ display: 'block', width: '18px', height: '2px', background: '#333', borderRadius: '1px' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: '#333', borderRadius: '1px' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: '#333', borderRadius: '1px' }} />
          </button>
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: '#fff',
                borderRadius: '4px',
                boxShadow: '4px 4px 0px #333',
                overflow: 'hidden',
                minWidth: '140px',
              }}
            >
              <Link
                to="/projects"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontFamily: 'system-ui',
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderBottom: '1px solid #eee',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
              >
                projects
              </Link>
              <Link
                to="/readinglist"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontFamily: 'system-ui',
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
              >
                reading list
              </Link>
            </div>
          )}
        </div>
        {/* Branding */}
        <div
          style={{
            fontSize: '18px',
            fontFamily: 'system-ui',
            color: '#333',
            background: '#fff',
            padding: '6px 14px',
            borderRadius: '4px',
            boxShadow: '4px 4px 0px #333',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.1s, box-shadow 0.1s',
          }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent('logoClicked'))
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)'
            e.currentTarget.style.boxShadow = '6px 6px 0px #333'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)'
            e.currentTarget.style.boxShadow = '4px 4px 0px #333'
          }}
        >
          ajwashere.blog
        </div>
      </div>
    </div>
  )
}
