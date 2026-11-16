import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Shop from './components/Shop'
import Lookbook from './components/Lookbook'
import Story from './components/Story'
import Journal from './components/Journal'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import MobileMenu from './components/MobileMenu'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('underated-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('underated-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === product.size
      )
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const updateQty = useCallback((id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    )
  }, [])

  const removeFromCart = useCallback((id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)))
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onMenuClick={() => setMenuOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main id="main-content">
        <Hero />
        <Ticker />
        <Shop onAddToCart={addToCart} />
        <Lookbook />
        <Story />
        <Journal />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default App
