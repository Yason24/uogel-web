# UOGEL Russia — Agent Guide

This is the main operating guide for Codex, Claude, Copilot, and other agents working on the UOGEL Russia Website.

## 1. Project summary

- Project: UOGEL Russia Website
- Repository: `git@github.com:Yason24/uogel-web.git`
- Active branch: `main`
- Ubuntu Dev / VS Code / Codex / Claude path: `/projects/web/uogel`
- NAS project path: `/volume1/Web/uogel`
- Preview URL: `http://192.168.50.181:3000/`
- Docker container: `uogel-web`

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

Development runs in Ubuntu Dev through VS Code, Codex, Claude, and Copilot. The production/preview container runs on the NAS through Docker.

Volume mapping:

```bash
/volume1/Web:/projects/web
/volume1/Web/uogel:/volume1/Web/uogel
```

Docker compose file:

```bash
/volume1/Web/uogel/docker-compose.yml
```

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
- `/volume1/Web/uogel-next-tmp`
- any temporary Next.js folder
- any other copy of the project

## 5. Git workflow

Before changes:

```bash
source ~/.config/proxy-env.sh
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

## 7. NAS Docker preview workflow

If changes must be visible on NAS preview after push, rebuild on the NAS:

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
- Browser opens `http://192.168.50.181:3000/`.

Do not touch NAS preview unless the task explicitly requires it.

## 8. Proxy / network setup

Ubuntu Dev uses the local Docker proxy:

```bash
http://sing-box-dev-proxy:7890
```

Before commands that need the internet:

```bash
source ~/.config/proxy-env.sh
```

Proxy checks:

```bash
curl https://ifconfig.me/ip
curl -I https://github.com
curl -I https://api.github.com
curl -I https://download.jetbrains.com
```

Do not use the Raspberry proxy. Do not use the Windows proxy. Do not change `sing-box-dev-proxy` without separate permission.

## 9. Safety rules

- Do not touch the VPS.
- Do not touch NAS Web Server, Apache, or Nginx Proxy Manager.
- Do not touch other sites or folders:
  - `/volume1/Web/sanda_fleet`
  - `/volume1/Web/uogel-next-tmp`
  - `/volume1/docker/ubuntu-dev`
  - `/volume1/Web/wordpress`
  - `/volume1/Web/phpmyadmin`
  - other projects in `/volume1/Web`
- Do not run `docker compose down` for other projects.
- Do not run `git reset --hard` without approval.
- Do not force push.
- Do not delete folders without backup and explicit approval.
- Do not update the native Node.js installation on the NAS.
- Do not change NAS system services.
- Do not touch VLESS, sing-box, WireGuard, or VPN.

## 10. Validation checklist

Before final handoff:

- `pwd` is `/projects/web/uogel`.
- `git status` has no unexpected project changes.
- `npm run lint` passes.
- `npm run build` passes.
- Documentation-only tasks do not change site code, Docker, NAS preview, or proxy config.
- If NAS preview was rebuilt, the success criteria in section 7 are satisfied.

## 11. Known resolved issues

The NAS previously served the default Next.js page although the project code was correct. The container had been built from an old image.

Resolution:

```bash
ssh root-asustor
cd /volume1/Web/uogel
docker compose down
docker compose build --no-cache
docker compose up -d
```

After the no-cache rebuild, the NAS served the UOGEL page instead of the default Next.js starter page.

## 12. Chat roles and project prompts

Project chat roles are documented in `docs/chat-prompts.md`.

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

The original `_index.md` source was expected to contain the full prompts for these chats. If it is added later, update `docs/chat-prompts.md` from that file without changing role meaning.

## 13. What to read before starting

Read in this order:

1. `AGENTS.md`
2. `PROJECT_NOTES.md`
3. `README.md`
4. `docs/chat-prompts.md`
5. Relevant Next.js docs in `node_modules/next/dist/docs/`, if present, before framework-specific code changes
