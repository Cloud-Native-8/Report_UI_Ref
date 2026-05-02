// Top global controls
function TopBar({ mode, setMode, monthLabel }) {
  const scopeRoots = React.useMemo(getScopedRoots, []);
  const scopeLabel = scopeRoots.map(r => r.label).join('、');
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <div className="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9"/>
              <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5"/>
              <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5"/>
              <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <div className="logo-name">出勤分析</div>
            <div className="logo-sub">Attendance Analytics</div>
          </div>
        </div>
        <div className="breadcrumb">
          <span className="crumb">出勤總覽</span>
          <span className="crumb-sep">/</span>
          <span className="crumb crumb-active">{mode === 'dept' ? '部門模式' : '個人模式'}</span>
        </div>
      </div>

      <div className="topbar-center">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === 'individual' ? 'active' : ''}`}
            onClick={() => setMode('individual')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M2 12c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            個人
          </button>
          <button
            className={`mode-btn ${mode === 'dept' ? 'active' : ''}`}
            onClick={() => setMode('dept')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="3" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="5.5" y="2" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="9" y="4" width="3" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            部門
          </button>
        </div>
        <div className="control-divider"></div>
        <button className="month-picker">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="3" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M4 1.5v3M10 1.5v3M1.5 6h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          {monthLabel}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="topbar-right">
        <div className="scope-chip" title="您的管轄範圍">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l4 2v3.5C10 9 8 10.5 6 11c-2-.5-4-2-4-4.5V3l4-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          管轄：{scopeLabel}
        </div>
        <button className="icon-btn" title="通知">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3 11.5h9c-1-1-1.3-2-1.3-3.5V6.5a3.2 3.2 0 00-6.4 0V8c0 1.5-.3 2.5-1.3 3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M6 13a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span className="notif-dot"></span>
        </button>
        <div className="user-chip">
          <div className="user-avatar">YL</div>
          <div className="user-meta">
            <div className="user-name">{MANAGER_NAME}</div>
            <div className="user-role">{MANAGER_TITLE}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scope helpers ─────────────────────────────────────────────────────────
const VIRTUAL_ROOT_ID = '__managed__';

// Find a node by id anywhere in the ORG_TREE
function findNode(rootNode, nodeId) {
  if (rootNode.id === nodeId) return rootNode;
  if (!rootNode.children) return null;
  for (const c of rootNode.children) {
    const r = findNode(c, nodeId);
    if (r) return r;
  }
  return null;
}

// Returns all scope root nodes the manager is authorized over
function getScopedRoots() {
  const findById = (nodes, id) => {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children) { const r = findById(n.children, id); if (r) return r; }
    }
    return null;
  };
  return MANAGER_SCOPE_ROOTS.map(id => findById(ORG_TREE, id)).filter(Boolean);
}

// Find a node across all scope roots
function findNodeInScope(roots, nodeId) {
  for (const root of roots) {
    const r = findNode(root, nodeId);
    if (r) return r;
  }
  return null;
}

// Returns ancestor path from a scope root down to nodeId (inclusive)
function getPath(rootNode, nodeId) {
  if (rootNode.id === nodeId) return [rootNode];
  if (!rootNode.children) return null;
  for (const c of rootNode.children) {
    const sub = getPath(c, nodeId);
    if (sub) return [rootNode, ...sub];
  }
  return null;
}

// Get path across multiple roots — prepends virtual root
function getPathInScope(roots, nodeId) {
  const virtualRoot = { id: VIRTUAL_ROOT_ID, label: '我的管轄' };
  if (nodeId === VIRTUAL_ROOT_ID) return [virtualRoot];
  for (const root of roots) {
    const path = getPath(root, nodeId);
    if (path) return [virtualRoot, ...path];
  }
  return [virtualRoot];
}

// All descendant IDs (including self)
function getDescendantIds(node) {
  const ids = [node.id];
  if (node.children) {
    for (const c of node.children) ids.push(...getDescendantIds(c));
  }
  return ids;
}

// All descendant IDs across all scope roots
function getAllScopedIds(roots) {
  const ids = new Set();
  for (const root of roots) getDescendantIds(root).forEach(id => ids.add(id));
  return ids;
}

// Flatten tree to list with path labels — for search results
function flattenTree(node, parentPath = []) {
  const myPath = [...parentPath, node];
  const out = [{ ...node, path: myPath }];
  if (node.children) {
    for (const c of node.children) out.push(...flattenTree(c, myPath));
  }
  return out;
}

function flattenRoots(roots) {
  const out = [];
  for (const root of roots) out.push(...flattenTree(root));
  return out;
}

// ─── Org Selector ──────────────────────────────────────────────────────────
function OrgSelector({ mode, selectedDept, setSelectedDept, selectedEmployee, setSelectedEmployee }) {
  const scopeRoots = React.useMemo(getScopedRoots, []);
  const allNodes = React.useMemo(() => flattenRoots(scopeRoots), [scopeRoots]);

  const [browseId, setBrowseId] = React.useState(VIRTUAL_ROOT_ID);
  const [search, setSearch] = React.useState('');

  const browseNode = React.useMemo(
    () => browseId === VIRTUAL_ROOT_ID ? null : findNodeInScope(scopeRoots, browseId),
    [browseId, scopeRoots]
  );

  const browsePath = React.useMemo(
    () => getPathInScope(scopeRoots, browseId),
    [browseId, scopeRoots]
  );

  // Visible dept rows in the list
  const visibleDepts = React.useMemo(() => {
    if (search) {
      const q = search.trim().toLowerCase();
      return allNodes.filter(n => n.label.toLowerCase().includes(q) || (n.name && n.name.toLowerCase().includes(q)));
    }
    if (browseId === VIRTUAL_ROOT_ID) return scopeRoots;
    return browseNode?.children || [];
  }, [search, allNodes, browseId, browseNode, scopeRoots]);

  const scopedDeptIds = React.useMemo(() => getAllScopedIds(scopeRoots), [scopeRoots]);
  const scopedEmployees = React.useMemo(() => EMPLOYEES.filter(e => scopedDeptIds.has(e.deptId)), [scopedDeptIds]);

  const filteredEmployees = React.useMemo(() => {
    let list = scopedEmployees;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e => e.name.toLowerCase().includes(q) || e.deptLabel.toLowerCase().includes(q));
    } else if (browseId !== VIRTUAL_ROOT_ID && browseNode) {
      const deptIds = new Set(getDescendantIds(browseNode));
      list = list.filter(e => deptIds.has(e.deptId));
    }
    return list;
  }, [scopedEmployees, search, browseId, browseNode]);

  const groupedEmployees = React.useMemo(() => {
    const groups = {};
    filteredEmployees.forEach(e => {
      const k = e.deptLabel;
      if (!groups[k]) groups[k] = [];
      groups[k].push(e);
    });
    return groups;
  }, [filteredEmployees]);

  const selectedNode = React.useMemo(() => findNodeInScope(scopeRoots, selectedDept), [selectedDept, scopeRoots]);
  const selectedNodePath = React.useMemo(() => {
    if (!selectedDept) return null;
    const path = getPathInScope(scopeRoots, selectedDept);
    // Remove virtual root from display path
    return path.length > 1 ? path.slice(1) : null;
  }, [selectedDept, scopeRoots]);
  const selectedEmp = EMPLOYEES.find(e => e.id === selectedEmployee);

  // Clicking a dept row: select it. Drill into it only if it has children
  // (leaf nodes highlight in place — no navigation)
  const handleDeptClick = (dept) => {
    setSelectedDept(dept.id);
    if (dept.children && dept.children.length > 0) {
      setBrowseId(dept.id);
    }
    setSearch('');
  };

  // Clicking ›: drill into without selecting
  const handleDeptDrill = (dept) => {
    setBrowseId(dept.id);
    setSearch('');
  };

  // Clicking a breadcrumb crumb: navigate AND select (except virtual root)
  const handleBreadcrumbClick = (node) => {
    setBrowseId(node.id);
    if (node.id !== VIRTUAL_ROOT_ID) {
      setSelectedDept(node.id);
    }
    setSearch('');
  };

  // Breadcrumb with truncation for deep paths
  const renderBreadcrumb = () => {
    if (browsePath.length <= 4) {
      return browsePath.map((n, i) => (
        <React.Fragment key={n.id}>
          {i > 0 && <span className="ob-sep">›</span>}
          <button
            className={`ob-crumb ${i === browsePath.length - 1 ? 'current' : ''}`}
            onClick={() => handleBreadcrumbClick(n)}>
            {i === 0 ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L5 2l3.5 3v3.5h-7V5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            ) : n.label}
          </button>
        </React.Fragment>
      ));
    }
    // Deep path: show home › … › second-to-last › last
    const first = browsePath[0];
    const collapsed = browsePath.slice(1, -2);
    const last2 = browsePath.slice(-2);
    return (
      <>
        <button className="ob-crumb" onClick={() => handleBreadcrumbClick(first)}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L5 2l3.5 3v3.5h-7V5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="ob-sep">›</span>
        <span className="ob-ellipsis" title={collapsed.map(n => n.label).join(' › ')}>…</span>
        {last2.map((n, i) => (
          <React.Fragment key={n.id}>
            <span className="ob-sep">›</span>
            <button
              className={`ob-crumb ${i === last2.length - 1 ? 'current' : ''}`}
              onClick={() => handleBreadcrumbClick(n)}>
              {n.label}
            </button>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <aside className="org-panel">
      <div className="org-header">
        <div className="org-title">{mode === 'dept' ? '部門選擇' : '員工選擇'}</div>
        <div className="org-scope-pill" title="您的管轄範圍">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1l3 1.5v3C8 7.5 6.5 8.8 5 9.2C3.5 8.8 2 7.5 2 5.5v-3L5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
          管轄
        </div>
      </div>

      <div className="org-search">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder={mode === 'dept' ? '搜尋部門…（管轄範圍內）' : '搜尋員工或部門…'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')} aria-label="清除搜尋">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 2l7 7M9 2L2 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Breadcrumb — shown when browsing (not searching) */}
      {!search && (
        <div className="org-breadcrumb">
          {renderBreadcrumb()}
        </div>
      )}

      <div className="org-scroll">
        {/* Department mode */}
        {mode === 'dept' && !search && browseId === VIRTUAL_ROOT_ID && (
          <div className="org-section">
            <div className="org-section-label">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1L1 4.3l3.1-.4z" fill="currentColor"/>
              </svg>
              常用部門
            </div>
            <ul className="org-list">
              {FAVORITES.map(f => (
                <li
                  key={f.id}
                  className={`org-item ${selectedDept === f.id ? 'selected' : ''}`}
                  onClick={() => handleDeptClick(f)}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ color: 'var(--text-3)', flexShrink: 0 }}>
                    <path d="M5.5 1l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1L1 4.3l3.1-.4z" fill="currentColor" opacity="0.5"/>
                  </svg>
                  <span className="org-item-label">{f.label}</span>
                  <span className="org-item-count">{f.count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {mode === 'dept' && (
          <div className="org-section">
            <div className="org-section-label">
              {search ? (
                <>搜尋結果（{visibleDepts.length}）</>
              ) : browseId === VIRTUAL_ROOT_ID ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 9V3.5L4 2h5v7H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                  管轄部門
                </>
              ) : (
                <>{browseNode?.label} 下屬部門</>
              )}
            </div>

            {/* "Select this department" row when browsing inside a node (not at virtual root) */}
            {!search && browseId !== VIRTUAL_ROOT_ID && browseNode && (
              <button
                className={`org-self-row ${selectedDept === browseNode.id ? 'selected' : ''}`}
                onClick={() => handleDeptClick(browseNode)}>
                <div className="osr-icon">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
                    {selectedDept === browseNode.id && <circle cx="6.5" cy="6.5" r="2.5" fill="currentColor"/>}
                  </svg>
                </div>
                <div className="osr-info">
                  <div className="osr-title">分析整個 {browseNode.label}</div>
                  <div className="osr-sub">含所有子部門 · {browseNode.count} 位員工</div>
                </div>
              </button>
            )}

            {visibleDepts.length === 0 ? (
              <div className="org-empty">
                {search ? '查無符合的部門' : '此部門沒有下屬子部門'}
              </div>
            ) : (
              <ul className="org-list">
                {visibleDepts.map(node => (
                  <li
                    key={node.id}
                    className={`org-row ${selectedDept === node.id ? 'selected' : ''}`}>
                    <div className="org-row-main" onClick={() => handleDeptClick(node)}>
                      <span className="org-item-label">{node.label}</span>
                      {search && node.path && node.path.length > 1 && (
                        <span className="org-row-path">
                          {node.path.slice(0, -1).map(p => p.label).join(' › ')}
                        </span>
                      )}
                    </div>
                    <span className="org-item-count">{node.count}</span>
                    {node.children && node.children.length > 0 && !search && (
                      <button className="org-drill"
                        onClick={(e) => { e.stopPropagation(); handleDeptDrill(node); }}
                        title={`進入 ${node.label}`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M3 1.5l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Individual mode */}
        {mode === 'individual' && (
          <>
            {!search && browseId === VIRTUAL_ROOT_ID && (
              <div className="org-section">
                <div className="org-section-label">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 1l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1L1 4.3l3.1-.4z" fill="currentColor"/>
                  </svg>
                  常用員工
                </div>
                <ul className="org-list">
                  {['alice', 'bob'].map(id => {
                    const e = EMPLOYEES.find(x => x.id === id);
                    if (!e) return null;
                    return (
                      <li key={e.id}
                        className={`emp-item ${selectedEmployee === e.id ? 'selected' : ''}`}
                        onClick={() => setSelectedEmployee(e.id)}>
                        <div className="emp-avatar">{e.avatar}</div>
                        <div className="emp-info">
                          <div className="emp-name">{e.name}</div>
                          <div className="emp-dept">{e.deptLabel}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Filter chip: shows when a dept is selected as browse scope */}
            {!search && browseId !== VIRTUAL_ROOT_ID && browseNode && (
              <div className="emp-filter-chip">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 2h7l-3 4v3l-1.5-1V6L2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <span className="emp-filter-text">僅顯示「{browseNode.label}」員工（{filteredEmployees.length}）</span>
                <button onClick={() => setBrowseId(VIRTUAL_ROOT_ID)}>清除</button>
              </div>
            )}

            <div className="org-section">
              <div className="org-section-label">
                {search ? `搜尋結果（${filteredEmployees.length}）` : `所有員工（${filteredEmployees.length}）`}
              </div>
              {filteredEmployees.length === 0 ? (
                <div className="org-empty">查無員工</div>
              ) : (
                Object.entries(groupedEmployees).map(([deptLabel, emps]) => (
                  <div key={deptLabel} className="emp-group">
                    <div className="emp-group-label">{deptLabel}</div>
                    <ul className="org-list">
                      {emps.map(e => (
                        <li key={e.id}
                          className={`emp-item ${selectedEmployee === e.id ? 'selected' : ''}`}
                          onClick={() => setSelectedEmployee(e.id)}>
                          <div className="emp-avatar">{e.avatar}</div>
                          <div className="emp-info">
                            <div className="emp-name">{e.name}</div>
                            <div className="emp-dept">{e.deptLabel}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <div className="org-footer">
        <div className="org-selected-card">
          <div className="org-selected-label">當前選取</div>
          {mode === 'dept' ? (
            selectedNode ? (
              <>
                <div className="org-selected-name">
                  {selectedNode.label}{selectedNode.children ? '（含子部門）' : ''}
                </div>
                <div className="org-selected-meta">
                  {selectedNodePath && selectedNodePath.length > 1 ?
                    selectedNodePath.slice(0, -1).map(p => p.label).join(' › ') + ' · ' : ''}
                  {selectedNode.count} 位員工
                </div>
              </>
            ) : <div className="org-selected-meta">未選取</div>
          ) : selectedEmp ? (
            <>
              <div className="org-selected-name">{selectedEmp.name}</div>
              <div className="org-selected-meta">{selectedEmp.deptLabel}</div>
            </>
          ) : <div className="org-selected-meta">尚未選擇員工</div>}
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { TopBar, OrgSelector, getScopedRoots, findNodeInScope, findNode });
