'use strict';

var obsidian = require('obsidian');

const DASHBOARD_VIEW_TYPE = 'command-center-dashboard';
const WATCHLIST_PATH = 'd:\\Claude\\social-monitor\\watchlist.txt';

const DEFAULT_PANELS = {
    github: true, hn: false, ph: false, lobsters: false,
    ithome: true, techorange: true, techcrunch: true,
    email: true, social: true, fontSize: 12,
    socialTopicCount: 3,
    panelOrder: ['github','hn','ph','lobsters','ithome','techorange','techcrunch','email','social']
};
const PANEL_LABELS = {
    github: 'GitHub', hn: 'HN', ph: 'PH', lobsters: 'Lobsters',
    ithome: 'iThome', techorange: 'TechOrange', techcrunch: 'TechCrunch',
    email: 'Email', social: 'Social'
};

// ─── Job List Modal ───────────────────────────────────────────────────────────

class JobListModal extends obsidian.Modal {
    constructor(app, jobs, plugin) {
        super(app);
        this.jobs = jobs;
        this.plugin = plugin;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: `新職缺（${this.jobs.length}）` });
        const list = contentEl.createEl('div', { cls: 'cc-job-list' });
        this.jobs.forEach(job => {
            const item = list.createEl('div', { cls: 'cc-job-item' });
            const link = item.createEl('a', { text: `${job.company} — ${job.title}`, cls: 'cc-job-link' });
            link.addEventListener('click', e => {
                e.preventDefault();
                require('electron').shell.openExternal(job.url);
            });
            const meta = item.createEl('div', { cls: 'cc-job-meta' });
            if (job.location) meta.createEl('span', { text: `📍 ${job.location}`, cls: 'cc-job-location' });
            if (job.platforms) meta.createEl('span', { text: job.platforms, cls: 'cc-job-platform' });
            if (job.first_seen) meta.createEl('span', { text: job.first_seen.substring(0, 10), cls: 'cc-job-date' });
            const actions = item.createEl('div', { cls: 'cc-job-actions' });
            const applyBtn = actions.createEl('button', { text: '✅ Applied', cls: 'cc-job-action' });
            const skipBtn  = actions.createEl('button', { text: '❌ 跳過', cls: 'cc-job-action' });
            const markJob = (status, btn) => {
                item.style.opacity = '0.4';
                btn.textContent = status === 'applied' ? '✅ 已記錄' : '❌ 已跳過';
                this.plugin.runScriptWithArg('update-job-status.ps1',
                    `${job.id}|${status}`, `更新職缺狀態`);
            };
            applyBtn.addEventListener('click', () => markJob('applied', applyBtn));
            skipBtn.addEventListener('click',  () => markJob('skipped', skipBtn));
        });
    }
    onClose() {
        this.contentEl.empty();
    }
}

// ─── Watchlist Modal ─────────────────────────────────────────────────────────

