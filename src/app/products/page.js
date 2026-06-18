import ProductList from "@/components/ProductList";

export const metadata = {
  title: "SMR Products",

  description:
    "Explore SMR premium mobile accessories including power banks, chargers, earbuds, cables, wearables and innovative electronic gadgets from Prasha India Pvt Ltd.",

  keywords: [
    "SMR Products",
    "SMR Accessories",
    "SMR Earbuds",
    "SMR Charger",
    "SMR Power Bank",
    "SMR Cable",
    "SMR Wearables",
    "SMR Mobile Accessories",
    "Prasha India Products",
  ],
};

export default function ProductsPage({ searchParams }) {
  const category = searchParams?.category ?? "All";
  return <ProductList initialCategory={category} />;
}
