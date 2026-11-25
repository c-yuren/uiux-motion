# Workflows
## Routing
| Mode | Workflow |
|---|---|
| auto | Infer scope and dispatch; ask only for consequential ambiguity |
| design | Map user goals and state transitions; set motion language; implement and verify |
| enhance | Baseline targeted component; compare and refine; test affected callers |
| audit | Discover and disposition each interaction; report only; may write .motion if authorized |
| refine | Full or incremental audit then implement authorized changes and validate |
| repair | Reproduce defect; isolate state/timing cause; minimal fix; regression |
| system | Discover existing tokens; unify without breaking approved variants |
| explore | Compare alternatives, including no motion; no product changes by default |
| preview | Build isolated interactive prototype and parameter controls |
| validate | Execute quality gates; record actual evidence |
| learn | Curate sanitized candidate patterns; promote only with evidence |
| resume | Load checkpoint, compare revision and dirty paths; continue remaining items |
## New design
Map task intent, route hierarchy, information architecture and input types. Identify essential feedback vs optional flourish. Define entering/exiting/interruption behavior, geometry, timing and focus. Choose alternatives and explicit fallback. Implement, exercise realistic user paths, validate and document.
## Refinement
Use audit.md. Full mode enumerates all reachable routes/variants and interactions; incremental mode maps changed files/tokens/dependencies to inventory, revisits invalidated tests and discovers added interactions. Shared components can be fixed once but their distinct contexts need checks.
## Explore and preview
Low importance: choose a justified baseline. Medium: typically 2–3 alternatives. High: 3–5; brand signature: deeper as budget allows. Evaluate baseline and no motion; compare working prototypes if capable. Use an isolated local demo, not production UI. Expose duration/easing/geometry/physics only when meaningful; allow export and reset. Apply chosen variant only within modification authority.
## Resource management
Quick: prioritize obvious defects; Balanced: main flows and alternatives; Deep: full inventory and verification; Extreme: more prototypes and polish. Set budgets for candidates, iterations, files and tool calls; default 2 repair iterations per issue before reassessment. Save after each batch; prioritize severity then frequency then improvement value. Stop on diminishing returns or budget; do not conceal remaining tasks. Only use known model quota information.
## Delivery
Small: changed paths, rationale, actual tests, limitations. Full: inventory and coverage boundaries, baseline/current versions, decision log, comparison captures/prototypes, quality and performance results, regressions, unresolved issues and handoff. Complete only if all required items in declared scope are dispositioned and verified, no blockers, and coverage limitations are explicitly acknowledged.

