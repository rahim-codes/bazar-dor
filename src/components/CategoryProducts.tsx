"use client";

import { useState, useMemo } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";

// প্রোডাক্টের সম্পূর্ণ টাইপ
export interface Product extends ProductCardProps {
  id: number;
  slug?: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
}

interface CategoryProductsProps {
  products: Product[];
}

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBengaliNumber = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export default function CategoryProducts({ products }: CategoryProductsProps) {
  const [sortBy, setSortBy] = useState<string>("default");

  // প্রথম প্রোডাক্ট থেকে ক্যাটাগরির নাম ও আইকন বের করা
  const categoryName = products[0]?.categoryNameBn || products[0]?.category || "পণ্যসমূহ";
  const categoryIcon = products[0]?.categoryIcon || products[0]?.image || "🍚";
  const totalItemsBn = toBengaliNumber(products.length);

  // সর্টিং লজিক
  const sortedProducts = useMemo(() => {
    if (!products.length) return [];
    const list = [...products];

    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.today - b.today);
      case "price-desc":
        return list.sort((a, b) => b.today - a.today);
      case "pct-desc":
        return list.sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0));
      case "pct-asc":
        return list.sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0));
      default:
        return list;
    }
  }, [products, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ১. টপ হেডার ব্যানার */}
      <div className="w-full bg-[#f8faf8] border border-emerald-900/5 rounded-2xl p-6 flex items-center gap-4 shadow-2xs">
        <div className="w-14 h-14 bg-[#edf3ed] rounded-2xl flex items-center justify-center text-3xl shrink-0">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-base-content leading-tight">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 font-medium mt-1">
            {totalItemsBn}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* ২. ড্রপডাউন সর্টিং বার */}
      <div className="w-full bg-[#f8faf8] border border-emerald-900/5 rounded-2xl px-6 py-3 flex items-center justify-end shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-sm text-base-content/70 font-medium">
            সাজান
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm rounded-xl text-xs font-semibold bg-base-100 text-base-content focus:outline-hidden"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
            <option value="pct-desc">পরিবর্তন: সর্বোচ্চ বৃদ্ধি</option>
            <option value="pct-asc">পরিবর্তন: সর্বোচ্চ হ্রাস</option>
          </select>
        </div>
      </div>

      {/* ৩. কতটি পণ্য আছে তার কাউন্টার */}
      <div className="text-xs sm:text-sm text-base-content/60 font-medium px-1">
        মোট {totalItemsBn}টি পণ্য দেখানো হচ্ছে
      </div>

      {/* ৪. আপনার ProductCard দিয়ে তৈরি গ্রিড */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-12 text-base-content/60 text-sm font-medium">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
}