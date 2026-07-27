let activeGame = Object.keys(DATA)[0];
let activeCat = Object.keys(DATA[activeGame].categories)[0];

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

/* ---------- HOW TO INSTALL (accordion, general per-category) ---------- */
let installRows = [];

function renderInstallIndex() {
  const idx = document.getElementById("installIndex");
  installRows = [];
  Object.keys(DATA).forEach(gk => {
    const g = DATA[gk];
    Object.keys(g.categories).forEach(ck => {
      installRows.push({ gk, ck, cat: g.categories[ck], game: g.name });
    });
  });
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

/* ---------- GAME / CATEGORY SELECTION ---------- */
function selectGame(gameKey) {
  activeGame = gameKey;
  activeCat = Object.keys(DATA[gameKey].categories)[0];
  renderModBrowser();
  document.getElementById("modBrowser").scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectCategory(gameKey, catKey) {
  activeGame = gameKey;
  activeCat = catKey;
  renderModBrowser();
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
    return `
    <div class="mod-card" onclick="openModPopup('${activeGame}','${activeCat}','${m.id}')">
      <div class="mod-card-thumb">
        ${m.previewGif ? `<img src="${m.previewGif}" alt="${m.name}">` : `<div class="mod-card-noimg">NO PREVIEW</div>`}
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

/* ---------- MOD POPUP ---------- */
function openModPopup(gk, ck, modId) {
  const cat = DATA[gk].categories[ck];
  const m = cat.mods.find(x => x.id === modId);
  if (!m) return;
  const isLive = !!m.downloadUrl;
  const installSteps = (m.install && m.install.length) ? m.install : cat.install;

  const body = document.getElementById("modModalBody");
  body.innerHTML = `
    ${m.previewGif ? `<img class="modal-gif" src="${m.previewGif}" alt="${m.name} preview">` : ""}

    <div class="modal-header-row">
      <h3 class="modal-title">${m.name}</h3>
      <span class="modal-version-badge">${m.version}</span>
    </div>
    <div class="modal-meta">${m.size || 'TBD'} &middot; updated ${m.updated} &middot; ${DATA[gk].name} / ${cat.label}</div>

    ${m.description ? `
      <div class="modal-section">
        <div class="modal-section-h">Overview</div>
        <p class="modal-desc">${m.description}</p>
      </div>` : ""}

    ${m.features && m.features.length ? `
      <div class="modal-section">
        <div class="modal-section-h">Features</div>
        <ul class="modal-features">${m.features.map(f => `<li>${f}</li>`).join("")}</ul>
      </div>` : ""}

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

    <a class="dl-btn modal-dl ${isLive ? '' : 'dl-btn-disabled'}" ${isLive ? `href="${m.downloadUrl}"` : `href="#" onclick="return false;" aria-disabled="true"`}>
      ${isLive ? 'DOWNLOAD' : 'COMING SOON'}
    </a>
  `;
  document.getElementById("modModal").classList.add("show");
}

function closeModPopup() {
  document.getElementById("modModal").classList.remove("show");
}

/* ---------- SEARCH ---------- */
function buildSearchIndex() {
  let items = [];
  Object.keys(DATA).forEach(gk => {
    const g = DATA[gk];
    items.push({ type: "game", label: g.name, gk, ck: Object.keys(g.categories)[0] });
    Object.keys(g.categories).forEach(ck => {
      const cat = g.categories[ck];
      items.push({ type: "category", label: cat.label + " \u2014 " + g.name, gk, ck });
      cat.mods.forEach(m => {
        items.push({ type: "mod", label: m.name, sub: cat.label + " \u2014 " + g.name, gk, ck });
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
  if (e.key === "Escape") closeModPopup();
});

renderGameGrid();
renderDropdown();
renderInstallIndex();
renderModBrowser();
