(function () {
  "use strict";
  var S = window.STUDY;
  var KEY = "certprep:v1";
  var state = load();

  // ---------- storage ----------
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      var s = raw ? JSON.parse(raw) : {};
      return { done: s.done || {}, nights: s.nights || {} };
    } catch (e) { return { done: {}, nights: {} }; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { toast("Couldn't save in this browser"); }
  }

  // ---------- dates ----------
  function ymd(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function parseYmd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function nice(s) { var d = parseYmd(s); return DOW[d.getDay()] + " " + d.getDate() + " " + MON[d.getMonth()]; }
  function today() { return ymd(new Date()); }

  // ---------- helpers ----------
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.indexOf("on") === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function allPlanItems() {
    var out = [];
    S.plan.forEach(function (ph) { ph.items.forEach(function (it) { out.push(it); }); });
    return out;
  }
  function trackables() {
    return allPlanItems().map(function (i) { return i.id; })
      .concat(S.drills.map(function (d) { return d.id; }))
      .concat(S.topics.map(function (t) { return t.id; }))
      .concat(S.examDay.map(function (e) { return e.id; }));
  }
  function toggle(id) {
    if (state.done[id]) delete state.done[id]; else state.done[id] = 1;
    save(); renderAll();
  }

  // ---------- row builders ----------
  function checkRow(id, bodyKids, extraClass) {
    var done = !!state.done[id];
    var cb = el("input", { type: "checkbox", "aria-label": "Done" });
    cb.checked = done;
    var row = el("li", { class: "row" + (done ? " done" : "") + (extraClass ? " " + extraClass : "") },
      [cb, el("div", { class: "body" }, bodyKids)]);
    row.addEventListener("click", function (e) {
      if (e.target.closest("button") || e.target.closest("pre")) return;
      toggle(id);
    });
    return row;
  }
  function planRow(it) {
    var t = today();
    var cls = [];
    if (it.date === t) cls.push("today");
    if (it.date < t) cls.push("overdue");
    if (it.mode === "exam") cls.push("exam");
    var meta = el("div", { class: "meta" }, [
      el("span", { class: "date", text: nice(it.date) + (it.date === t ? " - today" : "") }),
      el("span", { class: "pill " + it.mode, text: it.mode === "exam" ? "Exam" : it.mode === "laptop" ? "Laptop" + (it.hrs ? " " + it.hrs + "h" : "") : "Phone" })
    ]);
    return checkRow(it.id, [meta, el("div", { class: "txt", text: it.text })], cls.join(" "));
  }
  function drillRow(d) {
    var kids = [el("div", { class: "txt", text: d.text })];
    if (d.code) {
      kids.push(el("pre", {}, [el("code", { text: d.code })]));
      kids.push(el("button", { class: "copy", text: "Copy DQL", onclick: function () { copy(d.code, "DQL copied"); } }));
    }
    return checkRow(d.id, kids);
  }

  // ---------- views ----------
  function renderCountdowns() {
    var box = document.getElementById("countdowns");
    box.innerHTML = "";
    var now = Date.now();
    S.exams.forEach(function (x) {
      var ms = new Date(x.when).getTime() - now;
      var days = Math.ceil(ms / 86400000);
      var past = ms < 0;
      box.appendChild(el("div", { class: "cd" + (past ? " past" : "") }, [
        el("div", { class: "n", text: past ? "Done" : days + (days === 1 ? " day" : " days") }),
        el("div", { class: "l", text: x.name + " - " + x.note })
      ]));
    });
  }
  function renderProgress() {
    var ids = trackables();
    var n = ids.filter(function (i) { return state.done[i]; }).length;
    var pct = Math.round((n / ids.length) * 100);
    document.getElementById("bar-fill").style.width = pct + "%";
    document.getElementById("bar-label").textContent = n + "/" + ids.length;
  }

  function nightDates() {
    var out = [], d = parseYmd(S.nightly.from), end = parseYmd(S.nightly.to);
    while (d <= end) { out.push(ymd(d)); d.setDate(d.getDate() + 1); }
    return out;
  }
  function streak() {
    var n = 0, d = new Date();
    if (!state.nights[ymd(d)]) d.setDate(d.getDate() - 1); // tonight not ticked yet doesn't break streak
    while (state.nights[ymd(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function nightsGrid() {
    var t = today();
    var dates = nightDates();
    var grid = el("div", { class: "nights" });
    // pad so columns line up Mon..Sun
    var first = parseYmd(dates[0]).getDay(); var lead = (first + 6) % 7;
    for (var i = 0; i < lead; i++) grid.appendChild(el("div"));
    dates.forEach(function (ds) {
      var d = parseYmd(ds);
      var on = !!state.nights[ds];
      var b = el("button", {
        class: "night" + (on ? " on" : "") + (ds === t ? " today" : "") + (ds > t ? " future" : ""),
        "aria-pressed": on ? "true" : "false",
        "aria-label": "Night hour " + nice(ds),
        onclick: function () {
          if (state.nights[ds]) delete state.nights[ds]; else state.nights[ds] = 1;
          save(); renderAll();
        }
      }, [el("b", { text: String(d.getDate()) }), MON[d.getMonth()]]);
      grid.appendChild(b);
    });
    var hdr = el("div", { class: "nights", style: "margin-bottom:4px" });
    ["M", "T", "W", "T", "F", "S", "S"].forEach(function (x) { hdr.appendChild(el("div", { class: "muted", style: "text-align:center;font-size:.75rem", text: x })); });
    return el("div", {}, [
      el("p", { class: "streak", text: "Streak: " + streak() + " night" + (streak() === 1 ? "" : "s") + " - " + Object.keys(state.nights).length + " total. " + S.nightly.label }),
      hdr, grid
    ]);
  }

  function renderToday() {
    var p = document.getElementById("tab-today"); p.innerHTML = "";
    var t = today();
    var items = allPlanItems();
    var todays = items.filter(function (i) { return i.date === t; });
    var overdue = items.filter(function (i) { return i.date < t && !state.done[i.id]; });
    var next = items.filter(function (i) { return i.date > t; }).slice(0, 3);

    p.appendChild(el("h2", { text: "Today - " + nice(t) }));
    if (todays.length) {
      var l = el("ul", { class: "list" }); todays.forEach(function (i) { l.appendChild(planRow(i)); }); p.appendChild(l);
    } else {
      p.appendChild(el("div", { class: "empty", text: "No laptop block today. Do your night hour and one drill from memory." }));
    }

    var tn = !!state.nights[t];
    if (t >= S.nightly.from && t <= S.nightly.to) {
      p.appendChild(el("h2", { text: "Tonight" }));
      var l2 = el("ul", { class: "list" });
      var row = el("li", { class: "row" + (tn ? " done" : "") }, [
        (function () { var c = el("input", { type: "checkbox", "aria-label": "Done" }); c.checked = tn; return c; })(),
        el("div", { class: "body" }, [
          el("div", { class: "meta" }, [el("span", { class: "pill phone", text: "Phone 1h" })]),
          el("div", { class: "txt", text: S.nightly.label })
        ])
      ]);
      row.addEventListener("click", function () {
        if (state.nights[t]) delete state.nights[t]; else state.nights[t] = 1; save(); renderAll();
      });
      l2.appendChild(row); p.appendChild(l2);
    }

    if (overdue.length) {
      p.appendChild(el("h2", { text: "Catch up (" + overdue.length + ")" }));
      var l3 = el("ul", { class: "list" }); overdue.forEach(function (i) { l3.appendChild(planRow(i)); }); p.appendChild(l3);
    }
    if (next.length) {
      p.appendChild(el("h2", { text: "Coming up" }));
      var l4 = el("ul", { class: "list" }); next.forEach(function (i) { l4.appendChild(planRow(i)); }); p.appendChild(l4);
    }
  }

  function renderPlan() {
    var p = document.getElementById("tab-plan"); p.innerHTML = "";
    S.plan.forEach(function (ph) {
      var n = ph.items.filter(function (i) { return state.done[i.id]; }).length;
      p.appendChild(el("h2", { text: ph.title + "  (" + n + "/" + ph.items.length + ")" }));
      p.appendChild(el("p", { class: "where", text: ph.where }));
      var l = el("ul", { class: "list" }); ph.items.forEach(function (i) { l.appendChild(planRow(i)); }); p.appendChild(l);
    });
    p.appendChild(el("h2", { text: "Night hours" }));
    p.appendChild(nightsGrid());
  }

  function renderDrills() {
    var p = document.getElementById("tab-drills"); p.innerHTML = "";
    p.appendChild(el("p", { class: "where", text: "Do each in the work playground until it takes under 5 minutes without looking. Tick when you can." }));
    var l = el("ul", { class: "list" }); S.drills.forEach(function (d) { l.appendChild(drillRow(d)); }); p.appendChild(l);
  }

  function renderTopics() {
    var p = document.getElementById("tab-topics"); p.innerHTML = "";
    p.appendChild(el("p", { class: "where", text: "Tick a topic when you could explain it to a teammate. DQL and dashboards carry the practical." }));
    var l = el("ul", { class: "list" });
    S.topics.forEach(function (t) {
      l.appendChild(checkRow(t.id, [el("div", { class: "meta" }, [el("strong", { text: t.name })]), el("div", { class: "txt", text: t.know })]));
    });
    p.appendChild(l);
  }

  var glossOrder = null;
  function renderGlossary() {
    var p = document.getElementById("tab-glossary"); p.innerHTML = "";
    var list = glossOrder || S.glossary;
    var cards = el("div", { class: "cards" });
    list.forEach(function (g) {
      cards.appendChild(el("details", { class: "card" }, [el("summary", { text: g[0] }), el("p", { text: g[1] })]));
    });
    p.appendChild(el("div", { class: "toolbar" }, [
      el("button", { class: "ghost", text: "Shuffle", onclick: function () {
        glossOrder = S.glossary.slice().sort(function () { return Math.random() - 0.5; }); renderGlossary();
      } }),
      el("button", { class: "ghost", text: "Reveal all", onclick: function () { cards.querySelectorAll("details").forEach(function (d) { d.open = true; }); } }),
      el("button", { class: "ghost", text: "Hide all", onclick: function () { cards.querySelectorAll("details").forEach(function (d) { d.open = false; }); } })
    ]));
    p.appendChild(cards);
  }

  function renderExamDay() {
    var p = document.getElementById("tab-examday"); p.innerHTML = "";
    var l = el("ul", { class: "list" }); S.examDay.forEach(function (e) { l.appendChild(checkRow(e.id, [el("div", { class: "txt", text: e.text })])); });
    p.appendChild(l);
  }

  function renderAll() {
    renderCountdowns(); renderProgress();
    renderToday(); renderPlan(); renderDrills(); renderTopics(); renderGlossary(); renderExamDay();
  }

  // ---------- tabs ----------
  function showTab(name) {
    var btns = document.querySelectorAll(".tabs button");
    var ok = false;
    btns.forEach(function (b) { if (b.dataset.tab === name) ok = true; });
    if (!ok) name = "today";
    btns.forEach(function (b) { b.setAttribute("aria-selected", b.dataset.tab === name ? "true" : "false"); });
    document.querySelectorAll(".panel").forEach(function (s) { s.hidden = s.id !== "tab-" + name; });
  }
  document.querySelectorAll(".tabs button").forEach(function (b) {
    b.addEventListener("click", function () { history.replaceState(null, "", "#" + b.dataset.tab); showTab(b.dataset.tab); window.scrollTo(0, 0); });
  });

  // ---------- sync ----------
  function copy(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(msg); }, function () { window.prompt("Copy this:", text); });
    } else { window.prompt("Copy this:", text); }
  }
  document.getElementById("btn-export").addEventListener("click", function () {
    var code = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    copy(code, "Sync code copied - paste it on your other device");
  });
  document.getElementById("btn-import").addEventListener("click", function () {
    var code = window.prompt("Paste the sync code from your other device:");
    if (!code) return;
    try {
      var s = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
      // merge so nothing ticked on either device is lost
      Object.keys(s.done || {}).forEach(function (k) { state.done[k] = 1; });
      Object.keys(s.nights || {}).forEach(function (k) { state.nights[k] = 1; });
      save(); renderAll(); toast("Progress merged");
    } catch (e) { toast("That code didn't work"); }
  });
  document.getElementById("btn-reset").addEventListener("click", function () {
    if (window.confirm("Clear all ticks in this browser?")) { state = { done: {}, nights: {} }; save(); renderAll(); toast("Reset"); }
  });

  renderAll();
  showTab((location.hash || "#today").slice(1));
  setInterval(renderCountdowns, 60000);
})();
