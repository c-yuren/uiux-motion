# Unified acceptance
Prior Motion Q1–Q20 remain required; see acceptance.md. New scope adds visual, information, interaction, creativity and templates. Canonical skill is uiux-design, no mandatory MCP. 
| Scenario | Required evidence |
|---|---|
| Install single skill and route motion-only | Host loads bundled motion files; no sibling dependency |
| Visual redesign and ambient effects | Render at narrow/wide, theme/contrast, reduced-motion and pause tests |
| Information creative encoding | Verify source values and boundary cases, labels, accessible alternatives |
| Full review | Distinct entities/checks, missing opportunities, manual approval, coverage limits |
| Incremental and migration | Revision checks, stale evidence, exact grouping, preserved legacy files and locks |
| Template intelligence | Local catalog, independent editable assets, external provenance/license checks, original alternative |
| Cross-agent handoff | Second host reads registry and decisions, detects conflicts, continues remaining items |
| Print/report extension | Actual rendered output and fidelity |
| Performance/regression | Actual browser or native target tests, not only static review |
Run Node tests from repository root: node --test uiux-design/tests/*.test.mjs uiux-design/modules/motion/tests/*.test.mjs
Initial implementation: core pure logic checked in a JS isolate; Node integration tests, real GUI render/animation and host-specific end-to-end acceptance must be run separately. Browser adapter is discovery only, not an autonomous full audit. No remote provider integration is required or automatically installed.

## V1.2 additions
Verify independent mixed product/platform profiles; local adjustment minimal change; existing-design baseline and no scope expansion; design-only/read-only no product writes; produce-only respects design; approval of high-impact change; full product refine loads audit and all relevant dimensions; contract handoff and deviation; context-filtered template search. 22 pure JavaScript assertions exercised in an isolate during implementation; Node filesystem CLI and real agent/GUI acceptance not run here. Run node --test uiux-design/tests/*.test.mjs uiux-design/modules/motion/tests/*.test.mjs locally.
