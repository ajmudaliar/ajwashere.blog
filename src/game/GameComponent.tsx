import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Volume2, VolumeX } from 'lucide-react'
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
  const [muted, setMuted] = useState(false)

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
        {/* Mute Button */}
        <button
          onClick={() => {
            setMuted(!muted)
            window.dispatchEvent(new CustomEvent('toggleMusic'))
          }}
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
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
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
              {[
                { to: '/projects', label: 'projects' },
                { to: '/library', label: 'library' },
                { to: '/blog', label: 'blog' },
                { to: '/travels', label: 'travels' },
              ].map((item, index, arr) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 16px',
                    fontSize: '14px',
                    fontFamily: 'system-ui',
                    color: '#333',
                    textDecoration: 'none',
                    fontWeight: '600',
                    borderBottom: index < arr.length - 1 ? '1px solid #eee' : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                >
                  {item.label}
                </Link>
              ))}
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
