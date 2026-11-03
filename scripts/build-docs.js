// Regenerates docs/*.md and dql/*.dql from assets/data.js so the
// markdown and the site never drift apart.
// Usage: node scripts/build-docs.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/data.js"), "utf8"), ctx);
const S = ctx.window.STUDY;

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const nice = (s) => { const [y, m, d] = s.split("-").map(Number); const dt = new Date(y, m - 1, d); return `${DOW[dt.getDay()]} ${d} ${MON[m - 1]}`; };
const mode = (i) => i.mode === "exam" ? "**EXAM**" : i.mode === "laptop" ? `laptop${i.hrs ? " " + i.hrs + "h" : ""}` : "phone";

const out = {};

out["plan.md"] = [
  "# Study plan",
  "",
  ...S.exams.map((x) => `- **${x.name}:** ${x.note}`),
  "",
  `Every night: ${S.nightly.label} (${nice(S.nightly.from)} to ${nice(S.nightly.to)}).`,
  "",
  ...S.plan.flatMap((ph) => [
    `## ${ph.title}`,
    "",
    `_${ph.where}_`,
    "",
    ...ph.items.map((i) => `- [ ] **${nice(i.date)}** (${mode(i)}): ${i.text}`),
    ""
  ])
].join("\n");

out["drills.md"] = [
  "# Playground drills",
  "",
  "Do each in the work playground until it takes under 5 minutes without looking.",
  "",
  ...S.drills.flatMap((d) => [`- [ ] ${d.text}`, ...(d.code ? ["", "```", d.code, "```", ""] : [])])
].join("\n") + "\n";

out["topics.md"] = [
  "# What's tested",
  "",
  "DQL and dashboards carry the practical section. Expect rote MCQs on retention periods, timeouts and support tiers.",
  "",
  ...S.topics.flatMap((t) => [`## ${t.name}`, "", t.know, ""])
].join("\n");

out["glossary.md"] = [
  "# Glossary",
  "",
  "Tap a term to reveal it (works on GitHub mobile).",
  "",
  ...S.glossary.flatMap(([k, v]) => [`<details><summary><b>${k}</b></summary>`, "", v, "", "</details>", ""])
].join("\n");

out["exam-day.md"] = [
  "# Exam-day checklist",
  "",
  ...S.examDay.map((e) => `- [ ] ${e.text}`),
  ""
].join("\n");

fs.mkdirSync(path.join(root, "docs"), { recursive: true });
for (const [f, body] of Object.entries(out)) fs.writeFileSync(path.join(root, "docs", f), body);

fs.mkdirSync(path.join(root, "dql"), { recursive: true });
S.drills.filter((d) => d.code).forEach((d, i) => {
  const slug = d.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  fs.writeFileSync(path.join(root, "dql", `${String(i + 1).padStart(2, "0")}-${slug}.dql`), `// ${d.text}\n${d.code}\n`);
});

console.log("Wrote docs/ and dql/");
