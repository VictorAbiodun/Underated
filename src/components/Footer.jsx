export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col-brand">
            <a href="/" className="logo" aria-label="UNDERATED home">
              UNDER<span className="logo-dot">·</span>ATED
            </a>
            <p className="footer-brand-tagline">
              Bold streetwear from Lagos, worn everywhere. Limited pieces. Limitless identity.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Instagram">IG</a>
              <a href="#" className="social-btn" aria-label="X (Twitter)">X</a>
              <a href="#" className="social-btn" aria-label="TikTok">TK</a>
              <a href="#" className="social-btn" aria-label="WhatsApp">WA</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>STORE</h4>
            <ul>
              <li><a href="#shop">New Arrivals</a></li>
              <li><a href="#shop">Hoodies</a></li>
              <li><a href="#shop">Tees</a></li>
              <li><a href="#shop">Bottoms</a></li>
              <li><a href="#shop">Accessories</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>COLLECTIONS</h4>
            <ul>
              <li><a href="#lookbook">The Void</a></li>
              <li><a href="#lookbook">Shadow Run</a></li>
              <li><a href="#lookbook">Underated I — Archive</a></li>
              <li><a href="#lookbook">Lookbook</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>HELP</h4>
            <ul>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Sizing Guide</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 UNDERATED™. All rights reserved. Lagos, Nigeria.</span>
          <span>
            Payments accepted via{' '}
            <strong className="payment-name">OPay</strong> &amp;{' '}
            <strong className="payment-name">Grey</strong>
          </span>
        </div>
      </div>
    </footer>
  )
}
