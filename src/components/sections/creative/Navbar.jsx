import { useState, useEffect } from 'react'
import './Navbar.css'

export default function CreativeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div 
        className="creative-cursor"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }}
      />
      <nav className={`creative-navbar ${isOpen ? 'open' : ''}`}>
        <div className="nav-brand">CREATIVE</div>
        <button 
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-menu">
          {['Home', 'Work', 'About', 'Contact'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                '--hover-color': `var(--creative-color-${index + 1})`
              }}
            >
              {item}
              <span className="nav-link-number">0{index + 1}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}