class WatchlistModal extends obsidian.Modal {
    constructor(app, plugin, onSave, onScanComplete) {
        super(app);
        this.plugin = plugin;
        this.onSave = onSave;
        this.onScanComplete = onScanComplete;
    }
    onOpen() {
        const { contentEl } = this;
        const { readFileSync, readdirSync } = require('fs');

        contentEl.createEl('h2', { text: '社群監控主題' });
        contentEl.createEl('p', { text: '每行一個主題，# 開頭為注解', cls: 'cc-watchlist-hint' });

        // Last report status
        let lastReport = '尚無報告';
        try {
            const files = readdirSync('d:\\Claude\\social-monitor\\reports')
                .filter(f => f.startsWith('report-') && f.endsWith('.md'))
                .sort().reverse();
            if (files.length > 0) {
                lastReport = '上次報告：' + files[0].replace('report-','').replace('.md','');
            }
        } catch(e) {}
        contentEl.createEl('p', { text: lastReport, cls: 'cc-watchlist-status' });

        const ta = contentEl.createEl('textarea', { cls: 'cc-watchlist-textarea' });
        try { ta.value = readFileSync(WATCHLIST_PATH, 'utf8'); } catch(e) { ta.value = ''; }

        // Per-topic headline count config
        const countRow = contentEl.createEl('div', { cls: 'cc-watchlist-count-row' });
        countRow.createEl('span', { text: '每主題顯示前 ', cls: 'cc-watchlist-count-label' });
        const countInput = countRow.createEl('input');
        countInput.type = 'number';
        countInput.min = '1';
        countInput.max = '10';
        countInput.value = String(this.plugin.panelSettings.socialTopicCount || 3);
        countInput.className = 'cc-watchlist-count-input';
        countRow.createEl('span', { text: ' 條 headlines（1–10）', cls: 'cc-watchlist-count-label' });

        const btnRow = contentEl.createEl('div', { cls: 'cc-watchlist-buttons' });

        // Run now button
        const runBtn = btnRow.createEl('button', { text: '▶ 立即海巡', cls: 'cc-btn' });
        runBtn.style.marginRight = 'auto';
        runBtn.addEventListener('click', () => {
            const { writeFileSync } = require('fs');
            try { writeFileSync(WATCHLIST_PATH, ta.value, 'utf8'); } catch(e) {}
            runBtn.textContent = '⏳ 海巡中…';
            runBtn.disabled = true;
            const { exec } = require('child_process');
            exec('cmd /c "D:\\Claude\\social-monitor\\run.bat"',
                { timeout: 180000 },
                (err) => {
                    if (err) {
                        runBtn.textContent = '❌ 海巡失敗';
                        new obsidian.Notice('❌ 社群海巡失敗：' + (err.message || '').slice(0, 60));
                        setTimeout(() => { runBtn.textContent = '▶ 立即海巡'; runBtn.disabled = false; }, 3000);
                    } else {
                        runBtn.textContent = '⏳ 更新面板…';
                        // Step 2: parse new report → dashboard.json
                        this.plugin.runScript('fetch-dashboard-data.ps1', '更新面板資料', () => {
                            runBtn.textContent = '✅ 完成';
                            new obsidian.Notice('✅ 社群海巡完成，面板已更新');
                            if (this.onScanComplete) this.onScanComplete();
                            setTimeout(() => { runBtn.textContent = '▶ 立即海巡'; runBtn.disabled = false; }, 2500);
                        });
                    }
                });
        });

        const saveBtn = btnRow.createEl('button', { text: '儲存', cls: 'cc-btn' });
        saveBtn.addEventListener('click', () => {
            const { writeFileSync } = require('fs');
            writeFileSync(WATCHLIST_PATH, ta.value, 'utf8');
            const count = Math.max(1, Math.min(10, parseInt(countInput.value) || 3));
            this.plugin.panelSettings.socialTopicCount = count;
            this.plugin.saveData({ panelSettings: this.plugin.panelSettings });
            if (this.onSave) this.onSave();
            this.close();
        });
        btnRow.createEl('button', { text: '取消', cls: 'cc-btn cc-btn-secondary' })
              .addEventListener('click', () => this.close());
    }
    onClose() { this.contentEl.empty(); }
}

// ─── Panel Config Modal ──────────────────────────────────────────────────────

class PanelConfigModal extends obsidian.Modal {
    constructor(app, plugin, onClose) {
        super(app);
        this.plugin = plugin;
        this._onClose = onClose;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.addClass('cc-pcm');
        contentEl.createEl('h2', { text: '面板設定', cls: 'cc-pcm-title' });
        contentEl.createEl('p', { text: '開關面板顯示，拖動 ↑↓ 調整順序', cls: 'cc-pcm-hint' });

        const list = contentEl.createEl('div', { cls: 'cc-pcm-list' });

        const ps = this.plugin.panelSettings;

        const renderList = () => {
            list.empty();
            const order = this.plugin.panelSettings.panelOrder
                ? [...this.plugin.panelSettings.panelOrder]
                : [...DEFAULT_PANELS.panelOrder];

            order.forEach((key, idx, arr) => {
                const row = list.createEl('div', { cls: 'cc-pcm-row' });

                // Toggle switch
                const switchLabel = row.createEl('label', { cls: 'cc-pcm-switch' });
                const checkbox = switchLabel.createEl('input');
                checkbox.type = 'checkbox';
                checkbox.checked = this.plugin.panelSettings[key] !== false;
                switchLabel.createEl('span', { cls: 'cc-pcm-slider' });
                checkbox.addEventListener('change', () => {
                    this.plugin.panelSettings[key] = checkbox.checked;
                    this.plugin.saveData({ panelSettings: this.plugin.panelSettings });
                });

                // Panel label
                row.createEl('span', {
                    text: PANEL_LABELS[key] || key,
                    cls: 'cc-pcm-name'
                });

                // Reorder arrows
                const arrows = row.createEl('div', { cls: 'cc-pcm-arrows' });
                const upBtn   = arrows.createEl('button', { text: '↑', cls: 'cc-pcm-arrow', title: '上移' });
                const downBtn = arrows.createEl('button', { text: '↓', cls: 'cc-pcm-arrow', title: '下移' });
                if (idx === 0)              upBtn.disabled   = true;
                if (idx === arr.length - 1) downBtn.disabled = true;

                upBtn.addEventListener('click', () => {
                    const o = [...this.plugin.panelSettings.panelOrder];
                    [o[idx - 1], o[idx]] = [o[idx], o[idx - 1]];
                    this.plugin.panelSettings.panelOrder = o;
                    this.plugin.saveData({ panelSettings: this.plugin.panelSettings });
                    renderList();
                });
                downBtn.addEventListener('click', () => {
                    const o = [...this.plugin.panelSettings.panelOrder];
                    [o[idx], o[idx + 1]] = [o[idx + 1], o[idx]];
                    this.plugin.panelSettings.panelOrder = o;
                    this.plugin.saveData({ panelSettings: this.plugin.panelSettings });
                    renderList();
                });
            });
        };

        renderList();
    }
    onClose() {
        this.contentEl.empty();
        if (this._onClose) this._onClose();
    }
}

