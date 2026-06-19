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

## Admin
- **URL:** https://kerocalor.maranigroup.it/admin (password in `.env` sul VPS — `ADMIN_PASSWORD`).
- Funzioni: aggiungi/modifica/elimina prodotti, upload foto (resize formato fisso 1:1 / 16:9 / 3:4 via Jimp), flag "in evidenza", contatti (telefono/WhatsApp/email/indirizzo) editabili.
- **Store dati:** file JSON + immagini su volume Docker `kerocalor_data` (`/app/data`). Persistono ai redeploy.
- **Auth:** cookie HMAC firmato (`SESSION_SECRET`). `ADMIN_PASSWORD` e `SESSION_SECRET` in `/docker/kerocalor-site/.env` (NON nel repo).
- Pagine pubbliche `force-dynamic`: leggono lo store a ogni richiesta → modifiche admin subito online.

## TODO prossime fasi
- [ ] Foto/articoli reali ex novo (sostituire placeholder fornitori)
- [ ] Pagina dettaglio prodotto
- [ ] Foto e articoli reali ex novo (Veneta Cucine usa immagini proprie; Tomasella da settembre)
- [ ] Pagine: storia estesa, dettaglio prodotto, cataloghi fornitori (PDF)
- [ ] SEO: sitemap, schema LocalBusiness, Google Business
- [ ] P.IVA + dati legali (mancano)
