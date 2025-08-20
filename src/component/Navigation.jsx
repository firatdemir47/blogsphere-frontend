import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠' },
    { path: '/trending', label: 'Trend', icon: '🔥' },
    { path: '/categories', label: 'Kategoriler', icon: '📚' },
    { path: '/about', label: 'Hakkında', icon: 'ℹ️' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-badge">B</span>
            <span className="brand-title">BlogSphere</span>
          </Link>
        </div>

        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => document.body.classList.toggle('light-theme')}>
            🌙
          </button>
          <button className="write-btn">
            <span className="write-icon">✏️</span>
            <span className="write-text">Yaz</span>
          </button>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
