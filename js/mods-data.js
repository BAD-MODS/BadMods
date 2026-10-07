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
                                   // a bullet can also have sub-bullets:
                                   // { text: "Phone", sub: ["Camera app", "Gallery app"] }
     builtOn: "",                  // optional: game version it was built on, e.g. "0.39.4"
     sections: [                   // optional extra popup sections, shown in this order
       { h: "Controls", keys: [ { k: "G", a: "Pose wheel" } ] },  // key / action table
       { h: "Notes", text: "A paragraph." },                       // paragraph (or ["para 1", "para 2"])
       { h: "Known Issues", items: ["bullet", "bullet"] },         // bullet list
       { h: "Credits", items: ["..."], afterInstall: true }        // afterInstall: true = shows below How to Install
     ],

     // --- PICTURES: use ONE of these two options ---
     previewGif: "images/mods/your-mod.gif",       // option A: one gif, used as card thumbnail + popup preview
     gallery: [                                    // option B: several pics/gifs, shown in the popup
       "images/mods/your-mod/shot1.png",           //   as a slideshow (arrows + thumbnail strip),
       "images/mods/your-mod/clip1.gif"            //   in exactly the order you list them here.
     ],                                            //   The FIRST one is the card cover photo.
     cover: "",                                    // optional: force a different card cover than gallery[0]

     downloadUrl: ""               // "" = greyed out "COMING SOON" button
   }
   HOW TO ADD A NEW CATEGORY (e.g. "Vehicles"):
   Add a new key inside a game's "categories" object, following the
   same shape as the ones already there (label, install, mods).
   Categories show up as tabs in the order you write them here.
   A category's "install" steps are what show in the site's
   "How to Install" section when that game is selected.
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
      player: {
        label: "Player",
        install: [
          { t: "Drop the zip into your BeamNG mods folder", d: "Don't unzip it. The mods folder is at %LOCALAPPDATA%\\BeamNG\\BeamNG.drive\\current\\mods" },
          { t: "Enable it", d: "Make sure it's enabled in the in-game Mod Manager." },
          { t: "Load in", d: "Load a map, press F to get out of your car, then C for third person." }
        ],
        mods: [
          {
            id: "playermod",
            name: "PlayerMOD",
            version: "v0.1.1 BETA",
            size: "180MB",
            updated: "Oct 2026",
            builtOn: "0.39.4",
            description: "v0.1.1 fixes beamMP launcher conflicts & controls bug - joining a server should fully disable mod unless server has it enabled.                                      A third-person character mod for BeamNG.drive. PlayerMOD replaces the walking-mode snowball with a fully animated character: idle, walk, run, crouch, jump, an emote/pose wheel for shots with your car, and a working phone with its own camera, gallery, and settings.",
            install: [],                    // [] = uses the Player category's steps above
            features: [
              "Animated third-person character (idle / walk / run / crouch), turns smoothly to face where you're going",
              "First / third person toggle while walking",
              "Crouch with stand-up and crouch-down transitions",
              "Jump",
              "Pose wheel: Lean, Laying, Standing, Standing 2, Sitting, Wave, plus a Dances page (Dance 1, Dance 2)",
              { text: "Phone (slides up bottom right, mouse controlled)", sub: [
                "Camera app: character raises the phone and aims, walk/strafe while aiming, exposure +/-, shutter",
                "Gallery app: browse, delete, download opens your PC photo folder",
                "Settings app: set any photo as your phone wallpaper, plus third-person camera height, distance, shoulder offset and FOV (live preview, Save / Reset)"
              ]},
              "Photos render the scene without the UI, at 1920x1080",
              "Free cam (Shift+C) shows your character, so you can line up your own shots",
              "Door / hood / trunk interaction squares work from third person"
            ],
            sections: [
              { h: "Controls (walking mode)", keys: [
                { k: "W A S D / Arrows", a: "Move" },
                { k: "Shift", a: "Sprint" },
                { k: "Space", a: "Jump" },
                { k: "Left Ctrl", a: "Crouch / stand up" },
                { k: "C", a: "First / third person" },
                { k: "G", a: "Pose wheel (G again to close menu and cancel pose/emote, moving also cancels)" },
                { k: "H", a: "Phone out / away" },
                { k: "Shift + C", a: "Free cam (BeamNG freecam)" }
              ]},
              { h: "On the Phone", items: [
                "Mouse cursor to use apps, home bar at the bottom = back / close",
                "Camera: right/left click drag phone screen",
                "Phone app settings are saved, photos are saved to: [BeamNG user folder]\\screenshots\\PlayerMOD\\"
              ]},
              { h: "File Size (please read)", text: [
                "The download is about 180 MB (about 600 MB once the game unpacks it). Most of that is the phone: the current phone model is very detailed, it's a placeholder. The next major update replaces it with a much lighter phone, which should cut the size down a lot.",
                "The first time your character appears (first switch to third person after loading a map) there's a short pause while all the animations load. After that it's smooth."
              ], afterInstall: true },
              { h: "Known Issues / Beta Notes", items: [
                "Second hop when you land while walking and running",
                "Short pause the first time the character loads each session",
                "Lean is hard to line up, may replace",
                "No controller support yet for phone",
                "Exposure on photos sometimes changes",
                "It's a beta. If something breaks, tell me what you were doing and attach your beamng.log: %LOCALAPPDATA%\\BeamNG\\BeamNG.drive\\current\\beamng.log"
              ], afterInstall: true },
              { h: "Planned / Roadmap", items: [
                "Lighter phone model (much smaller download)",
                "More phone apps aimed at car meets and RP (ideas: messages, map/GPS, car info, music, tow truck?)",
                "Career mode focus (RLS-friendly features)",
                "Better animations and smoother transitions, plus more poses and dances",
                "Car-aware poses (lean on the hood, door, sit on the trunk)",
                "Selfie mode",
                "Crouch camera mode (crouch walk and strafe while aiming the phone)",
                "Driver in the car with hands on the wheel",
                "Custom pose wheel styled like the phone",
                "Controller support",
                "Video recording in the camera app (if possible)",
                "Jump polish"
              ], afterInstall: true },
              { h: "Credits", items: [
                "Character and animations: Mixamo",
                "Feedback, bug reports and app ideas are welcome. This is just the start."
              ], afterInstall: true }
            ],
            // cover first. File names must match yours EXACTLY (case matters on GitHub Pages)
            // gifs removed for now (too big) — to add them back later, put each one
            // after the picture it should follow, e.g. pMss1, pMgif1, pMss2, pMgif2...
            gallery: [
              "images/mods/playermod/pMss1.png",
              "images/mods/playermod/pMss2.png",
              "images/mods/playermod/pMss3.png"
            ],
            downloadUrl: "https://github.com/BAD-MODS/BadMods/releases/download/playermod-v0.1.1-beta/playerMOD_beta_v0.1.1.zip"
          }
        ]
      },
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
          { t: "Extract and drop into the scripts folder", d: "Place the .cs and .ini files in your GTA V root scripts/ folder." },
          { t: "Launch the game", d: "Enjoy." }
        ],
        mods: [
          {
            id: "weapon-inspect",
            name: "Weapon Inspect",
            version: "v1.0",
            size: "3KB",
            updated: "Jul 2026",
            description: "This mod lets you inspect your currently equipped weapon with a simple keybind and on-screen prompt. Default key is set to F, fully configurable via the included .ini file, including whether the help prompt is shown.",
            install: [],
            features: ["Configurable keybind via .ini", "Toggleable help-text prompt", "On-screen prompt while inspecting"],
            previewGif: "images/mods/weapon-inspect.gif",
            downloadUrl: "https://github.com/BAD-MODS/BadMods/releases/download/weapon-inspect-v1.0/weapon-inspect.zip"
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
