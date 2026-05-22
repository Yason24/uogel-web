# UOGEL Russia — Agent Guide Bundle

Fixed on: 2026-05-22

This consolidated markdown file is prepared for sharing with Codex, Claude, Copilot, and project participants. It combines the main agent rules, human project notes, chat role reference, and a short startup guide.

## Short instruction for Codex / Claude / Copilot

Always start UOGEL work with:

```bash
source ~/.config/proxy-env.sh
cd /projects/web/uogel
pwd
git status
git rev-parse HEAD
```

Use only `/projects/web/uogel` for development. Do not work in `/workspace`, `/volume1/Web/uogel-next-tmp`, temporary Next.js folders, or other project copies.

For documentation-only tasks, do not change site code, Docker, NAS preview, NAS services, or proxy config.

Required local checks before commit:

```bash
npm run lint
npm run build
```

If changes must be visible on NAS preview after push:

```bash
ssh root-asustor
cd /volume1/Web/uogel
docker compose down
docker compose build --no-cache
docker compose up -d
```

Preview URL: `http://192.168.50.181:3000/`.

## Business rule

The website sells only pergolas in available sizes.

Do not write:

- any sizes for your project
- custom manufacturing to your size
- we will manufacture any configuration

Allowed wording:

- we will select a suitable pergola from available sizes
- we will calculate the cost for the chosen model and configuration
- we will help choose a size for your property

Do not claim official representative status without a confirmed dealer agreement.

## Included documents

- `AGENTS.md`: main operating guide for agents.
- `PROJECT_NOTES.md`: human technical note for Artem and new participants.
- `docs/chat-prompts.md`: clean chat-role document prepared from the available role list; full prompt import is pending because `_index.md` is not present in the project.

## AGENTS.md

See the project file `AGENTS.md` for the full current guide. It covers:

- project summary;
- business rules;
- current infrastructure;
- correct working directories;
- Git workflow;
- development workflow;
- NAS Docker preview workflow;
- proxy and network setup;
- safety rules;
- validation checklist;
- known resolved issues;
- chat roles and project prompts;
- what to read before starting.

## PROJECT_NOTES.md

See the project file `PROJECT_NOTES.md` for the human technical note. It covers:

- date of fixation: 2026-05-22;
- current VS Code / Ubuntu Dev / Codex / Claude / Copilot scheme;
- NAS Docker preview;
- proxy setup;
- resolved default Next.js page issue;
- short workflow after changes;
- safety notes.

## docs/chat-prompts.md

See the project file `docs/chat-prompts.md`.

Known project chats:

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

The source `_index.md` with full prompts is currently missing from `/projects/web/uogel`. After it is added, update `docs/chat-prompts.md` from the source and keep the safer official-representative wording:

> the site should look reliable and professional, but without false claims of official representative status if there is no dealer agreement.

## Google Drive upload set

Upload these markdown files:

- `AGENTS.md`
- `PROJECT_NOTES.md`
- `docs/chat-prompts.md`
- `docs/UOGEL_Russia_Agent_Guide.md`
