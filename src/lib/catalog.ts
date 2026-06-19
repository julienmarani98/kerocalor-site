/**
 * Catalogo DEMO per la preview.
 * NOTA: foto PROVVISORIE da fornitori (La Nordica-Extraflame per le stufe,
 * Veneta Cucine per le cucine) usate come placeholder. Da sostituire con
 * asset definitivi/autorizzati e articoli reali (fase 2, gestiti da admin).
 */

export interface Product {
  slug: string;
  name: string;
  brand?: string;
  category: string;
  price?: number; // EUR; opzionale — gestito da admin
  image?: string; // /images/...  (placeholder provvisorio)
}

export const demoProducts: Product[] = [
  // --- Stufe (placeholder La Nordica-Extraflame) ---
  { slug: "stufa-larissa", name: "Larissa", brand: "Riscaldamento", category: "stufe-a-legna", price: 1690, image: "/images/stufe/larissa.webp" },
  { slug: "stufa-floriana", name: "Floriana Crystal", brand: "Riscaldamento", category: "stufe-a-legna", price: 2190, image: "/images/stufe/floriana.webp" },
  { slug: "stufa-lavinia", name: "Lavinia", brand: "Riscaldamento", category: "stufe-a-legna", price: 1290, image: "/images/stufe/lavinia.webp" },
  { slug: "stufa-gardenia", name: "Gardenia", brand: "Riscaldamento", category: "stufe-a-legna", price: 1490, image: "/images/stufe/gardenia.webp" },
  { slug: "stufa-margaret", name: "Margaret", brand: "Riscaldamento", category: "stufe-a-legna", price: 1390, image: "/images/stufe/margaret.webp" },
  { slug: "stufa-daniela", name: "Daniela", brand: "Riscaldamento", category: "stufe-a-legna", price: 1190, image: "/images/stufe/daniela.webp" },
  { slug: "stufa-comfort", name: "Comfort P70", brand: "Riscaldamento", category: "stufe-a-legna", price: 2490, image: "/images/stufe/comfort.webp" },
  { slug: "stufa-pk30", name: "PK 30", brand: "Riscaldamento", category: "stufe-a-legna", price: 990, image: "/images/stufe/pk30.webp" },

  // --- Cucine (placeholder Veneta Cucine) ---
  { slug: "cucina-caranto", name: "Caranto", brand: "Veneta Cucine", category: "cucine", image: "/images/cucine/caranto.jpg" },
  { slug: "cucina-living", name: "Living", brand: "Veneta Cucine", category: "cucine", image: "/images/cucine/cucina-1.jpg" },
  { slug: "cucina-magazine", name: "Oyster", brand: "Veneta Cucine", category: "cucine", image: "/images/cucine/magazine.jpg" },
  { slug: "cucina-green", name: "Green Thinking", brand: "Veneta Cucine", category: "cucine", image: "/images/cucine/green.jpg" },
];

export function productsByCategory(category: string): Product[] {
  return demoProducts.filter((p) => p.category === category);
}

/** Prodotti in evidenza per la home. */
export const featured: Product[] = [
  demoProducts.find((p) => p.slug === "stufa-floriana")!,
  demoProducts.find((p) => p.slug === "cucina-caranto")!,
  demoProducts.find((p) => p.slug === "stufa-larissa")!,
  demoProducts.find((p) => p.slug === "cucina-magazine")!,
];
