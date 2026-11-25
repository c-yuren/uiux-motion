# Product context selection
Use evidence: explicit user request > current task scope > existing design/manifest/routes > observed UI > conventions. Do not infer brand, devices, platform implementation or permissions without evidence. Keep unknown fields unknown, and mark assumptions if useful. Select one primary product and optional secondary roles; select all relevant platforms. Examples: desktop CAD = tool+desktop; mobile banking = tool/commerce+mobile; web IDE = tool+web; product launch page = presentation+web; static generated blog = content+web; quota icon = artifact or dashboard element depending on scope. A single page can combine tool and presentation regions; choose per region when appropriate.
## Product profiles
- [Tool](products/tool.md) — frequent task completion and precision
- [Presentation](products/presentation.md) — narrative and brand; static build can still be animated
- [Dashboard](products/dashboard.md) — data and state monitoring
- [Content](products/content.md) — reading and discovery
- [Commerce](products/commerce.md) — honest comparisons and checkout
- [Artifact](products/artifact.md) — independent graphics/documents/media
## Platform profiles
[Desktop](platforms/desktop.md), [Mobile](platforms/mobile.md), [Web](platforms/web.md), [Tablet](platforms/tablet.md), [Print](platforms/print.md).
Use [usage/input/media](contexts/usage.md) to adapt behavior. Do not combine platform and product into a separate duplicated workflow. Select depth by scope, risk and requested detail. Store structured context for complex tasks in .uiux/tasks/<task-id>/context.json; simple adjustments may remain in the conversation. Use schema and optional context CLI. Project defaults are preferences, not authorizations.
