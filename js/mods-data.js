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
   3. Paste that link into "downloadUrl" below on a new mod entry.

   EXAMPLE MOD ENTRY (copy this into any mods:[] array and edit):

   {
     id: "unique-short-id",          // no spaces, must be unique
     name: "Mod Display Name",
     version: "v1.0",
     size: "4MB",
     updated: "Jul 2026",
     downloadUrl: "https://github.com/YOURORG/BADMODS/releases/download/TAG/FILE.zip"
   }

   HOW TO ADD A NEW CATEGORY (e.g. "Vehicles"):
   Add a new key inside a game's "categories" object, following the
   same shape as the ones already there (label, install steps, mods).

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
      scripts: {
        label: "Scripts",
        install: [
          { t: "Extract to the Lua folder", d: "Unzip into Documents/BeamNG.drive/lua/scripts/" },
          { t: "Enable it in-game", d: "Launch BeamNG, open the mod manager, tick the script on." }
        ],
        mods: [
          // add your Scripts mods here
        ]
      },
      maps: {
        label: "Maps",
        install: [
          { t: "Extract to the levels folder", d: "Unzip into Documents/BeamNG.drive/levels/" },
          { t: "Select it in-game", d: "Choose it from the level select screen after restarting." }
        ],
        mods: [
          // add your Maps mods here
        ]
      },
      vehicles: {
        label: "Vehicles",
        install: [
          { t: "Extract to the vehicles folder", d: "Unzip into Documents/BeamNG.drive/vehicles/" }
        ],
        mods: [
          // add your Vehicles mods here
        ]
      },
      skins: {
        label: "Skins",
        install: [
          { t: "Drop into the car's skins folder", d: "Place the zip in vehicles/<car>/skins/" }
        ],
        mods: [
          // add your Skins mods here
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
          { t: "Install Script Hook V first", d: "Required dependency, linked on the Contact page if missing." },
          { t: "Drop into the scripts folder", d: "Place the .asi and .lua/.cs files in your GTA V root scripts/ folder." }
        ],
        mods: [
          // add your Scripts mods here
        ]
      }
    }
  }
};
