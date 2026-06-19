/**
 * Store contenuti su file JSON (volume Docker `/app/data`).
 * Sorgente dati per prodotti e impostazioni (contatti), gestiti da admin.
 * Niente DB: per un catalogo vetrina è sufficiente e robusto in container.
 */
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { demoProducts } from "./catalog";
import { contacts as defaultContacts } from "./site-config";

export type SoulKey = "stufe" | "arredamento" | "elettrodomestici" | "ricambi";

export interface StoredProduct {
  id: string;
  name: string;
  brand?: string;
  soul: SoulKey;
  category: string; // slug sottocategoria (es. stufe-a-legna, cucine)
  price?: number;
  image?: string;
  featured?: boolean;
  createdAt: number;
}

export interface Settings {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  city: string;
}

interface Content {
  products: StoredProduct[];
  settings: Settings;
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

let cache: Content | null = null;

function seed(): Content {
  const products: StoredProduct[] = demoProducts.map((p, i) => ({
    id: `seed-${i + 1}`,
    name: p.name,
    brand: p.brand,
    soul: p.category === "cucine" ? "arredamento" : "stufe",
    category: p.category,
    price: p.price,
    image: p.image,
    featured: i < 4,
    createdAt: 0,
  }));
  const settings: Settings = {
    phone: defaultContacts.phone,
    phoneHref: defaultContacts.phoneHref,
    whatsapp: defaultContacts.whatsapp,
    whatsappHref: defaultContacts.whatsappHref,
    email: defaultContacts.email,
    address: defaultContacts.address,
    city: defaultContacts.city,
  };
  return { products, settings };
}

async function read(): Promise<Content> {
  if (cache) return cache;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  try {
    cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Content;
  } catch {
    cache = seed();
    await persist(cache);
  }
  return cache;
}

async function persist(c: Content): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(c, null, 2), "utf8");
  cache = c;
}

/* ---------- Public reads ---------- */
export async function getProducts(): Promise<StoredProduct[]> {
  return (await read()).products;
}
export async function getProductsByCategory(category: string): Promise<StoredProduct[]> {
  return (await read()).products.filter((p) => p.category === category);
}
export async function getFeatured(limit = 4): Promise<StoredProduct[]> {
  const ps = (await read()).products;
  const flagged = ps.filter((p) => p.featured && p.image);
  const pool = flagged.length ? flagged : ps.filter((p) => p.image);
  return pool.slice(0, limit);
}
export async function getSettings(): Promise<Settings> {
  return (await read()).settings;
}

/* ---------- Admin writes ---------- */
export async function addProduct(p: Omit<StoredProduct, "id" | "createdAt">): Promise<StoredProduct> {
  const c = await read();
  const np: StoredProduct = { ...p, id: crypto.randomUUID(), createdAt: Date.now() };
  c.products.unshift(np);
  await persist(c);
  return np;
}
export async function updateProduct(id: string, patch: Partial<StoredProduct>): Promise<StoredProduct | null> {
  const c = await read();
  const i = c.products.findIndex((p) => p.id === id);
  if (i < 0) return null;
  c.products[i] = { ...c.products[i], ...patch, id };
  await persist(c);
  return c.products[i];
}
export async function deleteProduct(id: string): Promise<boolean> {
  const c = await read();
  const before = c.products.length;
  c.products = c.products.filter((p) => p.id !== id);
  await persist(c);
  return c.products.length < before;
}
export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const c = await read();
  c.settings = { ...c.settings, ...patch };
  await persist(c);
  return c.settings;
}
