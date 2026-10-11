
export const API_BASE =
  "https://api.abcz.workers.dev/api/bazardor";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();

  // API response-এর value array যাচাই
  const products = Array.isArray(result)
    ? result
    : result.value;

  if (!Array.isArray(products)) {
    console.error("API response:", result);
    throw new Error("API থেকে সঠিক product list পাওয়া যায়নি");
  }

  return products;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}
