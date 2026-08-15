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

export type SoulKey = "stufe" | "arredamento" | "complementi" | "elettrodomestici" | "ricambi";

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
  /** Per categoria (slug): true/assente = mostra "CATALOGO IN AGGIORNAMENTO" al posto delle schede. */
  catalogNotice?: Record<string, boolean>;
}

/** Il messaggio è ATTIVO di default: si spegne solo con un false esplicito salvato dall'admin. */
export function isCatalogNoticeActive(settings: Settings, slug: string): boolean {
  return settings.catalogNotice?.[slug] !== false;
}

/** Stato di autenticazione persistito (mai inviato al client). */
export interface AuthState {
  /** scrypt "salt:hash" — se presente sostituisce ADMIN_PASSWORD dell'env. */
  passwordHash?: string;
  /** Incrementato a ogni cambio password: invalida le sessioni precedenti. */
  passwordVersion: number;
  /** sha256 del token di reset in circolazione + scadenza (ms epoch). */
  resetTokenHash?: string;
  resetExpires?: number;
}

/** Configurazione SMTP per le email di sistema (reset password). `pass` mai restituita al client. */
export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

interface Content {
  products: StoredProduct[];
  settings: Settings;
  auth?: AuthState;
  smtp?: SmtpConfig;
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

let cache: Content | null = null;

const soulFor = (category: string): SoulKey =>
  category === "cucine"
    ? "arredamento"
    : category === "incasso" || category === "libera-installazione"
      ? "elettrodomestici"
      : "stufe";

function seed(): Content {
  const products: StoredProduct[] = demoProducts.map((p, i) => ({
    id: `seed-${i + 1}`,
    name: p.name,
    brand: p.brand,
    soul: soulFor(p.category),
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

/* ---------- Auth state (server-only) ---------- */
export async function getAuthState(): Promise<AuthState> {
  const c = await read();
  if (!c.auth) c.auth = { passwordVersion: 0 };
  return c.auth;
}
export async function saveAuthState(patch: Partial<AuthState>): Promise<AuthState> {
  const c = await read();
  c.auth = { ...(c.auth ?? { passwordVersion: 0 }), ...patch };
  await persist(c);
  return c.auth;
}

/* ---------- SMTP (server-only) ---------- */
/** Priorità: config salvata dall'admin → variabili d'ambiente SMTP_* → null. */
export async function getSmtpConfig(): Promise<SmtpConfig | null> {
  const c = await read();
  if (c.smtp?.host && c.smtp.user && c.smtp.pass) return c.smtp;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT || 465);
    return { host: SMTP_HOST, port, secure: port === 465, user: SMTP_USER, pass: SMTP_PASS, from: SMTP_FROM || SMTP_USER };
  }
  return null;
}
export async function saveSmtpConfig(patch: Partial<SmtpConfig>): Promise<SmtpConfig> {
  const c = await read();
  const base: SmtpConfig = c.smtp ?? { host: "", port: 465, secure: true, user: "", pass: "", from: "" };
  c.smtp = { ...base, ...patch };
  await persist(c);
  return c.smtp;
}
