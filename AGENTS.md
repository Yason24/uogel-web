# UOGEL Russia — Agent Guide

This is the main operating guide for Codex, Claude, Copilot, and other agents working on the UOGEL Russia Website.

## 1. Project summary

- Project: UOGEL Russia Website
- Repository: `git@github.com:Yason24/uogel-web.git`
- Active branch: `main`
- New server project path: `/projects/web/uogel` (primary — use this)
- Preview URL: `https://rtc.rdk-invest.ru/`
- Docker container: `uogel-web` (host: sanda-root-local, 192.168.50.86)
- Docker port: host `3001` → container `3000`

The project is a Next.js, TypeScript, and Tailwind CSS website for selecting and calculating UOGEL bioclimatic pergolas for Russia.

## 2. Business rules

The website sells only pergolas in available sizes.

Do not write:

- any sizes for your project
- custom manufacturing to your size
- we will manufacture any configuration

Allowed wording:

- we will select a suitable pergola from available sizes
- we will calculate the cost for the chosen model and configuration
- we will help choose a size for your property

Do not claim official representative, official dealer, or exclusive distributor status unless there is a confirmed dealer agreement. The site should look reliable and professional without false claims.

## 3. Current infrastructure

```
Internet → router 80/443 → new server 192.168.50.86
→ NPM (Nginx Proxy Manager, port 81 admin)
→ rtc.rdk-invest.ru → uogel-web container (127.0.0.1:3001)
```

New server (sanda-root-local, 192.168.50.86):
- Ubuntu 22.04 / 24.04
- Docker 29.4.0
- Node.js 20.20.2, npm 10.8.2
- code-server 4.121.0 (port 8888, LAN only)
- Claude Code 2.1.150
- Codex CLI 0.133.0
- NPM (Nginx Proxy Manager) — handles rtc.rdk-invest.ru with Let's Encrypt SSL

Project path: `/projects/web/uogel`

Docker compose file: `/projects/web/uogel/docker-compose.yml`

## 4. Correct working directories

Every agent working on UOGEL must start with:

```bash
cd /projects/web/uogel
pwd
git status
git rev-parse HEAD
```

Work only in:

```bash
/projects/web/uogel
```

Do not work on UOGEL in:

- `/workspace`
- `/volume1/Web/uogel` (old NAS path — do not use)
- `/volume1/Web/uogel-next-tmp`
- any temporary Next.js folder
- any other copy of the project

## 5. Git workflow

Before changes:

```bash
cd /projects/web/uogel
git status
git rev-parse HEAD
```

After changes:

```bash
git status
git add .
git commit -m "Clear description of the change"
git push
```

Never use `git reset --hard` or force push without explicit approval.

## 6. Development workflow

Before writing code, read the relevant Next.js guide in `node_modules/next/dist/docs/` if it exists in this install. This project may use a Next.js version with breaking API, convention, or file structure changes; do not rely on memory alone for framework-specific work.

Install and run locally:

```bash
npm install
npm run dev
```

Required checks before commit:

```bash
npm run lint
npm run build
```

## 7. New server Docker deploy workflow

This project uses `output: "standalone"` in `next.config.ts`. Build MUST run outside Docker first, then Docker copies from `.next/standalone`.

Full rebuild sequence:

```bash
ssh sanda-root-local
cd /projects/web/uogel
git pull
npm install
npm run build
docker compose down
docker compose build --no-cache
docker compose up -d
```

Check after rebuild:

```bash
docker ps --filter name=uogel-web
docker logs --tail=100 uogel-web
curl -I http://127.0.0.1:3001
curl -s http://127.0.0.1:3001 | grep -Ei "UOGEL|пергол|Рассчитать|стоимость|биоклимат" | head -10
```

Success criteria:

- HTML contains `UOGEL`, `пергол`, `Рассчитать`, `стоимость`, or `биоклимат`.
- HTML does not contain `To get started`, `Deploy Now`, or `Next.js logo`.
- Browser opens `https://rtc.rdk-invest.ru/`.

## 8. VPS HTTP preview notes

The VPS preview is available at:

```bash
http://81.85.49.193/
```

- VPS host: `uzbek-vps`
- Site path on VPS: `/opt/uogel`
- Container: `uogel-web`
- Port 80 is published by Docker through `docker-proxy` to container port 3000.
- Port 443 is reserved by `sing-box` / VLESS. Do not use it for the site preview.
- WireGuard has been removed; `wg0` is absent and port 51820 is no longer used.
- Package `wireguard-tools` was removed.
- WireGuard and nftables backup: `/root/backup-wireguard-uogel-20260522_142145`.
- `nftables` is enabled and has `forward` policy `drop`, so Docker bridge traffic for the preview requires explicit allow rules in `/etc/nftables.conf`.
- WireGuard rules were removed from `/etc/nftables.conf`: `udp dport 51820 accept`, forward rules with `wg0`, NAT masquerade for `10.66.66.0/24`, and the empty `table ip nat`.
- Current UOGEL Docker bridge: `br-9c2900334a5f`; current container IP: `172.18.0.2`.
- UOGEL Docker forward rules that must remain:
  - `iifname "enp0s5" oifname "br-9c2900334a5f" ip daddr 172.18.0.2 tcp dport 3000 accept`
  - `iifname "br-9c2900334a5f" oifname "enp0s5" ip saddr 172.18.0.2 tcp sport 3000 ct state established,related accept`
