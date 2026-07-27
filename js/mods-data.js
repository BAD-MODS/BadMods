/* ============================================================
   BAD MODS — MOD DATA
   ------------------------------------------------------------
   This is the ONLY file you should need to edit to add mods.
   index.html and script.js read from this automatically.
   HOW TO ADD A MOD:
   1. Upload your zip/file to a GitHub Release in your BADMODS repo
      (repo page -> Releases -> Draft a new release -> attach file)
   2. Right-click the uploaded file on the release page and copy
      its link. It'll look like:
      https://github.com/YOURORG/BADMODS/releases/download/v1.0/mymod.zip
   3. Paste that link into "downloadUrl" below on the mod's entry.
      As soon as downloadUrl is filled in, the popup's download
      button automatically goes live — no other change needed.
   MOD ENTRY FIELDS:
   {
     id: "unique-short-id",        // no spaces, must be unique
     name: "Mod Display Name",
     version: "v1.0",
     size: "4MB",                  // leave "" until you know it
     updated: "Jul 2026",
     description: "1-3 sentences shown in the popup.",
     install: [                    // steps shown in the popup's
       { t: "Step title", d: "Step detail sentence." }   // "How to Install" section
     ],                             // leave [] to fall back to the
                                     // category's general install steps
     features: ["short bullet", "short bullet"],   // optional, [] to skip
     previewGif: "images/mods/your-mod.gif",        // used as card thumbnail + popup preview
     downloadUrl: ""               // "" = greyed out "COMING SOON" button
   }
   HOW TO ADD A NEW CATEGORY (e.g. "Vehicles"):
   Add a new key inside a game's "categories" object, following the
   same shape as the ones already there (label, install, mods).
   HOW TO ADD A NEW GAME:
   Copy the whole "beamng: { ... }" block, rename the key and the
   "name"/"thumb" fields, drop a cover image into /images/, and
   point "thumb" at it.
   ============================================================ */
const DATA = {
  beamng: {
    name: "BeamNG.drive",
    thumb: "images/beamng-cover.png",
    categories: {
      maps: {
        label: "Maps",
        install: [
          { t: "Extract to the levels folder", d: "Unzip into Documents/BeamNG.drive/levels/" },
          { t: "Select it in-game", d: "Choose it from the level select screen after restarting." }
        ],
        mods: [
          // add your Maps mod here
        ]
      }
    }
  },
  gtav: {
    name: "GTA V",
    thumb: "images/gta5-cover.jpg",
    categories: {
      scripts: {
        label: "Scripts",
        install: [
          { t: "Install Script Hook V first", d: "Required dependency for all GTA V .asi/.cs mods to function." },
          { t: "Install ScriptHookVDotNet", d: "Required dependency for .cs script mods — enables the game to load C# scripts." },
          { t: "Drop into the scripts folder", d: "Place the .cs and .ini files in your GTA V root scripts/ folder." },
          { t: "Launch the game", d: "Enjoy." }
        ],
        mods: [
          {
            id: "weapon-inspect",
            name: "Weapon Inspect",
            version: "v1.0",
            size: "",
            updated: "Jul 2026",
            description: "This mod lets you inspect your currently equipped weapon with a simple keybind and on-screen prompt. Default key is set to F, fully configurable via the included .ini file.",
            install: [],
            features: ["Configurable keybind via .ini", "On-screen prompt to toggle"],
            previewGif: "images/mods/weapon-inspect.gif",
            downloadUrl: ""
          },
          {
            id: "fold-hands",
            name: "Fold Hands",
            version: "v1.0",
            size: "2KB",
            updated: "Jul 2026",
            description: "This mod lets you fold your hands behind your back with a simple keybind and on-screen prompt. Default key is set to Z, fully configurable via the included .ini file.",
            install: [],
            features: ["Configurable keybind via .ini", "On-screen prompt to toggle"],
            previewGif: "images/mods/fold-hands.gif",
            downloadUrl: "https://github.com/BAD-MODS/BadMods/releases/download/fold-hands-v1.0/fold-hands.zip"
          }
        ]
      }
    }
  }
};
