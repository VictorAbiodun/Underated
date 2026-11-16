export default function Hero() {
  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-eyebrow">
          <span className="eyebrow-dot">●</span> NEW DROP — 2026 COLLECTION
        </p>

        <h1 className="hero-headline">
          WEAR<br />THE <span className="accent-text">UNDER</span>ATED
        </h1>

        <p className="hero-sub">
          Limited pieces. No rules. Bold as the streets you walk.
        </p>

        <div className="hero-cta-wrap">
          <button className="btn-primary" onClick={scrollToShop}>
            SHOP THE DROP
          </button>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  )
}
