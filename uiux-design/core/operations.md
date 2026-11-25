# Shared operations
## Design system
Inherit existing tokens first. Core accessibility/function constraints and explicit user locks outrank local overrides; then state/component/page/project/user/skill defaults. Visual tokens: typography, spacing, grid, geometry, semantic colors, contrast, border, material, elevation, icon and data roles. Motion tokens: duration, easing, physics, distance, choreography, reduced-motion alternatives. Use semantic tokens and deliberate exceptions, no needless abstraction. Preserve existing project theme.
## Task persistence
Use .uiux/registry.json, design-system.json, config.json and task-state.json. Store decisions, baseline revision, owned files, locks, evidence paths, blockers, next action. Large captures and private data stay local. Resume after comparing current revision/dirty paths; do not assume cached evidence is valid. Use local lock and revision checks for cooperating CLI writers; external changes need separate coordination.
## Permission
Low: spacing, local timing, minor presentation changes preserving identity. Medium: local layout, visual encoding or behavior changes with rationale. High: brand, major information structure or core workflow; confirm first. Do not bypass explicit manual review. Only revert your own changes; never destructive reset or overwrite other agents.
## Knowledge
Maintain versioned core principles, project-local experience, explicit user preferences, opt-in sanitized shared patterns. A candidate records context/problem, principle, source/license, evidence, limits, status and revision. Promote after verification, not from a single untested assumption. Do not export private screenshots, code, credentials or identifying data.
## Resource and delivery
Budget by importance, severity, frequency and benefit. Quick: major issues; Balanced: common flows; Deep: all discovered entities and contexts; Extreme: deeper exploration. Save checkpoints each batch; stop when diminishing returns or budget exhausted, record remaining. Small delivery: changes, rationale, tests and limitations. Large: baseline, coverage, registry, alternatives, before/after, gate results, rollback/handoff. Actual measurements only.


## V1.2 context and handoff
Complex work may store .uiux/tasks/<task-id>/context.json, design-contract.json, checkpoint and deviation notes alongside existing registry. Do not rewrite older .uiux files just to add context. Keep stage, intent, scope, selected profiles, authority and baseline explicit. Use read-only context CLI to check metadata; agent records actual project evidence. Small tasks may use a brief note; do not require all artifacts for every change.
