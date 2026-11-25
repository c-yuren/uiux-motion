# Pattern catalog
| Pattern | Use | Implementation and tests |
|---|---|---|
| Press / hover | Immediate feedback | Small color/opacity/scale change, no layout shift; focus-visible, touch fallback |
| Toggle | Binary state | Thumb moves from current position, visible label and semantic checked state; rapid reverse |
| Tooltip | Context help | Anchor and short delay; keyboard focus, Escape, no hover-only information |
| Popover / menu | Contextual actions | Anchor origin, short enter/exit, avoid blocking selection, restore focus |
| Drawer | Hierarchy / secondary controls | Slide or transform from edge, content coordinated; interruption, resize, focus |
| Dialog | Focused task | Overlay and container transitions; functional focus trap, Escape, return focus; destructive action simulated |
| Shared element | Detail from card | Stable ID, rect mapping, clip radius; missing source fallback, back navigation |
| FLIP list | Reorder or filter | Stable keys, first/last bounds, transform inversion; preserve scroll and focus |
| Drag / swipe | Direct manipulation | Pointer capture, local coordinate mapping, preview, settle spring; cancel and keyboard alternative |
| Resize | Direct manipulation | Track actual pointer, avoid expensive sync layout; min/max, release and cancel |
| Progress | Long-running task | Honest determinate vs indeterminate state; no fabricated progress; reduced-motion static label |
| Skeleton | Loading | Match final layout; don't loop unnecessarily; avoid flashing and layout shift |
| Error / success | Outcome | Text and icon plus restrained emphasis; rollback, retry, screen reader status |
| Data change | Values and charts | Retarget from current value; don't delay actual accessible value or distort scale |
| Theme transition | Global appearance | Preserve contrast at intermediate frames, respect reduced motion |
| Material / particles | Optional atmosphere | Profile rendering; pause offscreen; degrade before losing core feedback |
## Example: reversible drawer
Logical open toggles immediately. A CSS transform transition retargets from current computed transform when toggled quickly. Use inert/hidden semantics only as appropriate to actual interactivity; restore focus on close. For spring engines, preserve velocity if supported. Test opening, closing, interrupted close/open, viewport resize, focus, reduced motion, cleanup.
## Example: async save
Idle → pending → success/error; stale responses ignored via request ID. Show immediate pending state; avoid fake completion, repeated requests or indefinite decorative motion. Error retains input and provides retry. Success announces status without stealing focus. Test offline, late result, cancel and rapid changes.

