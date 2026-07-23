import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import Testimonials from "@/components/Testimonials";
import OffersCarousel from "@/components/OffersCarousel";

export const metadata = {
  title: "Prasha India Pvt Ltd | SMR Premium Mobile Accessories",

  description:
    "Prasha India Pvt Ltd offers SMR premium mobile accessories including chargers, earbuds, power banks, cables, wearables and innovative electronic gadgets.",

  keywords: [
    "Prasha India",
    "Prasha India Pvt Ltd",
    "SMR",
    "SMR Products",
    "SMR Mobile Accessories",
    "SMR Chargers",
    "SMR Earbuds",
    "SMR Power Banks",
    "SMR Cables",
    "SMR Wearables",
  ],

  openGraph: {
    title: "Prasha India Pvt Ltd | SMR Premium Mobile Accessories",

    description:
      "Discover premium SMR mobile accessories from Prasha India Pvt Ltd.",

    url: "https://www.prashaindia.com",

    siteName: "Prasha India Pvt Ltd",

    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <OffersCarousel />
      <FeaturedProducts />
      <ImageCarousel />
      <Testimonials />
    </>
  );
}
