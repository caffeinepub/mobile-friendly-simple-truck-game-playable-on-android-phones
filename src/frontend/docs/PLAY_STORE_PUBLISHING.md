# Publishing Truck Rush to Google Play Store

This guide walks you through publishing this Progressive Web App (PWA) to the Google Play Store using a Trusted Web Activity (TWA) wrapper.

## Prerequisites

- A Google Play Console developer account ($25 one-time registration fee)
- Android Studio or command-line Android SDK tools
- Java Development Kit (JDK) 11 or higher
- Your web app deployed and accessible via HTTPS

## Overview

This game is built as a Progressive Web App (PWA) that runs in the browser. To publish it on the Play Store, you'll wrap it in a native Android app shell using Trusted Web Activity (TWA), which displays your web app in a full-screen browser without any browser UI.

## Step 1: Prepare Required Assets

All required assets are already generated in `frontend/public/assets/generated/`:

### App Icons
- ✅ `app-icon.dim_512x512.png` (512×512) - High-res app icon
- ✅ `app-icon-small.dim_192x192.png` (192×192) - Standard app icon

### Play Store Listing Assets
- ✅ `play-feature-graphic.dim_1024x500.png` (1024×500) - Feature graphic for store listing
- ✅ `play-screenshot-1.dim_1080x1920.png` (1080×1920) - Screenshot 1
- ✅ `play-screenshot-2.dim_1080x1920.png` (1080×1920) - Screenshot 2

**Note:** You'll need at least 2 screenshots (up to 8) for the Play Store listing. The provided screenshots are promotional images; consider capturing actual gameplay screenshots on a real device for better representation.

## Step 2: Deploy Your Web App

1. Deploy your app to a production URL with HTTPS enabled
2. Ensure the web app manifest is accessible at `https://your-domain.com/manifest.webmanifest`
3. Verify all icons load correctly
4. Test the PWA in Chrome on Android to ensure it works properly

## Step 3: Choose a Valid App Identifier

Your app needs a unique package name (reverse domain format):

**Valid format:** `com.yourcompany.truckrush`

**Rules:**
- Use reverse domain notation (e.g., `com.example.appname`)
- Only lowercase letters, numbers, and periods
- Must have at least 2 segments separated by periods
- Each segment must start with a letter
- No spaces, hyphens, or special characters

**Common mistakes to avoid:**
- ❌ `TRUCK SIMULATOR GAME 2026` (spaces, uppercase)
- ❌ `truck-game-2026` (hyphens not allowed in package names)
- ❌ `TruckGame` (needs domain format)
- ✅ `com.truckgame.rush` (correct format)

## Step 4: Create a TWA Wrapper

### Option A: Using Bubblewrap (Recommended for beginners)

Bubblewrap is a command-line tool that generates a TWA project:

