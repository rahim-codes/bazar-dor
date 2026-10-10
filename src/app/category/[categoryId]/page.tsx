import CategoryProducts from "@/components/CategoryProducts";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;

  let products = [];
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
      { next: { revalidate: 60 } },
    );
    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data : data.products || data.data || [];
    }
  } catch (error) {
    console.error("Failed to load category products:", error);
  }

  return <CategoryProducts products={products} />;
}
