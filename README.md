# UIUX Design V1.3.0

A unified agent skill for visual, information, motion and interaction design, creative exploration, templates and systematic UI/UX refinement.

**This repository retains its original name, uiux-motion.** The canonical installable skill is now `uiux-design/`. The previous motion tooling remains in `uiux-motion/` for compatibility; it is not a second active skill.

## Install / upgrade
Clone or pull this repository and copy **uiux-design/** (the directory containing SKILL.md) into your agent's supported skills directory. Remove or disable the older installed uiux-motion skill only after confirming the new copy works. Do not delete project .motion data. No mandatory MCP. For hosts without skill discovery, explicitly ask the agent to read uiux-design/SKILL.md.

## Usage
- Use uiux-design to redesign the visual presentation of this dashboard.
- Use uiux-design in motion mode to refine all existing interaction animations.
- Use uiux-design to audit the entire application, including missing feedback and visual opportunities.
- Use uiux-design to compare several original approaches and show interactive previews before changing code.

The unified registry lives in the target project's .uiux/ directory. Optional Node.js 18+ CLI: `node /path/to/uiux-design/scripts/uiux.mjs init`, then `migrate REV` if you have .motion/registry.json (read the current revision with `list`), then `report`. Migration is non-destructive and marks old evidence for revalidation. See [architecture](docs/architecture.md), [skill](uiux-design/SKILL.md), [tooling](uiux-design/core/tooling.md), [acceptance](docs/unified-acceptance.md).

## 中文
單一 Skill，六個專業模組，按需載入。Visual 也涵蓋展示型動畫及動態材質；Motion 偏重操作及狀態。支援逐項全量/增量審核、智慧模板、設計系統及跨 Agent 接續。


## V1.2 task context
Profiles separate product purpose from platform and medium. Intent distinguishes Create, Extend, Adjust, Refine, Redesign, Repair, Audit, Explore, Validate, Migrate, System, Learn, Resume. Design and Produce are independent stages; a simple local fix need not generate a full contract. Design-only and read-only tasks never authorize product writes. Use context.mjs plan, contract-check and templates for structured routing and handoff metadata. See [V1.2 architecture](docs/v1.2-architecture.md) and [context selection](uiux-design/profiles/context-selection.md). Natural-language classification and actual design remain agent responsibilities.

## Global-first activation
Recommended: user-level skill installation, relevance-based L0–L4 activation, per-project state and optional preference inheritance. See [host install guide](uiux-design/integrations/global-install.md), [activation policy](uiux-design/core/activation.md), and [configuration](uiux-design/core/configuration.md). Do not add the entire skill to always-on instructions. No automatic host configuration or background service; project-level pinning remains supported.

## V1.3 design resources
UI Moments is an optional first-class external reference provider: 884 indexed entries at a pinned source revision (metadata only), offline lexical search, source/license location and explicit bounded network retrieval. [Guide](uiux-design/integrations/providers/ui-moments/guide.md). No mandatory MCP or library installation. Existing V1.2.1 activation and project state are preserved. A host that exposes only SKILL.md can follow the public provider link if authorized, but cannot use local index/scripts without file access.

## License

Original project materials are licensed under the [Apache License, Version 2.0](LICENSE) (SPDX: Apache-2.0). See [NOTICE](NOTICE) for attribution. The independently installable `uiux-design/` directory includes its own copy of these files. Third-party materials retain their respective licenses; see the [UI Moments MIT notice](uiux-design/integrations/providers/ui-moments/LICENSE.ui-moments) and [upstream credits](https://github.com/guanmo-ai/ui-moments/blob/cd49fd207d9333d3c442ffdbf39a9b3b055d358f/CREDITS.md). This license does not relicense referenced third-party assets or code.
