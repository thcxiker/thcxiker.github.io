window.MATCH_REPORT = {
  meta: {
    title: "Tottenham vs Wolves",
    competition: "Premier League sample report",
    date: "Demo match",
    venue: "Tottenham Hotspur Stadium",
    analyst: "Match Intelligence",
    video: "wolvstot_moment1.mp4",
    note: "Demo data modeled after Hudl-style match coverage and StatsBomb open-data event concepts."
  },
  teams: {
    home: {
      id: "tot",
      name: "Tottenham",
      short: "TOT",
      score: 2,
      formation: "4-2-3-1",
      color: "#2048d8",
      accent: "#64c7ff"
    },
    away: {
      id: "wol",
      name: "Wolves",
      short: "WOL",
      score: 1,
      formation: "3-4-2-1",
      color: "#f2aa23",
      accent: "#111827"
    }
  },
  verdict: [
    {
      label: "整体走势",
      value: "Tottenham 通过更长的控球回合和更稳定的前场站位控制比赛节奏。上半场优势主要来自中路推进与禁区前二次进攻，下半场则依靠压迫强度提升，把 Wolves 的出球持续压回边路。"
    },
    {
      label: "胜负手",
      value: "第 60 分钟后 Tottenham 的高位压迫成为转折点。中锋封锁中路回传路线，两个边前腰同步外压，迫使 Wolves 多次长传处理，Tottenham 因此连续获得二点球和高价值射门。"
    },
    {
      label: "进攻方式",
      value: "Tottenham 的主要机会来自右肋斜传、弱侧边锋内收和禁区前沿的二次处理。16 次射门中有 6 次射正，xG 达到 2.18，说明进攻不是单纯堆射门，而是能持续进入更接近球门的位置。"
    },
    {
      label: "防守风险",
      value: "Wolves 的威胁集中在反击第一脚和右侧传中。31' 的片段暴露了 Tottenham 边后卫压上后的身后空间，79' 的失球则说明禁区内盯人和弱侧保护仍需要在复盘中重点拆解。"
    },
    {
      label: "定位球观察",
      value: "Tottenham 角球数量占优，但 Wolves 在 73' 通过二点球制造险情。第一点解围后的弧顶保护不足，是比盯防第一落点更值得修正的问题；后腰和边前卫需要提前分工。"
    },
    {
      label: "复盘动作",
      value: "建议优先回看 31'、52'、61'、73'、84' 五个片段：分别对应反击防守、连续传递破门、压迫触发点、定位球二点保护和比赛末段反击。每个片段都应关联数据指标与视频证据。"
    }
  ],
  headlineMetrics: [
    { label: "xG", home: 2.18, away: 0.92, suffix: "" },
    { label: "射门", home: 16, away: 8, suffix: "" },
    { label: "射正", home: 6, away: 3, suffix: "" },
    { label: "控球率", home: 58, away: 42, suffix: "%" },
    { label: "禁区触球", home: 34, away: 17, suffix: "" },
    { label: "高位夺回", home: 11, away: 5, suffix: "" }
  ],
  metricGroups: {
    attack: {
      label: "进攻",
      rows: [
        { label: "进球", home: 2, away: 1 },
        { label: "助攻", home: 2, away: 1 },
        { label: "射门", home: 16, away: 8 },
        { label: "射正", home: 6, away: 3 },
        { label: "传中", home: 21, away: 14 },
        { label: "禁区进入", home: 42, away: 23 }
      ]
    },
    possession: {
      label: "控球",
      rows: [
        { label: "控球率", home: 58, away: 42, suffix: "%" },
        { label: "控球次数", home: 96, away: 91 },
        { label: "10 秒内反抢", home: 17, away: 9 },
        { label: "进攻转换", home: 13, away: 11 },
        { label: "平均控球时长", home: 18.2, away: 13.5, suffix: "s" }
      ]
    },
    passing: {
      label: "传球",
      rows: [
        { label: "传球", home: 523, away: 381 },
        { label: "成功率", home: 86, away: 79, suffix: "%" },
        { label: "前场传球", home: 151, away: 96 },
        { label: "连续 8 脚以上", home: 12, away: 5 },
        { label: "向前传球", home: 174, away: 131 }
      ]
    },
    defense: {
      label: "防守/犯规",
      rows: [
        { label: "拦截", home: 13, away: 16 },
        { label: "封堵", home: 4, away: 7 },
        { label: "扑救", home: 2, away: 4 },
        { label: "越位", home: 2, away: 1 },
        { label: "犯规", home: 10, away: 14 }
      ]
    },
    setPieces: {
      label: "定位球",
      rows: [
        { label: "角球", home: 7, away: 3 },
        { label: "任意球进攻", home: 5, away: 6 },
        { label: "界外球进攻", home: 19, away: 22 },
        { label: "点球", home: 0, away: 0 },
        { label: "定位球射门", home: 4, away: 2 }
      ]
    },
    players: {
      label: "球员数据",
      rows: [
        { label: "最高 xG 球员", home: "Son 0.74", away: "Cunha 0.39", text: true },
        { label: "关键传球", home: "Maddison 4", away: "Neto 3", text: true },
        { label: "最多夺回", home: "Bissouma 8", away: "Lemina 7", text: true },
        { label: "门将解围", home: "Vicario 3", away: "Sa 5", text: true }
      ]
    }
  },
  highlights: [
    {
      id: "h1",
      type: "chance",
      period: 1,
      clock: "14:22",
      start: 0.0,
      end: 1.4,
      team: "tot",
      title: "高位压迫后形成禁区前射门",
      detail: "前场 5 秒内完成夺回，右肋斜传创造第一脚高质量射门。",
      metrics: ["xG 0.18", "高位夺回", "右肋推进"]
    },
    {
      id: "h2",
      type: "transition",
      period: 1,
      clock: "31:08",
      start: 1.4,
      end: 2.8,
      team: "wol",
      title: "Wolves 右侧反击打穿身后",
      detail: "Tottenham 边后卫压上后回追距离过长，禁区前沿出现横向保护缺口。",
      metrics: ["反击", "传中", "防线回撤"]
    },
    {
      id: "h3",
      type: "goal",
      period: 2,
      clock: "52:16",
      start: 2.8,
      end: 4.1,
      team: "tot",
      title: "连续传递后完成破门",
      detail: "中场三角站位吸引压迫，弱侧边锋内收接应后打出低平球。",
      metrics: ["进球", "12 脚连续传球", "xG 0.41"]
    },
    {
      id: "h4",
      type: "press",
      period: 2,
      clock: "61:44",
      start: 4.1,
      end: 5.3,
      team: "tot",
      title: "压迫触发点：回传门将",
      detail: "中锋封锁中路，两个边前腰同步外压，迫使 Wolves 长传失误。",
      metrics: ["压迫", "二点球", "区域锁定"]
    },
    {
      id: "h5",
      type: "set-piece",
      period: 2,
      clock: "73:02",
      start: 5.3,
      end: 6.5,
      team: "wol",
      title: "定位球二点保护不足",
      detail: "第一点被解围后 Tottenham 禁区弧顶无人保护，Wolves 获得补射空间。",
      metrics: ["角球", "二点球", "封堵"]
    },
    {
      id: "h6",
      type: "chance",
      period: 2,
      clock: "84:37",
      start: 6.5,
      end: 7.5,
      team: "tot",
      title: "比赛末段反击锁定优势",
      detail: "Wolves 阵型前压后中卫间距过大，Tottenham 通过直塞形成单刀。",
      metrics: ["反击", "直塞", "xG 0.33"]
    }
  ],
  shots: [
    { team: "tot", minute: 8, player: "Kulusevski", x: 104, y: 51, xg: 0.07, outcome: "Saved" },
    { team: "tot", minute: 14, player: "Son", x: 101, y: 42, xg: 0.18, outcome: "Blocked" },
    { team: "wol", minute: 20, player: "Neto", x: 97, y: 30, xg: 0.08, outcome: "Off T" },
    { team: "wol", minute: 31, player: "Cunha", x: 110, y: 37, xg: 0.26, outcome: "Saved" },
    { team: "tot", minute: 52, player: "Son", x: 112, y: 39, xg: 0.41, outcome: "Goal" },
    { team: "tot", minute: 59, player: "Maddison", x: 98, y: 45, xg: 0.09, outcome: "Off T" },
    { team: "tot", minute: 67, player: "Richarlison", x: 108, y: 34, xg: 0.22, outcome: "Saved" },
    { team: "wol", minute: 73, player: "Kilman", x: 106, y: 42, xg: 0.16, outcome: "Blocked" },
    { team: "wol", minute: 79, player: "Hwang", x: 111, y: 48, xg: 0.32, outcome: "Goal" },
    { team: "tot", minute: 84, player: "Johnson", x: 113, y: 36, xg: 0.33, outcome: "Goal" }
  ],
  zones: [
    { label: "左路推进", x: 28, y: 19, value: 28, team: "tot" },
    { label: "中路渗透", x: 55, y: 40, value: 43, team: "tot" },
    { label: "右路传中", x: 87, y: 61, value: 31, team: "tot" },
    { label: "反击出口", x: 70, y: 23, value: 26, team: "wol" },
    { label: "定位球二点", x: 96, y: 42, value: 18, team: "wol" }
  ],
  momentum: [
    { minute: 0, home: 0.00, away: 0.00 },
    { minute: 10, home: 0.11, away: 0.03 },
    { minute: 20, home: 0.29, away: 0.11 },
    { minute: 30, home: 0.36, away: 0.37 },
    { minute: 40, home: 0.52, away: 0.43 },
    { minute: 50, home: 0.73, away: 0.47 },
    { minute: 60, home: 1.23, away: 0.52 },
    { minute: 70, home: 1.61, away: 0.59 },
    { minute: 80, home: 1.74, away: 0.91 },
    { minute: 90, home: 2.18, away: 0.92 }
  ],
  timeline: [
    { minute: "14'", team: "TOT", label: "高位夺回后射门", level: "medium" },
    { minute: "31'", team: "WOL", label: "反击形成单刀机会", level: "high" },
    { minute: "52'", team: "TOT", label: "进球：连续传递破门", level: "goal" },
    { minute: "61'", team: "TOT", label: "压迫造成长传失误", level: "medium" },
    { minute: "73'", team: "WOL", label: "角球二点补射", level: "medium" },
    { minute: "79'", team: "WOL", label: "进球：禁区内抢点", level: "goal" },
    { minute: "84'", team: "TOT", label: "进球：反击直塞", level: "goal" }
  ],
  matchStats: [
    { label: "控球率", home: 58, away: 42, suffix: "%" },
    { label: "射门", home: 16, away: 8 },
    { label: "射正", home: 6, away: 3 },
    { label: "角球", home: 7, away: 3 },
    { label: "高位夺回", home: 11, away: 5 },
    { label: "传球成功率", home: 86, away: 79, suffix: "%" },
    { label: "禁区进入", home: 42, away: 23 },
    { label: "犯规", home: 10, away: 14, lowerIsBetter: true }
  ],
  attackChannels: [
    { label: "左路", home: 28, away: 19 },
    { label: "左肋", home: 34, away: 18 },
    { label: "中路", home: 43, away: 21 },
    { label: "右肋", home: 39, away: 26 },
    { label: "右路", home: 31, away: 33 }
  ],
  passNetwork: {
    players: [
      { id: "vic", name: "Vicario", x: 14, y: 40, rate: 78 },
      { id: "rom", name: "Romero", x: 30, y: 30, rate: 91 },
      { id: "vdv", name: "Van de Ven", x: 30, y: 50, rate: 89 },
      { id: "por", name: "Porro", x: 44, y: 18, rate: 86 },
      { id: "udo", name: "Udogie", x: 44, y: 62, rate: 84 },
      { id: "bis", name: "Bissouma", x: 54, y: 43, rate: 92 },
      { id: "mad", name: "Maddison", x: 70, y: 39, rate: 88 },
      { id: "kul", name: "Kulusevski", x: 86, y: 24, rate: 83 },
      { id: "son", name: "Son", x: 96, y: 40, rate: 81 },
      { id: "ric", name: "Richarlison", x: 88, y: 56, rate: 79 }
    ],
    links: [
      { from: "vic", to: "rom", count: 18, complete: 16 },
      { from: "vic", to: "vdv", count: 15, complete: 13 },
      { from: "rom", to: "por", count: 24, complete: 21 },
      { from: "vdv", to: "udo", count: 22, complete: 18 },
      { from: "rom", to: "bis", count: 31, complete: 29 },
      { from: "vdv", to: "bis", count: 27, complete: 25 },
      { from: "bis", to: "mad", count: 36, complete: 32 },
      { from: "mad", to: "kul", count: 18, complete: 15 },
      { from: "mad", to: "son", count: 14, complete: 11 },
      { from: "por", to: "kul", count: 26, complete: 21 },
      { from: "udo", to: "ric", count: 16, complete: 12 },
      { from: "kul", to: "son", count: 12, complete: 9 },
      { from: "son", to: "ric", count: 10, complete: 8 }
    ]
  },
  passingMatrix: {
    players: ["Porro", "Romero", "Bissouma", "Maddison", "Kulusevski", "Son", "Udogie", "Richarlison"],
    rows: [
      [0, 21, 12, 8, 21, 4, 2, 0],
      [18, 0, 29, 7, 6, 2, 4, 0],
      [9, 25, 0, 32, 10, 6, 11, 5],
      [5, 6, 28, 0, 15, 11, 7, 8],
      [13, 3, 7, 12, 0, 9, 2, 6],
      [2, 1, 5, 8, 7, 0, 1, 8],
      [1, 5, 14, 6, 2, 1, 0, 12],
      [0, 1, 4, 7, 5, 6, 9, 0]
    ]
  },
  passingRates: [
    { player: "Bissouma", rate: 92 },
    { player: "Romero", rate: 91 },
    { player: "Van de Ven", rate: 89 },
    { player: "Maddison", rate: 88 },
    { player: "Porro", rate: 86 },
    { player: "Udogie", rate: 84 },
    { player: "Kulusevski", rate: 83 },
    { player: "Son", rate: 81 },
    { player: "Richarlison", rate: 79 },
    { player: "Vicario", rate: 78 }
  ]
};
