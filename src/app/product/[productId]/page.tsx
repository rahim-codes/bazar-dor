import Link from "next/link";

interface MarketData {
  market: string;
  division: string;
  min: number;
  max: number;
  avg?: number;
}

interface ProductDetails {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: "up" | "down" | "flat" | string;
    pct: number;
  };
  markets?: MarketData[];
}

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBengaliNumber = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  let product: ProductDetails | null = null;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
      { next: { revalidate: 60 } },
    );
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-base-content/60 font-medium">
        পণ্যটি পাওয়া যায়নি।
      </div>
    );
  }

  // বিভিন্ন মান হিসাব করা
  const unitBn = product.unit === "kg" ? "কেজি" : product.unit;
  const todayPriceBn = toBengaliNumber(product.today);
  const diffPrice = Math.abs(product.today - product.yesterday);
  const diffPriceBn = toBengaliNumber(diffPrice);
  const isUp =
    product.change?.dir === "up" || product.today > product.yesterday;
  const pctBn = toBengaliNumber(product.change?.pct?.toFixed(1) || "০.০");

  // মার্কেট লিস্ট থেকে সর্বনিম্ন, সর্বাধিক এবং গড় দাম হিসাব করা
  const markets = product.markets || [];
  const minPrices = markets.map((m) => m.min);
  const maxPrices = markets.map((m) => m.max);

  const minPrice = minPrices.length ? Math.min(...minPrices) : product.today;
  const maxPrice = maxPrices.length ? Math.max(...maxPrices) : product.today;

  // সম্পূর্ণ মার্কেটের গড়ের হিসেব
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, curr) => acc + (curr.min + curr.max) / 2, 0) /
            markets.length,
        )
      : product.today;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ১. ব্রেডক্রাম্ব (Breadcrumbs) */}
      <nav className="text-xs sm:text-sm text-base-content/60 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <span>›</span>
        <span className="text-base-content/90 font-medium">
          {product.nameBn}
        </span>
      </nav>

      {/* ২. টপ প্রডাক্ট সামারি কার্ড (Hero Header Card) */}
      <div className="w-full bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs">
        {/* বাম দিকের পণ্যের তথ্য */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#edf3ed] rounded-2xl flex items-center justify-center text-4xl shrink-0">
            {product.image || product.categoryIcon || "🍚"}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content leading-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-base-content/60 font-medium">
              প্রতি {unitBn} · {product.categoryNameBn || product.category}
            </p>
            <p className="text-xs sm:text-sm text-base-content/70 font-medium pt-1">
              গতকালকের তুলনায় আজ দাম{" "}
              <span className="font-bold text-base-content">
                {isUp ? "বেড়েছে" : "কমেছে"}
              </span>{" "}
              · {diffPriceBn} টাকা
            </p>
          </div>
        </div>

        {/* ডান দিকের আজকের দামের ব্যাজ */}
        <div className="bg-[#edf3ed]/80 border border-emerald-900/5 rounded-2xl p-4 text-center min-w-[140px] w-full sm:w-auto">
          <span className="text-xs text-base-content/60 font-medium block">
            আজকের দাম
          </span>
          <div className="text-3xl font-black text-base-content my-0.5">
            {todayPriceBn}
          </div>
          <span className="text-xs text-base-content/60 font-medium block">
            টাকা / {unitBn}
          </span>
          <div
            className={`mt-1.5 text-xs font-bold inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
              isUp ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50"
            }`}
          >
            <span>{isUp ? "▲" : "▼"}</span>
            <span>{pctBn}%</span>
          </div>
        </div>
      </div>

      {/* ৩. দামের সারসংক্ষেপ (Summary Cards Section) */}
      <div className="bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-6 space-y-4 shadow-2xs">
        <h2 className="text-lg font-bold text-base-content">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* সর্বনিম্ন দাম */}
          <div className="bg-base-100/60 border border-base-200 rounded-2xl p-4 space-y-1">
            <span className="text-xs text-base-content/60 font-medium block">
              সর্বনিম্ন দাম
            </span>
            <div className="text-2xl font-black text-emerald-600">
              {toBengaliNumber(minPrice)}{" "}
              <span className="text-base font-semibold">টাকা</span>
            </div>
            <span className="text-xs text-base-content/50 font-medium block">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          {/* সর্বাধিক দাম */}
          <div className="bg-base-100/60 border border-base-200 rounded-2xl p-4 space-y-1">
            <span className="text-xs text-base-content/60 font-medium block">
              সর্বাধিক দাম
            </span>
            <div className="text-2xl font-black text-red-500">
              {toBengaliNumber(maxPrice)}{" "}
              <span className="text-base font-semibold">টাকা</span>
            </div>
            <span className="text-xs text-base-content/50 font-medium block">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          {/* গড় দাম */}
          <div className="bg-base-100/60 border border-base-200 rounded-2xl p-4 space-y-1">
            <span className="text-xs text-base-content/60 font-medium block">
              গড় দাম
            </span>
            <div className="text-2xl font-black text-emerald-700">
              {toBengaliNumber(avgPrice)}{" "}
              <span className="text-base font-semibold">টাকা</span>
            </div>
            <span className="text-xs text-base-content/50 font-medium block">
              প্রতি {unitBn}-এর হিসাবে
            </span>
          </div>
        </div>
      </div>

      {/* ৪. বাজারভিত্তিক আজকের দাম (Market Wise Table Section) */}
      <div className="bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-6 space-y-4 shadow-2xs">
        <h2 className="text-lg font-bold text-base-content">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-left">
              <thead>
                <tr className="border-b border-base-200 text-base-content/60 text-xs font-semibold">
                  <th className="py-3 bg-transparent">বাজার</th>
                  <th className="py-3 bg-transparent">বিভাগ</th>
                  <th className="py-3 bg-transparent">সর্বনিম্ন</th>
                  <th className="py-3 bg-transparent">সর্বাধিক</th>
                  <th className="py-3 bg-transparent text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-200/60 text-sm">
                {markets.map((m, idx) => {
                  const marketAvg = m.avg ?? Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-base-200/40 transition-colors"
                    >
                      <td className="py-3.5 font-bold text-base-content">
                        {m.market}
                      </td>
                      <td className="py-3.5 text-base-content/70 font-medium">
                        {m.division}
                      </td>
                      <td className="py-3.5 text-base-content/80 font-semibold">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 text-base-content/80 font-semibold">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 font-black text-base-content text-right">
                        {toBengaliNumber(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-base-content/60 text-sm">
            এই পণ্যের বাজারভিত্তিক বিশদ তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
