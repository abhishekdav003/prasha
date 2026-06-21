import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "SMR — A Quality Product",
  description:
    "India's most trusted electronics accessories brand. Power banks, earbuds, chargers, cables and wearables built for modern life.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhyUs />
      <Testimonials />
    </>
  );
}
