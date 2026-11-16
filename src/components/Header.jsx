export default function Header({ cartCount, onCartClick, onSearchClick, onMenuClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo" aria-label="UNDERATED home">
          UNDER<span className="logo-dot">·</span>ATED
        </a>

        <nav className="header-nav">
          <ul className="nav" role="list">
            <li><a href="#hero">HOME</a></li>
            <li><a href="#shop">STORE</a></li>
            <li><a href="#lookbook">LOOKBOOK</a></li>
            <li><a href="#story">ABOUT</a></li>
            <li><a href="#journal">DISPATCHES</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="header-icon" aria-label="Search" onClick={onSearchClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button className="header-icon header-cart-btn" aria-label={`Bag, ${cartCount} items`} onClick={onCartClick}>
            <span className="cart-label">BAG</span>
            <span className="cart-badge">[{cartCount}]</span>
          </button>

          <button className="header-icon hamburger" aria-label="Open menu" onClick={onMenuClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
