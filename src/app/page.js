import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-4">Fast</h3>
            <p>Optimized with Next.js.</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-4">SEO</h3>
            <p>Better search engine visibility.</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-4">Scalable</h3>
            <p>Built for growth.</p>
          </div>
        </div>
      </section>
    </>
  );
}
