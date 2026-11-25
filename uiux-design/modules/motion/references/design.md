# Motion decision framework
## Intent and visual grammar
For every transition identify what changed, why, where it came from, where it goes, how the user initiated it, and what matters next. Motion may communicate causality, hierarchy, object identity, progress, feedback or spatial navigation. If none apply, prefer no motion.
- Minimal / Productivity: low displacement and short feedback; frequent actions must stay fast.
- Native: platform navigation, focus and gesture conventions.
- Fluid: preserve object identity and geometry; shared elements and reversible layouts.
- Expressive / Cinematic: stronger orchestration for infrequent brand moments; allow skip and reduced motion.
- Adaptive: choose per context while sharing semantics, timing rhythm and geometry vocabulary.
## Timing and physics
Start from distance, perceived speed, frequency and target size. Typical starting ranges: press 60–120ms, hover 100–180ms, small state 150–250ms, overlays 180–300ms, navigation 250–400ms, complex transformations 300–600ms. Not rules. Entrances typically decelerate; exits can accelerate. Linear is appropriate for steady progress. Avoid exaggerated overshoot for text or frequent controls. A spring obeys m*x'' + c*x' + k*(x-target)=0; damping ratio c/(2*sqrt(k*m)) guides overshoot; convert units per engine. Preserve current velocity when feasible, not only position.
## Spatial continuity
Map source and target geometry, identity, clipping, z-order, content reflow and focus. FLIP: first/last layout, invert transform then play to identity. Avoid animating layout repeatedly when a compositor transform suffices. Shared-element navigation requires stable identity, fallback if source disappears, responsive resizing and reduced-motion handling.
## Choreography
Establish primary focal object, immediate input acknowledgment, overlapping secondary transitions, and completion. Keep stagger bounded for long lists; don't delay keyboard accessibility. Distinct transitions should share a clock or state dependency when required. Handle interrupted orchestration from current values, cancel outdated callbacks and clean up unmounted elements.
## State and inputs
Separate logical state from rendered progress. Specify idle/entering/active/exiting/interrupted/failed where appropriate, plus event, guard, next state, cleanup. Test open-close-open, repeated press, cancellation, resize, scroll, data arriving out of order and unmount. Use request IDs or abort signals for stale async responses. Preserve focus/selection and meaningful feedback. Touch needs direct manipulation and no hover-only content; keyboard needs focus and activation; pointer movement must not be required. Never animate hidden focus targets into inaccessible states.
## Creative process
Study a reference's cause and effect, not its brand assets. Sketch spatial and temporal alternatives, vary geometry and choreography, prototype, compare with existing/no motion. Favor unexpected useful details (icon state morph, contextual origin, progress continuity) over arbitrary effects.

