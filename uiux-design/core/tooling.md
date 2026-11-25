# Tooling
Node.js 18+ optional CLI, no runtime dependencies. Run inside the target project, substituting the installed absolute skill path:
```sh
node /path/uiux-design/scripts/uiux.mjs init
node /path/uiux-design/scripts/uiux.mjs scan
node /path/uiux-design/scripts/uiux.mjs list
node /path/uiux-design/scripts/uiux.mjs add 0 entity.json
node /path/uiux-design/scripts/uiux.mjs append-check 1 sidebar check.json
node /path/uiux-design/scripts/uiux.mjs patch 2 sidebar toggle patch.json
node /path/uiux-design/scripts/uiux.mjs report
node /path/uiux-design/scripts/uiux.mjs templates information
```
Always read current revision before mutations; examples use sequential illustrative revisions. JSON input for add:
```json
{"id":"sidebar","component":"Sidebar","context":"home","sourceFiles":["src/Sidebar.tsx"],"checks":[{"id":"appearance","dimension":"visual","subject":"layout"},{"id":"toggle","dimension":"motion","subject":"open-close"}]}
```
Patch changes a single check; retain evidence only if still valid. Gate status pass requires a reason and matching evidence paths; verified also requires actual visual evidence and relevant gate dispositions. CLI validates metadata shape, not authenticity. Record actual artifact and environment in evidence descriptions or linked reports.
Use `scope REV limitations.json` with a JSON array of unresolved scope limitations (empty only after documented discovery). Use `invalidate REV changed-paths.json` with changed project-relative paths, or ["*"] for uncertain dependency coverage. Static scan only finds candidates; never infer coverage.
Legacy migration: after init/list, run `migrate REV` once; imports .motion/registry.json grouped by exact component/context, preserves legacy record in each check, marks it stale, preserves original files. No sync. Inspect .motion tokens, config, decisions, locks, evidence and handoff manually before adopting them; never silently replace .uiux defaults or existing state. For old projects needing legacy CLI, use modules/motion/scripts/motion.mjs; do not run it as a synchronized writer.
The optional bundled browser.mjs (modules/motion/scripts/) uses target-project Playwright for initial local DOM/screenshot discovery; host browser or explicit test scenarios are needed for actual responsive and interaction tests. Use actual screenshots/recordings and traces for review. Open assets/templates HTML/SVG locally or the bundled motion playground; create tailored prototypes where needed. No automatic external asset fetching. A lock left by an interrupted process should only be removed after confirming no writer is active.
