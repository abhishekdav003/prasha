import { products } from "@/data/products";

export default function sitemap() {
  const staticPages = [
    {
      url: "https://www.prashaindia.com",
      priority: 1,
    },
    {
      url: "https://www.prashaindia.com/products",
      priority: 0.9,
    },
    {
      url: "https://www.prashaindia.com/about",
      priority: 0.8,
    },
    {
      url: "https://www.prashaindia.com/contact",
      priority: 0.8,
    },
    {
      url: "https://www.prashaindia.com/services",
      priority: 0.8,
    },
  ];

  const productPages = products.map((product) => ({
    url: `https://www.prashaindia.com/products/${product.id}`,
    priority: 0.9,
  }));

  return [...staticPages, ...productPages];
}
