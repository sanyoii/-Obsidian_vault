'use strict';

var obsidian = require('obsidian');

const DASHBOARD_VIEW_TYPE = 'command-center-dashboard';

// ─── Job List Modal ───────────────────────────────────────────────────────────

class JobListModal extends obsidian.Modal {
    constructor(app, jobs) {
        super(app);
        this.jobs = jobs;
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
        });
    }
    onClose() {
        this.contentEl.empty();
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
    <div class="cc-item-title">${r.repo}${r.lang ? ' <span class="cc-tag">'+r.lang+'</span>' : ''}${r.stars && r.stars !== '0' ? ' <span class="cc-badge">★'+Number(r.stars).toLocaleString()+'</span>' : ''}</div>
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
        if (!emails || emails.length === 0)
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

        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('cc-dashboard-container');

        container.innerHTML = `
<div class="cc-dashboard cc-main">

  <div class="cc-header-row">
    <span class="cc-title">COMMAND CENTER</span>
    <span class="cc-date">${today}</span>
    <span class="cc-time">${timeStr}</span>
    <span class="cc-vault">${this.plugin.app.vault.getName()}</span>
    <span class="cc-updated">${data?.updatedAt ? '↻ ' + data.updatedAt : '尚未更新'}</span>
  </div>

  <div class="cc-grid-2x2">

    <div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">GITHUB TRENDING</span>
        <span class="cc-panel-badge">DAILY · 點擊分析</span>
      </div>
      <div class="cc-list" id="cc-github-list">
        ${this.renderGithub(data?.github)}
      </div>
    </div>

    <div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">HACKER NEWS</span>
        <span class="cc-panel-badge">${timeStr} · 點擊開原文</span>
      </div>
      <div class="cc-list" id="cc-hn-list">
        ${this.renderHN(data?.hn)}
      </div>
    </div>

    <div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">PRODUCT HUNT</span>
        <span class="cc-panel-badge">TODAY · 點擊開頁面</span>
      </div>
      <div class="cc-list" id="cc-ph-list">
        ${this.renderPH(data?.ph)}
      </div>
    </div>

    <div class="cc-panel">
      <div class="cc-panel-header">
        <span class="cc-panel-title">LOBSTERS</span>
        <span class="cc-panel-badge">HOTTEST · 點擊開原文</span>
      </div>
      <div class="cc-list" id="cc-lobsters-list">
        ${this.renderLobsters(data?.lobsters)}
      </div>
    </div>

  </div>

  <div class="cc-ithome-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">ITHOME NEWS</span>
      <span class="cc-panel-badge">iThome · 台灣 IT 新聞 · 點擊開原文</span>
    </div>
    <div class="cc-list cc-ithome-list-inner" id="cc-ithome-list">
      ${this.renderiThome(data?.ithome)}
    </div>
  </div>

  <div class="cc-ithome-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">TECHORANGE 科技報橘</span>
      <span class="cc-panel-badge">台灣新創 · AI 趨勢 · 點擊開原文</span>
    </div>
    <div class="cc-list cc-ithome-list-inner" id="cc-techorange-list">
      ${this.renderTechOrange(data?.techorange)}
    </div>
  </div>

  <div class="cc-ithome-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">TECHCRUNCH</span>
      <span class="cc-panel-badge">新創募資 · 全球科技 · 點擊開原文</span>
    </div>
    <div class="cc-list cc-ithome-list-inner" id="cc-techcrunch-list">
      ${this.renderTechCrunch(data?.techcrunch)}
    </div>
  </div>

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
        <div class="cc-schedule-title">今日行程</div>
        ${this.renderSchedule(data?.schedule)}
      </div>
    </div>
  </div>

  <div class="cc-email-panel">
    <div class="cc-panel-header">
      <span class="cc-panel-title">EMAIL BRIEF</span>
      <span class="cc-panel-badge">重要郵件 · 點擊同步</span>
    </div>
    <div class="cc-email-list" id="cc-email-list">
      ${this.renderEmailBrief(data?.emailBrief)}
    </div>
  </div>

</div>`;

        // ── Event listeners ────────────────────────────────────────────────

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
        container.querySelector('#cc-calendar')?.addEventListener('click', () => {
            this.plugin.runScript('fetch-calendar.ps1', 'Sync Calendar', () => {
                this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh', () => this.render());
            });
        });
        container.querySelector('#cc-morning')?.addEventListener('click', () => {
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
                new JobListModal(this.plugin.app, jobs).open();
            } else {
                new obsidian.Notice('目前沒有新職缺');
            }
        });
    }
}

// ─── Main Plugin ─────────────────────────────────────────────────────────────

class CommandCenter extends obsidian.Plugin {
    onload() {
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

    runScriptWithArg(scriptName, arg, label) {
        const { exec } = require('child_process');
        const basePath   = this.app.vault.adapter.basePath;
        const scriptPath = `${basePath}\\scripts\\${scriptName}`;
        const safeArg    = arg.replace(/"/g, '\\"');
        new obsidian.Notice(`⏳ ${label}...`);
        exec(`pwsh.exe -ExecutionPolicy Bypass -File "${scriptPath}" "${safeArg}"`,
            { cwd: basePath, timeout: 300000 },
            (err) => {
                if (err) new obsidian.Notice(`❌ ${label} 失敗`);
                else     new obsidian.Notice(`✅ ${label} 完成 → wiki/Github/repos/`);
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
