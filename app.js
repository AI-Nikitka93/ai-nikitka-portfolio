(function () {
  const data = window.catalogData;
  const artistsById = new Map(data.artists.map((artist) => [artist.id, artist]));

  const state = {
    artistId: "all",
    query: "",
    spotlightId: "first-bell-stone"
  };

  const elements = {
    stats: document.querySelector("#stats"),
    heroLanes: document.querySelector("#heroLanes"),
    artistGrid: document.querySelector("#artistGrid"),
    artistFilters: document.querySelector("#artistFilters"),
    catalogSearch: document.querySelector("#catalogSearch"),
    releaseGrid: document.querySelector("#releaseGrid"),
    resultLine: document.querySelector("#resultLine"),
    timelineList: document.querySelector("#timelineList"),
    spotlightShell: document.querySelector("#spotlightShell")
  };

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function getReleaseText(release) {
    return [
      release.title,
      release.type,
      release.genre,
      release.language,
      release.dateLabel,
      release.upc,
      release.story,
      artistsById.get(release.artistId)?.name,
      release.tracks.join(" ")
    ].join(" ");
  }

  function getFilteredReleases() {
    const query = normalize(state.query);

    return data.releases
      .filter((release) => state.artistId === "all" || release.artistId === state.artistId)
      .filter((release) => !query || normalize(getReleaseText(release)).includes(query))
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "ru"));
  }

  function countTracks(releases = data.releases) {
    return releases.reduce((sum, release) => sum + release.tracks.length, 0);
  }

  function uniqueLanguages() {
    const set = new Set(data.releases.map((release) => release.language).filter(Boolean));
    return set.size;
  }

  function renderStats() {
    const albums = data.releases.filter((release) => release.type.toLowerCase().includes("альбом")).length;
    const latest = [...data.releases].sort((a, b) => b.date.localeCompare(a.date))[0];
    elements.stats.innerHTML = [
      ["Артиста", data.artists.length],
      ["Релизов", data.releases.length],
      ["Треков", countTracks()],
      ["Последний", latest.dateLabel]
    ]
      .map(
        ([label, value]) => `
          <div>
            <dt>${label}</dt>
            <dd>${value}</dd>
          </div>
        `
      )
      .join("");
  }

  function renderHeroLanes() {
    elements.heroLanes.innerHTML = data.artists
      .map((artist) => {
        const releases = data.releases.filter((release) => release.artistId === artist.id);
        const recent = [...releases].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

        return `
          <article class="scene-lane" style="--accent:${artist.accent}; --secondary:${artist.secondary}">
            <div>
              <strong>${artist.name}</strong>
              <span>${artist.shortLane}</span>
            </div>
            <div class="mini-spines" aria-label="${artist.name}: ${releases.length} релизов">
              ${recent.map((release, index) => `<i style="--i:${index}" title="${release.title}"></i>`).join("")}
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderArtists() {
    elements.artistGrid.innerHTML = data.artists
      .map((artist) => {
        const releases = data.releases.filter((release) => release.artistId === artist.id);
        const latest = [...releases].sort((a, b) => b.date.localeCompare(a.date))[0];

        return `
          <article class="artist-panel reveal" style="--accent:${artist.accent}; --secondary:${artist.secondary}">
            <div class="artist-visual ${artist.texture}" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div class="artist-copy">
              <p class="artist-kicker">${artist.lane}</p>
              <h3>${artist.name}</h3>
              <p>${artist.role}</p>
              <dl>
                <div><dt>Ядро</dt><dd>${artist.core}</dd></div>
                <div><dt>Язык</dt><dd>${artist.language}</dd></div>
                <div><dt>Релизов</dt><dd>${releases.length}</dd></div>
                <div><dt>Последний</dt><dd>${latest ? latest.title : "нет данных"}</dd></div>
              </dl>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderFilters() {
    const buttons = [
      { id: "all", name: "Все" },
      ...data.artists.map((artist) => ({ id: artist.id, name: artist.name }))
    ];

    elements.artistFilters.innerHTML = buttons
      .map((item) => {
        const pressed = state.artistId === item.id ? "true" : "false";
        return `<button type="button" class="filter-button" data-artist="${item.id}" aria-pressed="${pressed}">${item.name}</button>`;
      })
      .join("");
  }

  function releaseCover(release) {
    const artist = artistsById.get(release.artistId);
    const trackMarks = release.tracks.slice(0, 9).map((_, index) => `<i style="--i:${index}"></i>`).join("");

    return `
      <div class="release-cover ${artist.texture}" style="--accent:${artist.accent}; --secondary:${artist.secondary}" aria-hidden="true">
        <div class="cover-label">
          <span>${artist.shortLane}</span>
          <strong>${release.dateLabel}</strong>
        </div>
        <div class="cover-grooves">${trackMarks}</div>
      </div>
    `;
  }

  function renderReleases() {
    const filtered = getFilteredReleases();
    const totalTracks = countTracks(filtered);
    const artistName = state.artistId === "all" ? "всех артистов" : artistsById.get(state.artistId).name;

    elements.resultLine.textContent = `${filtered.length} релизов / ${totalTracks} треков для ${artistName}`;

    if (!filtered.length) {
      elements.releaseGrid.innerHTML = `
        <div class="empty-state">
          <h3>Ничего не найдено</h3>
          <p>Попробуйте другое название, UPC, язык или артиста.</p>
        </div>
      `;
      return;
    }

    elements.releaseGrid.innerHTML = filtered
      .map((release) => {
        const artist = artistsById.get(release.artistId);
        const firstTracks = release.tracks.slice(0, 5);
        const hasMore = release.tracks.length > firstTracks.length;

        return `
          <article class="release-card reveal" style="--accent:${artist.accent}; --secondary:${artist.secondary}">
            ${releaseCover(release)}
            <div class="release-body">
              <p class="release-meta">${artist.name} · ${release.type} · ${release.genre}</p>
              <h3>${release.title}</h3>
              <p>${release.story}</p>
              <dl class="release-facts">
                <div><dt>Дата</dt><dd>${release.dateLabel}</dd></div>
                <div><dt>Язык</dt><dd>${release.language}</dd></div>
                <div><dt>UPC</dt><dd>${release.upc || "не указан"}</dd></div>
                <div><dt>Треков</dt><dd>${release.tracks.length}</dd></div>
              </dl>
              <details class="tracklist">
                <summary>Треклист</summary>
                <ol>
                  ${release.tracks.map((track) => `<li>${track}</li>`).join("")}
                </ol>
              </details>
              <div class="release-actions">
                <button type="button" class="text-button" data-spotlight="${release.id}">В фокус</button>
                <span>${firstTracks.join(" · ")}${hasMore ? " · ..." : ""}</span>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    observeReveals();
  }

  function renderSpotlight() {
    const release = data.releases.find((item) => item.id === state.spotlightId) || data.releases[0];
    const artist = artistsById.get(release.artistId);

    elements.spotlightShell.innerHTML = `
      <div class="spotlight-art" style="--accent:${artist.accent}; --secondary:${artist.secondary}">
        ${releaseCover(release)}
      </div>
      <div class="spotlight-copy">
        <p class="eyebrow">В фокусе</p>
        <h2>${release.title}</h2>
        <p>${release.story}</p>
        <div class="spotlight-facts">
          <span>${artist.name}</span>
          <span>${release.type}</span>
          <span>${release.dateLabel}</span>
          <span>${release.tracks.length} треков</span>
        </div>
      </div>
    `;
  }

  function renderTimeline() {
    const releases = [...data.releases].sort((a, b) => b.date.localeCompare(a.date));

    elements.timelineList.innerHTML = releases
      .map((release) => {
        const artist = artistsById.get(release.artistId);
        return `
          <li class="timeline-item reveal" style="--accent:${artist.accent}">
            <time datetime="${release.date}">${release.dateLabel}</time>
            <div>
              <strong>${release.title}</strong>
              <span>${artist.name} · ${release.type} · ${release.genre}</span>
            </div>
          </li>
        `;
      })
      .join("");

    observeReveals();
  }

  function observeReveals() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal:not(.is-visible)").forEach((item) => observer.observe(item));
  }

  function bindEvents() {
    elements.artistFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-artist]");
      if (!button) return;
      state.artistId = button.dataset.artist;
      renderFilters();
      renderReleases();
    });

    elements.catalogSearch.addEventListener("input", (event) => {
      state.query = event.target.value.trim();
      renderReleases();
    });

    elements.releaseGrid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-spotlight]");
      if (!button) return;
      state.spotlightId = button.dataset.spotlight;
      renderSpotlight();
      document.querySelector("#spotlight").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function init() {
    renderStats();
    renderHeroLanes();
    renderArtists();
    renderFilters();
    renderSpotlight();
    renderReleases();
    renderTimeline();
    bindEvents();
    observeReveals();
  }

  init();
})();
