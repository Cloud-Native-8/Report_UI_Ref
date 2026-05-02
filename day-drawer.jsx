// ─── Helpers ───────────────────────────────────────────────────────────────
function formatTime(h) {
  if (h == null) return '--';
  const hr = Math.floor(h);
  const min = Math.round((h - hr) * 60);
  return `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

function formatHoursMin(h) {
  if (h == null) return '--';
  const hrs = Math.floor(h);
  const mins = Math.round((h - hrs) * 60);
  return mins > 0 ? `${hrs}h ${String(mins).padStart(2, '0')}m` : `${hrs}h`;
}

// ─── Individual Detail View ─────────────────────────────────────────────────
function IndividualDetailView({ emp, onClose }) {
  const startHour = 7;
  const endHour = 23;
  const totalHours = endHour - startHour;
  const ticks = [7, 9, 11, 13, 15, 17, 19, 21, 23];

  if (!emp) {
    return (
      <>
        <div className="indv-header-card">
          <div className="indv-identity" style={{ flex: 1 }}>
            <div className="indv-eyebrow">個人出勤詳情</div>
            <h2 className="indv-name" style={{ fontSize: 16, color: 'var(--text-3)' }}>尚未選擇員工</h2>
          </div>
          <button className="drawer-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="indv-scroll-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--text-3)', fontSize: 13 }}>請從左側選擇員工</div>
        </div>
      </>
    );
  }

  const entry = emp.segments[0]?.start;
  const lastSeg = emp.segments[emp.segments.length - 1];
  const exit = emp.missing ? null : lastSeg?.end;

  return (
    <>
      {/* ── Section 1: Person Card Header ── */}
      <div className="indv-header-card">
        <div className="indv-avatar-block">
          <div className="indv-avatar">
            {emp.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
          </div>
          {emp.missing && <span className="indv-avatar-badge">需補登</span>}
        </div>
        <div className="indv-identity">
          <div className="indv-eyebrow">個人出勤詳情</div>
          <h2 className="indv-name">{emp.name}</h2>
          <div className="indv-dept-row">
            <span className="indv-dept-chip">{emp.deptLabel}</span>
            <span className="indv-date">{DAY_DETAIL.dateLabel}</span>
          </div>
        </div>
        <button className="drawer-close indv-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Section 2: Personal Metrics Row ── */}
      <div className="indv-metrics-row">
        <div className="indv-metric">
          <span className="indv-metric-label">進辦</span>
          <span className="indv-metric-value">{formatTime(entry)}</span>
        </div>
        <div className="indv-metric-divider" />
        <div className="indv-metric">
          <span className="indv-metric-label">離辦</span>
          <span className={`indv-metric-value ${emp.missing ? 'warn' : ''}`}>
            {emp.missing ? '未打卡' : formatTime(exit)}
          </span>
        </div>
        <div className="indv-metric-divider" />
        <div className="indv-metric">
          <span className="indv-metric-label">工時</span>
          <span className="indv-metric-value">
            {emp.hours != null ? formatHoursMin(emp.hours) : '--'}
          </span>
        </div>
        <div className="indv-metric-divider" />
        <div className="indv-metric">
          <span className="indv-metric-label">在場時段</span>
          <span className="indv-metric-value">
            {emp.segments.length}<span className="indv-metric-unit"> 段</span>
          </span>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="indv-scroll-body">

        {/* ── Section 3: Missing Exit Banner (conditional) ── */}
        {emp.missing && (
          <div className="indv-missing-banner">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M8 1.5l6.5 11.5H1.5L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M8 6v3.5M8 11.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <div className="indv-missing-text">
              <strong>未偵測到下班打卡</strong>
              <span>最後在場時間：{formatTime(emp.lastSeen)} — 請至系統補登離場紀錄</span>
            </div>
          </div>
        )}

        {/* ── Section 4: Timeline ── */}
        <div className="indv-section">
          <div className="indv-section-header">
            <span className="indv-section-title">在場時段時間軸</span>
            <span className="indv-section-meta">{startHour}:00 – {endHour}:00</span>
          </div>

          {/* Time axis */}
          <div className="indv-axis">
            {ticks.map(t => (
              <div key={t} className="gantt-tick"
                style={{ left: `${((t - startHour) / totalHours) * 100}%`, top: 0 }}>
                <span>{t}</span>
              </div>
            ))}
          </div>

          {/* Gantt track */}
          <div className="gantt-track indv-gantt-track">
            {ticks.map(t => (
              <div key={t} className="gantt-grid-line"
                style={{ left: `${((t - startHour) / totalHours) * 100}%` }}/>
            ))}
            {emp.segments.map((seg, si) => {
              const isMissing = emp.missing && si === emp.segments.length - 1;
              const endVal = seg.end ?? emp.lastSeen ?? endHour;
              const left = ((seg.start - startHour) / totalHours) * 100;
              const width = ((endVal - seg.start) / totalHours) * 100;
              return (
                <div key={si}
                  className={`gantt-bar ${isMissing ? 'missing' : ''}`}
                  style={{ left: `${left}%`, width: `${width}%` }}>
                  <span className="gantt-bar-start">{formatTime(seg.start)}</span>
                  {!isMissing && <span className="gantt-bar-end">{formatTime(seg.end)}</span>}
                  {isMissing && (
                    <span className="gantt-bar-warn">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1l4 8H1l4-8z" fill="currentColor"/>
                      </svg>
                      未打卡
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Section 5: Segment Breakdown ── */}
        <div className="indv-section indv-section-last">
          <div className="indv-section-header">
            <span className="indv-section-title">時段明細</span>
            <span className="indv-section-meta">{emp.segments.length} 個時段</span>
          </div>
          <div className="indv-segment-list">
            {emp.segments.map((seg, i) => {
              const isLast = i === emp.segments.length - 1;
              const isMissing = emp.missing && isLast;
              const segHours = isMissing ? null : (seg.end - seg.start);
              const nextSeg = emp.segments[i + 1];
              const breakDur = nextSeg ? nextSeg.start - seg.end : null;

              return (
                <React.Fragment key={i}>
                  <div className="indv-segment-row">
                    <div className="indv-segment-indicator" />
                    <div className="indv-segment-times">
                      <span className="indv-segment-range">
                        {formatTime(seg.start)}
                        <span className="indv-segment-arrow"> → </span>
                        {isMissing
                          ? <span className="indv-missing-tag">未打卡</span>
                          : formatTime(seg.end)
                        }
                      </span>
                    </div>
                    <div className="indv-segment-duration">
                      {isMissing ? (
                        <span style={{ color: 'var(--warn)', fontSize: 12 }}>需補登</span>
                      ) : formatHoursMin(segHours)}
                    </div>
                  </div>
                  {breakDur != null && (
                    <div className="indv-break-row">
                      <div className="indv-break-line" />
                      <span className="indv-break-label">休息 {formatHoursMin(breakDur)}</span>
                      <div className="indv-break-line" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            {/* Total row */}
            <div className="indv-total-row">
              <span className="indv-total-label">合計工時</span>
              <span className="indv-total-value">
                {emp.missing ? (
                  <span className="gantt-warn-badge">需補登</span>
                ) : formatHoursMin(emp.hours)}
              </span>
            </div>
          </div>
        </div>

      </div>{/* end indv-scroll-body */}

      {/* ── Footer ── */}
      <div className="drawer-footer">
        <span className="indv-footer-meta">
          {DAY_DETAIL.dateLabel} · {emp.name} · {emp.deptLabel}
        </span>
      </div>
    </>
  );
}

// ─── Day Drawer (dept mode + individual mode shell) ─────────────────────────
function DayDrawer({ open, onClose, mode, selectedDept, selectedEmployee }) {
  const [drawerMode, setDrawerMode] = React.useState('presence');
  const [sortBy, setSortBy] = React.useState('hours-desc');
  const [subTeam, setSubTeam] = React.useState('all');
  const [hoveredEmployee, setHoveredEmployee] = React.useState(null);

  React.useEffect(() => { setSubTeam('all'); }, [selectedDept, selectedEmployee, mode]);

  const scopeRoots = React.useMemo(getScopedRoots, []);

  const deptNode = React.useMemo(() => {
    if (!selectedDept) return null;
    return findNodeInScope(scopeRoots, selectedDept);
  }, [selectedDept, scopeRoots]);

  const subTeamOptions = React.useMemo(() => deptNode?.children || [], [deptNode]);

  // Individual employee record from DAY_DETAIL
  const indvEmp = React.useMemo(() => {
    if (mode !== 'individual' || !selectedEmployee) return null;
    return DAY_DETAIL.employees.find(e => e.id === selectedEmployee) || null;
  }, [mode, selectedEmployee]);

  // Dept mode: base employee list filtered by selected dept
  const baseEmployees = React.useMemo(() => {
    if (!deptNode) return DAY_DETAIL.employees;
    const deptIds = new Set(getDescendantIds(deptNode));
    return DAY_DETAIL.employees.filter(e => deptIds.has(e.deptId));
  }, [selectedDept, deptNode]);

  const sortedEmployees = React.useMemo(() => {
    let list = [...baseEmployees];
    if (subTeam !== 'all' && subTeamOptions.length > 0) {
      const childNode = subTeamOptions.find(c => c.id === subTeam);
      if (childNode) {
        const childIds = new Set(getDescendantIds(childNode));
        list = list.filter(e => childIds.has(e.deptId));
      }
    }
    list.sort((a, b) => {
      if (sortBy === 'hours-desc') return (b.hours ?? -1) - (a.hours ?? -1);
      if (sortBy === 'latest-exit') {
        const ea = a.segments[a.segments.length - 1].end ?? a.lastSeen ?? 0;
        const eb = b.segments[b.segments.length - 1].end ?? b.lastSeen ?? 0;
        return eb - ea;
      }
      if (sortBy === 'earliest-entry') return a.segments[0].start - b.segments[0].start;
      return 0;
    });
    return list.slice(0, 20);
  }, [baseEmployees, sortBy, subTeam, subTeamOptions]);

  const stats = React.useMemo(() => {
    const present = baseEmployees;
    const withHours = present.filter(e => !e.missing && e.hours != null);
    const avgHours = withHours.length
      ? (withHours.reduce((s, e) => s + e.hours, 0) / withHours.length).toFixed(1)
      : '--';
    const maxEmp = withHours.reduce((m, e) => (!m || e.hours > m.hours) ? e : m, null);
    const missingCount = present.filter(e => e.missing).length;
    const earliest = present.reduce((m, e) => {
      const t = e.segments[0].start;
      return (!m || t < m.t) ? { t, name: e.name.split(' ')[0] } : m;
    }, null);
    return { avgHours, maxEmp, missingCount, earliest, total: present.length };
  }, [baseEmployees]);

  const startHour = 7;
  const endHour = 23;
  const totalHours = endHour - startHour;
  const ticks = [7, 9, 11, 13, 15, 17, 19, 21, 23];

  const isAnomaly = stats.avgHours !== '--' && parseFloat(stats.avgHours) > 10;

  const deptTitle = (() => {
    if (deptNode) return `${deptNode.label} · ${DAY_DETAIL.dateLabel}`;
    return DAY_DETAIL.dateLabel;
  })();

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`day-drawer ${open ? 'open' : ''}`}>

        {mode === 'individual' ? (
          <IndividualDetailView emp={indvEmp} onClose={onClose} />
        ) : (
          /* ── Dept mode (unchanged) ── */
          <>
            <div className="drawer-header">
              <div>
                <div className="drawer-eyebrow">部門單日詳情</div>
                <h2 className="drawer-title">{deptTitle}</h2>
                <div className="drawer-meta">
                  {isAnomaly && (
                    <span className="drawer-tag warn">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.5 1l4.5 8H1l4.5-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                        <path d="M5.5 4v2.5M5.5 8h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      工時異常日
                    </span>
                  )}
                  <span className="drawer-tag">{stats.total} 位員工到場</span>
                  {stats.missingCount > 0 && (
                    <span className="drawer-tag">{stats.missingCount} 筆未打卡離開</span>
                  )}
                </div>
              </div>
              <button className="drawer-close" onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="drawer-stats">
              <div className="ds-item">
                <div className="ds-label">平均工時</div>
                <div className="ds-value">{stats.avgHours}<span>h</span></div>
              </div>
              <div className="ds-item">
                <div className="ds-label">最長工時</div>
                <div className="ds-value">
                  {stats.maxEmp ? (
                    <>{stats.maxEmp.hours.toFixed(1)}<span>h · {stats.maxEmp.name.split(' ')[0]}</span></>
                  ) : '--'}
                </div>
              </div>
              <div className="ds-item">
                <div className="ds-label">最早進辦</div>
                <div className="ds-value">
                  {stats.earliest ? (
                    <>{formatTime(stats.earliest.t)}<span> · {stats.earliest.name}</span></>
                  ) : '--'}
                </div>
              </div>
              <div className={`ds-item ${stats.missingCount > 0 ? 'warn' : ''}`}>
                <div className="ds-label">未打卡離開</div>
                <div className="ds-value">
                  {stats.missingCount}
                  <span>人 · {stats.total > 0 ? ((stats.missingCount / stats.total) * 100).toFixed(0) : 0}%</span>
                </div>
              </div>
            </div>

            <div className="drawer-controls">
              <div className="drawer-mode-toggle">
                <button
                  className={`mode-btn sm ${drawerMode === 'presence' ? 'active' : ''}`}
                  onClick={() => setDrawerMode('presence')}>
                  在場時段
                </button>
                <button
                  className={`mode-btn sm ${drawerMode === 'hours' ? 'active' : ''}`}
                  onClick={() => setDrawerMode('hours')}>
                  工時對比
                </button>
              </div>

              <div className="drawer-filters">
                {subTeamOptions.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">子部門</label>
                    <select className="filter-select" value={subTeam} onChange={e => setSubTeam(e.target.value)}>
                      <option value="all">全部</option>
                      {subTeamOptions.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="filter-group">
                  <label className="filter-label">排序</label>
                  <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="hours-desc">工時長 → 短</option>
                    <option value="latest-exit">最晚離開</option>
                    <option value="earliest-entry">最早進辦</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="drawer-gantt-note">
              {sortedEmployees.length < baseEmployees.length ? (
                <span>顯示 {sortedEmployees.length} / {baseEmployees.length} 位員工（已套用篩選）</span>
              ) : (
                <span>顯示 {sortedEmployees.length} 位員工</span>
              )}
            </div>

            <div className="gantt">
              {drawerMode === 'presence' ? (
                <>
                  <div className="gantt-header">
                    <div className="gantt-name-col"></div>
                    <div className="gantt-track-header">
                      {ticks.map(t => (
                        <div key={t} className="gantt-tick"
                          style={{ left: `${((t - startHour) / totalHours) * 100}%` }}>
                          <span>{t}:00</span>
                        </div>
                      ))}
                    </div>
                    <div className="gantt-stat-col">工時</div>
                  </div>

                  <div className="gantt-rows">
                    {sortedEmployees.map((emp, i) => (
                      <div
                        key={emp.id}
                        className={`gantt-row ${hoveredEmployee === emp.id ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredEmployee(emp.id)}
                        onMouseLeave={() => setHoveredEmployee(null)}>
                        <div className="gantt-name-col">
                          <div className="gantt-rank">{i + 1}</div>
                          <div className="gantt-emp-info">
                            <div className="gantt-emp-name">{emp.name}</div>
                            <div className="gantt-emp-dept">{emp.deptLabel}</div>
                          </div>
                        </div>
                        <div className="gantt-track">
                          {ticks.map(t => (
                            <div key={t} className="gantt-grid-line"
                              style={{ left: `${((t - startHour) / totalHours) * 100}%` }}/>
                          ))}
                          {emp.segments.map((seg, si) => {
                            const left = ((seg.start - startHour) / totalHours) * 100;
                            const isMissing = seg.end === null;
                            const endVal = seg.end ?? emp.lastSeen ?? endHour;
                            const width = ((endVal - seg.start) / totalHours) * 100;
                            return (
                              <div key={si}
                                className={`gantt-bar ${isMissing ? 'missing' : ''}`}
                                style={{ left: `${left}%`, width: `${width}%` }}>
                                <span className="gantt-bar-start">{formatTime(seg.start)}</span>
                                {!isMissing && <span className="gantt-bar-end">{formatTime(seg.end)}</span>}
                                {isMissing && (
                                  <span className="gantt-bar-warn">
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                      <path d="M5.5 1l4.5 8H1l4.5-8z" fill="currentColor"/>
                                    </svg>
                                    未打卡離開
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="gantt-stat-col">
                          {emp.missing ? (
                            <span className="gantt-warn-badge">補登</span>
                          ) : (
                            <span className="gantt-hours">{emp.hours.toFixed(1)}h</span>
                          )}
                        </div>

                        {hoveredEmployee === emp.id && (
                          <div className="gantt-tooltip">
                            <div className="gtt-row">
                              <div className="gtt-avatar">{emp.name.split(' ').map(n => n[0]).join('')}</div>
                              <div>
                                <div className="gtt-name">{emp.name}</div>
                                <div className="gtt-dept">{emp.deptLabel}</div>
                              </div>
                            </div>
                            <div className="gtt-divider"></div>
                            <div className="gtt-line">
                              <span>進辦時間</span>
                              <strong>{formatTime(emp.segments[0].start)}</strong>
                            </div>
                            <div className="gtt-line">
                              <span>離辦時間</span>
                              <strong className={emp.missing ? 'warn' : ''}>
                                {emp.missing ? '— 未打卡' : formatTime(emp.segments[emp.segments.length - 1].end)}
                              </strong>
                            </div>
                            <div className="gtt-line">
                              <span>在場時段</span>
                              <strong>{emp.segments.length} 段</strong>
                            </div>
                            <div className="gtt-line">
                              <span>工時</span>
                              <strong className={emp.missing ? 'warn' : ''}>
                                {emp.missing ? '需補登' : `${emp.hours.toFixed(1)}h`}
                              </strong>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <HoursMode employees={sortedEmployees} />
              )}
            </div>

            <div className="drawer-footer">
              <div className="drawer-footer-hint">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6.5 4v3M6.5 9h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                最多顯示前 20 位員工
              </div>
              <button className="ghost-btn">查看完整名單 →</button>
            </div>
          </>
        )}

      </aside>
    </>
  );
}

function HoursMode({ employees }) {
  const max = 13;
  const ticks = [0, 2, 4, 6, 8, 10, 12];

  return (
    <div className="hours-mode">
      <div className="hm-header">
        <div className="hm-name-col"></div>
        <div className="hm-bar-header">
          {ticks.map(t => (
            <div key={t} className="hm-tick" style={{ left: `${(t / max) * 100}%` }}>
              <span>{t}h</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hm-rows">
        {employees.map((emp, i) => {
          const hours = emp.hours ?? 0;
          const pct = (hours / max) * 100;
          const isLong = hours > 10;
          return (
            <div key={emp.id} className="hm-row">
              <div className="hm-name-col">
                <div className="hm-rank">{i + 1}</div>
                <div>
                  <div className="hm-emp-name">{emp.name}</div>
                  <div className="hm-emp-dept">{emp.deptLabel}</div>
                </div>
              </div>
              <div className="hm-bar-track">
                {ticks.map(t => (
                  <div key={t} className="hm-grid-line" style={{ left: `${(t / max) * 100}%` }}/>
                ))}
                <div className="hm-ref" style={{ left: `${(8 / max) * 100}%` }}></div>
                {emp.missing ? (
                  <div className="hm-bar missing">
                    <span className="hm-bar-value">未打卡 · 需補登</span>
                  </div>
                ) : (
                  <div className={`hm-bar ${isLong ? 'long' : ''}`} style={{ width: `${pct}%` }}>
                    <span className="hm-bar-value">{hours.toFixed(1)}h</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { DayDrawer });
