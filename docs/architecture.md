# Architecture decision
Use one installable skill (uiux-design), six specialized modules and one common operations layer. Preserve the repository URL and Git history. A single entry avoids inconsistent triggers and two independent design systems. Progressive disclosure prevents loading irrelevant context. The old directory is a compatibility copy; the canonical motion implementation is bundled in the new skill, so no external path is needed.
## Ownership
Visual owns composition, appearance, typography, material and ambient/display effects. Information owns semantic representation, chart/diagram encoding, icon and data meaning. Motion owns change over time, orchestration, timing and continuity. Interaction owns user intent, affordances, states, input, focus and feedback. Creativity compares alternatives and explores original solutions; Templates supplies optional patterns and assets. These overlap intentionally; determine lead by user goal and share one entity/context registry.
## Data
.uiux/registry.json: stable entity with one or more dimensional checks, each with separate subject, status, decision and evidence. .uiux/design-system.json: semantic visual/motion tokens and constraints. .uiux/task-state.json: resumable progress. .uiux/evidence/: local artifacts. Legacy .motion/ remains intact. Migration groups exact component/context pairs only; uncertain matches require human/agent reconciliation. It never claims old tests verify the new system.
## Runtime
Skill reasoning and host tools supply design work; CLI is a registry and template utility, not an autonomous designer. Browser and native UI execution are optional. Never claim full coverage from a static scanner. No mandatory MCP. Shared templates are local assets or externally researched candidates; no automatic remote code execution. UI/UX is the main scope; document/presentation/print design is an on-demand extension.


## V1.2 extension
See [composable context and production](v1.2-architecture.md). Existing storage remains compatible; task contexts and contracts are optional per-task files. No second Skill.
