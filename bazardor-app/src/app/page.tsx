
import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/products";
import type { Product as ApiProduct } from "@/lib/products";
export const instant = false;
import NavbarAuth from "@/components/NavbarAuth";


type Product = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  unit: string;
  price: number;
  change: number;
};


const categories = [
  { name: "সব পণ্য", href: "#সব-পণ্য" },
  { name: "চাল", href: "/category/chal" },
  { name: "সবজি", href: "/category/sobji" },
  { name: "ডাল", href: "/category/dal" },
  { name: "তেল", href: "/category/tel" },
  { name: "মাছ", href: "/category/mach" },
  { name: "মাংস", href: "/category/mangsho" },
  { name: "মসলা", href: "/category/mosla" },
];


const taka = (value: number) => formatPrice(value);

const percent = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(value));

function getBanglaDate() {
  return "১১ অক্টোবর, ২০২৬";
}

function mapProduct(item: ApiProduct): Product {
  const unitLabels: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  const changeValue =
    item.change.dir === "up"
      ? Math.abs(item.change.pct)
      : item.change.dir === "down"
        ? -Math.abs(item.change.pct)
        : 0;

  return {
    id: item.id,
    slug: item.slug,
    name: item.nameBn,
    emoji: item.image || item.categoryIcon || "🛒",
    category: item.categoryNameBn,
    unit: unitLabels[item.unit.toLowerCase()] || `প্রতি ${item.unit}`,
    price: item.today,
    change: changeValue,
  };
}

function ChangeBadge({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="product-change change-up">
        ▲ {percent(change)}%
      </span>
    );
  }

  if (change < 0) {
    return (
      <span className="product-change change-down">
        ▼ {percent(change)}%
      </span>
    );
  }

  return <span className="product-change change-flat">— ০.০%</span>;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="product-card"
      aria-label={`${product.name} বিস্তারিত দেখুন`}
    >
      <div className="product-emoji" aria-hidden="true">
        {product.emoji}
      </div>

      <div className="product-name">{product.name}</div>
      <div className="product-unit">{product.unit}</div>

      <div className="product-price">{taka(product.price)} টাকা</div>

      <div className="product-card-footer">
        <ChangeBadge change={product.change} />
        {/* <span className="view-details">বিস্তারিত দেখুন ↗</span> */}
      </div>
    </Link>
  );
}

function MarketCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="market-card"
      aria-label={`${product.name} বিস্তারিত দেখুন`}
    >
      <div className="product-emoji" aria-hidden="true">
        {product.emoji}
      </div>

      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-unit">{product.unit}</div>
        <div className="product-price">{taka(product.price)} টাকা</div>
      </div>

      <ChangeBadge change={product.change} />
    </Link>
  );
}

