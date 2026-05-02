// Sample data for the dashboard
const EMPLOYEES = [
  // ── 後端工程 / Backend ──────────────────────────────
  // be-platform
  { id: 'alice',   name: 'Alice Chen',    deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台', avatar: 'AC' },
  { id: 'frank',   name: 'Frank Su',      deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台', avatar: 'FS' },
  { id: 'peter',   name: 'Peter Fang',    deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台', avatar: 'PF' },
  { id: 'wendy',   name: 'Wendy Chu',     deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台', avatar: 'WC' },
  { id: 'stan',    name: 'Stan Jiang',    deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台', avatar: 'SJ' },
  // be-api
  { id: 'mia',     name: 'Mia Huang',     deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API', avatar: 'MH' },
  { id: 'tony',    name: 'Tony Liao',     deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API', avatar: 'TL' },
  { id: 'cindy',   name: 'Cindy Wu',      deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API', avatar: 'CW' },
  { id: 'james',   name: 'James Ho',      deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API', avatar: 'JH' },
  { id: 'ruby',    name: 'Ruby Tang',     deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API', avatar: 'RT' },
  // be-infra
  { id: 'david',   name: 'David Tsai',    deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構', avatar: 'DT' },
  { id: 'ray',     name: 'Ray Chen',      deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構', avatar: 'RC' },
  { id: 'linda',   name: 'Linda Tseng',   deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構', avatar: 'LT' },
  { id: 'ben',     name: 'Ben Kuo',       deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構', avatar: 'BK' },
  // be-search
  { id: 'ivy',     name: 'Ivy Lai',       deptId: 'be-search', dept: 'Backend', deptLabel: '後端 / 搜尋', avatar: 'IL' },
  { id: 'alan',    name: 'Alan Huang',    deptId: 'be-search', dept: 'Backend', deptLabel: '後端 / 搜尋', avatar: 'AH' },
  { id: 'vera',    name: 'Vera Lin',      deptId: 'be-search', dept: 'Backend', deptLabel: '後端 / 搜尋', avatar: 'VL' },
  // ── 前端工程 / Frontend ─────────────────────────────
  // fe-web
  { id: 'bob',     name: 'Bob Wang',      deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗', avatar: 'BW' },
  { id: 'henry',   name: 'Henry Chou',    deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗', avatar: 'HC' },
  { id: 'claire',  name: 'Claire Kao',    deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗', avatar: 'CK' },
  { id: 'derek',   name: 'Derek Sun',     deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗', avatar: 'DS' },
  { id: 'penny',   name: 'Penny Hao',     deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗', avatar: 'PH' },
  // fe-mobile
  { id: 'kevin',   name: 'Kevin Lee',     deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用', avatar: 'KL' },
  { id: 'joyce',   name: 'Joyce Chou',    deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用', avatar: 'JC' },
  { id: 'william', name: 'William Pai',   deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用', avatar: 'WP' },
  { id: 'sophia',  name: 'Sophia Lau',    deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用', avatar: 'SL' },
  { id: 'eddy',    name: 'Eddy Shieh',    deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用', avatar: 'ES' },
  // fe-design-sys
  { id: 'emily',   name: 'Emily Kuo',     deptId: 'fe-design-sys', dept: 'Frontend', deptLabel: '前端 / 設計系統', avatar: 'EK' },
  { id: 'marcus',  name: 'Marcus Yen',    deptId: 'fe-design-sys', dept: 'Frontend', deptLabel: '前端 / 設計系統', avatar: 'MY' },
  { id: 'helen',   name: 'Helen Shih',    deptId: 'fe-design-sys', dept: 'Frontend', deptLabel: '前端 / 設計系統', avatar: 'HS' },
  { id: 'jason',   name: 'Jason Yeh',     deptId: 'fe-design-sys', dept: 'Frontend', deptLabel: '前端 / 設計系統', avatar: 'JY' },
  // fe-growth
  { id: 'nina',    name: 'Nina Hsu',      deptId: 'fe-growth', dept: 'Frontend', deptLabel: '前端 / 成長實驗', avatar: 'NH' },
  { id: 'chris',   name: 'Chris Tung',    deptId: 'fe-growth', dept: 'Frontend', deptLabel: '前端 / 成長實驗', avatar: 'CT' },
  { id: 'betty',   name: 'Betty Weng',    deptId: 'fe-growth', dept: 'Frontend', deptLabel: '前端 / 成長實驗', avatar: 'BG' },
  // ── 資料工程 / Data ─────────────────────────────────
  // data-platform
  { id: 'sarah',   name: 'Sarah Wu',      deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台', avatar: 'SW' },
  { id: 'victor',  name: 'Victor Gao',    deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台', avatar: 'VG' },
  { id: 'amanda',  name: 'Amanda Shen',   deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台', avatar: 'AS' },
  { id: 'eric',    name: 'Eric Bao',      deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台', avatar: 'EB' },
  // data-ml
  { id: 'john',    name: 'John Lin',      deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用', avatar: 'JL' },
  { id: 'evan',    name: 'Evan Zhu',      deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用', avatar: 'EZ' },
  { id: 'tina',    name: 'Tina Xu',       deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用', avatar: 'TX' },
  { id: 'felix',   name: 'Felix Deng',    deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用', avatar: 'FD' },
  // data-analytics
  { id: 'grace',   name: 'Grace Yeh',     deptId: 'data-analytics', dept: 'Data', deptLabel: '資料 / 分析', avatar: 'GY' },
  { id: 'brian',   name: 'Brian Wu',      deptId: 'data-analytics', dept: 'Data', deptLabel: '資料 / 分析', avatar: 'BR' },
  { id: 'kate',    name: 'Kate Fang',     deptId: 'data-analytics', dept: 'Data', deptLabel: '資料 / 分析', avatar: 'KF' },
  // ── 品質工程 / QA ────────────────────────────────────
  // qa-auto
  { id: 'leo',     name: 'Leo Chang',     deptId: 'qa-auto', dept: 'QA', deptLabel: '品質 / 自動化', avatar: 'LC' },
  { id: 'andy',    name: 'Andy Luo',      deptId: 'qa-auto', dept: 'QA', deptLabel: '品質 / 自動化', avatar: 'AL' },
  { id: 'jessica', name: 'Jessica Tang',  deptId: 'qa-auto', dept: 'QA', deptLabel: '品質 / 自動化', avatar: 'JT' },
  { id: 'cathy',   name: 'Cathy Mei',     deptId: 'qa-auto', dept: 'QA', deptLabel: '品質 / 自動化', avatar: 'CM' },
  // qa-manual
  { id: 'danny',   name: 'Danny Ye',      deptId: 'qa-manual', dept: 'QA', deptLabel: '品質 / 功能驗證', avatar: 'DY' },
  { id: 'anna',    name: 'Anna Ou',       deptId: 'qa-manual', dept: 'QA', deptLabel: '品質 / 功能驗證', avatar: 'AO' },
  { id: 'mike',    name: 'Mike Bao',      deptId: 'qa-manual', dept: 'QA', deptLabel: '品質 / 功能驗證', avatar: 'MB' },
  // qa-perf
  { id: 'oscar',   name: 'Oscar Pan',     deptId: 'qa-perf', dept: 'QA', deptLabel: '品質 / 效能', avatar: 'OP' },
  { id: 'allen',   name: 'Allen Qi',      deptId: 'qa-perf', dept: 'QA', deptLabel: '品質 / 效能', avatar: 'AQ' },
  // ── 產品管理 / Product Management ────────────────────
  // pm-core
  { id: 'paul',    name: 'Paul Hsieh',    deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心', avatar: 'PH2' },
  { id: 'gloria',  name: 'Gloria Peng',   deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心', avatar: 'GP' },
  { id: 'steve',   name: 'Steve Chiu',    deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心', avatar: 'SC' },
  { id: 'nancy',   name: 'Nancy Dong',    deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心', avatar: 'ND' },
  // pm-growth
  { id: 'queena',  name: 'Queena Lo',     deptId: 'pm-growth', dept: 'Product', deptLabel: '產品 / 成長', avatar: 'QL' },
  { id: 'jeff',    name: 'Jeff Mai',      deptId: 'pm-growth', dept: 'Product', deptLabel: '產品 / 成長', avatar: 'JM' },
  { id: 'diana',   name: 'Diana Hou',     deptId: 'pm-growth', dept: 'Product', deptLabel: '產品 / 成長', avatar: 'DH' },
  // pm-platform
  { id: 'tom',     name: 'Tom Xie',       deptId: 'pm-platform', dept: 'Product', deptLabel: '產品 / 平台', avatar: 'TX2' },
  { id: 'lucy',    name: 'Lucy Jiang',    deptId: 'pm-platform', dept: 'Product', deptLabel: '產品 / 平台', avatar: 'LJ' },
  // ── 產品設計 / Design ────────────────────────────────
  // design-prod
  { id: 'rita',    name: 'Rita Yang',     deptId: 'design-prod', dept: 'Design', deptLabel: '設計 / 產品', avatar: 'RY' },
  { id: 'vince',   name: 'Vince Fu',      deptId: 'design-prod', dept: 'Design', deptLabel: '設計 / 產品', avatar: 'VF' },
  { id: 'peggy',   name: 'Peggy Mao',     deptId: 'design-prod', dept: 'Design', deptLabel: '設計 / 產品', avatar: 'PM' },
  // design-brand
  { id: 'noah',    name: 'Noah Bai',      deptId: 'design-brand', dept: 'Design', deptLabel: '設計 / 品牌', avatar: 'NB' },
  { id: 'irene',   name: 'Irene Ding',    deptId: 'design-brand', dept: 'Design', deptLabel: '設計 / 品牌', avatar: 'ID' },
  { id: 'oliver',  name: 'Oliver Ye',     deptId: 'design-brand', dept: 'Design', deptLabel: '設計 / 品牌', avatar: 'OY' },
  // design-research
  { id: 'sam',     name: 'Sam Cheng',     deptId: 'design-research', dept: 'Design', deptLabel: '設計 / 研究', avatar: 'SC2' },
  { id: 'rose',    name: 'Rose Qian',     deptId: 'design-research', dept: 'Design', deptLabel: '設計 / 研究', avatar: 'RQ' },
  // pm-ops
  { id: 'fiona',   name: 'Fiona Bao',     deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運', avatar: 'FB' },
  { id: 'calvin',  name: 'Calvin Tian',   deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運', avatar: 'CB' },
  { id: 'elaine',  name: 'Elaine Cui',    deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運', avatar: 'EC' },
  { id: 'gary',    name: 'Gary Xu',       deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運', avatar: 'GX' },
];

// Manager's authorized scope — can be MULTIPLE peer subtrees.
// In a real app this comes from the auth/role API. Outside scope = hidden.
const MANAGER_SCOPE_ROOTS = ['eng', 'product']; // 工程部 + 產品部
const MANAGER_NAME = '林雅玲';
const MANAGER_TITLE = '工程 / 產品 副總';

// Deep, wide org tree to demo navigation
const ORG_TREE = [
  {
    id: 'eng', label: '工程部', name: 'Engineering', count: 124,
    children: [
      {
        id: 'backend', label: '後端工程', name: 'Backend', count: 42,
        children: [
          { id: 'be-platform', label: '平台組', count: 14 },
          { id: 'be-api', label: 'API 組', count: 12 },
          { id: 'be-infra', label: '基礎架構組', count: 9 },
          { id: 'be-search', label: '搜尋組', count: 7 },
        ]
      },
      {
        id: 'frontend', label: '前端工程', name: 'Frontend', count: 38,
        children: [
          { id: 'fe-web', label: '網頁體驗組', count: 13 },
          { id: 'fe-mobile', label: '行動應用組', count: 11 },
          { id: 'fe-design-sys', label: '設計系統組', count: 8 },
          { id: 'fe-growth', label: '成長實驗組', count: 6 },
        ]
      },
      {
        id: 'data', label: '資料工程', name: 'Data', count: 26,
        children: [
          { id: 'data-platform', label: '資料平台組', count: 10 },
          { id: 'data-ml', label: 'ML 應用組', count: 9 },
          { id: 'data-analytics', label: '資料分析組', count: 7 },
        ]
      },
      {
        id: 'qa', label: '品質工程', name: 'QA', count: 18,
        children: [
          { id: 'qa-auto', label: '自動化測試組', count: 8 },
          { id: 'qa-manual', label: '功能驗證組', count: 6 },
          { id: 'qa-perf', label: '效能測試組', count: 4 },
        ]
      },
    ]
  },
  {
    id: 'product', label: '產品部', name: 'Product', count: 36,
    children: [
      {
        id: 'pm', label: '產品管理', count: 14,
        children: [
          { id: 'pm-core', label: '核心產品組', count: 6 },
          { id: 'pm-growth', label: '成長產品組', count: 5 },
          { id: 'pm-platform', label: '平台產品組', count: 3 },
        ]
      },
      {
        id: 'design', label: '產品設計', count: 12,
        children: [
          { id: 'design-prod', label: '產品設計組', count: 5 },
          { id: 'design-brand', label: '品牌設計組', count: 4 },
          { id: 'design-research', label: '研究組', count: 3 },
        ]
      },
      { id: 'pm-ops', label: '產品營運', count: 10 },
    ]
  },
  // Hidden from this manager — included in tree but filtered out by scope
  { id: 'ops', label: '營運部', name: 'Operations', count: 22 },
  { id: 'hr', label: '人力資源部', name: 'HR', count: 9 },
  { id: 'sales', label: '業務部', name: 'Sales', count: 31 },
];

const FAVORITES = [
  { id: 'backend', label: '後端工程', count: 42 },
  { id: 'fe-web', label: '前端 / 網頁體驗組', count: 13 },
  { id: 'data-ml', label: '資料 / ML 應用組', count: 9 },
];

Object.assign(window, { MANAGER_SCOPE_ROOTS, MANAGER_NAME, MANAGER_TITLE });

// Generate deterministic month data for April 2026
function generateMonthData(year, month) {
  const days = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let seed = year * 100 + month;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay();
    const isWeekend = dow === 0 || dow === 6;
    let avgHours, peopleCount, missingExits, intensity;

    if (isWeekend) {
      avgHours = rand() < 0.3 ? 4 + rand() * 3 : 0;
      peopleCount = avgHours > 0 ? Math.floor(2 + rand() * 5) : 0;
      missingExits = avgHours > 0 && rand() < 0.4 ? 1 : 0;
      intensity = avgHours > 0 ? 0.15 + rand() * 0.2 : 0;
    } else {
      avgHours = 7.5 + rand() * 3.5;
      peopleCount = Math.floor(28 + rand() * 14);
      missingExits = rand() < 0.35 ? Math.floor(1 + rand() * 3) : 0;
      intensity = (avgHours - 6) / 6;
    }

    if (d === 10) { avgHours = 11.8; intensity = 0.95; missingExits = 4; }
    if (d === 17) { avgHours = 11.2; intensity = 0.9; missingExits = 2; }
    if (d === 23) { avgHours = 10.5; intensity = 0.82; missingExits = 3; }
    if (d === 8)  { avgHours = 6.2;  intensity = 0.25; missingExits = 0; }

    days.push({
      day: d, date, dow, isWeekend,
      avgHours: Math.round(avgHours * 10) / 10,
      peopleCount, missingExits,
      intensity: Math.max(0, Math.min(1, intensity)),
      isToday: d === 15,
      isFuture: d > 24,
    });
  }
  return days;
}

const MONTH_DATA = generateMonthData(2026, 3); // April 2026

function generateWeekData() {
  const weekDays = [
    { label: '一', date: 'Apr 6',  day: 6,  dow: 1 },
    { label: '二', date: 'Apr 7',  day: 7,  dow: 2 },
    { label: '三', date: 'Apr 8',  day: 8,  dow: 3 },
    { label: '四', date: 'Apr 9',  day: 9,  dow: 4 },
    { label: '五', date: 'Apr 10', day: 10, dow: 5 },
    { label: '六', date: 'Apr 11', day: 11, dow: 6 },
    { label: '日', date: 'Apr 12', day: 12, dow: 0 },
  ];

  const heatmap = weekDays.map((d) => {
    const hours = [];
    let seed = d.day * 13;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let h = 0; h < 24; h++) {
      let v = 0;
      if (d.dow === 0 || d.dow === 6) {
        if (h >= 10 && h <= 16 && rand() < 0.5) v = Math.floor(2 + rand() * 4);
      } else {
        if (h >= 8 && h < 10)   v = Math.floor(8 + rand() * 12);
        else if (h >= 10 && h < 12) v = Math.floor(28 + rand() * 10);
        else if (h >= 12 && h < 14) v = Math.floor(15 + rand() * 8);
        else if (h >= 14 && h < 18) v = Math.floor(30 + rand() * 12);
        else if (h >= 18 && h < 20) v = Math.floor(18 + rand() * 8);
        else if (h >= 20 && h < 22) v = Math.floor(4 + rand() * 6);
      }
      if (d.day === 10 && h >= 18 && h <= 22) v = Math.floor(v * 1.6 + 4);
      hours.push(v);
    }
    return { ...d, hours };
  });

  const dailyHours = weekDays.map(d => {
    let v = 0;
    if (d.dow === 0 || d.dow === 6) { v = d.day === 11 ? 5.2 : 0; }
    else { v = 8 + (d.day * 7919) % 35 / 10; }
    if (d.day === 10) v = 11.8;
    if (d.day === 8)  v = 6.2;
    return { ...d, hours: Math.round(v * 10) / 10 };
  });

  return { weekDays, heatmap, dailyHours };
}

const WEEK_DATA = generateWeekData();

// ─── Day detail: Apr 10, 2026 (overtime day) ───────────────────────────────
// Each entry has deptId matching EMPLOYEES so drawer can filter by selected dept.
const DAY_DETAIL = {
  date: 'Apr 10, 2026',
  dateLabel: '2026年4月10日（五）',
  employees: [
    // ── be-platform ──
    { id: 'alice',   name: 'Alice Chen',   deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台',
      segments: [{ start: 8.0, end: 12.5 }, { start: 13.5, end: 19.0 }], hours: 10.0, missing: false },
    { id: 'frank',   name: 'Frank Su',     deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台',
      segments: [{ start: 8.0, end: 17.5 }], hours: 9.5, missing: false },
    { id: 'peter',   name: 'Peter Fang',   deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台',
      segments: [{ start: 9.0, end: 20.0 }], hours: 11.0, missing: false },
    { id: 'wendy',   name: 'Wendy Chu',    deptId: 'be-platform', dept: 'Backend', deptLabel: '後端 / 平台',
      segments: [{ start: 8.5, end: 18.5 }], hours: 10.0, missing: false },
    // ── be-api ──
    { id: 'mia',     name: 'Mia Huang',    deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API',
      segments: [{ start: 8.5, end: 19.5 }], hours: 11.0, missing: false },
    { id: 'tony',    name: 'Tony Liao',    deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    { id: 'cindy',   name: 'Cindy Wu',     deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API',
      segments: [{ start: 8.0, end: null }], hours: null, missing: true, lastSeen: 21.5 },
    { id: 'james',   name: 'James Ho',     deptId: 'be-api', dept: 'Backend', deptLabel: '後端 / API',
      segments: [{ start: 9.5, end: 20.0 }], hours: 10.5, missing: false },
    // ── be-infra ──
    { id: 'david',   name: 'David Tsai',   deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構',
      segments: [{ start: 9.5, end: 12.0 }, { start: 13.0, end: 20.5 }], hours: 10.0, missing: false },
    { id: 'ray',     name: 'Ray Chen',     deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構',
      segments: [{ start: 8.0, end: 17.0 }], hours: 9.0, missing: false },
    { id: 'linda',   name: 'Linda Tseng',  deptId: 'be-infra', dept: 'Backend', deptLabel: '後端 / 基礎架構',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    // ── be-search ──
    { id: 'ivy',     name: 'Ivy Lai',      deptId: 'be-search', dept: 'Backend', deptLabel: '後端 / 搜尋',
      segments: [{ start: 8.0, end: 18.0 }], hours: 10.0, missing: false },
    { id: 'alan',    name: 'Alan Huang',   deptId: 'be-search', dept: 'Backend', deptLabel: '後端 / 搜尋',
      segments: [{ start: 9.5, end: 19.5 }], hours: 10.0, missing: false },
    // ── fe-web ──
    { id: 'bob',     name: 'Bob Wang',     deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗',
      segments: [{ start: 9.5, end: 21.5 }], hours: 12.0, missing: false },
    { id: 'henry',   name: 'Henry Chou',   deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗',
      segments: [{ start: 10.5, end: null }], hours: null, missing: true, lastSeen: 23.5 },
    { id: 'claire',  name: 'Claire Kao',   deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗',
      segments: [{ start: 9.0, end: 18.5 }], hours: 9.5, missing: false },
    { id: 'derek',   name: 'Derek Sun',    deptId: 'fe-web', dept: 'Frontend', deptLabel: '前端 / 網頁體驗',
      segments: [{ start: 10.0, end: 20.0 }], hours: 10.0, missing: false },
    // ── fe-mobile ──
    { id: 'kevin',   name: 'Kevin Lee',    deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用',
      segments: [{ start: 9.0, end: 18.5 }], hours: 9.5, missing: false },
    { id: 'joyce',   name: 'Joyce Chou',   deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用',
      segments: [{ start: 8.5, end: 17.5 }], hours: 9.0, missing: false },
    { id: 'william', name: 'William Pai',  deptId: 'fe-mobile', dept: 'Frontend', deptLabel: '前端 / 行動應用',
      segments: [{ start: 9.0, end: 19.0 }], hours: 10.0, missing: false },
    // ── fe-design-sys ──
    { id: 'emily',   name: 'Emily Kuo',    deptId: 'fe-design-sys', dept: 'Frontend', deptLabel: '前端 / 設計系統',
      segments: [{ start: 10.0, end: 19.0 }], hours: 9.0, missing: false },
    { id: 'marcus',  name: 'Marcus Yen',   deptId: 'fe-design-sys', dept: 'Frontend', deptLabel: '前端 / 設計系統',
      segments: [{ start: 9.5, end: 18.5 }], hours: 9.0, missing: false },
    // ── fe-growth ──
    { id: 'nina',    name: 'Nina Hsu',     deptId: 'fe-growth', dept: 'Frontend', deptLabel: '前端 / 成長實驗',
      segments: [{ start: 10.0, end: 20.5 }], hours: 10.5, missing: false },
    { id: 'chris',   name: 'Chris Tung',   deptId: 'fe-growth', dept: 'Frontend', deptLabel: '前端 / 成長實驗',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    // ── data-platform ──
    { id: 'sarah',   name: 'Sarah Wu',     deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台',
      segments: [{ start: 8.5, end: null }], hours: null, missing: true, lastSeen: 22.0 },
    { id: 'victor',  name: 'Victor Gao',   deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台',
      segments: [{ start: 9.0, end: 18.5 }], hours: 9.5, missing: false },
    { id: 'amanda',  name: 'Amanda Shen',  deptId: 'data-platform', dept: 'Data', deptLabel: '資料 / 平台',
      segments: [{ start: 8.0, end: 17.0 }], hours: 9.0, missing: false },
    // ── data-ml ──
    { id: 'john',    name: 'John Lin',     deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用',
      segments: [{ start: 8.0, end: 10.0 }, { start: 13.0, end: 18.0 }], hours: 7.0, missing: false },
    { id: 'evan',    name: 'Evan Zhu',     deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用',
      segments: [{ start: 9.0, end: 21.0 }], hours: 12.0, missing: false },
    { id: 'tina',    name: 'Tina Xu',      deptId: 'data-ml', dept: 'Data', deptLabel: '資料 / ML 應用',
      segments: [{ start: 10.0, end: 19.5 }], hours: 9.5, missing: false },
    // ── data-analytics ──
    { id: 'grace',   name: 'Grace Yeh',    deptId: 'data-analytics', dept: 'Data', deptLabel: '資料 / 分析',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    { id: 'brian',   name: 'Brian Wu',     deptId: 'data-analytics', dept: 'Data', deptLabel: '資料 / 分析',
      segments: [{ start: 8.5, end: 19.5 }], hours: 11.0, missing: false },
    // ── qa-auto ──
    { id: 'leo',     name: 'Leo Chang',    deptId: 'qa-auto', dept: 'QA', deptLabel: '品質 / 自動化',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    { id: 'andy',    name: 'Andy Luo',     deptId: 'qa-auto', dept: 'QA', deptLabel: '品質 / 自動化',
      segments: [{ start: 8.5, end: 17.5 }], hours: 9.0, missing: false },
    // ── qa-manual ──
    { id: 'danny',   name: 'Danny Ye',     deptId: 'qa-manual', dept: 'QA', deptLabel: '品質 / 功能驗證',
      segments: [{ start: 9.0, end: 17.5 }], hours: 8.5, missing: false },
    { id: 'anna',    name: 'Anna Ou',      deptId: 'qa-manual', dept: 'QA', deptLabel: '品質 / 功能驗證',
      segments: [{ start: 9.5, end: 18.5 }], hours: 9.0, missing: false },
    // ── qa-perf ──
    { id: 'oscar',   name: 'Oscar Pan',    deptId: 'qa-perf', dept: 'QA', deptLabel: '品質 / 效能',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    // ── pm-core ──
    { id: 'paul',    name: 'Paul Hsieh',   deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心',
      segments: [{ start: 9.0, end: 19.0 }], hours: 10.0, missing: false },
    { id: 'gloria',  name: 'Gloria Peng',  deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心',
      segments: [{ start: 8.5, end: 18.0 }], hours: 9.5, missing: false },
    { id: 'nancy',   name: 'Nancy Dong',   deptId: 'pm-core', dept: 'Product', deptLabel: '產品 / 核心',
      segments: [{ start: 9.5, end: null }], hours: null, missing: true, lastSeen: 20.0 },
    // ── pm-growth ──
    { id: 'queena',  name: 'Queena Lo',    deptId: 'pm-growth', dept: 'Product', deptLabel: '產品 / 成長',
      segments: [{ start: 9.0, end: 18.5 }], hours: 9.5, missing: false },
    { id: 'jeff',    name: 'Jeff Mai',     deptId: 'pm-growth', dept: 'Product', deptLabel: '產品 / 成長',
      segments: [{ start: 10.0, end: 20.0 }], hours: 10.0, missing: false },
    // ── pm-platform ──
    { id: 'tom',     name: 'Tom Xie',      deptId: 'pm-platform', dept: 'Product', deptLabel: '產品 / 平台',
      segments: [{ start: 9.0, end: 17.5 }], hours: 8.5, missing: false },
    // ── design-prod ──
    { id: 'rita',    name: 'Rita Yang',    deptId: 'design-prod', dept: 'Design', deptLabel: '設計 / 產品',
      segments: [{ start: 10.0, end: 19.5 }], hours: 9.5, missing: false },
    { id: 'vince',   name: 'Vince Fu',     deptId: 'design-prod', dept: 'Design', deptLabel: '設計 / 產品',
      segments: [{ start: 9.5, end: 18.5 }], hours: 9.0, missing: false },
    // ── design-brand ──
    { id: 'noah',    name: 'Noah Bai',     deptId: 'design-brand', dept: 'Design', deptLabel: '設計 / 品牌',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    // ── design-research ──
    { id: 'sam',     name: 'Sam Cheng',    deptId: 'design-research', dept: 'Design', deptLabel: '設計 / 研究',
      segments: [{ start: 10.0, end: 18.5 }], hours: 8.5, missing: false },
    // ── pm-ops ──
    { id: 'fiona',   name: 'Fiona Bao',    deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運',
      segments: [{ start: 9.0, end: 18.0 }], hours: 9.0, missing: false },
    { id: 'calvin',  name: 'Calvin Tian',  deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運',
      segments: [{ start: 9.5, end: 19.0 }], hours: 9.5, missing: false },
    { id: 'elaine',  name: 'Elaine Cui',   deptId: 'pm-ops', dept: 'Product', deptLabel: '產品 / 營運',
      segments: [{ start: 8.5, end: 17.5 }], hours: 9.0, missing: false },
  ]
};

Object.assign(window, { EMPLOYEES, ORG_TREE, FAVORITES, MONTH_DATA, WEEK_DATA, DAY_DETAIL });
