import ProductList from "@/components/ProductList";

export const metadata = {
  title: "Products",
  description:
    "Browse all SMR premium mobile accessories — power banks, earbuds, chargers, cables, wearables and cases.",
};

export default function ProductsPage({ searchParams }) {
  const category = searchParams?.category ?? "All";
  return <ProductList initialCategory={category} />;
}