function Navbar({ products }: { products: Product[] }) {
  const tickerProducts = [...products, ...products];

  return (
    <>
      <div className="top-note">
        🥬 প্রতিদিনের বাজারদর জানুন, সচেতনভাবে বাজার করুন
      </div>

      
<header className="navbar">
  <div className="site-container">
    <div className="nav-main">
      <Link href="/" className="brand" aria-label="বাজার দর হোম">
        <img src="/logo-icon.png" alt="" className="brand-logo" />
        <div>
          <div className="brand-title">বাজার দর</div>
          <div className="brand-date">{getBanglaDate()}</div>
        </div>
      </Link>

      <NavbarAuth />
    </div>

    <nav className="category-nav" aria-label="পণ্যের বিভাগ">
      {categories.map((category, index) => (
        <a
          key={category.name}
          href={category.href}
          className={`category-link ${index === 0 ? "active" : ""}`}
        >
          {category.name}
        </a>
      ))}
    </nav>
  </div>
</header>


      <div className="ticker" aria-label="বাজারদরের চলমান তালিকা">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {tickerProducts.map((product, index) => (
                <span
                  className="ticker-item"
                  key={`${group}-${product.id}-${index}`}
                >
                  <span>{product.emoji}</span>
                  <span>{product.name}</span>
                  <span className="ticker-price">
                    {taka(product.price)} টাকা
                  </span>
                  <span className={product.change >= 0 ? "up" : "down"}>
                    {product.change > 0
                      ? `▲ ${percent(product.change)}%`
                      : product.change < 0
                        ? `▼ ${percent(product.change)}%`
                        : "—"}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="site-container hero-grid">
        <div>
          <div className="eyebrow">
            <span>🌿</span>
            আপনার প্রতিদিনের বাজার সহযোগী
          </div>

          <h1>
            বাজারের সঠিক দাম,
            <br />
            <span>সিদ্ধান্ত হোক সহজ।</span>
          </h1>

          <p className="hero-description">
            চাল, ডাল, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের
            বাজারদর জানুন এক জায়গায়। দাম তুলনা করুন,
            পরিকল্পনা করে বাজার করুন।
          </p>

          <div className="hero-actions">
            <a href="#সব-পণ্য" className="btn btn-primary">
              সব পণ্যের দাম দেখুন <span>→</span>
            </a>

            <a href="#বাজার-পরিবর্তন" className="btn btn-outline">
              আজকের বাজার
            </a>
          </div>

          <div className="hero-note">
            <span>✓</span>
            সহজ তথ্য · সুন্দর অভিজ্ঞতা · সচেতন কেনাকাটা
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="/bazar-hero.png"
              alt="তাজা বাজারের পণ্য"
              className="hero-image"
            />
          </div>

          <div className="floating-card one">
            <div className="floating-emoji">🥬</div>
            <div>
              <div className="floating-label">নিত্যপ্রয়োজনীয় পণ্য</div>
              <div className="floating-value">এক জায়গায় সব দাম</div>
            </div>
          </div>

          <div className="floating-card two">
            <div className="floating-emoji">📊</div>
            <div>
              <div className="floating-label">বাজারের তথ্য</div>
              <div className="floating-value">দাম তুলনা করুন</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketSection({ products }: { products: Product[] }) {
  const risers = products
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <section className="section market-section" id="বাজার-পরিবর্তন">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">আজকের বাজার</div>
            <h2 className="section-title">দামের পরিবর্তন</h2>
            <p className="section-description">
              কোন পণ্যের দাম বাড়ছে আর কোনটির দাম কমছে, এক নজরে দেখুন।
            </p>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <h3 className="section-title">আজ দাম বেড়েছে ▲</h3>
            <p className="section-description">
              দাম বৃদ্ধির হারে এগিয়ে থাকা পণ্য
            </p>
          </div>
        </div>

        {risers.length > 0 ? (
          <div className="market-grid">
            {risers.map((product) => (
              <MarketCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="section-description">দাম বাড়ার তথ্য পাওয়া যায়নি।</p>
        )}

        <div className="section-heading" style={{ marginTop: 35 }}>
          <div>
            <h3 className="section-title">আজ দাম কমেছে ▼</h3>
            <p className="section-description">
              তুলনামূলক কম দামে পাওয়া যাচ্ছে
            </p>
          </div>
        </div>

        {fallers.length > 0 ? (
          <div className="market-grid">
            {fallers.map((product) => (
              <MarketCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="section-description">দাম কমার তথ্য পাওয়া যায়নি।</p>
        )}
      </div>
    </section>
  );
}

function AllProducts({ products }: { products: Product[] }) {
  return (
    <section className="products-section" id="সব-পণ্য">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <div className="section-kicker">পণ্যের তালিকা</div>
            <h2 className="section-title">সব পণ্য</h2>
            <p className="section-description">
              আপনার প্রয়োজনীয় পণ্যের দাম দেখুন এবং বিস্তারিত জানতে নির্বাচন করুন।
            </p>
          </div>
        </div>

        <div className="product-toolbar">
          <span className="section-description">
            মোট {taka(products.length)}টি পণ্য
          </span>
          <span className="section-description">
            দাম বাংলাদেশি টাকায়
          </span>
        </div>

        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="section-description">
            এই মুহূর্তে পণ্যের তথ্য পাওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="site-container footer-inner">
        <div>
          <Link href="/" className="footer-brand">
            🛒 বাজার দর
          </Link>
          <div className="footer-description">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </div>
        </div>

        <p className="footer-disclaimer">
          বাজারদর সময় ও স্থানভেদে পরিবর্তিত হতে পারে।
          কেনাকাটার আগে স্থানীয় বাজারে দাম যাচাই করে নিন।
        </p>
      </div>
    </footer>
  );
}

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const apiProducts = await getProducts();
    products = apiProducts.map(mapProduct);
  } catch (error) {
    console.error("বাজারদরের API থেকে তথ্য আনা যায়নি:", error);
  }

  return (
    <>
      <Navbar products={products} />
      <main>
        <Hero />
        <MarketSection products={products} />
        <AllProducts products={products} />
      </main>
      <Footer />
    </>
  );
}
