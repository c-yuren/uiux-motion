# Exhaustive interaction audit
## Discover
Combine routes, component tree, event handlers, DOM/accessibility tree, animation declarations, existing tests and actual navigation. Inventory click, hover, focus, keyboard, drag, scroll, swipe, resize, selection, menus, overlays, loading, empty, error, success, cancellation, theme, responsive states and transitions. Include missing motion opportunities. Record unreachable routes, required roles, data and platform limits; discovery is not proof of exhaustive coverage. Use safe fixtures for destructive actions; never click unknown controls automatically.
## Stable identity and context
Each item identifies route/feature, component, trigger, from/to state and distinct context. Prefer stable semantic IDs over DOM order. Record source paths, dependencies, device/input, baseline version, importance, protection, observations and evidence. Reuse component findings but verify distinct contexts.
## Per-item cycle
Observe baseline → analyze semantic purpose and failures → compare alternatives → decide keep/refine/add/replace/simplify/repair/remove → request approval if needed → implement → validate → record. Even keep/remove needs appropriate validation. Manual mode: show baseline, proposed behavior, alternatives and tradeoffs; wait for approval per item or explicit batch. Do not silently interpret approval for one as approval for others.
## Incremental
Compare revision and changed paths; invalidate items touching source or dependencies, global tokens, routes and shared components. When dependency coverage is uncertain, broaden the scope. Mark evidence stale, discover new items and revalidate. Never silently delete removed items; record disposition or archive explicitly.
## Coverage
Report discovered count, reviewed count, verified count, pending, failed, blocked, skipped, stale and unknown scope. Track review coverage separately from verification. Complete only if every required item passes and no undiscovered known scope remains. Do not treat inaccessible routes as passed.

