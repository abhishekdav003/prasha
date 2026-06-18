import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  metadataBase: new URL("https://www.prashaindia.com"),

  title: {
    default: "Prasha India Pvt Ltd | SMR Premium Mobile Accessories",
    template: "%s | Prasha India Pvt Ltd",
  },

  description:
    "Prasha India Pvt Ltd brings SMR premium mobile accessories including power banks, earbuds, chargers, cables, wearables and innovative electronic gadgets.",

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
    "Mobile Accessories India",
    "Electronics Accessories",
    "Premium Mobile Accessories",
    "Power Bank",
    "Earbuds",
    "Charger",
    "USB Cable",
    "Smart Wearables",
  ],

  alternates: {
    canonical: "https://www.prashaindia.com",
  },

  openGraph: {
    title: "Prasha India Pvt Ltd | SMR Premium Mobile Accessories",
    description:
      "Discover SMR premium mobile accessories from Prasha India Pvt Ltd.",
    url: "https://www.prashaindia.com",
    siteName: "Prasha India Pvt Ltd",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingButtons />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Prasha India Pvt Ltd",
              alternateName: "SMR",
              url: "https://www.prashaindia.com",
              logo: "https://www.prashaindia.com/logo.png",
            }),
          }}
        />
      </body>
    </html>
  );
}
