# BAD MODS

Free mods, no bs, no accounts required.

## File structure

```
badmods-site/
├── index.html          <- page structure, don't need to touch this often
├── css/
│   └── style.css        <- all visual styling
├── js/
│   ├── mods-data.js      <- THE FILE YOU EDIT TO ADD MODS
│   └── script.js          <- site behavior, don't need to touch this often
├── images/
│   ├── logo.png
│   ├── gta5-cover.jpg
│   └── beamng-cover.png
└── README.md
```

## Adding a mod (do this every time)

1. Go to your **BADMODS** repo on GitHub → **Releases** → **Draft a new release**.
2. Give it a tag (e.g. `v1.0`), a title, and attach your mod's zip file.
3. Publish the release.
4. Right-click the uploaded file link on the release page → **Copy link**. It'll look like:
   ```
   https://github.com/YOURORG/BADMODS/releases/download/v1.0/mymod.zip
   ```
5. Open `js/mods-data.js` and add a new entry inside the right game + category's `mods:` array:
   ```js
   {
     id: "unique-short-id",
     name: "Mod Display Name",
     version: "v1.0",
     size: "4MB",
     updated: "Jul 2026",
     downloadUrl: "https://github.com/YOURORG/BADMODS/releases/download/v1.0/mymod.zip"
   }
   ```
6. Save, commit, push. That's it — no other file needs to change.

The download button links straight to that file. GitHub serves release files in a way that
makes the browser download them directly — the page never navigates and no GitHub tab opens.

## Testing locally before you push

You can just double-click `index.html` and it'll open and work in your browser, no local
server needed — the data file is loaded as a normal script, not fetched, so there's no
browser security block on opening it directly from disk.

## Adding a new category or game

See the comments at the top of `js/mods-data.js` for the exact format.

## Deploying

Push this whole folder to the root of your `BADMODS` repo's `main` branch, then turn on
GitHub Pages in the repo's Settings → Pages (source: `main`, folder: `/root`). Free, no
billing risk as long as the repo stays public.
