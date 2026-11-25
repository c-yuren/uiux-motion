# Global install / host integration
Verified documentation references (November 2026; installed versions may differ). Copy the entire uiux-design directory into a supported user skill location, not just SKILL.md. On Windows ~ means the user's home directory. Prefer native discovery; optionally add the short rule below in the host's supported user instructions. Do not write multiple copies if host sees shared/compatibility paths.
| Host | Suggested user location | Native docs |
|---|---|---|
| Claude Code | ~/.claude/skills/uiux-design/ | https://code.claude.com/docs/en/skills |
| Codex | ~/.agents/skills/uiux-design/ | https://learn.chatgpt.com/docs/build-skills |
| Cursor | ~/.agents/skills/uiux-design/ or ~/.cursor/skills/uiux-design/ | https://cursor.com/docs/skills |
| Antigravity | ~/.gemini/config/skills/uiux-design/ | https://antigravity.google/docs/skills |
Cursor discovers several compatible locations, so choose one and check for duplicates. Antigravity legacy paths may be supported depending on client/version; consult native docs. Use user rules or user instructions only if native discovery is insufficient: Claude Code user CLAUDE.md, Codex user AGENTS.md, Cursor User Rules, Antigravity global rules via its supported settings. Do not overwrite existing rules. Avoid hardcoding absolute paths inside skill.
## Optional lightweight trigger rule
When a task affects user-facing UI, visual presentation, information design, animation or interaction, consider uiux-design. Activate only relevant modules and profiles at a proportional level. Pure non-UI tasks do not need it. Preserve project scope, existing design and explicit authorization. Do not load unrelated modules or repeat an already active workflow.
## Smoke check per host
Confirm skill visible and version correct; request a non-UI task (no skill), a local UI change (targeted), an existing full audit (comprehensive read-only), and explicit design-only preview. Observe actual host invocation, loaded paths and scope; report results and limitations. Verify same-name duplicate behavior before removing old copy. No claims of tested host behavior just from installation instructions. Use project-level install instead for pinned team versions or host restrictions; do not mix versions.