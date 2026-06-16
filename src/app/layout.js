import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: {
    default: "SMR — Premium Mobile Accessories",
    template: "%s | SMR",
  },
  description:
    "India's most trusted electronics accessories brand. Power banks, earbuds, cables, chargers and wearables built for modern life.",
  keywords: [
    "mobile accessories",
    "power bank",
    "earbuds",
    "charger",
    "cables",
    "electronics",
  ],
  openGraph: {
    title: "SMR — Premium Mobile Accessories",
    description: "Built for the way you live.",
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
      </body>
    </html>
  );
}