// ─── Dashboard View ───────────────────────────────────────────────────────────

class DashboardView extends obsidian.ItemView {
    constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
        this.refreshInterval = null;
    }

    getViewType()    { return DASHBOARD_VIEW_TYPE; }
    getDisplayText() { return 'Command Center'; }
    getIcon()        { return 'layout-dashboard'; }

    async onOpen() {
        this.render();
        this.refreshInterval = setInterval(() => this.render(), 30000);
    }

    _changeFontSize(delta) {
        const cur = this.plugin.panelSettings.fontSize || 12;
        const next = Math.max(10, Math.min(16, cur + delta));
        if (next === cur) return;
        this.plugin.panelSettings.fontSize = next;
        this.plugin.saveData({ panelSettings: this.plugin.panelSettings });
        const dash = this.containerEl.querySelector('.cc-dashboard');
        if (dash) dash.style.fontSize = next + 'px';
    }

    async onClose() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    loadData() {
        try {
            const { readFileSync } = require('fs');
            const p = this.plugin.app.vault.adapter.basePath + '\\data\\dashboard.json';
            return JSON.parse(readFileSync(p, 'utf8'));
        } catch (e) {
            return null;
        }
    }

    openExternal(url) {
        if (!url) return;
        try {
            require('electron').shell.openExternal(url);
        } catch (e) {
            window.open(url, '_blank');
        }
    }

    // ── Render helpers ────────────────────────────────────────────────────

    renderGithub(github) {
        if (!github || github.length === 0)
            return '<div class="cc-empty">尚未更新 → 按「🔄 更新資料」</div>';
        return github.slice(0, 10).map(r => `
<div class="cc-item cc-clickable" data-repo="${r.repo}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.repo}${r.lang ? ' <span class="cc-tag">'+r.lang+'</span>' : ''}${r.stars && r.stars !== '0' ? ' <span class="cc-badge">★'+Number(r.stars).toLocaleString()+'</span>' : ''}
      <button class="cc-copy-btn" data-repo="${r.repo}" title="複製 wiki 路徑">📋</button>
    </div>
    ${r.desc ? '<div class="cc-item-sub">'+r.desc+'</div>' : ''}
  </div>
</div>`).join('');
    }

    renderHN(hn) {
        if (!hn || hn.length === 0)
            return '<div class="cc-empty">尚未更新 → 按「🔄 更新資料」</div>';
        return hn.slice(0, 10).map(r => `
<div class="cc-item cc-clickable" data-url="${r.url || ''}" data-hn-id="${r.id || ''}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.title}</div>
    <div class="cc-item-sub cc-score">${r.score}↑</div>
  </div>
</div>`).join('');
    }

    renderPH(ph) {
        if (!ph || ph.length === 0)
            return '<div class="cc-empty">無資料（檢查 data/ph_token.txt）</div>';
        return ph.slice(0, 10).map(r => `
<div class="cc-item cc-clickable" data-url="${r.url || ''}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.name} <span class="cc-badge">▲${r.votes}</span></div>
    <div class="cc-item-sub">${r.tagline}</div>
  </div>
</div>`).join('');
    }

    renderEmailBrief(emails) {
        if (!emails || !Array.isArray(emails) || emails.length === 0)
            return '<div class="cc-empty">無重要郵件（按「📧 Email」同步）</div>';

        const badgeMap = {
            Emergency: '<span class="cc-email-badge cc-badge-emg">🚨EMG</span>',
            High:      '<span class="cc-email-badge cc-badge-high">⚡HIGH</span>',
            Medium:    '<span class="cc-email-badge cc-badge-med">📌MED</span>',
            Low:       '<span class="cc-email-badge cc-badge-low">· LOW</span>'
        };

        return emails.map(e => {
            const badge = badgeMap[e.importance] || badgeMap.Low;
            const todos = e.todos && e.todos.length
                ? `<div class="cc-email-todos">${e.todos.map(t => `<span class="cc-todo-item">→ ${t}</span>`).join('')}</div>`
                : '';
            return `<div class="cc-email-item cc-badge-${(e.importance||'low').toLowerCase()}">
  <div class="cc-email-header">
    ${badge}
    <span class="cc-email-from">${e.from || ''}</span>
    <span class="cc-email-time">${e.time || ''}</span>
  </div>
  <div class="cc-email-subject">${e.subject || ''}</div>
  ${todos}
</div>`;
        }).join('');
    }

    renderSchedule(schedule) {
        if (!schedule || schedule.length === 0)
            return '<div class="cc-empty">無行程（按「📅 日曆」同步）</div>';
        return schedule.map(ev => {
            const t = (!ev.time || ev.time === '00:00') ? '全天' : ev.time;
            const loc = ev.location ? ` <span class="cc-event-loc">· ${ev.location}</span>` : '';
            return `<div class="cc-event">
  <span class="cc-event-time">${t}</span>
  <span class="cc-event-title">${ev.title || ''}${loc}</span>
</div>`;
        }).join('');
    }

    renderLobsters(lobsters) {
        if (!lobsters || lobsters.length === 0)
            return '<div class="cc-empty">尚未更新 → 按「🔄 更新資料」</div>';
        return lobsters.slice(0, 10).map(r => `
<div class="cc-item cc-clickable" data-url="${r.url || ''}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.title}</div>
    <div class="cc-item-sub cc-score">${r.score}↑</div>
  </div>
</div>`).join('');
    }

    renderiThome(ithome) {
        if (!ithome || ithome.length === 0)
            return '<div class="cc-empty">尚未更新 → 按「🔄 更新資料」</div>';
        return ithome.slice(0, 15).map(r => `
<div class="cc-item cc-clickable" data-url="${r.url || ''}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.title}</div>
    <div class="cc-item-sub">${r.author} · ${r.date}</div>
  </div>
</div>`).join('');
    }

    renderTechOrange(items) {
        if (!items || items.length === 0)
            return '<div class="cc-empty">尚未更新 → 按「🔄 更新資料」</div>';
        return items.slice(0, 10).map(r => `
<div class="cc-item cc-clickable" data-url="${r.url || ''}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.title}</div>
    <div class="cc-item-sub">${r.author} · ${r.date}</div>
  </div>
</div>`).join('');
    }

    renderTechCrunch(items) {
        if (!items || items.length === 0)
            return '<div class="cc-empty">尚未更新 → 按「🔄 更新資料」</div>';
        return items.slice(0, 10).map(r => `
<div class="cc-item cc-clickable" data-url="${r.url || ''}">
  <span class="cc-rank">${r.rank}</span>
  <div class="cc-item-body">
    <div class="cc-item-title">${r.title}</div>
    <div class="cc-item-sub">${r.author} · ${r.date}</div>
  </div>
</div>`).join('');
    }

    // ── Main render ───────────────────────────────────────────────────────

    render() {
        const data    = this.loadData();
        const today   = new Date().toLocaleDateString('zh-TW', {
            year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
        });
        const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
        const ps      = this.plugin.panelSettings;

        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('cc-dashboard-container');

        const fontSize = ps.fontSize || 12;
        try { container.innerHTML = `
<div class="cc-dashboard cc-main" style="font-size:${fontSize}px">

  <div class="cc-header-row">
    <span class="cc-title">COMMAND CENTER</span>
    <span class="cc-date">${today}</span>
    <span class="cc-time">${timeStr}</span>
    <span class="cc-vault">${this.plugin.app.vault.getName()}</span>
    <span class="cc-header-actions">
      <button class="cc-font-btn" id="cc-font-dec" title="縮小字體">A−</button>
      <button class="cc-font-btn" id="cc-font-inc" title="放大字體">A+</button>
      <button class="cc-config-btn" id="cc-panels-config" title="面板設定">⊞</button>
    </span>
    <span class="cc-updated">${data?.updatedAt ? '↻ ' + data.updatedAt : '尚未更新'}</span>
  </div>

  ${(() => {
    const order = ps.panelOrder || DEFAULT_PANELS.panelOrder;
    const gridMap = {
      github: ps.github ? `<div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">GITHUB TRENDING</span>
        <div style="display:flex;gap:4px;align-items:center">
          <span class="cc-panel-badge">DAILY · 點擊分析</span>
          <button class="cc-btn cc-btn-small cc-panel-refresh" data-section="github" title="刷新">🔄</button>
        </div>
      </div>
      <div class="cc-list" id="cc-github-list">${this.renderGithub(data?.github)}</div>
    </div>` : '',
      hn: ps.hn ? `<div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">HACKER NEWS</span>
        <div style="display:flex;gap:4px;align-items:center">
          <span class="cc-panel-badge">${timeStr} · 點擊開原文</span>
          <button class="cc-btn cc-btn-small cc-panel-refresh" data-section="hn" title="刷新">🔄</button>
        </div>
      </div>
      <div class="cc-list" id="cc-hn-list">${this.renderHN(data?.hn)}</div>
    </div>` : '',
      ph: ps.ph ? `<div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">PRODUCT HUNT</span>
        <span class="cc-panel-badge">TODAY · 點擊開頁面</span>
      </div>
      <div class="cc-list" id="cc-ph-list">${this.renderPH(data?.ph)}</div>
    </div>` : '',
      lobsters: ps.lobsters ? `<div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">LOBSTERS</span>
        <span class="cc-panel-badge">HOTTEST · 點擊開原文</span>
      </div>
      <div class="cc-list" id="cc-lobsters-list">${this.renderLobsters(data?.lobsters)}</div>
    </div>` : ''
    };
    const fullMap = {
      ithome: ps.ithome ? `<div class="cc-ithome-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">ITHOME NEWS</span>
      <div style="display:flex;gap:4px;align-items:center">
        <span class="cc-panel-badge">iThome · 台灣 IT 新聞 · 點擊開原文</span>
        <input class="cc-filter-input" placeholder="過濾..." data-target="cc-ithome-list">
        <button class="cc-btn cc-btn-small cc-panel-refresh" data-section="ithome" title="刷新">🔄</button>
      </div>
    </div>
    <div class="cc-list cc-ithome-list-inner" id="cc-ithome-list">${this.renderiThome(data?.ithome)}</div>
  </div>` : '',
      techorange: ps.techorange ? `<div class="cc-ithome-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">TECHORANGE 科技報橘</span>
      <div style="display:flex;gap:4px;align-items:center">
        <span class="cc-panel-badge">台灣新創 · AI 趨勢 · 點擊開原文</span>
        <input class="cc-filter-input" placeholder="過濾..." data-target="cc-techorange-list">
        <button class="cc-btn cc-btn-small cc-panel-refresh" data-section="techorange" title="刷新">🔄</button>
      </div>
    </div>
    <div class="cc-list cc-ithome-list-inner" id="cc-techorange-list">${this.renderTechOrange(data?.techorange)}</div>
  </div>` : '',
      techcrunch: ps.techcrunch ? `<div class="cc-ithome-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">TECHCRUNCH</span>
      <div style="display:flex;gap:4px;align-items:center">
        <span class="cc-panel-badge">新創募資 · 全球科技 · 點擊開原文</span>
        <input class="cc-filter-input" placeholder="過濾..." data-target="cc-techcrunch-list">
        <button class="cc-btn cc-btn-small cc-panel-refresh" data-section="techcrunch" title="刷新">🔄</button>
      </div>
    </div>
    <div class="cc-list cc-ithome-list-inner" id="cc-techcrunch-list">${this.renderTechCrunch(data?.techcrunch)}</div>
  </div>` : '',
      email: ps.email ? `<div class="cc-email-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">EMAIL BRIEF</span>
      <div style="display:flex;gap:4px;align-items:center">
        <span class="cc-panel-badge">重要郵件</span>
        <button class="cc-btn cc-btn-small cc-panel-refresh" id="cc-email-sync" title="同步 Email">🔄 同步</button>
      </div>
    </div>
    <div class="cc-email-list" id="cc-email-list">${this.renderEmailBrief(data?.emailBrief)}</div>
  </div>` : '',
      social: ps.social ? `<div class="cc-social-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">SOCIAL TRENDS</span>
      <div style="display:flex;gap:6px;align-items:center">
        <span class="cc-panel-badge">${data?.socialLabel || '尚未海巡'}</span>
        <button class="cc-btn cc-btn-small" id="cc-social-config" title="編輯監控主題">⚙️</button>
      </div>
    </div>
    <div class="cc-social-list">
      ${(!data?.socialTopics?.length)
        ? '<div class="cc-empty">尚無資料 — 點 ⚙️ 立即海巡</div>'
        : (() => {
            const n = ps.socialTopicCount || 3;
            const SRC_ABBR = {
                'Reddit':'Reddit','Hacker News':'HN','GitHub':'GH',
                'Polymarket':'PM','YouTube':'YT','X':'X','Twitter':'X','V2EX':'V2EX'
            };
            const getText = h => typeof h === 'string' ? h : (h.text || '');
            const getSrc  = h => typeof h === 'string' ? '' : (h.source || '');
            return data.socialTopics.map(t => {
                const hl = (t.headlines && t.headlines.length > 0)
                    ? t.headlines.slice(0, n)
                    : (t.headline && t.headline !== '（無資料）' ? [t.headline] : []);
                const preview = getText(hl[0]) || '（無資料）';
                const subItems = hl.map((h, i) => {
                    const txt  = getText(h);
                    const src  = getSrc(h);
                    const abbr = src ? (SRC_ABBR[src] || src.slice(0, 6)) : '';
                    const srcTag = src ? `<span class="cc-social-src">${abbr}</span>` : '';
                    return `<div class="cc-social-sub"><span class="cc-social-rank">${i+1}</span><span class="cc-social-hl">${txt}</span>${srcTag}</div>`;
                }).join('');
                return `<details class="cc-social-item">
                  <summary class="cc-social-summary">
                    <span class="cc-social-topic">${t.topic}</span>
                    <span class="cc-social-preview">${preview}</span>
                  </summary>
                  ${hl.length > 0 ? `<div class="cc-social-sub-list">${subItems}</div>` : ''}
                </details>`;
            }).join('');
        })()
      }
    </div>
  </div>` : ''
    };
    const gridKeys = ['github','hn','ph','lobsters'];
    const fullKeys = ['ithome','techorange','techcrunch','email','social'];
    const gridSorted = [...gridKeys].sort((a,b) => order.indexOf(a) - order.indexOf(b));
    const fullSorted = [...fullKeys].sort((a,b) => order.indexOf(a) - order.indexOf(b));
    const gridHtml = gridSorted.map(k => gridMap[k] || '').join('\n');
    const fullHtml = fullSorted.map(k => fullMap[k] || '').join('\n');
    return `<div class="cc-panels-grid">${gridHtml}</div>\n${fullHtml}`;
  })()}

  <div class="cc-brief-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">MORNING BRIEF</span>
      <span class="cc-panel-badge">${data?.briefingTitle || '—'}</span>
    </div>
    <div class="cc-brief-body">
      <div class="cc-actions-row">
        <button class="cc-btn" id="cc-morning">☀️ 早報</button>
        <button class="cc-btn" id="cc-compile">📚 Compile</button>
        <button class="cc-btn" id="cc-lint">🔍 Lint</button>
        <button class="cc-btn" id="cc-capture">✏️ 捕捉</button>
        <button class="cc-btn" id="cc-calendar">📅 日曆</button>
        <button class="cc-btn" id="cc-email">📧 Email</button>
        <button class="cc-btn cc-btn-secondary" id="cc-refresh">🔄 更新資料</button>
      </div>
      <div class="cc-metrics-row">
        <div class="cc-inline-metric cc-jobs-clickable" id="cc-jobs-metric" title="點擊查看職缺列表">
          <span class="cc-im-label">新職缺</span>
          <span class="cc-im-value cc-accent">${data?.jobCount ?? '—'}</span>
        </div>
        <div class="cc-inline-metric">
          <span class="cc-im-label">社群</span>
          <span class="cc-im-value">${data?.socialLabel || '—'}</span>
        </div>
        <div class="cc-inline-metric">
          <span class="cc-im-label">Token</span>
          <span class="cc-im-value">${data?.tokenEstimate || '—'}</span>
        </div>
      </div>
      <div class="cc-schedule-block">
        <div class="cc-schedule-title">今日行程${(() => {
          const now = new Date();
          const next = (data?.schedule || [])
            .map(e => ({ ...e, dt: new Date(e.start || e.date) }))
            .filter(e => !isNaN(e.dt) && e.dt > now)
            .sort((a, b) => a.dt - b.dt)[0];
          if (!next) return '';
          const mins = Math.round((next.dt - now) / 60000);
          const label = mins < 60 ? `${mins} 分鐘後` : `${Math.round(mins/60)} 小時後`;
          const title = next.title || next.summary || '';
          return ` <span class="cc-next-event" title="${title}">⏰ ${next.dt.toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'})} ${title.slice(0,14)}${title.length>14?'…':''} (${label})</span>`;
        })()}</div>
        ${this.renderSchedule(data?.schedule)}
      </div>
      <div id="cc-brief-preview" class="cc-brief-preview" style="display:none"></div>
    </div>
  </div>


