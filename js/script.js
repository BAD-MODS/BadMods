let activeGame = Object.keys(DATA)[0];
let activeCat = Object.keys(DATA[activeGame].categories)[0];

/* ---------- MEDIA HELPERS ----------
   A mod can have either a single "previewGif" (older mods) or a
   "gallery" list of pics/gifs. These two helpers hide that
   difference from the rest of the script. */
function modMedia(m) {
  if (m.gallery && m.gallery.length) return m.gallery;
  return m.previewGif ? [m.previewGif] : [];
}
function modCover(m) {
  return m.cover || modMedia(m)[0] || "";
}
function isGif(src) {
  return /\.gif($|\?)/i.test(src);
}

function renderGameGrid() {
  const grid = document.getElementById("gameGrid");
  const keys = Object.keys(DATA);
  document.getElementById("gameCount").textContent = keys.length + " SUPPORTED";
  grid.innerHTML = keys.map(k => {
    const g = DATA[k];
    const catCount = Object.keys(g.categories).length;
    const modCount = Object.values(g.categories).reduce((a, c) => a + c.mods.length, 0);
    return `<div class="game-card" onclick="selectGame('${k}')">
      <div class="thumb"><img src="${g.thumb}" alt="${g.name}"></div>
      <div class="body"><h3>${g.name}</h3><p>${modCount} mods across ${catCount} categories</p></div>
    </div>`;
  }).join("");
}

function renderDropdown() {
  const dd = document.getElementById("gamesDropdown");
  dd.innerHTML = Object.keys(DATA).map(k => {
    const g = DATA[k];
    const modCount = Object.values(g.categories).reduce((a, c) => a + c.mods.length, 0);
    return `<a href="#" onclick="selectGame('${k}');return false;">${g.name} <span class="tag">${modCount}</span></a>`;
  }).join("");
}

/* ---------- HOW TO INSTALL (accordion, only the selected game) ---------- */
let installRows = [];

function renderInstallIndex() {
  const g = DATA[activeGame];

  // game switcher pills, so people who jump straight here can still pick a game
  document.getElementById("installGameTabs").innerHTML = Object.keys(DATA).map(k =>
    `<button class="install-game-tab ${k === activeGame ? 'active' : ''}" onclick="selectInstallGame('${k}')">${DATA[k].name.toUpperCase()}</button>`
  ).join("");

  installRows = Object.keys(g.categories).map(ck => ({ gk: activeGame, ck, cat: g.categories[ck], game: g.name }));

  const idx = document.getElementById("installIndex");
  idx.innerHTML = installRows.map((r, i) => `
    <div class="idx-item">
      <div class="idx-row" onclick="toggleInstallRow(${i})">
        <div class="idx-left">
          <span class="idx-cat">${r.cat.label}</span>
          <span class="idx-game">${r.game}</span>
        </div>
        <span class="idx-arrow" id="idxArrow${i}">&#8595;</span>
      </div>
      <div class="idx-panel" id="idxPanel${i}">
        ${r.cat.install.map((s, si) => `
          <div class="istep">
            <div class="n">0${si + 1}</div>
            <div><div class="t">${s.t}</div><div class="d">${s.d}</div></div>
          </div>`).join("")}
      </div>
    </div>`).join("");
}

function toggleInstallRow(i) {
  const panel = document.getElementById("idxPanel" + i);
  const wasOpen = panel.classList.contains("open");
  document.querySelectorAll(".idx-panel.open").forEach(p => p.classList.remove("open"));
  document.querySelectorAll(".idx-arrow").forEach(a => a.innerHTML = "&#8595;");
  if (!wasOpen) {
    panel.classList.add("open");
    document.getElementById("idxArrow" + i).innerHTML = "&#8593;";
  }
}

// switching games from inside the How to Install section — keeps the
// mod browser in sync but doesn't scroll the page away
function selectInstallGame(gameKey) {
  activeGame = gameKey;
  activeCat = Object.keys(DATA[gameKey].categories)[0];
  renderModBrowser();
  renderInstallIndex();
}

