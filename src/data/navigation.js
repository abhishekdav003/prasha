export const navigation = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/products" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export const routes = {
  home: "/",
  products: "/products",
  productDetail: (id) => `/products/${id}`,
  about: "/about",
  contact: "/contact",
};

export const WHATSAPP_NUMBER = "919876543210"; // Replace with real number
export const WHATSAPP_MESSAGE =
  "Hi! I'm interested in your products. Can you help me?";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"; // Replace with real form
