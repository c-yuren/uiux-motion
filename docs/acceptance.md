# V1.0 acceptance matrix
Q1–Q20 requirements are reflected in the entry point, workflows, design/patterns, audit, quality, platforms, operations and tooling. Distinguish implemented artifacts from runtime-verified behavior.
| Area | Acceptance scenario | Evidence needed |
|---|---|---|
| Q1–5 | New UI design; adaptive style; identify missing feedback; explore original/no-motion | Agent task trace and working prototype |
| Q6 | Real interaction playback, visual iteration; unavailable tool fallback | Captures/trace and explicit unverified statuses |
| Q7–10 | Inheritance, override, technology choice, reduced motion, interrupt/retarget, multi-element transitions | Token tests and real UI scenarios |
| Q11–13 | Inventory multiple routes, existing/missing effects, manual review, incremental invalidation, failed gate | Registry test and before/after evidence |
| Q14–16 | Sanitized knowledge, agent handoff, optional adapters, budget checkpoint | Two-agent exercise with conflict simulation |
| Q17–18 | Parameter preview, export, input/device variants | Real preview and cross-device checks |
| Q19–20 | Preserve dirty files, rollback only owned changes, regression, honest delivery | Test project and recorded results |
## Runtime status
Initial repository includes CLI, browser discovery adapter, isolated playground, schemas and tests. Run node --test uiux-motion/tests/*.test.mjs. Agent-specific end-to-end tests, visual checks, browser adapter and native-platform tests must be run in suitable environments before claiming full acceptance. No blanket Premium certification.

