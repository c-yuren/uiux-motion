# Routing and progressive loading (V1.2)
Read profiles/context-selection.md for classification; use scripts/context.mjs optionally to validate a structured context and output a deterministic read plan. Natural language inference is done by the host agent, not the CLI. Do not ask for every field. Ask only when ambiguity materially affects scope, permissions or deliverable.

## Independent dimensions
- Product types: tool, presentation, dashboard, content, commerce, artifact; multiple allowed, with a primary by ordering.
- Platforms: desktop, mobile, web, tablet, print; multiple allowed. A mobile web app can select web + mobile. Product purpose is independent of technology.
- Inputs, usage, medium and existing state: actual evidence; unknown is allowed.
- Intent: create, extend, adjust, refine, redesign, repair, audit, explore, validate, migrate, system, learn, resume.
- Stage: auto, design, produce, both; do not conflate these with intent. Design means no production writes; Produce means implement specified design, not unconstrained redesign. Audit/explore/validate/learn are read-only for product code regardless of stage. Resume recovers the previous task authority; never auto-write from a stale checkpoint.
- Domains: visual, motion, information, interaction, creativity, templates; choose by goal. Depth: auto, quick, balanced, deep, extreme. Scope: local, feature, product. Explicit constraints outrank defaults; no mandatory extra stages for trivial work.

## Resolve
Infer from user instruction and actual artifacts/technology. If existing, inherit style, architecture and tokens; identify locks and dirty files. For clear local adjust/repair, Auto may go straight to Produce only if product changes requested; refine/product audit defaults Deep, with registry and baseline. For new design request without implementation authorization, default Design. When the user requests complete implementation, Design + Produce as necessary, not a separate confirmation unless high impact. Do not start over unless Redesign is requested and scoped. Existing create may add a new scoped artifact; prefer Extend when adding to an existing product.
Read the product/platform profile(s), then relevant intent workflow and stage guides. Mixed contexts: prioritize actual task intent and primary product; secondary profiles supply constraints, never average conflicting requirements blindly. Use explicit user constraints and function/accessibility first. Verify conflicts at target viewports and actual devices.
| Task | Lead / additional modules |
|---|---|
| redesign icon/compact status | visual + information + creativity |
| chart/dashboard | information + visual; interaction/motion when applicable |
| ambient display | visual + motion + creativity |
| sidebar transition | motion + interaction; visual if geometry changes |
| form/feedback | interaction + information; motion/visual as needed |
| full UI/UX | shared audit + relevant specialists |
| document/slide/diagram | visual + information; media extension |
| template research | templates + relevant domain + creativity |

## Compatibility
Old natural-language modes visual/motion/information/interaction narrow domains; design/preview map to Design; enhance maps to scoped refine; template maps to exploration or production depending on actual request; system/learn/resume preserved. Audit, repair, refine, validate, explore retain their meanings. Do not silently interpret a specialist request as permission to modify production. Use one task owner, one registry and non-overlapping file ownership across agents. Record limitations when tools unavailable.
