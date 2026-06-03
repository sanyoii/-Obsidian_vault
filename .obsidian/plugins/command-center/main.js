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

    renderSchedule(schedule) {
        if (!schedule || schedule.length === 0) {
            return '<div class="cc-empty">無行程，或請先執行「更新資料」</div>';
        }
        return schedule.map(ev =>
            `<div class="cc-event">
                <span class="cc-event-time">${ev.time || ''}</span>
                <span class="cc-event-title">${ev.title || ''}</span>
            </div>`
        ).join('');
    }

    render() {
        const data  = this.loadData();
        const today = new Date().toLocaleDateString('zh-TW', {
            year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
        });

        const container = this.containerEl.children[1];
        container.empty();
        container.addClass('cc-dashboard-container');

        container.innerHTML = `
<div class="cc-dashboard">

  <div class="cc-header">
    <div class="cc-title">COMMAND CENTER</div>
    <div class="cc-subtitle">${today} · ${this.plugin.app.vault.getName()}</div>
    <div class="cc-updated">${data?.updatedAt ? 'updated ' + data.updatedAt : '尚未更新'}</div>
  </div>

  <div class="cc-metrics">
    <div class="cc-metric">
      <div class="cc-metric-label">新職缺</div>
      <div class="cc-metric-value cc-accent">${data?.jobCount ?? '—'}</div>
    </div>
    <div class="cc-metric">
      <div class="cc-metric-label">社群海巡</div>
      <div class="cc-metric-value cc-small">${data?.socialLabel || '—'}</div>
    </div>
    <div class="cc-metric cc-metric-wide">
      <div class="cc-metric-label">今日早報</div>
      <div class="cc-metric-value cc-small">${data?.briefingTitle || '尚未產生'}</div>
    </div>
  </div>

  <div class="cc-actions">
    <button class="cc-btn" id="cc-morning">☀️ 早報</button>
    <button class="cc-btn" id="cc-compile">📚 Compile</button>
    <button class="cc-btn" id="cc-lint">🔍 Lint</button>
    <button class="cc-btn" id="cc-capture">✏️ 捕捉</button>
    <button class="cc-btn cc-btn-wide" id="cc-refresh">🔄 更新資料</button>
  </div>

  <div class="cc-section">
    <div class="cc-section-title">今日行程</div>
    ${this.renderSchedule(data?.schedule)}
  </div>

</div>`;

        container.querySelector('#cc-morning').addEventListener('click', () => {
            this.plugin.runScript('morning-briefing.ps1', 'Morning Briefing');
        });
        container.querySelector('#cc-compile').addEventListener('click', () => {
            this.plugin.runScript('compile.ps1', 'Compile Vault');
        });
        container.querySelector('#cc-lint').addEventListener('click', () => {
            this.plugin.runScript('lint.ps1', 'Lint Vault');
        });
        container.querySelector('#cc-capture').addEventListener('click', () => {
            this.plugin.quickCapture();
        });
        container.querySelector('#cc-refresh').addEventListener('click', () => {
            this.plugin.runScript('fetch-dashboard-data.ps1', 'Refresh Data');
            setTimeout(() => this.render(), 4000);
        });
    }
}

// ─── Main Plugin ─────────────────────────────────────────────────────────────

class CommandCenter extends obsidian.Plugin {
    onload() {
        this.registerView(DASHBOARD_VIEW_TYPE, (leaf) => new DashboardView(leaf, this));

        this.addRibbonIcon('layout-dashboard', 'Open Dashboard', () => {
            this.activateDashboardView();
        });
        this.addRibbonIcon('sun', 'Morning Briefing', () => {
            this.runScript('morning-briefing.ps1', 'Morning Briefing');
        });
        this.addRibbonIcon('book-open', 'Compile Vault', () => {
            this.runScript('compile.ps1', 'Compile Vault');
        });
        this.addRibbonIcon('search', 'Lint Vault', () => {
            this.runScript('lint.ps1', 'Lint Vault');
        });
        this.addRibbonIcon('file-plus', 'Quick Capture', () => {
            this.quickCapture();
        });

        this.addCommand({ id: 'open-dashboard',    name: 'Open Dashboard',    callback: () => this.activateDashboardView() });
        this.addCommand({ id: 'morning-briefing',  name: 'Morning Briefing',  callback: () => this.runScript('morning-briefing.ps1', 'Morning Briefing') });
        this.addCommand({ id: 'compile-vault',     name: 'Compile Vault',     callback: () => this.runScript('compile.ps1', 'Compile Vault') });
        this.addCommand({ id: 'lint-vault',        name: 'Lint Vault',        callback: () => this.runScript('lint.ps1', 'Lint Vault') });
        this.addCommand({ id: 'quick-capture',     name: 'Quick Capture',     callback: () => this.quickCapture() });

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
            const rightLeaf = workspace.getRightLeaf(false);
            await rightLeaf.setViewState({ type: DASHBOARD_VIEW_TYPE, active: true });
            leaf = workspace.getLeavesOfType(DASHBOARD_VIEW_TYPE)[0];
        }
        workspace.revealLeaf(leaf);
    }

    runScript(scriptName, label) {
        const { exec } = require('child_process');
        const basePath  = this.app.vault.adapter.basePath;
        const scriptPath = `${basePath}\\scripts\\${scriptName}`;

        new obsidian.Notice(`⏳ ${label} 執行中...`);

        exec(
            `pwsh.exe -ExecutionPolicy Bypass -File "${scriptPath}"`,
            { cwd: basePath },
            (err, stdout, stderr) => {
                if (err) {
                    new obsidian.Notice(`❌ ${label} 失敗\n${err.message.slice(0, 100)}`);
                    console.error(`[Command Center] ${label} error:`, err.message);
                } else {
                    new obsidian.Notice(`✅ ${label} 完成`);
                    console.log(`[Command Center] ${label} done`);
                }
            }
        );
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
