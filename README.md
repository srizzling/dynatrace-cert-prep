# Cert Prep 2026

My study plan for **Dynatrace Associate** (Fri 4 Dec 2026) then **Microsoft AI-901** (Fri 18 Dec 2026).

Two ways to use it:

- **Interactive site** (`index.html`): tick off plan items, drills, topics and night hours; countdowns to both exams; glossary flashcards. Works on phone and laptop.
- **Markdown notes** (`docs/`): the same content, readable straight on GitHub.

| File | What's in it |
| --- | --- |
| [docs/plan.md](docs/plan.md) | Day-by-day plan, both exams |
| [docs/topics.md](docs/topics.md) | What the Dynatrace exam tests |
| [docs/drills.md](docs/drills.md) | Hands-on drills with starter DQL |
| [docs/glossary.md](docs/glossary.md) | Tap-to-reveal glossary |
| [docs/exam-day.md](docs/exam-day.md) | Exam-day checklist |
| `dql/` | Drill queries as `.dql` files |

## Run it

**GitHub Pages:** push this repo, then Settings > Pages > Deploy from branch > `main` / root. The site appears at `https://srizzling.github.io/dynatrace-cert-prep/`.

**On the LAN:** from the repo folder run

```
python3 -m http.server 8080 --bind 0.0.0.0
```

then open `http://<your-pc-ip>:8080` on your phone (same Wi-Fi).

## Progress and syncing

Ticks are saved in each browser (localStorage), so phone and laptop each keep their own. To combine them: **Copy sync code** on one device, **Paste sync code** on the other. Pasting merges, so nothing ticked on either side is lost.

## Changing the plan

Edit `assets/data.js` (the single source of truth), then regenerate the markdown:

```
node scripts/build-docs.js
```

Keep item `id`s unchanged when editing text, or that item's tick will reset.
