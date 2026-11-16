const products = [
  {
    id: 'star-burn-tee',
    name: 'STAR BURN GRAPHIC TEE',
    price: 48000,
    compareAtPrice: 58000,
    badge: 'NEW',
    spec: 'Mineral Wash Black Heavyweight Cotton // "To Become A Star, You Must Burn" Graphic Front & Back',
    image: '/star-burn-tee.jpg',
    category: 'tees',
  },
  {
    id: 'hoodie-vol1',
    name: 'OVERSIZED HOODIE VOL.1',
    price: 45000,
    compareAtPrice: 55000,
    badge: 'NEW',
    spec: '480GSM Heavyweight French Terry // Dropped Shoulder',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop',
    category: 'hoodies',
  },
  {
    id: 'cargo-phantom',
    name: 'CARGO PANTS — PHANTOM',
    price: 38500,
    badge: null,
    spec: 'Modular Tactical Twill // 8 Pockets // Ankle Cinch',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop',
    category: 'bottoms',
  },
  {
    id: 'graphic-tee-ii',
    name: 'GRAPHIC TEE — UNDERATED II',
    price: 18000,
    badge: 'HOT',
    spec: '260GSM Combed Organic Cotton // Archival Lagos Stamp',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop',
    category: 'tees',
  },
  {
    id: 'coach-jacket',
    name: 'COACH JACKET — OBSIDIAN',
    price: 42000,
    badge: null,
    spec: 'Matte Water-Repellent Shell // Custom Hardware Snaps',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&h=750&fit=crop',
    category: 'jackets',
  },
  {
    id: 'tracksuit',
    name: 'TRACKSUIT — TACTICAL SET',
    price: 52000,
    badge: 'LIMITED',
    spec: 'Technical Two-Piece Silhouette // Thermal Lined',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop',
    category: 'sets',
  },
  {
    id: 'cap',
    name: 'CAP — UNDERATED STEALTH',
    price: 12000,
    badge: null,
    spec: 'Unstructured 6-Panel // Anodized Matte Buckle',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=750&fit=crop',
    category: 'accessories',
  },
]

function formatPrice(amount) {
  return '₦' + amount.toLocaleString()
}

export default function Shop({ onAddToCart }) {
  return (
    <section className="section shop-section" id="shop">
      <div className="wrap">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">THE COLLECTION</p>
            <h2 className="section-title">SHOP</h2>
          </div>
          <a href="#shop" className="section-link">VIEW ALL PIECES →</a>
        </div>

        <div className="shop-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  width="600"
                  height="750"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-spec">{product.spec}</p>
                <div className="product-price">
                  <span>{formatPrice(product.price)}</span>
                  {product.compareAtPrice && (
                    <span className="old-price">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <button
                  className="btn-add-cart"
                  onClick={() =>
                    onAddToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: 'M',
                    })
                  }
                >
                  ADD TO CART
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
