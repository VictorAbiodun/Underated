const collections = [
  {
    id: 'the-void',
    season: 'SS 2026',
    title: 'THE VOID',
    meta: '12 Pieces // Draped Avant-Garde',
    image: '/images/lookbook-1.jpg',
  },
  {
    id: 'shadow-run',
    season: 'AW 2026',
    title: 'SHADOW RUN',
    meta: '8 Pieces // Tactical Camo Division',
    image: '/images/lookbook-2.jpg',
  },
  {
    id: 'underated-i',
    season: 'ORIGIN',
    title: 'UNDERATED I',
    meta: '6 Pieces // Lagos Founding Archive',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
  },
]

export default function Lookbook() {
  return (
    <section className="section lookbook-section" id="lookbook">
      <div className="wrap">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">VISUAL STORIES</p>
            <h2 className="section-title">LOOKBOOK</h2>
          </div>
          <a href="#lookbook" className="section-link">ALL COLLECTIONS →</a>
        </div>

        <div className="lookbook-grid">
          {collections.map((col) => (
            <article className="lookbook-card" key={col.id}>
              <img
                src={col.image}
                alt={`${col.title} collection lookbook editorial`}
                width="600"
                height="800"
                loading="lazy"
              />
              <div className="lookbook-overlay">
                <span className="lookbook-season">{col.season}</span>
                <h3 className="lookbook-title">{col.title}</h3>
                <span className="lookbook-meta">{col.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