</div>`;
        } catch(renderErr) {
            container.innerHTML = `<div style="padding:20px;color:#f87171;font-family:monospace;font-size:12px;white-space:pre-wrap">⚠ Render Error:\n${renderErr.message}\n\n${renderErr.stack||''}</div>`;
            console.error('[CC] render error:', renderErr);
            return;
        }

        // ── Event listeners ────────────────────────────────────────────────

        // Panel config modal
        container.querySelector('#cc-panels-config')?.addEventListener('click', () => {
            new PanelConfigModal(this.plugin.app, this.plugin, () => this.render()).open();
        });

        // Panel individual refresh
        container.querySelectorAll('.cc-panel-refresh[data-section]').forEach(btn => {
            btn.addEventListener('click', () => {
                const sec = btn.dataset.section;
                this.plugin.runScriptWithArg('fetch-section.ps1', sec, `刷新 ${sec}`,
                    () => this.render());
            });
        });

        // Keyword filter for full-width panels
        container.querySelectorAll('.cc-filter-input').forEach(input => {
            input.addEventListener('input', () => {
                const q = input.value.toLowerCase();
                const targetId = input.dataset.target;
                container.querySelectorAll(`#${targetId} .cc-item`).forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
                });
            });
        });

        // Font size — assign onclick directly (most reliable, refreshed each render)
        const fontDec = container.querySelector('#cc-font-dec');
        const fontInc = container.querySelector('#cc-font-inc');
        if (fontDec) fontDec.onclick = () => this._changeFontSize(-1);
        if (fontInc) fontInc.onclick = () => this._changeFontSize(1);

        // GitHub copy wiki path
        container.querySelectorAll('#cc-github-list .cc-copy-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const repo = btn.dataset.repo;
                const path = `wiki/Github/repos/${repo.replace('/', '-')}.md`;
                navigator.clipboard.writeText(path).then(() => {
                    btn.textContent = '✅';
                    setTimeout(() => { btn.textContent = '📋'; }, 1200);
                });
            });
        });

        // Social Trends watchlist config
        container.querySelector('#cc-social-config')?.addEventListener('click', () => {
            new WatchlistModal(
                this.plugin.app, this.plugin,
                () => new obsidian.Notice('✅ 主題已儲存，下次排程自動生效'),
                () => this.render()
            ).open();
        });

        // GitHub → repomix analysis
        container.querySelectorAll('#cc-github-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => {
                const repo = el.dataset.repo;
                if (repo) this.plugin.runScriptWithArg('analyze-repo.ps1', repo, `分析 ${repo}`);
            });
        });

        // HN → open article URL (or HN discussion)
        container.querySelectorAll('#cc-hn-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => {
                const url = el.dataset.url || (el.dataset.hnId
                    ? `https://news.ycombinator.com/item?id=${el.dataset.hnId}` : '');
                this.openExternal(url);
            });
        });

        // Product Hunt → open product page
        container.querySelectorAll('#cc-ph-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => this.openExternal(el.dataset.url));
        });

        // Lobsters → open article
        container.querySelectorAll('#cc-lobsters-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => this.openExternal(el.dataset.url));
        });

        // iThome → open article
        container.querySelectorAll('#cc-ithome-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => this.openExternal(el.dataset.url));
        });

        // TechOrange → open article
        container.querySelectorAll('#cc-techorange-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => this.openExternal(el.dataset.url));
        });

        // TechCrunch → open article
        container.querySelectorAll('#cc-techcrunch-list .cc-clickable').forEach(el => {
            el.addEventListener('click', () => this.openExternal(el.dataset.url));
        });

        // Action buttons
        container.querySelector('#cc-email')?.addEventListener('click', () => {
            this.plugin.runScript('fetch-email-brief.ps1', 'Email Brief', () => {
                this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh', () => this.render());
            });
        });
        container.querySelector('#cc-email-sync')?.addEventListener('click', () => {
            this.plugin.runScript('fetch-email-brief.ps1', 'Email Brief', () => this.render());
        });
        container.querySelector('#cc-calendar')?.addEventListener('click', () => {
            this.plugin.runScript('fetch-calendar.ps1', 'Sync Calendar', () => {
                this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh', () => this.render());
            });
        });
        container.querySelector('#cc-morning')?.addEventListener('click', () => {
            const preview = container.querySelector('#cc-brief-preview');
            if (preview) {
                if (preview.style.display !== 'none') {
                    preview.style.display = 'none';
                    return;
                }
                try {
                    const { readdirSync, readFileSync } = require('fs');
                    const basePath = this.plugin.app.vault.adapter.basePath;
                    const dailyDir = `${basePath}\\wiki\\Daily`;
                    const files = readdirSync(dailyDir).filter(f => f.startsWith('Morning_')).sort().reverse();
                    if (files.length > 0) {
                        const content = readFileSync(`${dailyDir}\\${files[0]}`, 'utf8');
                        preview.textContent = content.slice(0, 800) + (content.length > 800 ? '\n...' : '');
                        preview.style.display = 'block';
                        return;
                    }
                } catch(e) {}
            }
            this.plugin.runScript('morning-briefing.ps1', 'Morning Briefing', () => this.render());
        });
        container.querySelector('#cc-compile')?.addEventListener('click', () => {
            this.plugin.runScript('compile.ps1', 'Compile Vault');
        });
        container.querySelector('#cc-lint')?.addEventListener('click', () => {
            this.plugin.runScript('lint.ps1', 'Lint Vault');
        });
        container.querySelector('#cc-capture')?.addEventListener('click', () => {
            this.plugin.quickCapture();
        });
        container.querySelector('#cc-refresh')?.addEventListener('click', () => {
            this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh Data', () => this.render());
        });

        // Job list modal
        container.querySelector('#cc-jobs-metric')?.addEventListener('click', () => {
            if (data?.jobList === undefined) {
                new obsidian.Notice('🔄 正在更新職缺資料，請稍後再點擊...');
                this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh for jobs', () => this.render());
                return;
            }
            const jobs = data.jobList;
            if (jobs.length > 0) {
                new JobListModal(this.plugin.app, jobs, this.plugin).open();
            } else {
                new obsidian.Notice('目前沒有新職缺');
            }
        });
    }
}

