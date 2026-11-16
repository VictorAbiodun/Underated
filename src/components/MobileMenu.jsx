import { useEffect } from 'react'

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleClick = () => {
    onClose()
  }

  return (
    <div
      className={`mobile-menu-overlay ${open ? 'open' : ''}`}
      role="dialog"
      aria-label="Navigation menu"
      aria-modal={open}
    >
      <div className="mobile-menu-top">
        <span className="mobile-menu-logo">UNDER·ATED</span>
        <button className="mobile-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>

      <nav className="mobile-menu-nav">
        <a href="#hero" onClick={handleClick}>HOME</a>
        <a href="#shop" onClick={handleClick}>STORE</a>
        <a href="#lookbook" onClick={handleClick}>LOOKBOOK</a>
        <a href="#story" onClick={handleClick}>ABOUT</a>
        <a href="#journal" onClick={handleClick}>DISPATCHES</a>
      </nav>

      <div className="mobile-menu-bottom">
        <a href="#shop" className="btn-mobile-shop" onClick={handleClick}>
          SHOP THE DROP
        </a>
      </div>
    </div>
  )
}
