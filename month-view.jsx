// Summary cards for the month view
function MonthSummaryCards({ mode }) {
  const cards = mode === 'dept' ? [
    { label: '平均工時', value: '8.7', unit: '小時 / 日', delta: '+0.3', deltaUp: true,
      sub: '相比上月', icon: 'clock' },
    { label: '平均到場人數', value: '34', unit: '人 / 工作日', delta: '−2', deltaUp: false,
      sub: '相比上月', icon: 'people' },
    { label: '尖峰到場日', value: '4/17', unit: '週五 · 41人', delta: null,
      sub: '當月最高', icon: 'peak' },
    { label: '未打卡離開比例', value: '6.4', unit: '%', delta: '+1.2', deltaUp: true, warn: true,
      sub: '相比上月', icon: 'warn' },
  ] : [
    { label: '當月平均工時', value: '9.2', unit: '小時 / 日', delta: '+0.4', deltaUp: true,
      sub: '個人本月', icon: 'clock' },
    { label: '最長工時日', value: '11.8h', unit: '4月10日 週五', delta: null,
      sub: '當月最長', icon: 'peak' },
    { label: '異常天數', value: '3', unit: '天', delta: '+2', deltaUp: true, warn: true,
      sub: '工時 > 11h', icon: 'warn' },
    { label: '未打卡離開', value: '2', unit: '次', delta: null, warn: true,
      sub: '需補登紀錄', icon: 'alert' },
  ];

  const renderIcon = (type) => {
    const map = {
      clock: <><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M9 5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>,
      people: <><circle cx="6.5" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.3"/><circle cx="12" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.3"/><path d="M2 14c0-2.3 2-3.8 4.5-3.8s4.5 1.5 4.5 3.8M11 13c0-1.6 1.5-2.5 3-2.5s2 .5 2.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>,
      peak: <><path d="M2 13l3.5-5 3 3 4-7 3.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></>,
      warn: <><path d="M9 2l7.5 13H1.5L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 7v3.5M9 13h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>,
      alert: <><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M9 5.5v4M9 12h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>,
    };
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">{map[type]}</svg>;
  };

  return (
    <div className="summary-grid">
      {cards.map((c, i) => (
        <div key={i} className={`summary-card ${c.warn ? 'warn' : ''}`}>
          <div className="summary-head">
            <div className={`summary-icon ${c.warn ? 'warn' : ''}`}>{renderIcon(c.icon)}</div>
            <div className="summary-label">{c.label}</div>
          </div>
          <div className="summary-value">
            <span className="summary-num">{c.value}</span>
            <span className="summary-unit">{c.unit}</span>
          </div>
          <div className="summary-foot">
            {c.delta && (
              <span className={`summary-delta ${c.deltaUp ? 'up' : 'down'} ${c.warn ? 'warn' : ''}`}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d={c.deltaUp ? "M5 2v6M2.5 4.5L5 2l2.5 2.5" : "M5 8V2M2.5 5.5L5 8l2.5-2.5"}
                    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {c.delta}
              </span>
            )}
            <span className="summary-sub">{c.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Month calendar heatmap
function MonthHeatmap({ mode, onDayClick, onWeekClick, selectedDay, selectedWeek, accent }) {
  // April 2026: 1st is a Wednesday. So padding = 3 (Sun, Mon, Tue empty before Wed)
  const firstDow = new Date(2026, 3, 1).getDay(); // Wed = 3
  const padding = firstDow;

  const weeks = [];
  let currentWeek = Array(padding).fill(null);
  MONTH_DATA.forEach((d) => {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];

  const heatColor = (intensity) => {
    if (intensity === 0) return '#FAFAF9';
    // teal scale
    const stops = [
      [0.0, '#F0FDFA'],
      [0.2, '#CCFBF1'],
      [0.4, '#99F6E4'],
      [0.6, '#5EEAD4'],
      [0.8, '#14B8A6'],
      [1.0, '#0F766E'],
    ];
    for (let i = 0; i < stops.length - 1; i++) {
      if (intensity <= stops[i + 1][0]) return stops[i + 1][1];
    }
    return stops[stops.length - 1][1];
  };

  return (
    <div className="card heatmap-card">
      <div className="card-header">
        <div>
          <div className="card-title">月度日曆熱圖</div>
          <div className="card-subtitle">
            {mode === 'dept' ? '色彩深淺代表當日平均工時' : '色彩深淺代表當日工時長度'}
            ・點擊單日或週次可向下展開
          </div>
        </div>
        <div className="card-actions">
          <div className="legend">
            <span className="legend-label">少</span>
            <div className="legend-scale">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(v => (
                <div key={v} className="legend-cell" style={{ background: heatColor(v) }}/>
              ))}
            </div>
            <span className="legend-label">多</span>
          </div>
          <div className="legend">
            <span className="legend-marker missing"></span>
            <span className="legend-label">未打卡離開</span>
          </div>
        </div>
      </div>

      <div className="heatmap">
        <div className="heatmap-grid">
          <div className="cal-header-row">
            <div className="cal-week-col">週次</div>
            {dayLabels.map((l, i) => (
              <div key={i} className={`cal-dow ${i === 0 || i === 6 ? 'weekend' : ''}`}>{l}</div>
            ))}
          </div>
          {weeks.map((week, wi) => {
            const weekNum = wi + 14;
            const isSelected = selectedWeek === wi;
            return (
              <div key={wi} className={`cal-row ${isSelected ? 'selected-week' : ''}`}>
                <div
                  className={`cal-week-col clickable ${isSelected ? 'active' : ''}`}
                  onClick={() => onWeekClick(wi)}>
                  W{weekNum}
                </div>
                {week.map((d, di) => {
                  if (!d) return <div key={di} className="cal-cell empty"/>;
                  const isSelected = selectedDay === d.day;
                  return (
                    <div
                      key={di}
                      className={`cal-cell ${d.isWeekend ? 'weekend' : ''} ${d.isToday ? 'today' : ''} ${d.isFuture ? 'future' : ''} ${isSelected ? 'selected' : ''}`}
                      style={{ background: d.isFuture ? '#FAFAF9' : heatColor(d.intensity) }}
                      onClick={() => !d.isFuture && onDayClick(d.day)}>
                      <div className="cal-day-num">{d.day}</div>
                      {!d.isFuture && d.avgHours > 0 && (
                        <div className="cal-day-hours">
                          {mode === 'dept' ? `${d.avgHours}h` : `${d.avgHours}h`}
                        </div>
                      )}
                      {d.missingExits > 0 && !d.isFuture && (
                        <div className="cal-missing-badge" title={`${d.missingExits} 筆未打卡`}>
                          {d.missingExits}
                        </div>
                      )}
                      {d.isToday && <div className="cal-today-ring"></div>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="heatmap-footer">
        <div className="footer-stat">
          <span className="footer-dot today"></span>
          今日（4/15）
        </div>
        <div className="footer-stat">
          <span className="footer-dot abnormal"></span>
          異常工時日 · 3 天
        </div>
        <div className="footer-stat">
          <span className="footer-dot weekend"></span>
          假日加班 · 2 天
        </div>
        <div className="footer-spacer"></div>
        <div className="footer-hint">提示：點擊週次「W14」進入週分析</div>
      </div>
    </div>
  );
}

Object.assign(window, { MonthSummaryCards, MonthHeatmap });
