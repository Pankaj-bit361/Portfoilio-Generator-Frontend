import { useState, useEffect } from 'react'
import './Navbar.css'

export default function ProfessionalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'experience', 'portfolio', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`professional-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#home" className="header-logo">
          <span className="logo-text">JD</span>
          <span className="logo-period">.</span>
        </a>
        
        <nav className="header-nav">
          {[
            { name: 'Home', icon: '🏠' },
            { name: 'Experience', icon: '💼' },
            { name: 'Portfolio', icon: '🎨' },
            { name: 'Contact', icon: '✉️' }
          ].map(item => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase()}`}
              className={`nav-item ${activeSection === item.name.toLowerCase() ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="action-button">
            <span className="button-icon">📄</span>
            Resume
          </button>
          <button className="action-button primary">
            <span className="button-icon">👋</span>
            Hire Me
          </button>
        </div>
      </div>
    </header>
  )
}