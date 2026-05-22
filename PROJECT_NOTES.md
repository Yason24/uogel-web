# UOGEL Russia Website — Project Notes

Fixed on: 2026-05-22

This is a human technical note for Artem and new project participants. It explains the current VS Code / Ubuntu Dev / Codex / Claude / Copilot workflow and the NAS Docker preview setup.

## Current development scheme

- Project: UOGEL Russia Website
- GitHub: `git@github.com:Yason24/uogel-web.git`
- Main development path: `/projects/web/uogel`
- NAS project path: `/volume1/Web/uogel`
- Active workflow: edit in Ubuntu Dev, validate locally, commit, push, rebuild NAS Docker preview only when needed.

Always start work with:

```bash
cd /projects/web/uogel
pwd
git status
git rev-parse HEAD
```

Do not use `/workspace`, `/volume1/Web/uogel-next-tmp`, temporary Next.js folders, or other project copies for UOGEL work.

## NAS preview

The site runs on the NAS through Docker.

- Container: `uogel-web`
- Preview URL: `http://192.168.50.181:3000/`
- Docker compose file: `/volume1/Web/uogel/docker-compose.yml`

The Ubuntu Dev and NAS paths are connected by Docker volumes:

```bash
/volume1/Web:/projects/web
/volume1/Web/uogel:/volume1/Web/uogel
```

Rebuild preview on the NAS only when changes must be visible there:

```bash
ssh root-asustor
cd /volume1/Web/uogel
docker compose down
docker compose build --no-cache
docker compose up -d
```

Check after rebuild:

```bash
docker ps --filter name=uogel-web
docker logs --tail=100 uogel-web
curl -I http://127.0.0.1:3000
curl -s http://127.0.0.1:3000 | grep -Ei "UOGEL|пергол|Рассчитать|стоимость|биоклимат" | head -30
curl -s http://127.0.0.1:3000 | grep -Ei "To get started|Deploy Now|Next.js logo" | head -30 || true
```

Success criteria:

- HTML contains `UOGEL`, `пергол`, `Рассчитать`, `стоимость`, or `биоклимат`.
- HTML does not contain `To get started`, `Deploy Now`, or `Next.js logo`.
- The browser opens `http://192.168.50.181:3000/`.

## VPS preview

The VPS preview is available at `http://81.85.49.193/`.

- VPS host: `uzbek-vps`
- Site path: `/opt/uogel`
- Container: `uogel-web`
- Port 80 is published by Docker to container port 3000.
- Port 443 is reserved by `sing-box` / VLESS. Do not use it for the site preview.
- WireGuard `wg0` is disabled; `wg-quick@wg0` is disabled and inactive.
- `nftables` is enabled and has `forward` policy `drop`, so Docker bridge traffic for the preview requires explicit allow rules in `/etc/nftables.conf`.
- Current UOGEL Docker bridge: `br-9c2900334a5f`; current container IP: `172.18.0.2`.
- If the Docker network is recreated or the container IP changes, update the UOGEL allow rules in `/etc/nftables.conf` and reload `nftables`.

## Proxy

Ubuntu Dev uses the local Docker proxy:

```bash
http://sing-box-dev-proxy:7890
```

Before commands that need internet access:

```bash
source ~/.config/proxy-env.sh
```

Checks:

```bash
curl https://ifconfig.me/ip
curl -I https://github.com
curl -I https://api.github.com
curl -I https://download.jetbrains.com
```

Do not use Raspberry proxy or Windows proxy. Do not change `sing-box-dev-proxy` without separate permission.

## Resolved default Next.js page issue

Problem: the NAS preview showed the default Next.js starter page, even though the repository already contained the UOGEL site.

Cause: the running Docker container was built from an old image.

Fix: rebuild the NAS container without cache:

```bash
ssh root-asustor
cd /volume1/Web/uogel
docker compose down
docker compose build --no-cache
docker compose up -d
```

Result: the preview served the UOGEL page and no longer showed `To get started`, `Deploy Now`, or `Next.js logo`.

## Short workflow after changes

In Ubuntu Dev:

```bash
source ~/.config/proxy-env.sh
cd /projects/web/uogel
npm run lint
npm run build
git status
git add .
git commit -m "Clear description of the change"
git push
```

If the change must appear on NAS preview, rebuild Docker on the NAS after push.

## Safety notes

- Do not touch the VPS.
- Do not touch NAS Web Server, Apache, or Nginx Proxy Manager.
- Do not touch other folders in `/volume1/Web`.
- Do not run Docker commands for other projects.
- Do not delete folders without backup and explicit approval.
- Do not force push.
- Do not update the native Node.js on NAS.
- Do not change NAS system services.
- Do not touch VLESS, sing-box, WireGuard, or VPN.

## Documentation entry points

- `AGENTS.md`: main guide for agents.
- `README.md`: project overview and short workflow.
- `docs/chat-prompts.md`: chat roles and prompt source notes.
- `docs/UOGEL_Russia_Agent_Guide.md`: consolidated markdown guide for sharing.
