# Quality gates
## Rubric
Default weights: naturalness 20, usability 20, state reliability 15, spatial continuity 10, consistency 10, creativity 10, performance 10, accessibility 5. Use qualitative anchored observations (poor/adequate/strong) with evidence. Never invent numbers or use score to offset mandatory failures.
Functional: correct and clear. Refined: consistent, natural, complete. Premium (default goal): excellent task fit, detail, interruption and continuity with actual verification. Signature: distinctive but usable brand moment. High-frequency controls may intentionally be Refined.
## Mandatory gates
Functional logic; responsiveness/no unnecessary input blocking; rapid reversal/cancel; visual continuity; performance against target/baseline; accessibility (focus, keyboard, reduced motion, semantic state); regression and protected design. Every gate must pass or have a justified non-applicable disposition. A failed/unknown applicable gate prevents verified status. Record failure and evidence.
## Evidence
V0 none; V1 static; V2 functional automation; V3 actual visual frames/recording; V4 functional+visual+performance+regression; V5 cross-device or human evaluation on top of relevant evidence. Labels are evidence depth, not a score. Screenshots of only the final state are not animation verification. Record command, environment, viewport/input, revision, measured results, path and limitations. Use real input and rAF/trace/engine profiler; rAF cadence is not GPU paint proof. Compare repeated samples to baseline. 60Hz ~16.7ms, 120Hz ~8.3ms per refresh; use target-specific budgets, no invented fps.
## Accessibility
Honor prefers-reduced-motion / platform setting independently of speed tiers; minimize nonessential movement and parallax; preserve state cues and focus. Provide controls for persistent animation, avoid flashing, avoid motion-only communication. Validate keyboard, touch and screen reader semantics. See https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html and https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html. Check applicable requirements, not just this checklist.
## Regression / stop
Reproduce, isolate, compare, fix and retest. If budget runs out, leave status failed/blocked and record remaining steps. Roll back only your own changes, preserving unrelated user work. No automatic destructive git reset.

