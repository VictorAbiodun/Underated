export default function Story() {
  return (
    <section className="story-section" id="story">
      <div className="story-image">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop"
          alt="UNDERATED Lagos street editorial"
          width="800"
          height="600"
          loading="lazy"
        />
      </div>
      <div className="story-content">
        <p className="story-eyebrow">OUR STORY</p>
        <blockquote className="story-quote">
          &ldquo;We didn&rsquo;t have a name. That became the name.&rdquo;
        </blockquote>
        <p className="story-body">
          UNDERATED is a Lagos-born, world-worn streetwear brand built for
          those who move through the world on their own terms. Every piece is a
          limited run — designed to be worn, distressed, and remembered. No
          seasons. No rules. Just the underated ones who dare.
        </p>
        <div className="story-cta-wrap">
          <a href="#shop" className="story-link">READ MORE</a>
          <span className="story-bar" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
