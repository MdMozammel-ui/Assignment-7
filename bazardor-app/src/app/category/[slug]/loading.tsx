
export default function CategoryLoading() {
  return (
    <main className="category-page">
      <div className="site-container">
        <div className="category-skeleton-back skeleton-block" />

        <div className="category-skeleton-hero">
          <div className="category-skeleton-icon skeleton-block" />

          <div className="category-skeleton-heading">
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-title" />
            <div className="skeleton-block skeleton-line" />
          </div>
        </div>

        <div className="category-skeleton-toolbar skeleton-block" />

        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="category-skeleton-card" key={index}>
              <div className="skeleton-block skeleton-product-emoji" />
              <div className="skeleton-block skeleton-line" />
              <div className="skeleton-block skeleton-line short" />
              <div className="skeleton-block skeleton-title" />
            </div>
          ))}
        </div>

        <p className="section-description" style={{ marginTop: 20 }}>
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}
