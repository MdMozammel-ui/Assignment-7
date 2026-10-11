import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import CategoryProductList from "./CategoryProductList";

type Props = {
  params: Promise<{ slug: string }>;
};

const categoryNames: Record<string, string> = {
  chal: "চাল",
  sobji: "সবজি",
  dal: "ডাল",
  tel: "তেল",
  mach: "মাছ",
  mangsho: "মাংস",
  moshla: "মসলা",
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Category API error:", error);
    throw error;
  }

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === slug.toLowerCase()
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName =
    categoryProducts[0].categoryNameBn || categoryNames[slug] || "পণ্য";

  const categoryIcon = categoryProducts[0].categoryIcon || "🛒";

  return (
    <main className="category-page">
      <div className="site-container">
        <Link href="/" className="btn btn-outline">
          ← হোমপেজে ফিরে যান
        </Link>

        <section className="category-hero">
          <div className="category-icon">{categoryIcon}</div>

          <div>
            <p className="section-kicker">পণ্যের বিভাগ</p>
            <h1 className="section-title">{categoryName}</h1>
            <p className="section-description">
              এই বিভাগের সব পণ্যের বর্তমান বাজারদর দেখুন।
            </p>
          </div>
        </section>

        <CategoryProductList products={categoryProducts} />
      </div>
    </main>
  );
}