// ─── Main Plugin ─────────────────────────────────────────────────────────────

class CommandCenter extends obsidian.Plugin {
    async onload() {
        const saved = await this.loadData();
        this.panelSettings = Object.assign({}, DEFAULT_PANELS, saved?.panelSettings);
        this.registerView(DASHBOARD_VIEW_TYPE, (leaf) => new DashboardView(leaf, this));

        this.addRibbonIcon('layout-dashboard', 'Open Dashboard', () => this.activateDashboardView());
        this.addRibbonIcon('sun',       'Morning Briefing', () => this.runScript('morning-briefing.ps1', 'Morning Briefing'));
        this.addRibbonIcon('book-open', 'Compile Vault',    () => this.runScript('compile.ps1', 'Compile Vault'));
        this.addRibbonIcon('search',    'Lint Vault',       () => this.runScript('lint.ps1', 'Lint Vault'));
        this.addRibbonIcon('file-plus', 'Quick Capture',    () => this.quickCapture());

        this.addCommand({ id: 'open-dashboard',   name: 'Open Dashboard',   callback: () => this.activateDashboardView() });
        this.addCommand({ id: 'morning-briefing', name: 'Morning Briefing', callback: () => this.runScript('morning-briefing.ps1', 'Morning Briefing') });
        this.addCommand({ id: 'compile-vault',    name: 'Compile Vault',    callback: () => this.runScript('compile.ps1', 'Compile Vault') });
        this.addCommand({ id: 'lint-vault',       name: 'Lint Vault',       callback: () => this.runScript('lint.ps1', 'Lint Vault') });
        this.addCommand({ id: 'quick-capture',    name: 'Quick Capture',    callback: () => this.quickCapture() });

        console.log('Command Center loaded');
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(DASHBOARD_VIEW_TYPE);
        console.log('Command Center unloaded');
    }

