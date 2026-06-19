# Deploy — KeroCalor nuovo sito

## Stato
- **Preview LIVE:** https://kerocalor.maranigroup.it (HTTPS, cert Let's Encrypt)
- **Stack:** Next.js 14 (App Router, standalone) · Tailwind · Docker · Traefik
- **Repo:** https://github.com/julienmarani98/kerocalor-site (pubblico)
- **Immagine:** `ghcr.io/julienmarani98/kerocalor-site:latest` (build via GitHub Actions)

## Infrastruttura (Hostinger VPS)
- VPS id **1278386** · IP **76.13.5.115** · Docker + Traefik (`traefik-public` network)
- DNS: A record `kerocalor.maranigroup.it` → 76.13.5.115 (zona maranigroup.it)
- Compose progetto: `/docker/kerocalor-site/docker-compose.yml`
- Entrypoint `websecure`, certresolver `letsencrypt`, porta interna 3000

## Pipeline di aggiornamento
1. Modifica codice → `git push origin main`
2. GitHub Actions builda e pusha `ghcr.io/julienmarani98/kerocalor-site:latest`
3. Sul VPS: `docker compose -f /docker/kerocalor-site/docker-compose.yml pull && up -d`
   (oppure `ssh root@76.13.5.115` + comando)

## NOTA importante — credenziali ghcr sul VPS
Il pull via il pannello/MCP Hostinger falliva (cred ghcr scadute in
`/root/.docker/config.json` → 401 invece di pull anonimo). Risolto con
`docker login ghcr.io -u julienmarani98` (token GitHub valido) via SSH.
Se in futuro il pull fallisce di nuovo: rifare il `docker login ghcr.io`.

## TODO prossime fasi
- [ ] Admin: CRUD articoli/prezzi/foto + contatti (WhatsApp/email) editabili (DB + auth)
- [ ] Upload foto con resize a formato fisso (1:1 prodotti) — sharp
- [ ] Foto e articoli reali ex novo (Veneta Cucine usa immagini proprie; Tomasella da settembre)
- [ ] Pagine: storia estesa, dettaglio prodotto, cataloghi fornitori (PDF)
- [ ] SEO: sitemap, schema LocalBusiness, Google Business
- [ ] P.IVA + dati legali (mancano)
