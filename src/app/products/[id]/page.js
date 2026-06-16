import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductView from "@/components/ProductView";

export async function generateStaticParams() {
  return products.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
