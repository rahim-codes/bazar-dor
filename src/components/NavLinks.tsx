import Link from "next/link";

interface Inav {
  icon: string;
  id: string;
  nameBn: string;
  slug: string;
}

async function getCategories(): Promise<Inav[]> {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { next: { revalidate: 3600 } }, // Cache for 1h
    );

    // 1. Check HTTP status
    if (!res.ok) {
      console.error(`Categories API failed with status ${res.status}`);
      return [];
    }

    // 2. Check content-type header
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      console.error("Categories API did not return JSON");
      return [];
    }

    // 3. Parse JSON safely
    const data = await res.json();
    return Array.isArray(data) ? data : (data.categories ?? []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

const NavLinks = async () => {
  const data = await getCategories();

  if (data.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center mt-5 px-4">
      {data.map((n) => (
        <Link
          key={n.id}
          href={`/category/${n.slug}`}
          className="flex items-center gap-2 bg-[#f8faf8] border border-emerald-900/5 hover:border-emerald-600 hover:bg-emerald-50 text-base-content font-medium px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-2xs"
        >
          <span className="text-base sm:text-lg">{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
