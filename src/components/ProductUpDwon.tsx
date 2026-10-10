import { toBengaliNumber } from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface IProduct {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const ProductUpDwon = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data: IProduct[] = await res.json();
  //   Up product
  const filterUpProduct = data.filter((p) => p.change.dir === "up");
  const sortedByUpPct = [...filterUpProduct].sort(
    (a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0),
  );

  //   dwon product

  const filterDwonProduct = data.filter((p) => p.change.dir === "down");
  const sortedByDwonPct = [...filterDwonProduct].sort(
    (a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0),
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      {/* Up Product */}
      <div>
        <h2 className="font-bold text-xl sm:text-2xl text-base-content flex items-center gap-2">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
          {sortedByUpPct.slice(0, 6).map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>

      {/* Down Product */}
      <div className="mt-10">
        <h2 className="font-bold text-xl sm:text-2xl text-base-content flex items-center gap-2">
          <span className="text-emerald-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
          {sortedByDwonPct.slice(0, 6).map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>

      {/* All Product */}
      <div className="mt-10">
        <h2 className="font-bold text-xl sm:text-2xl text-base-content">
          সব পণ্য
        </h2>
        <p className="mt-1 text-sm text-base-content/60 font-medium">
          মোট {toBengaliNumber(data.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
          {data.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductUpDwon;
