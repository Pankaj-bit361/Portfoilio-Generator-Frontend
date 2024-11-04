import './Hero.css'

export default function Hero() {
  return (
    <section className="modern-hero">
      <div className="hero-content">
        <h1 className="hero-title">John Doe</h1>
        <div className="hero-subtitle">
          <span className="typing-text">Frontend Developer</span>
          <span className="typing-cursor">|</span>
        </div>
        <p className="hero-description">Crafting beautiful web experiences</p>
        <div className="hero-cta">
          <a href="#projects" className="cta-button primary">View Work</a>
          <a href="#contact" className="cta-button secondary">Contact Me</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}