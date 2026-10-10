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
    <div className="flex gap-5 justify-center mt-5">
      {data.map((n) => (
        <Link href={`/category/${n.slug}`} key={n.id}>
          {n.icon}
          {n.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
