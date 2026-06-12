(function () {
  const generatedRoot = "uploads/tottenham-wolves-demo/match";
  const demo = window.MATCH_REPORT || {};
  const svgNS = "http://www.w3.org/2000/svg";

  const playerAvatars = {
    Son: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg/330px-BFA_2023_-2_Heung-Min_Son_%28cropped%29.jpg",
    Hwang: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg/330px-240622_%ED%99%A9%ED%9D%AC%EC%B0%AC_%ED%92%8B%EB%B3%BC_%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C.jpg",
    Cunha: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Matheus_Cunha_em_2021.jpg/330px-Matheus_Cunha_em_2021.jpg",
    Johnson: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Brennan_Johnson_%28cropped%29.jpg/250px-Brennan_Johnson_%28cropped%29.jpg",
    Kulusevski: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sweden-Slovenia_Nations_League_2022-09-27_17_Kulusevski_%28cropped%29.jpg/250px-Sweden-Slovenia_Nations_League_2022-09-27_17_Kulusevski_%28cropped%29.jpg",
    Maddison: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/James_Maddison_2021.jpg/250px-James_Maddison_2021.jpg",
    Neto: "https://commons.wikimedia.org/wiki/Special:FilePath/Pedro_Neto_%28cropped%29_WWFC_vs_Brighton_%26_Hove_Albion_4.3.2022_%281%29_%28cropped%29.jpg?width=320",
    Kilman: "https://commons.wikimedia.org/wiki/Special:FilePath/Max_Kilman.png?width=320",
    Richarlison: "https://commons.wikimedia.org/wiki/Special:FilePath/Richarlison_2019.jpg?width=320"
  };

  const radarAxes = [
    { key: "finish", label: "终结" },
    { key: "threat", label: "威胁" },
    { key: "volume", label: "参与" },
    { key: "chance", label: "机会" },
    { key: "link", label: "连接" }
  ];

  const $ = (selector) => document.querySelector(selector);

  function makeEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function makeSvg(tag, attrs = {}) {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  async function readJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${path}: ${response.status}`);
    return response.json();
  }

  function fmt(value, digits = 2) {
    if (!Number.isFinite(value)) return "0";
    return value.toFixed(digits).replace(/\.?0+$/, "");
  }

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function getShots(sofa) {
    const raw = sofa?.shotmap?.shotmap;
    return Array.isArray(raw) ? raw : [];
  }

  function sideName(isHome, info) {
    return isHome ? info.home_team : info.away_team;
  }

  function summarizeShots(shots) {
    return shots.reduce(
      (acc, shot) => {
        const side = shot.isHome ? "home" : "away";
        acc[side].shots += 1;
        acc[side].xg += Number(shot.xg || 0);
        if (shot.shotType === "goal") acc[side].goals += 1;
        return acc;
      },
      {
        home: { shots: 0, xg: 0, goals: 0 },
        away: { shots: 0, xg: 0, goals: 0 }
      }
    );
  }

  function playerReports(shots) {
    const passingRates = new Map((demo.passingRates || []).map((item) => [item.player, item.rate]));
    const players = new Map();

    shots.forEach((shot) => {
      const name = shot.player?.name || "Unknown";
      const item = players.get(name) || {
        name,
        isHome: Boolean(shot.isHome),
        shots: 0,
        goals: 0,
        xg: 0,
        bestChance: 0,
        outcomes: []
      };
      item.shots += 1;
      item.xg += Number(shot.xg || 0);
      item.bestChance = Math.max(item.bestChance, Number(shot.xg || 0));
      if (shot.shotType === "goal") item.goals += 1;
      item.outcomes.push(shot.shotType || "shot");
      players.set(name, item);
    });

    return [...players.values()]
      .map((item) => ({
        ...item,
        rate: passingRates.get(item.name) || null
      }))
      .sort((a, b) => b.goals - a.goals || b.xg - a.xg || b.shots - a.shots);
  }

  function addRadarMetrics(players) {
    const maxXg = Math.max(...players.map((player) => player.xg), 0.01);
    const maxShots = Math.max(...players.map((player) => player.shots), 1);
    const maxChance = Math.max(...players.map((player) => player.bestChance), 0.01);

    return players
      .map((player) => {
        const values = {
          finish: clamp(player.goals * 58 + player.xg * 34 + (player.goals ? 10 : 0), 8, 100),
          threat: clamp((player.xg / maxXg) * 100, 8, 100),
          volume: clamp((player.shots / maxShots) * 100, 8, 100),
          chance: clamp((player.bestChance / maxChance) * 100, 8, 100),
          link: clamp(player.rate || (player.isHome ? 58 : 48), 8, 100)
        };
        const impact = radarAxes.reduce((total, axis) => total + values[axis.key], 0) / radarAxes.length;
        return {
          ...player,
          impact,
          radar: radarAxes.map((axis) => ({
            ...axis,
            value: Math.round(values[axis.key])
          }))
        };
      })
      .sort((a, b) => b.impact - a.impact || b.goals - a.goals || b.xg - a.xg);
  }

  function pointOnRadar(index, total, radius, centerX = 90, centerY = 78) {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / total;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  }

  function renderRadarChart(player) {
    const svg = makeSvg("svg", {
      class: "player-radar",
      viewBox: "0 0 180 162",
      role: "img",
      "aria-label": `${player.name} performance radar`
    });
    const total = player.radar.length;
    const radius = 52;

    [0.25, 0.5, 0.75, 1].forEach((level) => {
      const points = player.radar
        .map((_, index) => {
          const point = pointOnRadar(index, total, radius * level);
          return `${point.x},${point.y}`;
        })
        .join(" ");
      svg.appendChild(makeSvg("polygon", { class: "radar-grid", points }));
    });

    player.radar.forEach((axis, index) => {
      const edge = pointOnRadar(index, total, radius);
      const label = pointOnRadar(index, total, radius + 20);
      svg.appendChild(makeSvg("line", { class: "radar-axis", x1: 90, y1: 78, x2: edge.x, y2: edge.y }));

      const text = makeSvg("text", { class: "radar-label", x: label.x, y: label.y });
      text.textContent = axis.label;
      svg.appendChild(text);
    });

    const shapePoints = player.radar
      .map((axis, index) => {
        const point = pointOnRadar(index, total, radius * (axis.value / 100));
        return `${point.x},${point.y}`;
      })
      .join(" ");
    svg.appendChild(makeSvg("polygon", { class: player.isHome ? "radar-shape is-home" : "radar-shape is-away", points: shapePoints }));

    player.radar.forEach((axis, index) => {
      const point = pointOnRadar(index, total, radius * (axis.value / 100));
      svg.appendChild(makeSvg("circle", { class: "radar-dot", cx: point.x, cy: point.y, r: 2.8 }));
    });

    return svg;
  }

  function playerNote(player) {
    if (player.goals > 0) {
      return `${player.name} 在终结和机会转化上表现突出，能够把高价值机会转化为比分产出，是本场进攻效率的重要贡献者。`;
    }
    if (player.xg >= 0.2) {
      return `${player.name} 持续进入威胁区域并获得可观机会，机会质量较高，但最终产出受射门选择和临门处理影响。`;
    }
    return `${player.name} 的个人数据不算突出，贡献更多体现在团队连接、牵制跑动或低概率尝试，对整体回合推进有补充价值。`;
  }

  function renderAvatar(player) {
    const avatar = makeEl("div", "player-avatar");
    const fallback = makeEl("span", "player-avatar-fallback", initials(player.name));
    avatar.appendChild(fallback);

    if (playerAvatars[player.name]) {
      const image = makeEl("img", "", "");
      image.src = playerAvatars[player.name];
      image.alt = player.name;
      image.loading = "lazy";
      image.referrerPolicy = "no-referrer";
      image.addEventListener("load", () => fallback.classList.remove("is-visible"));
      image.addEventListener("error", () => {
        image.remove();
        fallback.classList.add("is-visible");
      });
      avatar.appendChild(image);
    } else {
      fallback.classList.add("is-visible");
    }

    return avatar;
  }

  function renderHeader(info) {
    const home = info.home_team || demo.teams?.home?.name || "Home";
    const away = info.away_team || demo.teams?.away?.name || "Away";
    const homeScore = info.score?.home ?? demo.teams?.home?.score ?? "-";
    const awayScore = info.score?.away ?? demo.teams?.away?.score ?? "-";
    $("#reportTitle").textContent = `${home} ${homeScore}-${awayScore} ${away}`;

    const score = $("#reportScore");
    clear(score);
    score.appendChild(makeEl("span", "", home));
    score.appendChild(makeEl("strong", "", `${homeScore}:${awayScore}`));
    score.appendChild(makeEl("span", "", away));
  }

  function renderNarrative(info, shotSummary) {
    const container = $("#reportNarrative");
    clear(container);

    const verdict = demo.verdict || [];
    verdict.forEach((item) => {
      const block = makeEl("section", "report-section");
      block.appendChild(makeEl("h3", "", item.label));
      block.appendChild(makeEl("p", "", item.value));
      container.appendChild(block);
    });

    const xgEdge = shotSummary.home.xg - shotSummary.away.xg;
    const generated = makeEl("section", "report-section report-section-accent");
    generated.appendChild(makeEl("h3", "", "数据生成结论"));
    generated.appendChild(
      makeEl(
        "p",
        "",
        `match-data 归一化后的射门数据给出 ${fmt(shotSummary.home.xg)}-${fmt(shotSummary.away.xg)} 的 xG 对比，主队多出 ${fmt(Math.abs(xgEdge))} xG。结合 ${shotSummary.home.shots}-${shotSummary.away.shots} 的射门量，主队优势主要来自更稳定的禁区进入和下半场高价值机会。`
      )
    );
    container.appendChild(generated);

    $("#reportSource").textContent = info.sources?.sofascore
      ? "normalized by match-data"
      : "local report data";
  }

  function renderKpis(info, shots, summary) {
    const container = $("#reportKpis");
    clear(container);

    const cards = [
      ["比赛", `${info.league || "Competition"} · ${info.date || "Demo"}`],
      ["射门", `${summary.home.shots} / ${summary.away.shots}`],
      ["xG", `${fmt(summary.home.xg)} / ${fmt(summary.away.xg)}`],
      ["进球", `${summary.home.goals} / ${summary.away.goals}`],
      ["事件数", String(shots.length)],
      ["数据源", info.sources?.whoscored ? "SofaScore + WhoScored" : "SofaScore input"]
    ];

    cards.forEach(([label, value]) => {
      const card = makeEl("div", "report-kpi");
      card.appendChild(makeEl("span", "", label));
      card.appendChild(makeEl("strong", "", value));
      container.appendChild(card);
    });

    const files = $("#reportFiles");
    clear(files);
    [
      "uploads/tottenham-wolves-demo/match/match_info.json",
      "uploads/tottenham-wolves-demo/match/sofascore.json"
    ].forEach((path) => {
      const item = makeEl("div", "report-file", path);
      files.appendChild(item);
    });
  }

  function renderPlayers(info, shots) {
    const container = $("#playerReportList");
    clear(container);

    addRadarMetrics(playerReports(shots)).forEach((player) => {
      const card = makeEl("article", "player-card-report");
      const top = makeEl("div", "player-card-top");
      const identity = makeEl("div", "player-card-identity");
      identity.appendChild(renderAvatar(player));

      const title = makeEl("div", "player-card-title");
      title.appendChild(makeEl("strong", "", player.name));
      title.appendChild(makeEl("span", "", sideName(player.isHome, info)));
      identity.appendChild(title);
      top.appendChild(identity);

      const score = makeEl("div", "performance-score");
      score.appendChild(makeEl("span", "", "Impact"));
      score.appendChild(makeEl("strong", "", String(Math.round(player.impact))));
      top.appendChild(score);
      card.appendChild(top);

      const body = makeEl("div", "player-card-body");
      const radarWrap = makeEl("div", "player-radar-wrap");
      radarWrap.appendChild(renderRadarChart(player));
      body.appendChild(radarWrap);

      const stats = makeEl("div", "player-card-stats");
      [
        ["Goals", player.goals],
        ["Shots", player.shots],
        ["xG", fmt(player.xg)],
        ["Best", fmt(player.bestChance)],
        ["Pass", player.rate ? `${player.rate}%` : "-"]
      ].forEach(([label, value]) => {
        const item = makeEl("div", "");
        item.appendChild(makeEl("span", "", label));
        item.appendChild(makeEl("strong", "", String(value)));
        stats.appendChild(item);
      });
      body.appendChild(stats);
      card.appendChild(body);

      card.appendChild(makeEl("p", "", playerNote(player)));
      container.appendChild(card);
    });
  }

  function renderShotTable(info, shots) {
    const container = $("#shotTable");
    clear(container);

    const header = makeEl("div", "shot-row shot-head");
    ["Min", "Team", "Player", "xG", "Outcome"].forEach((label) => header.appendChild(makeEl("span", "", label)));
    container.appendChild(header);

    shots
      .slice()
      .sort((a, b) => Number(a.minute || 0) - Number(b.minute || 0))
      .forEach((shot) => {
        const row = makeEl("div", "shot-row");
        row.appendChild(makeEl("span", "", `${shot.minute}'`));
        row.appendChild(makeEl("span", "", sideName(shot.isHome, info)));
        row.appendChild(makeEl("span", "", shot.player?.name || "Unknown"));
        row.appendChild(makeEl("span", "", fmt(Number(shot.xg || 0))));
        row.appendChild(makeEl("span", shot.shotType === "goal" ? "shot-goal-text" : "", shot.shotType || "shot"));
        container.appendChild(row);
      });
  }

  async function init() {
    try {
      const [info, sofa] = await Promise.all([
        readJson(`${generatedRoot}/match_info.json`),
        readJson(`${generatedRoot}/sofascore.json`)
      ]);
      const shots = getShots(sofa);
      const summary = summarizeShots(shots);

      renderHeader(info);
      renderNarrative(info, summary);
      renderKpis(info, shots, summary);
      renderPlayers(info, shots);
      renderShotTable(info, shots);
    } catch (error) {
      $("#reportTitle").textContent = "报告数据加载失败";
      $("#reportSource").textContent = error.message;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
