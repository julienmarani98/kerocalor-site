/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  // Nessun host remoto: tutte le immagini sono locali (/images, /uploads).
  // Un wildcard qui trasformerebbe l'optimizer in un proxy aperto.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
