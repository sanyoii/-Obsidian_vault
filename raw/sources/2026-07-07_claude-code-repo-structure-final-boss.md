<!-- processed: 2026-07-07 -->
<!-- 來源：未提供作者/連結，使用者貼原文（英日混合，提及「buzzing in Fable」） -->
<!-- 取得方式：使用者貼原文；解讀為 wiki/Claude/2026-claude-code-repo-structure-final-boss.md -->

It's buzzing in Fable, but I think the essence boils down to this.

On the other hand, the top 1% of people who have mastered Claude Code have noticed something far more important.

The bottleneck isn't the model—it's the repository structure.

Same model.
Same prompt.

And yet, some people turn it into a "chatbot," while others become "autonomous development engineers."

The difference? Folder structure.

I call this the "Final Boss Setup."

━━━━━━━━━━━━━━━

① Context Ladder (This is what changes everything)

It's not about "what to write in CLAUDE.md,"

but designing "when it gets loaded" that's crucial.

There are four layers.

・Loaded every session → CLAUDE.md (keep it small)
・Loaded based on path → rules/*.md (only when touching the target file)
・Loaded only when called → skills/*
・Completely independent context → agents / workflows

Most people cram everything into the first layer (CLAUDE.md).

And the bigger the project gets, the more they feel like Claude is getting dumber.

What you're writing isn't documentation.

You're designing the "AI's memory hierarchy."

━━━━━━━━━━━━━━━

② ASKED and FORCED (The line that separates beginners from experts)

CLAUDE.md and rules are ASKED.

Instructions that Claude reads and "tries to follow as much as possible."

On the other hand,

Hooks and Settings are FORCED.

For example, if you prohibit rm -rf in permissions.deny,
it will absolutely never execute, regardless of Claude's intent.

Let's look at an example.

"Please run the formatter."

This is ASKED.

It gets executed about 90% of the time.

On the other hand,

A PostToolUse Hook that formats every time after editing.

This is FORCED.

It gets executed 100% of the time.

Things that can't rely on 90%

・Secret management
・Migrations
・Production environments

Stuff like this shouldn't be written in Markdown.

Style is Guidance.

Safety is Enforcement.

━━━━━━━━━━━━━━━

③ Routing Rule (This is the one thing to remember)

Repetitive tasks can always be classified into one of the following three.

・Research → Subagent (research in an independent context, return only the results)
・Procedure → Skill (a playbook loaded only when needed)
・Guarantee → Hook (executed every single time)

If you're writing the same workflow in the prompt every time,

you haven't turned it into a Skill yet.

If you're telling it "run the tests" every time,

you haven't turned it into a Hook yet.

If research content is polluting the main context,

you should be using a Subagent.

④ 自動で読み込まれる Rules

意外と使われていないのが、

.claude/rules/ の Path Gating です。

例えば、

frontend/react.md

これは React 関連のコードを触る時だけ読み込まれます。

api-design.md

これは API を編集する時だけ読み込まれます。

つまり、

必要なルールだけが、その場で自動的に適用されます。

まるで、その領域に詳しいシニアエンジニアが、

必要なタイミングだけ隣に立ってくれるような感覚です。

不要なルールにトークンを消費することもありません。

━━━━━━━━━━━━━━━

⑤ 記憶を持つ Agents

2026年のアップデートで、まだあまり使われていない機能があります。

agent-memory/

Claude自身が学習内容を書き込み、

それを Git でコミットできます。

例えば、

デバッグ Agent が先月解決した厄介な Race Condition を記録しておけば、

次回は、その知識を持った状態から作業を始められます。

Claudeが書く。

あなたがコミットする。

チーム全員がその経験を引き継ぐ。

AIの経験が、

バージョン管理されるインフラになります。

━━━━━━━━━━━━━━━

⑥ 危険地帯に置く CLAUDE.md

グローバルの CLAUDE.md だけでは、

認証周りや決済周りなど、

危険な領域特有の注意点までは持てません。

だからこそ、

ディレクトリ単位で

src/api/CLAUDE.md

src/payments/CLAUDE.md

を配置します。

Claudeはそのディレクトリへ入った瞬間だけ、

その注意事項を読み込みます。

危険なタイミングで警告が表示されるため、

4,000トークン前に読まれて忘れられることもありません。

━━━━━━━━━━━━━━━

⑦ 現場で学んだ Golden Rules

・CLAUDE.md は200行以内を目安にする。長くなったら rules/ に分割する。肥大化すると重要な情報が埋もれます。

・npm test、build、lint など実際に使うコマンドを書いておく。Claude自身が検証できるようになります。

・シークレットは必ず ${ENV_VAR} を参照する。.mcp.json に直接書いてはいけません。本当に絶対です。

・.claude/ は Git 管理する。*.local.* は .gitignore に追加する。セットアップは個人設定ではなく、チームのインフラです。

━━━━━━━━━━━━━━━

多くの人が見落としている、本当に重要なことがあります。

プロンプトは、1回の会話を改善します。

構造は、すべての会話を、すべてのチームメンバーに対して、永続的に改善します。

プロンプトは、

AIの知能を「借りる」もの。

構造は、

AIの知能を「所有する」もの。

一度リポジトリを正しく設計すれば、

Claudeはあなたのコードベースを「訪れる」のではなく、

そこに住み始めます。
