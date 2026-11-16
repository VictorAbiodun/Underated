const posts = [
  {
    id: 'void-collection',
    date: 'MARCH 28, 2026',
    title: 'HOW WE DESIGNED THE VOID COLLECTION',
    excerpt:
      'A look behind the process — from street observation to finished garment, every stitch has a story.',
  },
  {
    id: 'world-tour',
    date: 'FEBRUARY 14, 2026',
    title: 'LAGOS TO LONDON: THE UNDERATED WORLD TOUR',
    excerpt:
      'We took UNDERATED to three cities and let the streets decide. Here\u2019s what happened.',
  },
  {
    id: 'limited-drops',
    date: 'JANUARY 2, 2026',
    title: 'WHY LIMITED DROPS CHANGE EVERYTHING',
    excerpt:
      'Scarcity isn\u2019t a marketing trick — it\u2019s respect for the craft and the community that wears it.',
  },
]

export default function Journal() {
  return (
    <section className="section journal-section" id="journal">
      <div className="wrap">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">FROM THE JOURNAL</p>
            <h2 className="section-title">LATEST</h2>
          </div>
        </div>

        <div className="journal-grid">
          {posts.map((post) => (
            <article className="journal-card" key={post.id}>
              <p className="journal-date">{post.date}</p>
              <h3 className="journal-title">{post.title}</h3>
              <p className="journal-excerpt">{post.excerpt}</p>
              <a href="#journal" className="journal-read">
                READ ARTICLE →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
