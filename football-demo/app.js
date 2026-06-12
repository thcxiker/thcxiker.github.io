(function () {
  const report = window.MATCH_REPORT;
  const state = {
    metricGroup: "attack",
    highlightFilter: "all",
    activeHighlightId: report.highlights[0]?.id || null,
    pitchView: "shots"
  };

  const $ = (selector) => document.querySelector(selector);
  const svgNs = "http://www.w3.org/2000/svg";

  function makeEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function makeSvg(tag, attrs = {}) {
    const node = document.createElementNS(svgNs, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function teamById(id) {
    return report.teams.home.id === id ? report.teams.home : report.teams.away;
  }

  function metricValue(value, suffix = "") {
    if (typeof value === "number" && !Number.isInteger(value)) {
      return `${value.toFixed(2).replace(/\.?0+$/, "")}${suffix}`;
    }
    return `${value}${suffix}`;
  }

  function renderHeader() {
    $("#competition").textContent = `${report.meta.competition} · ${report.meta.venue}`;
    $("#matchTitle").textContent = report.meta.title;
    $("#homeCode").textContent = report.teams.home.short;
    $("#awayCode").textContent = report.teams.away.short;
    $("#homeScore").textContent = report.teams.home.score;
    $("#awayScore").textContent = report.teams.away.score;
    $("#homeName").textContent = report.teams.home.name;
    $("#awayName").textContent = report.teams.away.name;
    $("#homeFormation").textContent = report.teams.home.formation;
    $("#awayFormation").textContent = report.teams.away.formation;
    $("#sourceNote").textContent = report.meta.note;

    const video = $("#matchVideo");
    const source = document.createElement("source");
    source.src = report.meta.video;
    source.type = "video/mp4";
    video.appendChild(source);
  }

  function renderHeadlineMetrics() {
    const container = $("#headlineMetrics");
    clear(container);
    report.headlineMetrics.forEach((metric) => {
      const card = makeEl("div", "metric-card");
      card.appendChild(makeEl("span", "", metric.label));

      const pair = makeEl("div", "metric-pair");
      pair.appendChild(makeEl("strong", "home-value", metricValue(metric.home, metric.suffix)));
      pair.appendChild(makeEl("strong", "away-value", metricValue(metric.away, metric.suffix)));
      card.appendChild(pair);

      const total = Number(metric.home) + Number(metric.away);
      const homeShare = total > 0 ? Math.round((Number(metric.home) / total) * 100) : 50;
      const split = makeEl("div", "metric-split");
      split.style.setProperty("--home-share", `${homeShare}%`);
      split.appendChild(makeEl("span"));
      split.appendChild(makeEl("span"));
      card.appendChild(split);
      container.appendChild(card);
    });
  }

  function renderVerdict() {
    const container = $("#verdictList");
    clear(container);
    report.verdict.forEach((item) => {
      const block = makeEl("div", "verdict");
      block.appendChild(makeEl("strong", "", item.label));
      block.appendChild(makeEl("p", "", item.value));
      container.appendChild(block);
    });
  }

  function renderHighlightFilters() {
    const filters = [
      ["all", "全部"],
      ["goal", "进球"],
      ["chance", "机会"],
      ["transition", "转换"],
      ["press", "压迫"],
      ["set-piece", "定位球"]
    ];
    const container = $("#highlightFilters");
    clear(container);
    filters.forEach(([key, label]) => {
      const button = makeEl("button", key === state.highlightFilter ? "is-active" : "", label);
      button.type = "button";
      button.addEventListener("click", () => {
        state.highlightFilter = key;
        renderHighlights();
        renderHighlightFilters();
      });
      container.appendChild(button);
    });
  }

  function visibleHighlights() {
    if (state.highlightFilter === "all") return report.highlights;
    return report.highlights.filter((item) => item.type === state.highlightFilter);
  }

  function renderHighlights() {
    const container = $("#highlightList");
    clear(container);
    visibleHighlights().forEach((highlight) => {
      const team = teamById(highlight.team);
      const item = makeEl("div", `highlight-item ${highlight.id === state.activeHighlightId ? "is-active" : ""}`);
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", highlight.title);
      item.style.borderTop = `4px solid ${team.color}`;
      item.addEventListener("click", () => activateHighlight(highlight.id, true));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateHighlight(highlight.id, true);
        }
      });

      const top = makeEl("div", "highlight-top");
      top.appendChild(makeEl("span", "", highlight.clock));
      top.appendChild(makeEl("span", "", team.short));
      item.appendChild(top);

      item.appendChild(makeEl("h3", "", highlight.title));
      item.appendChild(makeEl("p", "", highlight.detail));

      const tags = makeEl("div", "tag-row");
      highlight.metrics.forEach((metric) => tags.appendChild(makeEl("span", "tag", metric)));
      item.appendChild(tags);
      container.appendChild(item);
    });
    renderVideoStatus();
  }

  function activateHighlight(id, seekVideo) {
    const highlight = report.highlights.find((item) => item.id === id);
    if (!highlight) return;

    state.activeHighlightId = id;
    renderHighlights();

    if (seekVideo) {
      const video = $("#matchVideo");
      video.currentTime = highlight.start;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
    }
  }

  function renderVideoStatus() {
    const highlight = report.highlights.find((item) => item.id === state.activeHighlightId);
    const status = $("#videoStatus");
    if (!highlight) {
      status.textContent = "";
      return;
    }
    status.textContent = `${highlight.clock} · ${highlight.title}`;
  }

  function syncHighlightWithVideo() {
    const video = $("#matchVideo");
    video.addEventListener("timeupdate", () => {
      const current = video.currentTime;
      const active = report.highlights.find((item) => current >= item.start && current < item.end);
      if (active && active.id !== state.activeHighlightId) {
        state.activeHighlightId = active.id;
        renderHighlights();
      }
    });
  }

  function renderMetricTabs() {
    const container = $("#metricTabs");
    clear(container);
    Object.entries(report.metricGroups).forEach(([key, group]) => {
      const button = makeEl("button", key === state.metricGroup ? "is-active" : "", group.label);
      button.type = "button";
      button.addEventListener("click", () => {
        state.metricGroup = key;
        renderMetricTabs();
        renderMetricTable();
      });
      container.appendChild(button);
    });
  }

  function renderMetricTable() {
    const container = $("#metricTable");
    clear(container);
    const rows = report.metricGroups[state.metricGroup].rows;
    rows.forEach((row) => {
      const item = makeEl("div", "metric-row");
      item.appendChild(makeEl("span", "value home-value", metricValue(row.home, row.suffix || "")));
      item.appendChild(makeEl("span", "metric-name", row.label));
      item.appendChild(makeEl("span", "value away-value", metricValue(row.away, row.suffix || "")));

      if (!row.text) {
        const total = Number(row.home) + Number(row.away);
        const homeShare = total > 0 ? Math.round((Number(row.home) / total) * 100) : 50;
        const bar = makeEl("div", "metric-bar");
        bar.style.setProperty("--home-share", `${homeShare}%`);
        bar.appendChild(makeEl("span"));
        bar.appendChild(makeEl("span"));
        item.appendChild(bar);
      }
      container.appendChild(item);
    });
  }

  function renderPitchTabs() {
    const container = $("#pitchTabs");
    clear(container);
    [
      ["shots", "射门图"],
      ["zones", "进攻区域"]
    ].forEach(([key, label]) => {
      const button = makeEl("button", key === state.pitchView ? "is-active" : "", label);
      button.type = "button";
      button.addEventListener("click", () => {
        state.pitchView = key;
        renderPitchTabs();
        renderPitch();
      });
      container.appendChild(button);
    });
  }

  function drawPitchBase(svg) {
    clear(svg);
    const defs = makeSvg("defs");
    const pitchGradient = makeSvg("linearGradient", { id: "pitchGradient", x1: "0", y1: "0", x2: "1", y2: "1" });
    [
      ["0%", "#082f28"],
      ["42%", "#0e5c3a"],
      ["100%", "#127a4d"]
    ].forEach(([offset, color]) => pitchGradient.appendChild(makeSvg("stop", { offset, "stop-color": color })));
    defs.appendChild(pitchGradient);

    const pitchVignette = makeSvg("radialGradient", { id: "pitchVignette", cx: "50%", cy: "44%", r: "72%" });
    [
      ["0%", "#ffffff", "0.08"],
      ["62%", "#00102a", "0"],
      ["100%", "#00102a", "0.44"]
    ].forEach(([offset, color, opacity]) => pitchVignette.appendChild(makeSvg("stop", { offset, "stop-color": color, "stop-opacity": opacity })));
    defs.appendChild(pitchVignette);
    svg.appendChild(defs);

    svg.appendChild(makeSvg("rect", { x: 0, y: 0, width: 120, height: 80, fill: "url(#pitchGradient)" }));
    svg.appendChild(makeSvg("rect", { x: 0, y: 0, width: 120, height: 80, fill: "url(#pitchVignette)" }));
    svg.appendChild(makeSvg("rect", { x: 2, y: 2, width: 116, height: 76, class: "pitch-line" }));
    svg.appendChild(makeSvg("line", { x1: 60, y1: 2, x2: 60, y2: 78, class: "pitch-line" }));
    svg.appendChild(makeSvg("circle", { cx: 60, cy: 40, r: 10, class: "pitch-line" }));
    svg.appendChild(makeSvg("circle", { cx: 60, cy: 40, r: 0.9, fill: "rgba(255,255,255,0.8)" }));
    svg.appendChild(makeSvg("rect", { x: 2, y: 22, width: 18, height: 36, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 100, y: 22, width: 18, height: 36, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 2, y: 30, width: 6, height: 20, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 112, y: 30, width: 6, height: 20, class: "pitch-line" }));
    svg.appendChild(makeSvg("circle", { cx: 12, cy: 40, r: 0.9, fill: "rgba(255,255,255,0.8)" }));
    svg.appendChild(makeSvg("circle", { cx: 108, cy: 40, r: 0.9, fill: "rgba(255,255,255,0.8)" }));
  }

  function renderPitchLegend() {
    const legend = $("#pitchLegend");
    clear(legend);
    [
      [report.teams.home.short, report.teams.home.color],
      [report.teams.away.short, report.teams.away.color],
      ["Goal", "#ff6b4a"]
    ].forEach(([label, color]) => {
      const item = makeEl("span");
      const swatch = makeEl("i", "swatch");
      swatch.style.background = color;
      swatch.style.color = color;
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(label));
      legend.appendChild(item);
    });
  }

  function renderShotMap(svg) {
    report.shots.forEach((shot) => {
      const team = shot.team === "tot" ? report.teams.home : report.teams.away;
      const radius = 2.6 + shot.xg * 8;
      const isGoal = shot.outcome === "Goal";
      const fill = isGoal ? "#ff6b4a" : team.color;
      const dot = makeSvg("circle", {
        cx: shot.x,
        cy: shot.y,
        r: radius.toFixed(2),
        fill,
        class: isGoal ? "shot-dot shot-goal" : "shot-dot",
        style: `color: ${fill}`
      });
      const tooltip = makeSvg("title");
      tooltip.textContent = `${team.short} ${shot.minute}' ${shot.player} · xG ${shot.xg} · ${shot.outcome}`;
      dot.appendChild(tooltip);
      svg.appendChild(dot);

      if (shot.outcome === "Goal") {
        svg.appendChild(makeSvg("text", {
          x: shot.x,
          y: shot.y + 1.1,
          "text-anchor": "middle",
          class: "shot-label"
        })).textContent = "G";
      }
    });
  }

  function renderZoneMap(svg) {
    report.zones.forEach((zone) => {
      const team = zone.team === "tot" ? report.teams.home : report.teams.away;
      const bubble = makeSvg("circle", {
        cx: zone.x,
        cy: zone.y,
        r: 4 + zone.value / 8,
        fill: team.color,
        class: "zone-bubble",
        style: `color: ${team.color}`
      });
      const tooltip = makeSvg("title");
      tooltip.textContent = `${team.short} · ${zone.label} · ${zone.value}`;
      bubble.appendChild(tooltip);
      svg.appendChild(bubble);

      const label = makeSvg("text", {
        x: zone.x,
        y: zone.y + 1.1,
        "text-anchor": "middle",
        class: "shot-label"
      });
      label.textContent = zone.value;
      svg.appendChild(label);
    });
  }

  function renderPitch() {
    const svg = $("#pitchSvg");
    drawPitchBase(svg);
    if (state.pitchView === "shots") renderShotMap(svg);
    if (state.pitchView === "zones") renderZoneMap(svg);
    renderPitchLegend();
  }

  function renderMomentum() {
    const svg = $("#momentumSvg");
    clear(svg);

    const defs = makeSvg("defs");
    const homeFill = makeSvg("linearGradient", { id: "momentumHomeFill", x1: "0", y1: "0", x2: "0", y2: "1" });
    [
      ["0%", report.teams.home.accent, "0.38"],
      ["54%", report.teams.home.color, "0.16"],
      ["100%", report.teams.home.color, "0"]
    ].forEach(([offset, color, opacity]) => homeFill.appendChild(makeSvg("stop", { offset, "stop-color": color, "stop-opacity": opacity })));
    defs.appendChild(homeFill);

    const awayFill = makeSvg("linearGradient", { id: "momentumAwayFill", x1: "0", y1: "0", x2: "0", y2: "1" });
    [
      ["0%", report.teams.away.color, "0.36"],
      ["58%", "#d09b2c", "0.14"],
      ["100%", report.teams.away.color, "0"]
    ].forEach(([offset, color, opacity]) => awayFill.appendChild(makeSvg("stop", { offset, "stop-color": color, "stop-opacity": opacity })));
    defs.appendChild(awayFill);

    const glow = makeSvg("filter", { id: "momentumGlow", x: "-20%", y: "-30%", width: "140%", height: "160%", "color-interpolation-filters": "sRGB" });
    glow.appendChild(makeSvg("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "3", result: "blur" }));
    const merge = makeSvg("feMerge");
    merge.appendChild(makeSvg("feMergeNode", { in: "blur" }));
    merge.appendChild(makeSvg("feMergeNode", { in: "SourceGraphic" }));
    glow.appendChild(merge);
    defs.appendChild(glow);
    svg.appendChild(defs);

    const padding = { left: 42, right: 22, top: 22, bottom: 34 };
    const width = 640;
    const height = 260;
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxXg = Math.max(...report.momentum.flatMap((point) => [point.home, point.away]), 1);

    function x(minute) {
      return padding.left + (minute / 90) * chartW;
    }

    function y(value) {
      return padding.top + chartH - (value / maxXg) * chartH;
    }

    [0, 0.5, 1, 1.5, 2].forEach((tick) => {
      if (tick <= maxXg + 0.2) {
        svg.appendChild(makeSvg("line", {
          x1: padding.left,
          y1: y(tick),
          x2: width - padding.right,
          y2: y(tick),
          class: "grid-line"
        }));
        const label = makeSvg("text", { x: 8, y: y(tick) + 4, class: "chart-label" });
        label.textContent = tick.toFixed(1);
        svg.appendChild(label);
      }
    });

    [0, 15, 30, 45, 60, 75, 90].forEach((minute) => {
      const label = makeSvg("text", {
        x: x(minute),
        y: height - 10,
        "text-anchor": "middle",
        class: "chart-label"
      });
      label.textContent = minute;
      svg.appendChild(label);
    });

    svg.appendChild(makeSvg("line", {
      x1: padding.left,
      y1: padding.top + chartH,
      x2: width - padding.right,
      y2: padding.top + chartH,
      class: "axis"
    }));

    function linePath(key) {
      return report.momentum
        .map((point, index) => `${index === 0 ? "M" : "L"} ${x(point.minute)} ${y(point[key])}`)
        .join(" ");
    }

    function areaPath(key) {
      const line = report.momentum
        .map((point, index) => `${index === 0 ? "M" : "L"} ${x(point.minute)} ${y(point[key])}`)
        .join(" ");
      const last = report.momentum[report.momentum.length - 1];
      return `${line} L ${x(last.minute)} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`;
    }

    svg.appendChild(makeSvg("path", { d: areaPath("home"), class: "momentum-fill-home", fill: "url(#momentumHomeFill)" }));
    svg.appendChild(makeSvg("path", { d: areaPath("away"), class: "momentum-fill-away", fill: "url(#momentumAwayFill)" }));
    svg.appendChild(makeSvg("path", { d: linePath("home"), class: "momentum-line", stroke: report.teams.home.color, filter: "url(#momentumGlow)" }));
    svg.appendChild(makeSvg("path", { d: linePath("away"), class: "momentum-line", stroke: report.teams.away.color, filter: "url(#momentumGlow)" }));

    [
      [report.teams.home.short, report.teams.home.color, width - 128, 28],
      [report.teams.away.short, report.teams.away.color, width - 72, 28]
    ].forEach(([label, color, lx, ly]) => {
      svg.appendChild(makeSvg("circle", { cx: lx, cy: ly - 4, r: 5, fill: color, filter: "url(#momentumGlow)" }));
      const text = makeSvg("text", { x: lx + 10, y: ly, class: "chart-label" });
      text.textContent = label;
      svg.appendChild(text);
    });
  }

  function renderTimeline() {
    const container = $("#timeline");
    clear(container);
    report.timeline.forEach((event) => {
      const item = makeEl("div", `event ${event.level}`);
      item.appendChild(makeEl("strong", "", event.minute));
      item.appendChild(makeEl("span", "", event.team));
      item.appendChild(makeEl("p", "", event.label));
      container.appendChild(item);
    });
  }

  function renderStatCompare() {
    const container = $("#statCompare");
    if (!container || !report.matchStats) return;
    clear(container);

    report.matchStats.forEach((stat) => {
      const row = makeEl("div", "stat-row");
      const total = Number(stat.home) + Number(stat.away);
      const homeShare = total > 0 ? Math.round((Number(stat.home) / total) * 100) : 50;

      row.appendChild(makeEl("span", "stat-value stat-home", metricValue(stat.home, stat.suffix || "")));
      row.appendChild(makeEl("span", "stat-label", stat.label));
      row.appendChild(makeEl("span", "stat-value stat-away", metricValue(stat.away, stat.suffix || "")));

      const track = makeEl("div", "stat-track");
      const home = makeEl("i", "stat-track-home");
      const away = makeEl("i", "stat-track-away");
      home.style.width = `${homeShare}%`;
      away.style.width = `${100 - homeShare}%`;
      track.appendChild(home);
      track.appendChild(away);
      row.appendChild(track);
      container.appendChild(row);
    });
  }

  function drawSimplePitch(svg) {
    clear(svg);
    svg.appendChild(makeSvg("rect", { x: 0, y: 0, width: 120, height: 80, class: "network-pitch-bg" }));
    svg.appendChild(makeSvg("rect", { x: 2, y: 2, width: 116, height: 76, class: "pitch-line" }));
    svg.appendChild(makeSvg("line", { x1: 60, y1: 2, x2: 60, y2: 78, class: "pitch-line" }));
    svg.appendChild(makeSvg("circle", { cx: 60, cy: 40, r: 10, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 2, y: 22, width: 18, height: 36, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 100, y: 22, width: 18, height: 36, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 2, y: 30, width: 6, height: 20, class: "pitch-line" }));
    svg.appendChild(makeSvg("rect", { x: 112, y: 30, width: 6, height: 20, class: "pitch-line" }));
  }

  function renderPassNetwork() {
    const svg = $("#passNetworkSvg");
    if (!svg || !report.passNetwork) return;
    drawSimplePitch(svg);

    const players = new Map(report.passNetwork.players.map((player) => [player.id, player]));
    const maxCount = Math.max(...report.passNetwork.links.map((link) => link.count), 1);
    report.passNetwork.links.forEach((link) => {
      const from = players.get(link.from);
      const to = players.get(link.to);
      if (!from || !to) return;

      const line = makeSvg("line", {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        class: "pass-link",
        "stroke-width": (0.8 + (link.count / maxCount) * 4.6).toFixed(2)
      });
      const tooltip = makeSvg("title");
      tooltip.textContent = `${from.name} to ${to.name}: ${link.complete}/${link.count}`;
      line.appendChild(tooltip);
      svg.appendChild(line);
    });

    report.passNetwork.players.forEach((player) => {
      const node = makeSvg("circle", {
        cx: player.x,
        cy: player.y,
        r: 3.8 + (player.rate - 75) / 8,
        class: "pass-node"
      });
      const tooltip = makeSvg("title");
      tooltip.textContent = `${player.name} · passing rate ${player.rate}%`;
      node.appendChild(tooltip);
      svg.appendChild(node);

      const label = makeSvg("text", {
        x: player.x,
        y: player.y + 8.8,
        "text-anchor": "middle",
        class: "network-label"
      });
      label.textContent = player.name;
      svg.appendChild(label);
    });
  }

  function renderPassRates() {
    const container = $("#passRateList");
    if (!container || !report.passingRates) return;
    clear(container);

    report.passingRates.forEach((item, index) => {
      const row = makeEl("div", "pass-rate-row");
      row.appendChild(makeEl("span", "pass-rate-rank", String(index + 1).padStart(2, "0")));
      row.appendChild(makeEl("span", "pass-rate-name", item.player));
      const bar = makeEl("span", "pass-rate-bar");
      const fill = makeEl("i");
      fill.style.width = `${item.rate}%`;
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(makeEl("strong", "", `${item.rate}%`));
      container.appendChild(row);
    });
  }

  function renderPassingMatrix() {
    const container = $("#passingMatrix");
    if (!container || !report.passingMatrix) return;
    clear(container);

    const players = report.passingMatrix.players;
    const values = report.passingMatrix.rows.flat();
    const max = Math.max(...values, 1);
    const grid = makeEl("div", "matrix-grid");
    grid.style.setProperty("--matrix-size", players.length);
    grid.appendChild(makeEl("span", "matrix-corner", ""));

    players.forEach((player) => grid.appendChild(makeEl("span", "matrix-head", player)));
    report.passingMatrix.rows.forEach((row, rowIndex) => {
      grid.appendChild(makeEl("span", "matrix-side", players[rowIndex]));
      row.forEach((value, colIndex) => {
        const cell = makeEl("span", "matrix-cell", value ? String(value) : "");
        const intensity = value / max;
        cell.style.background = `rgba(100, 199, 255, ${0.08 + intensity * 0.68})`;
        if (value >= max * 0.72) cell.classList.add("is-hot");
        const title = `${players[rowIndex]} to ${players[colIndex]}: ${value}`;
        cell.title = title;
        grid.appendChild(cell);
      });
    });

    container.appendChild(grid);
  }

  function renderChannelBars() {
    const container = $("#channelBars");
    if (!container || !report.attackChannels) return;
    clear(container);

    const max = Math.max(...report.attackChannels.flatMap((item) => [item.home, item.away]), 1);
    report.attackChannels.forEach((channel) => {
      const row = makeEl("div", "channel-row");
      row.appendChild(makeEl("span", "channel-name", channel.label));

      const bars = makeEl("div", "channel-track");
      const home = makeEl("i", "channel-home");
      const away = makeEl("i", "channel-away");
      home.style.width = `${Math.max(8, (channel.home / max) * 100)}%`;
      away.style.width = `${Math.max(8, (channel.away / max) * 100)}%`;
      bars.appendChild(home);
      bars.appendChild(away);
      row.appendChild(bars);

      row.appendChild(makeEl("span", "channel-value", `${channel.home} / ${channel.away}`));
      container.appendChild(row);
    });
  }

  function init() {
    renderHeader();
    renderHeadlineMetrics();
    renderVerdict();
    renderHighlightFilters();
    renderHighlights();
    renderMetricTabs();
    renderMetricTable();
    renderPitchTabs();
    renderPitch();
    renderMomentum();
    renderTimeline();
    renderStatCompare();
    renderPassNetwork();
    renderPassRates();
    renderPassingMatrix();
    renderChannelBars();
    syncHighlightWithVideo();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