- If the Docker network is recreated or the container IP changes, update the UOGEL allow rules in `/etc/nftables.conf`, run `nft -c -f /etc/nftables.conf`, and then run `systemctl reload nftables`.

Do not touch VPS runtime, Docker, `nftables`, `sing-box`, VLESS, WireGuard, domain, or HTTPS unless the task explicitly requires it.

## 9. Proxy / network setup

New server has direct internet access — no outbound proxy required.

Connectivity checks:

```bash
curl https://ifconfig.me/ip
curl -I https://github.com
curl -I https://api.github.com
```

## 10. Safety rules

- Do not touch the VPS unless explicitly required.
- Do not touch NAS (192.168.50.181) Web Server, Apache, or NAS Nginx Proxy Manager.
- Do not change router 80/443 port forwarding.
- Do not touch `/volume1/Web/sanda_fleet`, `/volume1/Web/mtrade`, `/volume1/Web/landing` (NAS sites).
- Do not touch Matrix/MSChat, Nextcloud, Plex, OnlyOffice, or Nextcloud Talk HPB.
- Do not run `docker compose down` for other projects on the new server.
- Do not run `git reset --hard` without approval.
- Do not force push.
- Do not delete folders without backup and explicit approval.
- Do not change NAS system services.
- Do not touch VLESS, sing-box, WireGuard, or VPN.
- code-server (port 8888) must remain LAN-only. Do not expose it publicly without authentication.

## 11. Validation checklist

Before final handoff:

- `pwd` is `/projects/web/uogel`.
- `git status` has no unexpected project changes.
- `npm run lint` passes.
- `npm run build` passes.
- Documentation-only tasks do not change site code, Docker, or proxy config.
- If container was rebuilt, success criteria in section 7 are satisfied.
- `curl -I https://rtc.rdk-invest.ru` returns 200 OK (after NPM proxy + SSL cert are active).

## 12. Known resolved issues

**Port 3000 conflict (2026-05-25):** NPM backend process occupied port 3000 on all interfaces (0.0.0.0:3000). Fixed by mapping host port 3001 → container port 3000 in `docker-compose.yml`. NPM proxy host for rtc.rdk-invest.ru must use port 3001 as backend.

**NAS preview (legacy):** The NAS previously served the default Next.js page although the project code was correct. The container had been built from an old image. Resolution was `docker compose build --no-cache`. This is NAS-specific history; new server uses standard build flow.

## 13. Chat roles and project prompts

Project chat roles and full startup prompts are documented in `docs/chat-prompts.md`.

Known chats:

- `00 HUB / Главный чат`
- `01 Сайт / Архитектура`
- `02 Сайт / Разработка`
- `03 Сайт / Дизайн`
- `04 Сайт / Контент`
- `05 Сайт / Ошибки и ревью`
- `10 Бизнес / План`
- `11 Китай / UOGEL / Поставщики`
- `20 Instagram`
- `21 Telegram`
- `22 Реклама`
- `30 Brainstorm / Идеи`
- `40 Документы`
- `41 База знаний`

The local `_index.md` source was not present in the project folder during the 2026-05-22 documentation update. The prompts were restored from the Google Drive document `UOGEL RUSSIA — Промпты для чатов (.md)` and formatted in `docs/chat-prompts.md`.

## 14. Leads / Telegram

Lead forms send POST requests to:

`/api/lead`

Current flow:

1. Validate request on the server.
2. Apply in-memory rate limit: 3 requests per IP per 10 minutes.
3. Try to send Telegram message through NAS proxy.
4. Always save accepted lead to `data/leads.jsonl`.
5. Store Telegram delivery result as `telegramStatus: "sent" | "failed"`.

Important:

- Telegram does not work directly from the container in Russia.
- Telegram API is reached through NAS proxy:
  `192.168.50.190:7890`
- Do not remove local backup.
- Do not commit `.env`, `.env.local`, or `data/leads.jsonl`.
- `data/leads.jsonl` is mounted via Docker volume:
  `./data:/app/data`

## 15. What to read before starting

Read in this order:

1. `AGENTS.md`
2. `PROJECT_NOTES.md`
3. `README.md`
4. `docs/chat-prompts.md`
5. Relevant Next.js docs in `node_modules/next/dist/docs/`, if present, before framework-specific code changes
