# Publishing Skylance Royale to Google Play Store

This guide walks you through publishing this Progressive Web App (PWA) to the Google Play Store using a Trusted Web Activity (TWA) wrapper.

## Prerequisites

- A Google Play Console developer account ($25 one-time registration fee)
- Node.js 14+ and npm installed
- Java Development Kit (JDK) 11 or higher
- Your web app deployed and accessible via HTTPS

## Overview

This game is built as a Progressive Web App (PWA) that runs in the browser. To publish it on the Play Store, you'll wrap it in a native Android app shell using Trusted Web Activity (TWA), which displays your web app in a full-screen browser without any browser UI.

## Step 1: Prepare Required Assets

All required assets are already generated in `frontend/public/assets/generated/`:

### App Icons
- ✅ `battle-app-icon.dim_512x512.png` (512×512) - High-res app icon
- ✅ `battle-app-icon-small.dim_192x192.png` (192×192) - Standard app icon

### Play Store Listing Assets
- ✅ `play-feature-graphic.dim_1024x500.png` (1024×500) - Feature graphic for store listing
- ✅ `play-screenshot-1.dim_1080x1920.png` (1080×1920) - Screenshot 1
- ✅ `play-screenshot-2.dim_1080x1920.png` (1080×1920) - Screenshot 2

**Note:** You'll need at least 2 screenshots (up to 8) for the Play Store listing. The provided screenshots are promotional images; consider capturing actual gameplay screenshots on a real device for better representation.

## Step 2: Deploy Your Web App

1. Deploy your app to a production URL with HTTPS enabled
2. Ensure the web app manifest is accessible at `https://your-domain.com/manifest.webmanifest`
3. Verify all icons load correctly at their paths:
   - `https://your-domain.com/assets/generated/battle-app-icon-small.dim_192x192.png`
   - `https://your-domain.com/assets/generated/battle-app-icon.dim_512x512.png`
4. Test the PWA in Chrome on Android to ensure it works properly

## Step 3: Current PWA Configuration

Your app uses the following PWA metadata values. **Copy these exact values** when setting up your TWA wrapper:

### App Identity
- **App ID:** `skylance-royale`
- **App Name:** `Skylance Royale - Battle Arena Game`
- **Short Name:** `Skylance Royale`
- **Description:** `Battle bots in the arena! Eliminate 20 enemies to win in this action-packed mobile battle game.`

### URLs and Paths
- **Manifest URL:** `/manifest.webmanifest` (full URL: `https://your-domain.com/manifest.webmanifest`)
- **Start URL:** `/`
- **Icon 192x192:** `/assets/generated/battle-app-icon-small.dim_192x192.png`
- **Icon 512x512:** `/assets/generated/battle-app-icon.dim_512x512.png`

### Theme
- **Theme Color:** `#0f172a` (dark arena background)
- **Background Color:** `#0f172a`

### Android Package Name

When creating your TWA wrapper, you'll need to choose a package name in reverse domain format:

**Package name format:** `com.yourcompany.skylanceroyale`

**Rules:**
- Use reverse domain notation (e.g., `com.example.appname`)
- Only lowercase letters, numbers, and periods
- Must have at least 2 segments separated by periods
- Each segment must start with a letter
- No spaces, hyphens, or special characters

**Examples:**
- ✅ `com.skylanceroyale.game` (correct format)
- ✅ `com.yourname.skylanceroyale` (correct format)
- ❌ `skylance-royale` (hyphens not allowed in package names)
- ❌ `SKYLANCE ROYALE` (spaces, uppercase)

## Step 4: Create a Signing Keystore

Before building your TWA, create a keystore for signing your app:

