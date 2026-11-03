// Single source of truth for the site. Edit this file to change the plan.
// Each item id must stay unique and stable - progress is saved against it.
window.STUDY = {
  title: "Cert Prep 2026",
  exams: [
    { id: "dt", name: "Dynatrace Associate", when: "2026-12-04T12:00:00+11:00", note: "Fri 4 Dec, 12:00 AEDT (6:30am IST)" },
    { id: "ai901", name: "Microsoft AI-901", when: "2026-12-18T12:00:00+11:00", note: "Fri 18 Dec, 12:00 AEDT (6:30am IST)" }
  ],

  // Nightly phone hour - one tick per night, shown as a streak grid.
  nightly: { from: "2026-11-04", to: "2026-12-17", label: "Night hour (phone): 15-20 Udemy questions in practice mode, or one weak-area video" },

  plan: [
    {
      id: "p1", title: "Phase 1 - Baseline + core areas", where: "Melbourne - laptop. Spine = the 10 official topic areas; Essentials courses only where you're weak",
      items: [
        { id: "d1-1105", date: "2026-11-05", mode: "laptop", hrs: 1,   text: "Set-up: log in to Dynatrace University, open the Essentials Learning Plan to see what's done, check you can reach the new (3rd gen) apps in the work tenant. Skim the official topic list." },
        { id: "d1-1106", date: "2026-11-06", mode: "laptop", hrs: 4,   text: "12-4 BASELINE: Udemy (Daniel Hagbi) practice test 1, timed, exam mode. Then the Dynatrace University practice exam. Score each of the 10 topic areas weak/ok/strong on the Topics tab. Start on the weakest." },
        { id: "d1-1109", date: "2026-11-09", mode: "laptop", hrs: 3.5, text: "Areas 3 + 6 - Notebooks, Dashboards, DQL: 'A Practical Guide to DQL' video (36 min), DQL docs, drills 1-5 from scratch, notebook + > Metric trick." },
        { id: "d1-1110", date: "2026-11-10", mode: "laptop", hrs: 1,   text: "Area 4 - Business Analytics & DEM: RUM app definition, key user actions, synthetics settings, business events. Do the find-the-answer drills 9-10." },
        { id: "d1-1111", date: "2026-11-11", mode: "laptop", hrs: 1,   text: "Area 7 - Security: Application Security, third-party and code-level vulnerabilities, Davis Security Advisor, Security Investigator (docs)." },
        { id: "d1-1112", date: "2026-11-12", mode: "phone",  hrs: 0,   text: "Office day - phone: Udemy practice test 2 in practice mode (answers shown). Note every miss." }
      ]
    },
    {
      id: "p2", title: "Phase 2 - Travel", where: "Singapore + arrival - phone only, optional",
      items: [
        { id: "d2-trav1", date: "2026-11-15", mode: "phone", hrs: 0, text: "Udemy: redo only the questions you got wrong in tests 1-2." },
        { id: "d2-trav2", date: "2026-11-20", mode: "phone", hrs: 0, text: "Glossary self-test (shuffle). Rewatch one weak-area video." }
      ]
    },
    {
      id: "p3", title: "Phase 3 - Remaining areas + exam practice", where: "Pondy - 1 h weekdays + Fri 12-4 AEDT",
      items: [
        { id: "d3-1123", date: "2026-11-23", mode: "laptop", hrs: 1, text: "Area 8 - Automation: AutomationEngine + Workflows docs. Do the Workflows Quick Start hands-on; drill 12." },
        { id: "d3-1124", date: "2026-11-24", mode: "laptop", hrs: 1, text: "Area 9 - Ingestion: log ingestion rules, cloud integrations, bizevent capture rules. Drill 11 (find them in Settings)." },
        { id: "d3-1125", date: "2026-11-25", mode: "laptop", hrs: 1, text: "Area 5 - Data, Reporting & Analysis: dashboard report subscriptions, APIs + OAuth client, user behaviour analysis, session segmentation, metrics on Grail." },
        { id: "d3-1126", date: "2026-11-26", mode: "laptop", hrs: 1, text: "Areas 1, 2, 10 + rote: Smartscape, Hub, log content analysis, OneAgent/K8s monitoring, plus retention periods, timeouts, support tiers." },
        { id: "d3-1127", date: "2026-11-27", mode: "laptop", hrs: 4, text: "12-4 MOCK: Udemy practice test 3, timed, then the Dynatrace certificate simulations. Compare with 6 Nov baseline; redo every miss hands-on. Proctor system check." },
        { id: "d3-1130", date: "2026-11-30", mode: "laptop", hrs: 1, text: "DQL from scratch: all drills, no notes." },
        { id: "d3-1201", date: "2026-12-01", mode: "laptop", hrs: 1, text: "Dashboard with variables from scratch, timed (<10 min). Exact naming." },
        { id: "d3-1202", date: "2026-12-02", mode: "laptop", hrs: 1, text: "FINAL MOCK: last unused Udemy test (or retake your lowest), timed. Aim 80%+." },
        { id: "d3-1203", date: "2026-12-03", mode: "laptop", hrs: 1, text: "Fix the final mock's misses. Walk through the exam-day checklist." },
        { id: "x-dt",    date: "2026-12-04", mode: "exam",   hrs: 2, text: "DYNATRACE ASSOCIATE EXAM (12:00 AEDT / 6:30am IST). 60 MCQ + 10-15 practical." }
      ]
    },
    {
      id: "p4", title: "Phase 4 - Microsoft AI-901", where: "Pondy - Udemy 1-day course as the backbone; Microsoft's practice assessment is the readiness gate",
      items: [
        { id: "a-1207", date: "2026-12-07", mode: "laptop", hrs: 1, text: "Book the AI-901 exam slot (Fri 18 Dec). Confirm the Udemy course is built for AI-901, not the retired AI-900. Start the course: first quarter." },
        { id: "a-1208", date: "2026-12-08", mode: "laptop", hrs: 1, text: "Udemy course: second quarter." },
        { id: "a-1209", date: "2026-12-09", mode: "laptop", hrs: 1, text: "Udemy course: third quarter." },
        { id: "a-1210", date: "2026-12-10", mode: "laptop", hrs: 1, text: "Udemy course: finish. Do the Python and hands-on bits on the laptop, even if the course skims them." },
        { id: "a-1211", date: "2026-12-11", mode: "laptop", hrs: 4, text: "12-4 GATE: Microsoft Learn's free AI-901 practice assessment. 85%+ = light revision only next week. Below that, list weak domains and start on them." },
        { id: "a-1214", date: "2026-12-14", mode: "laptop", hrs: 1, text: "Weakest domain from the practice assessment (Microsoft Learn module for it). Light review if you scored 85%+." },
        { id: "a-1215", date: "2026-12-15", mode: "laptop", hrs: 1, text: "Second-weakest domain, or Python/agent hands-on refresher." },
        { id: "a-1216", date: "2026-12-16", mode: "laptop", hrs: 1, text: "Retake the practice assessment. Aim 85%+." },
        { id: "a-1217", date: "2026-12-17", mode: "laptop", hrs: 1, text: "Light review only. Run the Pearson OnVUE system test on the exam laptop." },
        { id: "x-ai",   date: "2026-12-18", mode: "exam",   hrs: 2, text: "AI-901 EXAM (12:00 AEDT / 6:30am IST)." }
      ]
    }
  ],

  drills: [
    { id: "q1",  text: "Error logs per host", code: 'fetch logs\n| filter loglevel == "ERROR"\n| summarize count(), by:{dt.entity.host}' },
    { id: "q2",  text: "CPU over time by host, then chart it", code: "timeseries avg(dt.host.cpu.usage), by:{dt.entity.host}" },
    { id: "q3",  text: "Pod CPU limits by namespace", code: "timeseries sum(dt.kubernetes.container.limits_cpu), by:{k8s.namespace.name}" },
    { id: "q4",  text: "Bizevents count by type", code: "fetch bizevents\n| summarize count(), by:{event.type}" },
    { id: "q5",  text: "Add, rename, drop fields", code: 'fetch logs\n| fieldsAdd sev = loglevel\n| fieldsRename msg = content\n| fieldsRemove dt.entity.host\n| limit 20' },
    { id: "q6",  text: "Notebook: + > Metric, pick a service metric, copy and adapt the generated DQL" },
    { id: "q7",  text: "Dashboard named exactly ax-dashboard with a variable driving a tile filter" },
    { id: "q8",  text: "Open a distributed trace, filter by service + response time, find slowest span" },
    { id: "q9",  text: "Find a synthetic monitor's locations, schedule, last execution result" },
    { id: "q10", text: "Find a RUM app's key user actions and cost-control setting" },
    { id: "q11", text: "Find log ingestion rules and bizevent capture rules in Settings" },
    { id: "q12", text: "Build a workflow that notifies when a problem opens" }
  ],

  topics: [
    { id: "t-dql",  name: "DQL", know: "fetch logs / bizevents / spans, filter, fieldsAdd, fieldsRemove, fieldsRename, summarize, count, avg, sum, percentile, timeseries, limit, sort." },
    { id: "t-dash", name: "Dashboards & notebooks", know: "New dashboards from scratch, variables, tile types, visualisations. Notebook + > Metric generates DQL you can adapt." },
    { id: "t-data", name: "Data & settings", know: "Data Explorer purpose, log ingestion rules, business events capture setup." },
    { id: "t-trc",  name: "Distributed traces", know: "Open traces, filter, follow findings to root cause." },
    { id: "t-rum",  name: "RUM (frontend)", know: "Application config, key user actions, cost control, user & session setup." },
    { id: "t-syn",  name: "Synthetics", know: "Browser vs HTTP monitors, locations, schedule, executions & results." },
    { id: "t-prob", name: "Problems & Davis AI", know: "How problems are raised, root-cause view, automatic baselining." },
    { id: "t-sec",  name: "Security", know: "Application Security, third-party vs code-level vulnerabilities, Davis Security Advisor and Score, Security Investigator." },
    { id: "t-wf",   name: "Workflows", know: "Build one simple event-triggered workflow." },
    { id: "t-plat", name: "Platform basics", know: "OneAgent, ActiveGate, Smartscape, Grail, data retention periods, timeouts, support tiers." },
    { id: "t-nav",  name: "Navigation", know: "Find any setting, table or user action fast - half the practical is 'look for the answer'." }
  ],

  glossary: [
    ["OneAgent", "Single agent per host; auto-discovers processes and services; captures traces, metrics, logs."],
    ["ActiveGate", "Proxy/routing component; remote monitoring (cloud APIs, extensions) and synthetic private locations."],
    ["Smartscape", "Live topology map: hosts, processes, services, apps and dependencies."],
    ["Davis AI", "Causal AI engine; correlates anomalies into one problem with a root cause."],
    ["Problem", "Davis-raised incident grouping related events, with impact and root cause."],
    ["Baselining", "Automatic learning of normal behaviour so alerts fire without manual thresholds."],
    ["Grail", "Data lakehouse for logs, metrics, events, traces; queried with DQL."],
    ["DQL", "Dynatrace Query Language: piped commands, e.g. fetch | filter | summarize."],
    ["Notebook", "Analysis canvas for DQL, metrics and markdown; for exploring."],
    ["Dashboard", "Shareable tiles with variables, built on DQL."],
    ["Bizevents", "Business events (orders, payments) captured and queried with DQL."],
    ["RUM", "Real User Monitoring: real sessions and actions in browser and mobile apps."],
    ["Key user action", "A flagged important action with its own thresholds and charts."],
    ["Synthetic monitor", "Scripted browser or HTTP check run from chosen locations on a schedule."],
    ["Distributed trace", "End-to-end path of one request across services (PurePath)."],
    ["Workflow", "Automation triggered by events or a schedule, e.g. notify on a problem."],
    ["Management zone", "Classic access/data scoping; superseded by segments and IAM policies in the new platform."]
  ],

  examDay: [
    { id: "e0", text: "Multiple-response questions deduct marks for each wrong pick - only tick options you\u2019re sure of." },
    { id: "e1", text: "By 27 Nov: proctoring system check on the exam laptop in Pondy (work laptops often block it)." },
    { id: "e2", text: "Exam slot booked - remember it's 6:30am in India." },
    { id: "e3", text: "Quiet closed room for the full slot; household told." },
    { id: "e4", text: "Passport ready for ID check; desk cleared." },
    { id: "e5", text: "If disconnected: don't log back in - contact support." },
    { id: "e6", text: "Practical: read every instruction twice; names must match character for character." },
    { id: "e7", text: "Skip hard questions, come back later - time runs out on the practical." },
    { id: "e8", text: "Use official docs (allowed in practical) and the Notebook + > Metric trick when stuck." }
  ]
};
