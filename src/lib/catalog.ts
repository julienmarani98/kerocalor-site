/**
 * Catalogo DEMO per mostrare la griglia prodotti.
 * NOTA: contenuti e foto reali saranno inseriti ex novo dall'admin (fase 2).
 * Qui usiamo placeholder per validare layout/animazioni in stile.
 */

export interface Product {
  slug: string;
  name: string;
  brand?: string;
  category: string;
  price?: number; // EUR; opzionale — il prezzo è gestito da admin
  // immagine: placeholder finché non si caricano le foto reali
  placeholder?: string; // tinta di sfondo del placeholder
}

export const demoProducts: Product[] = [
  { slug: "stufa-legna-01", name: "Modello Aurora", category: "stufe-a-legna", price: 1490, placeholder: "#111" },
  { slug: "stufa-legna-02", name: "Modello Vesta", category: "stufe-a-legna", price: 1690, placeholder: "#1c1c1c" },
  { slug: "stufa-legna-03", name: "Modello Brace", category: "stufe-a-legna", price: 1290, placeholder: "#161616" },
  { slug: "stufa-legna-04", name: "Modello Focolare", category: "stufe-a-legna", price: 2190, placeholder: "#202020" },
  { slug: "stufa-legna-05", name: "Modello Tizzo", category: "stufe-a-legna", price: 990, placeholder: "#141414" },
  { slug: "stufa-legna-06", name: "Modello Calore", category: "stufe-a-legna", price: 1790, placeholder: "#181818" },
  { slug: "stufa-legna-07", name: "Modello Cenere", category: "stufe-a-legna", price: 1390, placeholder: "#0f0f0f" },
  { slug: "stufa-legna-08", name: "Modello Fiamma", category: "stufe-a-legna", price: 2490, placeholder: "#1a1a1a" },
];

export function productsByCategory(category: string): Product[] {
  return demoProducts.filter((p) => p.category === category);
}
