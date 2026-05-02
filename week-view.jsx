// Week view with two modes
function WeekView({ mode, weekMode, setWeekMode, selectedWeek, onDayClick, selectedDay }) {
  const weekTitle = '4月6日 – 4月12日（W15）';

  const summaryCards = mode === 'dept' ? [
    { label: '平均每日工時', value: '8.9h', sub: '工作日平均' },
    { label: '本週最長日', value: '4/10', sub: '週五 · 平均10.4h' },
    { label: '尖峰時段', value: '15:00', sub: '平均 38 人在場' },
    { label: '未打卡離開', value: '6 / 7.1%', sub: '6 筆 · 全週比例' },
  ] : [
    { label: '本週平均工時', value: '9.4h', sub: '工作日平均' },
    { label: '本週最長日', value: '4/10', sub: '週五 · 11.8h' },
    { label: '最早進辦日', value: '4/8', sub: '07:42 進辦' },
    { label: '未打卡離開', value: '1', sub: '4月10日（五）' },
  ];

  return (
    <div className="card week-card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <button className="back-link" onClick={() => {}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            週分析 · {weekTitle}
          </div>
          <div className="card-subtitle">
            {mode === 'dept' ? '工程部含子部門 · 48 位員工' : 'Alice Chen · 後端工程師'}
          </div>
        </div>
        <div className="week-mode-toggle">
          <button
            className={`mode-btn sm ${weekMode === 'presence' ? 'active' : ''}`}
            onClick={() => setWeekMode('presence')}>
            在場時段
          </button>
          <button
            className={`mode-btn sm ${weekMode === 'hours' ? 'active' : ''}`}
            onClick={() => setWeekMode('hours')}>
            工時對比
          </button>
        </div>
      </div>

      <div className="week-summary-row">
        {summaryCards.map((c, i) => (
          <div key={i} className="week-summary-item">
            <div className="ws-label">{c.label}</div>
            <div className="ws-value">{c.value}</div>
            <div className="ws-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      {weekMode === 'presence' ? (
        <PresenceHeatmap mode={mode} onDayClick={onDayClick} selectedDay={selectedDay} />
      ) : (
        <HoursComparison mode={mode} onDayClick={onDayClick} selectedDay={selectedDay} />
      )}
    </div>
  );
}

function PresenceHeatmap({ mode, onDayClick, selectedDay }) {
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 06:00 to 21:00

  const cellColor = (v, max) => {
    if (v === 0) return '#FAFAF9';
    const t = v / max;
    if (t < 0.15) return '#F0FDFA';
    if (t < 0.30) return '#CCFBF1';
    if (t < 0.50) return '#99F6E4';
    if (t < 0.70) return '#5EEAD4';
    if (t < 0.85) return '#2DD4BF';
    return '#0D9488';
  };

  const max = 45;

  return (
    <div className="presence-heatmap">
      <div className="ph-grid">
        <div className="ph-corner"></div>
        {hours.map(h => (
          <div key={h} className="ph-hour-label">
            {h.toString().padStart(2, '0')}
          </div>
        ))}

        {WEEK_DATA.heatmap.map((day, di) => (
          <React.Fragment key={di}>
            <div
              className={`ph-day-label ${day.day === selectedDay ? 'selected' : ''} ${day.dow === 0 || day.dow === 6 ? 'weekend' : ''}`}
              onClick={() => onDayClick(day.day)}>
              <span className="ph-dow">週{day.label}</span>
              <span className="ph-date">{day.date}</span>
            </div>
            {hours.map(h => {
              const v = day.hours[h];
              const isSelected = day.day === selectedDay;
              return (
                <div
                  key={h}
                  className={`ph-cell ${isSelected ? 'selected-row' : ''}`}
                  style={{ background: cellColor(v, max) }}
                  title={`${day.date} ${h}:00 · ${v} 人`}>
                  {v >= 25 && <span className="ph-cell-num">{v}</span>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="ph-legend">
        <span className="ph-legend-text">人數密度：</span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map(t => (
          <div key={t} className="ph-legend-cell" style={{ background: cellColor(t * max, max) }}/>
        ))}
        <span className="ph-legend-text">0 → {max}+ 人</span>
        <div className="ph-legend-spacer"></div>
        <span className="ph-legend-hint">點擊任一日進入單日詳情 →</span>
      </div>
    </div>
  );
}

function HoursComparison({ mode, onDayClick, selectedDay }) {
  const data = WEEK_DATA.dailyHours;
  const max = 12;
  const ticks = [0, 2, 4, 6, 8, 10, 12];
  const refLine = 8; // standard

  return (
    <div className="hours-comp">
      <div className="hc-header">
        <span className="hc-label">星期</span>
        <div className="hc-scale">
          {ticks.map(t => (
            <div key={t} className="hc-tick">
              <span>{t}h</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hc-rows">
        {data.map((d, i) => {
          const pct = (d.hours / max) * 100;
          const isSelected = d.day === selectedDay;
          const isWeekend = d.dow === 0 || d.dow === 6;
          const isLong = d.hours > 10;
          const isShort = d.hours > 0 && d.hours < 7;

          return (
            <div
              key={i}
              className={`hc-row ${isSelected ? 'selected' : ''} ${d.hours === 0 ? 'empty' : ''}`}
              onClick={() => d.hours > 0 && onDayClick(d.day)}>
              <div className="hc-day-cell">
                <span className={`hc-day-name ${isWeekend ? 'weekend' : ''}`}>週{d.label}</span>
                <span className="hc-day-date">{d.date}</span>
              </div>
              <div className="hc-bar-track">
                {/* 8h reference line */}
                <div className="hc-ref" style={{ left: `${(refLine / max) * 100}%` }}>
                  <div className="hc-ref-line"></div>
                </div>
                {ticks.map(t => (
                  <div key={t} className="hc-grid-line" style={{ left: `${(t / max) * 100}%` }}/>
                ))}
                {d.hours > 0 ? (
                  <div
                    className={`hc-bar ${isLong ? 'long' : ''} ${isShort ? 'short' : ''}`}
                    style={{ width: `${pct}%` }}>
                    <span className="hc-bar-value">{d.hours.toFixed(1)}h</span>
                  </div>
                ) : (
                  <div className="hc-empty-label">未到辦公室</div>
                )}
                {d.day === 10 && (
                  <div className="hc-anomaly-tag">異常 ↑</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hc-legend">
        <span className="hc-legend-item">
          <span className="hc-legend-line"></span>
          標準工時 8h
        </span>
        <span className="hc-legend-item">
          <span className="hc-legend-swatch long"></span>
          &gt; 10h（過長）
        </span>
        <span className="hc-legend-item">
          <span className="hc-legend-swatch short"></span>
          &lt; 7h（偏短）
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { WeekView });
