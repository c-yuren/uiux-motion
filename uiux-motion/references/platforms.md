# Platform and technology selection
Reuse project dependencies; prefer native primitives, then justified libraries. Verify installed versions and official docs before implementing. The following are design/engineering guidance, not a claim of tested adapters.
| Platform | Approach |
|---|---|
| Web | CSS transitions/keyframes; WAAPI for programmatic interruption; View Transitions with feature detection; transform/opacity where appropriate; prefers-reduced-motion |
| React | Stable keys and logical state; CSS/WAAPI, existing Motion or GSAP; cleanup effects and avoid stale callbacks |
| Vue | Transition/TransitionGroup, stable keys, cancellation hooks; respect reduced motion |
| Svelte | transitions, motion/spring as supported by installed version; cleanup and state ownership |
| Electron/Tauri | Web techniques; profile on actual desktop runtime, OS preferences and window resize |
| SwiftUI / macOS | Native transitions, matched geometry where supported, transaction/animation scoping, accessibilityReduceMotion |
| Android Compose | animate*AsState, transition/Animatable for interruptible interactions, semantics and system animation preferences |
| Flutter | Implicit animations or AnimationController, dispose controllers, accessibility settings and semantics |
| WinUI/WPF | Platform animation/composition or Storyboard, respect OS animation settings, UI thread budget |
| Rive / Lottie | State machine for interactive vector motion vs authored playback; fallback and pause offscreen |
| Canvas / WebGL / WebGPU | Only for justified rendering needs; resource cleanup, reduced motion and fallback |
## Adaptive strategy
Use semantic motion tokens and platform adapters; per-input interaction variants (hover vs touch vs keyboard) and responsive geometry. Device quality tiers Ultra/High/Balanced/Lite progressively reduce blur, particles, layers and nonessential motion; use measured sustained degradation with hysteresis rather than identifying a user by device. Reduced motion always wins. High refresh does not imply faster duration.
## Research starting points
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://m3.material.io/styles/motion/overview
- https://fluent2.microsoft.design/
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- https://motion.dev/
- https://gsap.com/docs/v3/
- https://rive.app/docs/
Reference Linear/Raycast/Framer through legitimate public demos; document source, design insight, applicability and caveats. Do not copy proprietary assets or treat inspiration as a technical requirement.

