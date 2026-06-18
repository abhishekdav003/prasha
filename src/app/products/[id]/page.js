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
    title: `${product.name} | SMR Products`,

    description:
      product.description ||
      `${product.name} from SMR by Prasha India Pvt Ltd.`,

    keywords: [
      product.name,
      `SMR ${product.name}`,
      `${product.name} SMR`,
      "SMR Products",
      "Prasha India",
      "Prasha India Pvt Ltd",
      "SMR Mobile Accessories",
    ],

    openGraph: {
      title: `${product.name} | SMR`,
      description:
        product.description ||
        `${product.name} from SMR by Prasha India Pvt Ltd.`,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",

            name: product.name,

            image: product.images.map(
              (img) => `https://www.prashaindia.com${img}`,
            ),

            description: product.description,

            brand: {
              "@type": "Brand",
              name: "SMR",
            },

            sku: product.id,

            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },

            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",

              url: `https://www.prashaindia.com/products/${product.id}`,
            },
          }),
        }}
      />

      <ProductView product={product} />
    </>
  );
}