    async activateDashboardView() {
        const { workspace } = this.app;
        let leaf = workspace.getLeavesOfType(DASHBOARD_VIEW_TYPE)[0];
        if (!leaf) {
            leaf = workspace.getLeaf('tab');
            await leaf.setViewState({ type: DASHBOARD_VIEW_TYPE, active: true });
        }
        workspace.revealLeaf(leaf);
    }

    runScript(scriptName, label, onComplete) {
        const { exec } = require('child_process');
        const basePath   = this.app.vault.adapter.basePath;
        const scriptPath = `${basePath}\\scripts\\${scriptName}`;
        new obsidian.Notice(`⏳ ${label} 執行中...`);
        exec(`pwsh.exe -ExecutionPolicy Bypass -File "${scriptPath}"`,
            { cwd: basePath },
            (err) => {
                if (err) {
                    new obsidian.Notice(`❌ ${label} 失敗\n${err.message.slice(0, 80)}`);
                    console.error(`[CC] ${label}:`, err.message);
                } else {
                    new obsidian.Notice(`✅ ${label} 完成`);
                    if (onComplete) onComplete();
                }
            });
    }

    runScriptWithArg(scriptName, arg, label, onComplete) {
        const { exec } = require('child_process');
        const basePath   = this.app.vault.adapter.basePath;
        const scriptPath = `${basePath}\\scripts\\${scriptName}`;
        const safeArg    = arg.replace(/"/g, '\\"');
        new obsidian.Notice(`⏳ ${label}...`);
        exec(`pwsh.exe -ExecutionPolicy Bypass -File "${scriptPath}" "${safeArg}"`,
            { cwd: basePath, timeout: 300000 },
            (err) => {
                if (err) new obsidian.Notice(`❌ ${label} 失敗`);
                else {
                    new obsidian.Notice(`✅ ${label} 完成`);
                    if (onComplete) onComplete();
                }
            });
    }

    async quickCapture() {
        const now  = new Date();
        const date = now.toISOString().slice(0, 10);
        const hh   = String(now.getHours()).padStart(2, '0');
        const mm   = String(now.getMinutes()).padStart(2, '0');
        const notePath = `Inbox/capture_${date}_${hh}${mm}.md`;
        const content  = `---\ndate: ${date}\ntags:\n  - inbox\n  - capture\n---\n\n`;
        try {
            const existing = this.app.vault.getAbstractFileByPath(notePath);
            if (existing) {
                await this.app.workspace.openLinkText(notePath, '', true);
            } else {
                const file = await this.app.vault.create(notePath, content);
                await this.app.workspace.openLinkText(file.path, '', true);
            }
            new obsidian.Notice('✏️ Quick Capture 已開啟');
        } catch (e) {
            new obsidian.Notice(`❌ Quick Capture 失敗: ${e.message}`);
        }
    }
}

Object.defineProperty(exports, '__esModule', { value: true });
exports['default'] = CommandCenter;
