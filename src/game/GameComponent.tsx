import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Volume2, VolumeX, Send, X, History } from 'lucide-react'
import Phaser from 'phaser'
import { IslandScene } from './scenes/IslandScene'
import { useWebchat } from '@botpress/webchat'

// Use local ADK dev server in development, deployed bot in production
const CLIENT_ID = import.meta.env.DEV
  ? '577fe118-ba8c-4e9d-86e7-8fa76a1bac92'  // Local ADK dev
  : '296319ec-6d39-465a-9f12-87694c0a6c7b'  // Deployed bot

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
  const inputRef = useRef<HTMLInputElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [muted, setMuted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatExpanded, setChatExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [lastProcessedMessageId, setLastProcessedMessageId] = useState<string | null>(null)
  const [isInConversation, setIsInConversation] = useState(false)

  // Botpress webchat hook
  const { client, messages, clientState, user, newConversation } = useWebchat({ clientId: CLIENT_ID })

  // Track if we've started a conversation this session (resets on page reload)
  const hasStartedConversation = useRef(false)

  // Extract text from various block types (text, column, bubble, etc.)
  const extractTextFromBlock = (block: Record<string, unknown>): string | null => {
    if (!block) return null

    // Direct text block
    if (block.type === 'text' && typeof block.text === 'string') {
      return block.text
    }

    // Bubble type has a nested "block" property (singular)
    if (block.block && typeof block.block === 'object') {
      const text = extractTextFromBlock(block.block as Record<string, unknown>)
      if (text) return text
    }

    // Check for nested items (column, row, etc.)
    if (Array.isArray(block.items)) {
      for (const item of block.items) {
        const text = extractTextFromBlock(item as Record<string, unknown>)
        if (text) return text
      }
    }

    // Check for child blocks (array)
    if (Array.isArray(block.blocks)) {
      for (const child of block.blocks) {
        const text = extractTextFromBlock(child as Record<string, unknown>)
        if (text) return text
      }
    }

    // Check for nested content
    if (block.content && typeof block.content === 'object') {
      const text = extractTextFromBlock(block.content as Record<string, unknown>)
      if (text) return text
    }

    return null
  }

  // Handle bot responses - send to Phaser when new bot message arrives
  useEffect(() => {
    // Only process messages when in conversation mode
    if (!isInConversation || messages.length === 0) return

    const lastMessage = messages[messages.length - 1]

    // Skip if we already processed this message
    if (lastMessage.id === lastProcessedMessageId) return

    // Bot messages have a different authorId than our user
    const isFromBot = user && lastMessage.authorId !== user.userId

    if (isFromBot) {
      const text = extractTextFromBlock(lastMessage.block as Record<string, unknown>)

      if (text) {
        setLastProcessedMessageId(lastMessage.id)
        // Send bot response to Phaser
        window.dispatchEvent(new CustomEvent('npcResponse', {
          detail: { text }
        }))
      }
    }
  }, [messages, lastProcessedMessageId, user, isInConversation])

  // Send message to bot
  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || !client || clientState !== 'connected') return

    const messageText = inputValue.trim()
    setInputValue('')
    setChatOpen(false)

    // Show "thinking" bubble in Phaser
    window.dispatchEvent(new CustomEvent('npcThinking'))

    try {
      await client.sendMessage({ type: 'text', text: messageText })
    } catch (error) {
      console.error('Failed to send message:', error)
      window.dispatchEvent(new CustomEvent('npcResponse', {
        detail: { text: "Hmm, something went wrong.\nTry again later!" }
      }))
    }
  }, [inputValue, client, clientState])

  // Listen for chat open event from Phaser (user pressed E near NPC)
  useEffect(() => {
    const handleOpenChat = () => {
      // Enter conversation mode
      setIsInConversation(true)
      setChatOpen(true)
      // Lock player movement
      window.dispatchEvent(new CustomEvent('lockPlayer', { detail: { locked: true } }))

      // Start a fresh conversation only on first interaction this session
      if (clientState === 'connected' && !hasStartedConversation.current) {
        hasStartedConversation.current = true
        setLastProcessedMessageId(null) // Reset to process new messages
        newConversation()
      }

      // Focus input after a brief delay to ensure it's rendered
      setTimeout(() => inputRef.current?.focus(), 50)
    }

    window.addEventListener('openNpcChat', handleOpenChat)
    return () => window.removeEventListener('openNpcChat', handleOpenChat)
  }, [clientState, newConversation])

  // Reopen chat input after bot responds (with delay to read response)
  const reopenTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleBotResponse = () => {
      // Clear any pending reopen timeout
      if (reopenTimeoutRef.current) {
        clearTimeout(reopenTimeoutRef.current)
      }

      // Wait a bit for user to read the response, then reopen input
      reopenTimeoutRef.current = window.setTimeout(() => {
        reopenTimeoutRef.current = null
        setChatOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
      }, 2000)
    }

    window.addEventListener('npcResponse', handleBotResponse)
    return () => {
      window.removeEventListener('npcResponse', handleBotResponse)
      // Clear timeout on cleanup
      if (reopenTimeoutRef.current) {
        clearTimeout(reopenTimeoutRef.current)
      }
    }
  }, [])

  // End conversation when user closes chat
  const endConversation = useCallback(() => {
    // Cancel any pending chat reopen
    if (reopenTimeoutRef.current) {
      clearTimeout(reopenTimeoutRef.current)
      reopenTimeoutRef.current = null
    }
    setChatOpen(false)
    setIsInConversation(false)
    // Unlock player movement
    window.dispatchEvent(new CustomEvent('lockPlayer', { detail: { locked: false } }))
  }, [])

  // Handle keyboard events for chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (chatOpen) {
        if (e.key === 'Escape') {
          endConversation()
        } else if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          sendMessage()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [chatOpen, sendMessage, endConversation])

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

      {/* Chat Input Overlay */}
      {chatOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '4px 4px 0px #333',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  } else if (e.key === 'Escape') {
                    endConversation()
                  }
                }}
                onKeyUp={(e) => e.stopPropagation()}
                placeholder="Say something..."
                disabled={clientState !== 'connected'}
                style={{
                  width: '280px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: '#333',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || clientState !== 'connected'}
                style={{
                  background: inputValue.trim() && clientState === 'connected' ? '#4a9eff' : '#ccc',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  cursor: inputValue.trim() && clientState === 'connected' ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <Send size={18} color="#fff" />
              </button>
            </div>
            {/* History button + expanded panel wrapper */}
            <div
              onMouseEnter={() => setChatExpanded(true)}
              onMouseLeave={() => setChatExpanded(false)}
              style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}
            >
              {chatExpanded && messages.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    marginBottom: '8px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '4px 4px 0px #333',
                    padding: '12px',
                    maxHeight: '300px',
                    width: '320px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {messages.map((msg) => {
                    const isFromUser = user && msg.authorId === user.userId
                    const text = extractTextFromBlock(msg.block as Record<string, unknown>)
                    if (!text) return null
                    return (
                      <div
                        key={msg.id}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '6px',
                          background: isFromUser ? '#e3f2fd' : '#f5f5f5',
                          fontSize: '13px',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          color: '#333',
                          alignSelf: isFromUser ? 'flex-end' : 'flex-start',
                          maxWidth: '85%',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
                          {isFromUser ? 'You' : 'AJ'}
                        </div>
                        {text}
                      </div>
                    )
                  })}
                </div>
              )}
              <button
                style={{
                  background: chatExpanded ? '#e3f2fd' : '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px',
                  boxShadow: '4px 4px 0px #333',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <History size={18} color="#333" />
              </button>
            </div>
            <button
              onClick={endConversation}
              style={{
                background: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '10px',
                boxShadow: '4px 4px 0px #333',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} color="#333" />
            </button>
          </div>
        </div>
      )}

      {/* Connection status indicator (only show when connecting or error) */}
      {clientState !== 'connected' && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: clientState === 'connecting' ? '#fff3cd' : '#f8d7da',
            color: clientState === 'connecting' ? '#856404' : '#721c24',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'system-ui',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          {clientState === 'connecting' ? 'Connecting to chat...' : 'Chat unavailable'}
        </div>
      )}

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
          {muted ? <Volume2 size={20} /> : <VolumeX size={20} />}
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
                { to: '/projects', label: 'Things i\'m working on' },
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
