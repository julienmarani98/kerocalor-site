/**
 * Elaborazione immagini upload con Jimp (pure-JS, robusto in container).
 * Ritaglia + ridimensiona a FORMATO FISSO per non sballare la griglia nel tempo.
 */
import Jimp from "jimp";
import path from "path";
import crypto from "crypto";
import { promises as fs } from "fs";
import { UPLOAD_DIR } from "./store";

export const FORMATS = {
  square: { w: 1200, h: 1200, label: "Prodotto 1:1" },
  wide: { w: 1600, h: 900, label: "Banner 16:9" },
  portrait: { w: 900, h: 1200, label: "Verticale 3:4" },
} as const;

export type FormatKey = keyof typeof FORMATS;

export async function processUpload(buf: Buffer, format: FormatKey = "square"): Promise<string> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const { w, h } = FORMATS[format] ?? FORMATS.square;
  const img = await Jimp.read(buf);
  img.cover(w, h); // crop + resize esatto alle dimensioni richieste
  img.quality(82);
  const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.jpg`;
  await img.writeAsync(path.join(UPLOAD_DIR, name));
  return `/uploads/${name}`;
}
