# Specification

## Summary
**Goal:** Rebrand the app with an original battle game identity (no “Free Fire” references) and deliver a simple, mobile-friendly single-player battle royale style 2D game loop, plus updated PWA/Play Store metadata and docs for Google Play readiness.

**Planned changes:**
- Replace all “Free Fire” / “Free Fire India” mentions with an original game name and consistent English-only user-facing text across UI, metadata, and docs.
- Update PWA identity metadata (manifest.webmanifest and index.html) to use the new app name, slug/id, descriptions, colors (if needed), and correct icon references.
- Implement a simple single-player “battle royale style” 2D game loop with touch-first controls (portrait/landscape), non-graphic combat, HUD (health + score/kills), enemy/bot spawning, and Start/Pause/Game Over/Win flows.
- Replace construction-themed gameplay visuals by wiring new, original battle-game art assets from frontend/public/assets/generated (no backend-served images).
- Update frontend/docs/PLAY_STORE_PUBLISHING.md with the new app name/identifier and the required Play Store listing assets (icon, feature graphic, screenshots) using the new filenames.

**User-visible outcome:** Users can install/open the app as a PWA with the new original branding and play a complete single-player battle game on mobile (touch controls, HUD, win/lose, restart), and the project includes updated Play Store publishing documentation and listing assets for release preparation.
