# Optional tooling
Run with Node.js 18+ from your target project (substitute actual installed skill path):
```sh
node /path/to/uiux-motion/scripts/motion.mjs init
node /path/to/uiux-motion/scripts/motion.mjs scan
node /path/to/uiux-motion/scripts/motion.mjs list
node /path/to/uiux-motion/scripts/motion.mjs add interaction.json
node /path/to/uiux-motion/scripts/motion.mjs patch ID EXPECTED_REVISION patch.json
node /path/to/uiux-motion/scripts/motion.mjs invalidate changed-paths.json
node /path/to/uiux-motion/scripts/motion.mjs report
```
scan provides conservative static candidates, not verified inventory; review and import with add. add/patch operate on project .motion/registry.json, patch requires current registry revision (shown by list); use exact paths relative to project. Unknown dependency coverage requires broader review. init never replaces existing files. report lists readiness based on recorded gates, not actual measured quality. No external dependencies for CLI.
Browser: use native host browser or optional browser.mjs; requires target project's Playwright installation. Run with explicit local test URL and output file. The tool discovers visible DOM candidates and current animation declarations, captures initial screenshot and samples rAF; it does NOT execute actions or certify visual quality. For per-interaction evidence write explicit safe Playwright scenarios, compare recordings/screenshots and traces, and mark only observed gates. Never run on real destructive workflows. Open assets/playground.html locally to tune a reversible panel and reduced-motion preview; export parameters and map to project tokens after confirmation. It is an example, not an automatic arbitrary component editor.