/* ---------- GAME / CATEGORY SELECTION ---------- */
function selectGame(gameKey) {
  activeGame = gameKey;
  activeCat = Object.keys(DATA[gameKey].categories)[0];
  renderModBrowser();
  renderInstallIndex();
  document.getElementById("modBrowser").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectCategory(gameKey, catKey) {
  const gameChanged = gameKey !== activeGame;
  activeGame = gameKey;
  activeCat = catKey;
  renderModBrowser();
  if (gameChanged) renderInstallIndex();
  document.getElementById("modBrowser").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- MOD BROWSER — card grid (gta5mods-style) ---------- */
function renderModBrowser() {
  const game = DATA[activeGame];
  const cats = Object.keys(game.categories);
  const tabsEl = document.getElementById("subTabs");
  tabsEl.innerHTML =
    `<div style="padding:12px 20px;color:var(--gold);font-family:'Space Mono',monospace;font-size:10px;border-right:1px solid var(--line);">${game.name.toUpperCase()}</div>` +
    cats.map(ck => `<div class="${ck === activeCat ? 'active' : ''}" onclick="selectCategory('${activeGame}','${ck}')">${game.categories[ck].label.toUpperCase()}</div>`).join("");

  const cat = game.categories[activeCat];
  const rowsEl = document.getElementById("modRows");
  if (cat.mods.length === 0) {
    rowsEl.innerHTML = `<div class="empty-state">No ${cat.label.toLowerCase()} uploaded yet — check back soon.</div>`;
    return;
  }
  rowsEl.innerHTML = `<div class="mod-grid">` + cat.mods.map(m => {
    const isLive = !!m.downloadUrl;
    const cover = modCover(m);
    return `
    <div class="mod-card" onclick="openModPopup('${activeGame}','${activeCat}','${m.id}')">
      <div class="mod-card-thumb">
        ${cover ? `<img src="${cover}" alt="${m.name}">` : `<div class="mod-card-noimg">NO PREVIEW</div>`}
        <span class="mod-card-version">${m.version}</span>
        ${!isLive ? `<span class="mod-card-status">COMING SOON</span>` : ""}
      </div>
      <div class="mod-card-body">
        <h3>${m.name}</h3>
        <div class="mod-card-meta">${m.size || 'TBD'} &middot; updated ${m.updated}</div>
      </div>
    </div>`;
  }).join("") + `</div>`;
}

/* ---------- POPUP GALLERY ---------- */
let galleryItems = [];
let galleryIndex = 0;

function galleryHtml(m) {
  galleryItems = modMedia(m);
  galleryIndex = 0;
  if (galleryItems.length === 0) return "";
  if (galleryItems.length === 1) {
    return `<img class="modal-gif" src="${galleryItems[0]}" alt="${m.name} preview">`;
  }
  return `
    <div class="gallery">
      <div class="gallery-stage">
        <img id="galleryMain" src="${galleryItems[0]}" alt="${m.name} preview">
        <button class="gallery-nav prev" onclick="galleryStep(-1)" aria-label="Previous">&#8249;</button>
        <button class="gallery-nav next" onclick="galleryStep(1)" aria-label="Next">&#8250;</button>
        <span class="gallery-count" id="galleryCount">1 / ${galleryItems.length}</span>
      </div>
      <div class="gallery-strip">
        ${galleryItems.map((src, i) => `
          <button class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="showGalleryItem(${i})" aria-label="Show item ${i + 1}">
            <img src="${src}" alt="" loading="lazy">
            ${isGif(src) ? `<span class="gallery-thumb-tag">GIF</span>` : ""}
          </button>`).join("")}
      </div>
    </div>`;
}

function showGalleryItem(i) {
  const main = document.getElementById("galleryMain");
  if (!main || galleryItems.length < 2) return;
  galleryIndex = (i + galleryItems.length) % galleryItems.length;
  main.src = galleryItems[galleryIndex];
  document.getElementById("galleryCount").textContent = (galleryIndex + 1) + " / " + galleryItems.length;
  document.querySelectorAll(".gallery-thumb").forEach((t, ti) => t.classList.toggle("active", ti === galleryIndex));
  const activeThumb = document.querySelectorAll(".gallery-thumb")[galleryIndex];
  if (activeThumb) activeThumb.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function galleryStep(dir) {
  showGalleryItem(galleryIndex + dir);
}

/* ---------- POPUP EXTRA SECTIONS ---------- */
function featureHtml(f) {
  if (typeof f === "string") return `<li>${f}</li>`;
  return `<li>${f.text}${f.sub && f.sub.length ? `<ul class="modal-subfeatures">${f.sub.map(s => `<li>${s}</li>`).join("")}</ul>` : ""}</li>`;
}

function sectionHtml(s) {
  let inner = "";
  if (s.keys && s.keys.length) {
    inner += `<div class="modal-keys">${s.keys.map(r => `
      <div class="modal-key-row"><span class="modal-key">${r.k}</span><span class="modal-key-action">${r.a}</span></div>`).join("")}</div>`;
  }
  if (s.text) {
    const paras = Array.isArray(s.text) ? s.text : [s.text];
    inner += paras.map(p => `<p class="modal-desc modal-para">${p}</p>`).join("");
  }
  if (s.items && s.items.length) {
    inner += `<ul class="modal-features">${s.items.map(featureHtml).join("")}</ul>`;
  }
  return `
    <div class="modal-section">
      <div class="modal-section-h">${s.h}</div>
      ${inner}
    </div>`;
}

/* ---------- MOD POPUP ---------- */
function openModPopup(gk, ck, modId) {
  const cat = DATA[gk].categories[ck];
  const m = cat.mods.find(x => x.id === modId);
  if (!m) return;
  const isLive = !!m.downloadUrl;
  const installSteps = (m.install && m.install.length) ? m.install : cat.install;
  const extra = m.sections || [];
  const beforeInstall = extra.filter(s => !s.afterInstall).map(sectionHtml).join("");
  const afterInstall = extra.filter(s => s.afterInstall).map(sectionHtml).join("");

  const body = document.getElementById("modModalBody");
  body.innerHTML = `
    ${galleryHtml(m)}

    <div class="modal-header-row">
      <h3 class="modal-title">${m.name}</h3>
      <span class="modal-version-badge">${m.version}</span>
    </div>
    <div class="modal-meta">${m.size || 'TBD'} &middot; updated ${m.updated} &middot; ${DATA[gk].name} / ${cat.label}${m.builtOn ? ` &middot; built on v${m.builtOn}` : ""}</div>

    ${m.description ? `
      <div class="modal-section">
        <div class="modal-section-h">Overview</div>
        <p class="modal-desc">${m.description}</p>
      </div>` : ""}

    ${m.features && m.features.length ? `
      <div class="modal-section">
        <div class="modal-section-h">Features</div>
        <ul class="modal-features">${m.features.map(featureHtml).join("")}</ul>
      </div>` : ""}

    ${beforeInstall}

    ${installSteps && installSteps.length ? `
      <div class="modal-section">
        <div class="modal-section-h">How to Install</div>
        <div class="modal-install-steps">
          ${installSteps.map((s, i) => `
            <div class="istep">
              <div class="n">0${i + 1}</div>
              <div><div class="t">${s.t}</div><div class="d">${s.d}</div></div>
            </div>`).join("")}
        </div>
      </div>` : ""}

    ${afterInstall}

    <a class="dl-btn modal-dl ${isLive ? '' : 'dl-btn-disabled'}" ${isLive ? `href="${m.downloadUrl}"` : `href="#" onclick="return false;" aria-disabled="true"`}>
      ${isLive ? 'DOWNLOAD' : 'COMING SOON'}
    </a>
  `;
  document.getElementById("modModal").classList.add("show");
  document.querySelector("#modModal .modal-box").scrollTop = 0;
}

function closeModPopup() {
  document.getElementById("modModal").classList.remove("show");
  document.getElementById("modModalBody").innerHTML = ""; // stops gifs playing in the background
  galleryItems = [];
}

/* ---------- SEARCH ---------- */
function buildSearchIndex() {
  let items = [];
  Object.keys(DATA).forEach(gk => {
    const g = DATA[gk];
    items.push({ type: "game", label: g.name, gk, ck: Object.keys(g.categories)[0] });
    Object.keys(g.categories).forEach(ck => {
      const cat = g.categories[ck];
      items.push({ type: "category", label: cat.label + " — " + g.name, gk, ck });
      cat.mods.forEach(m => {
        items.push({ type: "mod", label: m.name, sub: cat.label + " — " + g.name, gk, ck });
      });
    });
  });
  return items;
}

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const SEARCH_INDEX = buildSearchIndex();

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResults.classList.remove("show");
    searchResults.innerHTML = "";
    return;
  }
  const matches = SEARCH_INDEX.filter(it => it.label.toLowerCase().includes(q)).slice(0, 8);
  if (matches.length === 0) {
    searchResults.innerHTML = `<div class="sr-empty">no matches for "${searchInput.value}"</div>`;
  } else {
    searchResults.innerHTML = matches.map(m => `
      <div class="sr-item" onclick="goToResult('${m.gk}','${m.ck}')">
        <span class="sr-name">${m.label}</span>
        <span class="sr-meta">${m.type === 'mod' ? m.sub : m.type.toUpperCase()}</span>
      </div>`).join("");
  }
  searchResults.classList.add("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) {
    searchResults.classList.remove("show");
  }
});

function goToResult(gk, ck) {
  selectCategory(gk, ck);
  searchInput.value = "";
  searchResults.classList.remove("show");
}

document.getElementById("installNavLink").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("installSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("modModalClose").addEventListener("click", closeModPopup);
document.getElementById("modModal").addEventListener("click", (e) => {
  if (e.target.id === "modModal") closeModPopup();
});
document.addEventListener("keydown", (e) => {
  const modalOpen = document.getElementById("modModal").classList.contains("show");
  if (e.key === "Escape") closeModPopup();
  if (modalOpen && e.key === "ArrowLeft") galleryStep(-1);
  if (modalOpen && e.key === "ArrowRight") galleryStep(1);
});

renderGameGrid();
renderDropdown();
renderInstallIndex();
renderModBrowser();
