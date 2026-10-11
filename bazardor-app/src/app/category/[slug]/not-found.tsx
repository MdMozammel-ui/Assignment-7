
import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <main className="category-page">
      <div className="site-container category-not-found">
        <div className="category-not-found-icon">🔎</div>

        <h1 className="section-title">ক্যাটাগরি পাওয়া যায়নি!</h1>

        <p className="section-description">
          এই বিভাগে কোনো পণ্য পাওয়া যায়নি, অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>

        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান →
        </Link>
      </div>
    </main>
  );
}
