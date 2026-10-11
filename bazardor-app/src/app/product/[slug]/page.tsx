
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getProducts, formatPrice } from "@/lib/products";
import { auth } from "@/lib/auth";

export const instant = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  // Check whether the user is logged in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect unauthenticated users to Sign In
  if (!session?.user) {
    const callbackURL = `/product/${slug}`;

    redirect(
      `/signin?reason=auth-required&callbackURL=${encodeURIComponent(callbackURL)}`
    );
  }

  let products;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Product details API error:", error);

    return (
      <main className="product-details-page">
        <div className="site-container">
          <Link href="/" className="btn btn-outline">
            ← হোমপেজে ফিরে যান
          </Link>
          <h1>পণ্যের তথ্য লোড করা যায়নি</h1>
          <p>ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
        </div>
      </main>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const changeText =
    product.change.dir === "up"
      ? `▲ ${formatPrice(Math.abs(product.change.pct))}%`
      : product.change.dir === "down"
        ? `▼ ${formatPrice(Math.abs(product.change.pct))}%`
        : "কোনো পরিবর্তন নেই";

  return (
    <main className="product-details-page">
      <div className="site-container">
        <Link href="/" className="btn btn-outline">
          ← হোমপেজে ফিরে যান
        </Link>

        <section className="product-details-hero">
          <div className="product-details-emoji">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div>
            <p className="section-kicker">
              {product.categoryNameBn}
            </p>

            <h1 className="section-title">{product.nameBn}</h1>

            <p className="section-description">
              একক: {product.unit}
            </p>

            <p className="product-details-price">
              {formatPrice(product.today)} টাকা
            </p>

            <p className="section-description">
              গতকালের দাম: {formatPrice(product.yesterday)} টাকা
            </p>

            <p className="section-description">
              দামের পরিবর্তন: {changeText}
            </p>
          </div>
        </section>

        <section className="product-stat-grid">
          <article className="product-stat-card">
            <p>সর্বনিম্ন দাম</p>
            <h2>{formatPrice(lowestPrice)} টাকা</h2>
          </article>

          <article className="product-stat-card">
            <p>সর্বোচ্চ দাম</p>
            <h2>{formatPrice(highestPrice)} টাকা</h2>
          </article>

          <article className="product-stat-card">
            <p>আনুমানিক গড় দাম</p>
            <h2>{formatPrice(averagePrice)} টাকা</h2>
          </article>
        </section>

        <section className="product-markets-section">
          <h2 className="section-title">বাজারভিত্তিক দাম</h2>

          {markets.length === 0 ? (
            <p className="section-description">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="product-markets-list">
              {markets.map((market, index) => (
                <article
                  className="product-market-row"
                  key={`${market.market}-${market.division}-${index}`}
                >
                  <div>
                    <h3>{market.market}</h3>
                    <p>{market.division}</p>
                  </div>

                  <div className="product-market-prices">
                    <span>
                      {formatPrice(market.min)} –{" "}
                      {formatPrice(market.max)} টাকা
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
