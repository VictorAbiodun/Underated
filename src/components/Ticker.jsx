export default function Ticker() {
  const items = [
    'WEAR THE UNDERATED',
    'NEW DROP — UNDERATED 2026',
    'LAGOS ATELIER // WORLD-WORN',
    'LIMITED PIECES',
  ]

  const content = items.map((text, i) => (
    <span key={i} className="ticker-unit">
      <span className="ticker-text">{text}</span>
      <span className="ticker-diamond" aria-hidden="true">◆</span>
    </span>
  ))

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
