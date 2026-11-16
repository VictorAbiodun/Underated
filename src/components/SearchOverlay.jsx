import { useEffect, useRef } from 'react'

export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={`search-overlay ${open ? 'open' : ''}`}
      role="dialog"
      aria-label="Search"
      aria-modal={open}
    >
      <button className="search-close" onClick={onClose} aria-label="Close search">
        ✕
      </button>
      <div className="search-container">
        <div className="search-input-wrap">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            aria-label="Search products"
          />
        </div>
      </div>
    </div>
  )
}

