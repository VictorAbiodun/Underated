function formatPrice(amount) {
  return '₦' + amount.toLocaleString()
}

export default function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`cart-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-label="Shopping bag"
        aria-modal={open}
      >
        <div className="cart-drawer-header">
          <h3>YOUR BAG ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
          <button className="cart-close" onClick={onClose} aria-label="Close bag">
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <p className="cart-empty">YOUR BAG IS EMPTY</p>
              <p className="cart-empty-sub">Explore the latest drop and select your silhouettes.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.size}`}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} width="76" height="95" />
                </div>
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">
                    {formatPrice(item.price)} <span className="item-size">· SIZE {item.size}</span>
                  </p>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.id, item.size, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.id, item.size, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemove(item.id, item.size)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>SUBTOTAL</span>
              <span className="total-num">{formatPrice(total)}</span>
            </div>
            <p className="shipping-calc-note">Taxes and worldwide shipping calculated at checkout.</p>
            <button className="btn-checkout">PROCEED TO CHECKOUT</button>
          </div>
        )}
      </div>
    </>
  )
}
