# UIUX Design

A unified agent skill for visual, information, motion and interaction design, creative exploration, templates and systematic UI/UX refinement.

**This repository retains its original name, uiux-motion.** The canonical installable skill is now `uiux-design/`. The previous motion tooling remains in `uiux-motion/` for compatibility; it is not a second active skill.

## Install / upgrade
Clone or pull this repository and copy **uiux-design/** (the directory containing SKILL.md) into your agent's supported skills directory. Remove or disable the older installed uiux-motion skill only after confirming the new copy works. Do not delete project .motion data. No mandatory MCP. For hosts without skill discovery, explicitly ask the agent to read uiux-design/SKILL.md.

## Usage
- Use uiux-design to redesign the visual presentation of this dashboard.
- Use uiux-design in motion mode to refine all existing interaction animations.
- Use uiux-design to audit the entire application, including missing feedback and visual opportunities.
- Use uiux-design to compare several original approaches and show interactive previews before changing code.

The unified registry lives in the target project's .uiux/ directory. Optional Node.js 18+ CLI: `node /path/to/uiux-design/scripts/uiux.mjs init`, then `migrate` if you have .motion/registry.json, then `report`. Migration is non-destructive and marks old evidence for revalidation. See [architecture](docs/architecture.md), [skill](uiux-design/SKILL.md), [tooling](uiux-design/core/tooling.md), [acceptance](docs/unified-acceptance.md).

## 中文
單一 Skill，六個專業模組，按需載入。Visual 也涵蓋展示型動畫及動態材質；Motion 偏重操作及狀態。支援逐項全量/增量審核、智慧模板、設計系統及跨 Agent 接續。

