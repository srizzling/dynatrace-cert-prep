// Single source of truth for the site. Edit this file to change the plan.
// Each item id must stay unique and stable - progress is saved against it.
window.STUDY = {
  title: "Cert Prep 2026",
  exams: [
    { id: "dt", name: "Dynatrace Associate", when: "2026-12-04T12:00:00+11:00", note: "Fri 4 Dec, 12:00 AEDT (6:30am IST)" },
    { id: "ai901", name: "Microsoft AI-901", when: "2026-12-18T12:00:00+11:00", note: "Fri 18 Dec, 12:00 AEDT (6:30am IST)" }
  ],

  // Nightly phone hour - one tick per night, shown as a streak grid.
  nightly: { from: "2026-11-03", to: "2026-12-17", label: "Night hour (phone): one video + one section of notes" },

  plan: [
    {
      id: "p1", title: "Phase 1 - Dynatrace foundations", where: "Melbourne - laptop",
      items: [
        { id: "d-1105", date: "2026-11-05", mode: "laptop", hrs: 1,   text: "Start Dynatrace University Associate learning path. Log in to the work playground." },
        { id: "d-1106", date: "2026-11-06", mode: "laptop", hrs: 4,   text: "12-4 block: platform + OneAgent modules. First DQL drills (error logs, CPU timeseries)." },
        { id: "d-1109", date: "2026-11-09", mode: "laptop", hrs: 3.5, text: "Observability modules: services, traces, logs. Build a notebook (+ > Metric trick)." },
        { id: "d-1110", date: "2026-11-10", mode: "laptop", hrs: 1,   text: "New dashboards: variables, tile types. Strict naming practice (ax-dashboard)." },
        { id: "d-1111", date: "2026-11-11", mode: "laptop", hrs: 1,   text: "RUM + Synthetics settings tour: key user actions, cost control, monitor locations/schedule." },
        { id: "d-1112", date: "2026-11-12", mode: "phone",  hrs: 0,   text: "Office day - phone only. Reread glossary." }
      ]
    },
    {
      id: "p2", title: "Phase 2 - Travel", where: "Singapore + arrival - phone only",
      items: [
        { id: "d-trav1", date: "2026-11-14", mode: "phone", hrs: 0, text: "Rewatch weak-area videos." },
        { id: "d-trav2", date: "2026-11-19", mode: "phone", hrs: 0, text: "Glossary self-test: cover the right column, say it aloud." }
      ]
    },
    {
      id: "p3", title: "Phase 3 - Dynatrace deep dive", where: "Pondy - 1 h weekdays + Fri 12-4 AEDT",
      items: [
        { id: "d-1123", date: "2026-11-23", mode: "laptop", hrs: 1, text: "Finish learning path: Workflows module." },
        { id: "d-1124", date: "2026-11-24", mode: "laptop", hrs: 1, text: "Bizevents capture rules + DQL on bizevents." },
        { id: "d-1125", date: "2026-11-25", mode: "laptop", hrs: 1, text: "Log ingestion rules; logs & events in DQL." },
        { id: "d-1126", date: "2026-11-26", mode: "laptop", hrs: 1, text: "Platform basics: retention periods, timeouts, support tiers (rote MCQ stuff)." },
        { id: "d-1127", date: "2026-11-27", mode: "laptop", hrs: 4, text: "12-4 block: sample exam, then redo every wrong answer hands-on. Run proctor system check." },
        { id: "d-1130", date: "2026-11-30", mode: "laptop", hrs: 1, text: "DQL from scratch: all drills, no notes." },
        { id: "d-1201", date: "2026-12-01", mode: "laptop", hrs: 1, text: "Dashboard with variables from scratch, timed (<10 min)." },
        { id: "d-1202", date: "2026-12-02", mode: "laptop", hrs: 1, text: "Traces, synthetics, RUM 'find the answer' drills." },
        { id: "d-1203", date: "2026-12-03", mode: "laptop", hrs: 1, text: "Weakest area from sample exam. Walk through exam-day checklist." },
        { id: "x-dt",   date: "2026-12-04", mode: "exam",   hrs: 2, text: "DYNATRACE ASSOCIATE EXAM (12:00 AEDT / 6:30am IST)." }
      ]
    },
    {
      id: "p4", title: "Phase 4 - Microsoft AI-901", where: "Pondy - 1 h weekdays + Fri 12-4 AEDT",
      items: [
        { id: "a-1207", date: "2026-12-07", mode: "laptop", hrs: 1, text: "Book AI-901 slot. Start Microsoft Learn AI-901 path: AI concepts + responsible AI." },
        { id: "a-1208", date: "2026-12-08", mode: "laptop", hrs: 1, text: "Machine learning fundamentals module." },
        { id: "a-1209", date: "2026-12-09", mode: "laptop", hrs: 1, text: "Generative AI + agents modules." },
        { id: "a-1210", date: "2026-12-10", mode: "laptop", hrs: 1, text: "Python basics for the hands-on bits." },
        { id: "a-1211", date: "2026-12-11", mode: "laptop", hrs: 4, text: "12-4 block: free practice assessment, then review weak domains." },
        { id: "a-1214", date: "2026-12-14", mode: "laptop", hrs: 1, text: "Weak domain #1." },
        { id: "a-1215", date: "2026-12-15", mode: "laptop", hrs: 1, text: "Weak domain #2." },
        { id: "a-1216", date: "2026-12-16", mode: "laptop", hrs: 1, text: "Practice assessment again - aim 85%+." },
        { id: "a-1217", date: "2026-12-17", mode: "laptop", hrs: 1, text: "Light review. System check on exam laptop." },
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
