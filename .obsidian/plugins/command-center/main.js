'use strict';

var obsidian = require('obsidian');

const DASHBOARD_VIEW_TYPE = 'command-center-dashboard';

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
        <button class="cc-btn cc-btn-secondary" id="cc-refresh">🔄 更新資料</button>
      </div>
      <div class="cc-metrics-row">
        <div class="cc-inline-metric">
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

        // Action buttons
        container.querySelector('#cc-morning')?.addEventListener('click', () => {
            this.plugin.runScript('morning-briefing.ps1', 'Morning Briefing');
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
            this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh Data');
            setTimeout(() => this.render(), 6000);
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

    runScript(scriptName, label) {
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
