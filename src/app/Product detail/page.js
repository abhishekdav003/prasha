import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductView from "@/components/ProductView";

// Pre-generate all product pages at build time
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | SMR`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();
  return <ProductView product={product} />;
}
