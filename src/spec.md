# Specification

## Summary
**Goal:** Prepare the existing 2D game PWA for Google Play Store release readiness by enabling Digital Asset Links verification and documenting a complete Trusted Web Activity (TWA) Bubblewrap packaging flow with troubleshooting.

**Planned changes:**
- Add a static `frontend/public/.well-known/assetlinks.json` with valid Digital Asset Links JSON and clear placeholder documentation for the Android package name and SHA-256 signing cert fingerprint.
- Update `frontend/docs/PLAY_STORE_PUBLISHING.md` with an end-to-end, copy/paste-ready Bubblewrap workflow (install, init, build) including steps to create a keystore and produce a signed release AAB for Play Console upload.
- Add a troubleshooting section in the publishing doc addressing the exact error message `Unable to create your app`, listing common causes and checks.
- Verify and align PWA metadata consistency between `frontend/public/manifest.webmanifest` and `frontend/index.html` (names/description/theme color/icon paths), and document the exact current values to use during TWA setup (App ID `skylance-royale`, manifest path `/manifest.webmanifest`, icon paths under `/assets/generated/...`).
- Include a short TWA readiness checklist in the doc covering HTTPS, manifest URL validity, icon reachability, and `/.well-known/assetlinks.json` reachability.

**User-visible outcome:** The deployed game can be verified for a TWA wrapper via `/.well-known/assetlinks.json`, and developers have clear, English, step-by-step instructions to generate a signed release AAB (with troubleshooting) for Google Play Console submission.
