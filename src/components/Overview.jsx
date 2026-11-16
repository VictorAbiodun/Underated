export default function Overview() {
  return (
    <section className="section overview-section" id="overview">
      <div className="wrap">
        {/* Mobile Member Status Bar (from Design Direction Image 4) */}
        <div className="member-bar">
          <div className="member-info">
            <span className="member-name">Ada (sample collector)</span>
            <span className="member-dot">·</span>
            <span className="member-email">ada@example.com</span>
            <span className="member-dot">·</span>
            <span className="member-badge">Verified</span>
          </div>
          <div className="member-avatar" aria-label="Member initials">
            AD
          </div>
        </div>

        {/* Section Header */}
        <div className="overview-header">
          <h2 className="overview-title">OVERVIEW</h2>
          <div className="overview-meta">
            <span className="overview-season">Season: 2026 Collection</span>
            <span className="overview-note">Official archive for Lagos streetwear release.</span>
          </div>
        </div>

        {/* 3 High-Impact Cards (from Design Direction Images 2 & 4) */}
        <div className="overview-cards-grid">
          {/* Card 1: Lime Card (Welcome & Pay) */}
          <div className="stat-card stat-card-lime">
            <div className="stat-label">Verified pieces this drop</div>
            <div className="stat-value">₦24,500</div>
            <div className="stat-sub">Sample figure. Only verified drops count.</div>
            <button className="btn-stat-action">Add credits</button>
          </div>

          {/* Card 2: Dark Card (Stats Count) */}
          <div className="stat-card stat-card-dark">
            <div className="stat-value stat-value-lg">412</div>
            <div className="stat-sub">pieces produced this season</div>
          </div>

          {/* Card 3: Orange Card (Alert / Recover) */}
          <div className="stat-card stat-card-orange">
            <div className="stat-value stat-value-lg">2</div>
            <div className="stat-sub">drops need attention</div>
          </div>
        </div>

        {/* Two-Column Quiet Garamond Section (from Design Direction Image 2) */}
        <div className="overview-details-grid">
          <div className="overview-col">
            <h3 className="col-headline">Needs your attention</h3>
            <ul className="attention-list">
              <li>
                <div className="item-main">
                  <strong className="item-title">2 low-stock silhouettes</strong>
                  <span className="item-desc">Oversized Hoodie Vol.1 running low on M</span>
                </div>
                <a href="#shop" className="item-action">Review</a>
              </li>
              <li>
                <div className="item-main">
                  <strong className="item-title">1 preorder queue open</strong>
                  <span className="item-desc">Waiting on cargo fabrics verification</span>
                </div>
                <a href="#shop" className="item-action">Open drop</a>
              </li>
              <li>
                <div className="item-main">
                  <strong className="item-title">3 archive prototypes</strong>
                  <span className="item-desc">In fitting stage for AW 2026 release</span>
                </div>
                <a href="#lookbook" className="item-action">Open pieces</a>
              </li>
            </ul>
          </div>

          <div className="overview-col">
            <h3 className="col-headline">Recent brand actions</h3>
            <ul className="actions-list">
              <li>
                <strong className="item-title">Published Sample Drop 01</strong>
                <span className="item-desc">18 Oct · Lagos Atelier</span>
              </li>
              <li>
                <strong className="item-title">Created category Tactical Bottoms</strong>
                <span className="item-desc">17 Oct · Studio</span>
              </li>
              <li>
                <strong className="item-title">Archived Lookbook Shoot</strong>
                <span className="item-desc">17 Oct · Lagos</span>
              </li>
              <li>
                <strong className="item-title">Drop prices calibrated</strong>
                <span className="item-desc">15 Oct · Atelier</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

