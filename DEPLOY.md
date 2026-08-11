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
- **Auth:** cookie HMAC firmato (`SESSION_SECRET`), sessione valida 7 giorni, rate limit 8 tentativi/10 min per IP.
- ⚠️ **`ADMIN_PASSWORD` e `SESSION_SECRET` sono obbligatorie** (`/docker/kerocalor-site/.env`, NON nel repo; modello in `.env.example`).
  Non esistono più valori di default: se mancano, il login viene sempre rifiutato — fail-closed voluto, il repo è pubblico.
  In locale usare `.env.local`.
- Pagine pubbliche `force-dynamic`: leggono lo store a ogni richiesta → modifiche admin subito online.

## Conformità (audit agosto 2026)
Fatto: mappa Google in click-to-load (nessuna risorsa terza senza click → **niente cookie banner**),
pagine `/privacy`, `/cookie-policy`, `/note-legali` (bozze con `[DA COMPLETARE]`), CSP con nonce+hash
in `src/middleware.ts`, `robots.txt` chiude `/admin` e `/api/`, `rel="noopener noreferrer"` ovunque,
nota "IVA inclusa" sui prezzi, dati societari nel footer.

Dati mancanti da chiedere al cliente (poi valorizzare `legal` in `src/lib/site-config.ts` e i
`[DA COMPLETARE]` nelle pagine legali): **REA, capitale sociale, PEC**, titolare del trattamento,
tempi di conservazione delle richieste, provider hosting/email da nominare responsabili ex art. 28,
titolarità del numero WhatsApp, liberatorie foto fornitori.

## TODO prossime fasi
- [ ] Foto/articoli reali ex novo (sostituire placeholder fornitori)
- [ ] `X-Robots-Tag: noindex` finché si resta sul dominio di staging
- [ ] Accessibilità WCAG: mega-menu da tastiera, focus trap DirectionsChooser, skip-link
- [ ] Pagina dettaglio prodotto
- [ ] Foto e articoli reali ex novo (Veneta Cucine usa immagini proprie; Tomasella da settembre)
- [ ] Pagine: storia estesa, dettaglio prodotto, cataloghi fornitori (PDF)
- [ ] SEO: sitemap, schema LocalBusiness, Google Business
- [ ] P.IVA + dati legali (mancano)
