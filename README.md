# Solo Leveling Life — PWA

A lifestyle RPG with time-gated quests, auto-fail penalties, and AI-generated system quests.

## Deploy to GitHub Pages (5 minutes)

### 1. Create a GitHub repo
- Go to github.com → New Repository
- Name it `solo-leveling-life`
- Make it **Public**
- Click Create

### 2. Upload files
- Click "uploading an existing file"
- Drag ALL files from this folder:
  - `index.html`
  - `manifest.json`
  - `sw.js`
  - `icons/` folder (with icon-192.png, icon-512.png)
- Commit to main

### 3. Enable GitHub Pages
- Go to repo Settings → Pages
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Click Save

### 4. Access your app
Your app will be live at:
`https://YOUR_USERNAME.github.io/solo-leveling-life/`

### 5. Install as PWA on your phone
- Open the URL in Chrome on your OnePlus phone
- Tap the 3-dot menu → "Add to Home Screen" / "Install app"
- It now works like a native app — fullscreen, offline, with notifications

## How Time-Gated Quests Work

Every quest has a time window:
- **Morning Water** → Available 5 AM, expires 9 AM
- **Eat Breakfast** → Available 6 AM, expires 11 AM (-10 HP if missed!)
- **Healthy Lunch** → Available 11 AM, expires 2 PM (-8 HP if missed!)
- **Evening quests** → Unlock at 5-9 PM

Quest states:
- 🔒 **Upcoming** — not yet available (greyed out)
- ⚔️ **Active** — available now (shows time remaining)
- ✅ **Completed** — you did it (XP earned)
- 💀 **Failed** — time expired and you didn't complete it (HP penalty)

## OnePlus Watch 2
Enable notifications in the Timers tab. OHealth mirrors them to your wrist.
