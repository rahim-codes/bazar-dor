"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Inav {
  icon: string;
  id: string;
  nameBn: string;
  slug: string;
}

const FALLBACK_CATEGORIES: Inav[] = [
  { id: "1", nameBn: "চাল", slug: "rice", icon: "🍚" },
  { id: "2", nameBn: "ডাল", slug: "pulses", icon: "🫘" },
  { id: "3", nameBn: "তেল", slug: "oil", icon: "🛢️" },
  { id: "4", nameBn: "সবজি", slug: "vegetables", icon: "🥬" },
  { id: "5", nameBn: "মাছ", slug: "fish", icon: "🐟" },
  { id: "6", nameBn: "মাংস", slug: "meat", icon: "🥩" },
  { id: "7", nameBn: "ডিম", slug: "egg", icon: "🥚" },
  { id: "8", nameBn: "মসলা", slug: "spices", icon: "🌶️" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Inav[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );
        if (!res.ok) {
          setCategories(FALLBACK_CATEGORIES);
          return;
        }
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : (data.categories ?? FALLBACK_CATEGORIES);
        setCategories(list);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories(FALLBACK_CATEGORIES);
      }
    }

    fetchCategories();
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center mt-5 px-4">
      {categories.map((n) => {
        // Exact match check for active category route
        const isActive = pathname === `/category/${n.slug}`;

        return (
          <Link
            key={n.id}
            href={`/category/${n.slug}`}
            className={`flex items-center gap-2 font-medium px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-2xs border ${
              isActive
                ? "bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20"
                : "bg-[#f8faf8] border-emerald-900/5 hover:border-emerald-600 hover:bg-emerald-50 text-base-content"
            }`}
          >
            <span className="text-base sm:text-lg">{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}
