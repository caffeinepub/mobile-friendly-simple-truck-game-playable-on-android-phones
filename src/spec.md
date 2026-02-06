# Specification

## Summary
**Goal:** Add clear guidance and supporting assets for publishing the truck game (web/PWA) to the Google Play Store.

**Planned changes:**
- Add a new Start screen help section titled “Publish on Google Play” (English) that explains the difference between installing as a PWA in the browser and publishing to the Play Store, and lists high-level steps (TWA wrapper, AAB generation, Play Console upload).
- Add repo documentation (e.g., `docs/PLAY_STORE_PUBLISHING.md`) with a practical step-by-step checklist for Play Store publishing, required listing assets and where to place them, app identifier/domain naming guidance, and troubleshooting.
- Verify/add required PWA metadata for packaging: ensure the manifest is present and linked in `frontend/index.html`, includes key fields (name/short_name/start_url/display/theme/background colors), and includes required icon sizes (192x192, 512x512).

**User-visible outcome:** On the Start screen, players can read how to install via PWA vs what it takes to publish to Google Play, and the repo includes a clear publishing checklist with the necessary PWA manifest/icon setup for Android packaging.
