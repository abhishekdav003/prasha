import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "MyCompany",
  description: "Professional Next.js Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
