# UOGEL Russia Website: Project Notes

This file records the working infrastructure and rules for the UOGEL Russia Website project.

## Project

- Name: UOGEL Russia Website
- GitHub: `git@github.com:Yason24/uogel-web.git`
- Baseline working commit: `456ab16e8fc3b2daf8cb6d69e37a60472d7997c5`

## Correct Paths

Use these paths for this site:

- Ubuntu Dev development path: `/projects/web/uogel`
- NAS project path: `/volume1/Web/uogel`

These paths must refer to the same project through the volume mount:

- `/volume1/Web:/projects/web`
- `/volume1/Web/uogel:/volume1/Web/uogel`

Do not create or use another project directory for UOGEL. Do not work in `/workspace` for this site. Do not create temporary Next.js projects unless explicitly approved.

Before working on UOGEL, always run:

```bash
cd /projects/web/uogel
pwd
git status
git rev-parse HEAD
```

## Production and Preview

The site runs on the NAS through Docker.

- Container: `uogel-web`
- Port: `3000`
- Preview URL: `http://192.168.50.181:3000/`
- Docker compose file: `/volume1/Web/uogel/docker-compose.yml`

Run and rebuild the production container from the NAS project folder:

```bash
cd /volume1/Web/uogel
```

## Update Workflow After Changes

In Ubuntu Dev:

```bash
cd /projects/web/uogel
npm run lint
npm run build
git status
git add .
git commit -m "description of changes"
git push
```

After push and verification, on the NAS:

```bash
ssh root-asustor
cd /volume1/Web/uogel
git pull --ff-only
docker compose down
docker compose build --no-cache
docker compose up -d
```

If Docker commands from Ubuntu Dev return `permission denied` for `/var/run/docker.sock`, this is expected. Run production Docker commands through:

```bash
ssh root-asustor
cd /volume1/Web/uogel
```

## Verification After Docker Rebuild

Run:

```bash
docker ps --filter name=uogel-web
docker logs --tail=100 uogel-web
curl -I http://127.0.0.1:3000
curl -s http://127.0.0.1:3000 | grep -Ei "UOGEL|пергол|Рассчитать|стоимость|биоклимат" | head -30
curl -s http://127.0.0.1:3000 | grep -Ei "To get started|Deploy Now|Next.js logo" | head -30 || true
```

Success criteria:

- `UOGEL`, `перголы`, or `Рассчитать` appear in the HTML.
- `To get started`, `Deploy Now`, and `Next.js logo` do not appear.
- The site opens in the browser at `http://192.168.50.181:3000/`.

## Restrictions

- Do not touch NAS Web Server, Apache, or Nginx Proxy Manager yet.
- Do not touch the VPS yet.
- Do not change the Docker scheme without separate approval.
- Do not touch other folders, including:
  - `/volume1/Web/sanda_fleet`
  - `/volume1/Web/uogel-next-tmp`
  - `/volume1/docker/ubuntu-dev`
  - other sites in `/volume1/Web`
- Do not run `docker compose down` for other projects.
- Do not run `git reset --hard` without approval.
- Do not force push.
- Do not delete folders without backup and approval.

## Resolved Issue

The project code was correct at commit `456ab16e8fc3b2daf8cb6d69e37a60472d7997c5`, but the NAS served the default Next.js page because the container had been built from an old image.

The fix was:

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

After that rebuild, the site served the UOGEL page.

## Codex Startup Rule

Before starting work on this project, Codex must read:

- `AGENTS.md`
- `PROJECT_NOTES.md`
- `README.md`

