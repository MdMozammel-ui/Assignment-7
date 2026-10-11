
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type Props = {
  products: Product[];
};

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

function ChangeBadge({ product }: { product: Product }) {
  const { dir, pct } = product.change;
  const amount = formatPrice(Math.abs(pct));

  if (dir === "up") {
    return (
      <span className="product-change change-up">
        ▲ {amount}%
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className="product-change change-down">
        ▼ {amount}%
      </span>
    );
  }

  return (
    <span className="product-change change-flat">
      — ০.০%
    </span>
  );
}

export default function CategoryProductList({ products }: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  return (
    <section className="category-products-section">
      <div className="category-toolbar">
        <p className="section-description">
          মোট {formatPrice(products.length)}টি পণ্য
        </p>

        <label className="category-sort">
          <span>সাজান:</span>

          {/* <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="পণ্যের দাম অনুযায়ী সাজান"
          > */}
          <select
  value={sort}
  onChange={(event) => setSort(event.target.value)}
  aria-label="পণ্যের দাম অনুযায়ী সাজান"
  style={{
    color: "#ffffff",
    backgroundColor: "gray",
  }}
>
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="product-card"
            aria-label={`${product.nameBn} বিস্তারিত দেখুন`}
          >
            <div className="product-emoji" aria-hidden="true">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="product-name">{product.nameBn}</div>

            <div className="product-unit">
              {unitLabels[product.unit.toLowerCase()] ||
                `প্রতি ${product.unit}`}
            </div>

            <div className="category-price-label">আজকের দাম</div>

            <div className="product-price">
              {formatPrice(product.today)} টাকা
            </div>

            <div className="product-card-footer">
              <ChangeBadge product={product} />
              {/* <span className="view-details">বিস্তারিত দেখুন ↗</span> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
