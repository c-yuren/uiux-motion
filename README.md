# UIUX Motion

A cross-agent skill for motion design, interaction auditing, and iterative refinement.

## Install
Clone this repository and copy the `uiux-motion/` folder (the folder containing SKILL.md) into your agent's supported skill directory. For agents without skill discovery, ask it to read that SKILL.md explicitly. No mandatory MCP. Optional tooling uses Node.js 18+; browser tools require Playwright and an installed browser in the target project.

## Usage
- "Use uiux-motion to design the interactions for this new interface."
- "Audit and refine every interaction in this app, including missing animation opportunities."
- "Review each existing animation with me before changing it."
- "Resume the previous agent's motion refinement."

See [SKILL.md](uiux-motion/SKILL.md), [workflow](uiux-motion/references/workflows.md), [CLI guide](uiux-motion/references/tooling.md), and [acceptance matrix](docs/acceptance.md).

The target project's .motion folder stores local decisions and evidence. Do not commit sensitive captures or secrets. This is an initial implementation: platform guidance is provided for multiple frameworks, but GUI execution and visual judgment depend on available host tools. No automatic assertion of Premium quality.

## 中文
這個 Skill 以新介面動態設計、既有介面逐項審核與優化、設計智慧三大能力為核心。支援全量與增量審核、人工逐項確認、可操作原型、跨 Agent 接續、效能及無障礙驗證。工具不足時必須標記未驗證項目，不得假裝通過。
