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
      "https://api.api-store.workers.dev/api/bazardor/categories",
      { next: { revalidate: 3600 } }, // cache for 1h so it doesn't hammer the API
    );

    if (!res.ok) return [];

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : (data.categories ?? []);
  } catch {
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
