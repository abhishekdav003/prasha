export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-6">Services</h1>

      <ul className="space-y-4">
        <li>Web Development</li>
        <li>UI/UX Design</li>
        <li>SEO Optimization</li>
      </ul>
    </section>
  );
}
