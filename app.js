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

  // Lenis & GSAP Init
  let lenis;
  if (window.Lenis && window.gsap && window.ScrollTrigger && window.Flip) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.2,
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger, Flip);

    // Smart Header
    const showAnim = gsap.from('.site-header', { 
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) showAnim.play();
        else showAnim.reverse();
      }
    });
  }

  function initScrollReveals() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !window.gsap) {
      document.querySelectorAll('.reveal').forEach(el => el.style.opacity = 1);
      return;
    }
    ScrollTrigger.batch(".reveal", {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        ease: "power3.out",
        duration: 0.8
      }),
      start: "top 85%"
    });
  }

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
              ${artist.avatarUrl ? `<img src="${artist.avatarUrl}" alt="${artist.name}" loading="lazy" />` : `<span></span><span></span><span></span>`}
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
          <p>Попробуйте другое название, трек, язык или артиста.</p>
        </div>
      `;
      return;
    }

    
    const htmlString = filtered.map((release) => {
      const artist = artistsById.get(release.artistId);
      const firstTracks = release.tracks.slice(0, 5);
      const hasMore = release.tracks.length > firstTracks.length;
      return `
        <article class="release-card reveal" data-id="${release.id}" style="--accent:${artist.accent}; --secondary:${artist.secondary}">
          ${releaseCover(release)}
          <div class="release-body">
            <p class="release-meta">${artist.name} · ${release.type} · ${release.genre}</p>
            <h3>${release.title}</h3>
            <p>${release.story}</p>
            <dl class="release-facts">
              <div><dt>Дата</dt><dd>${release.dateLabel}</dd></div>
              <div><dt>Язык</dt><dd>${release.language || "инструментал"}</dd></div>
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
    }).join("");

    if (window.Flip && elements.releaseGrid.children.length > 0) {
      const stateObj = Flip.getState(".release-card");
      elements.releaseGrid.innerHTML = htmlString;
      Flip.from(stateObj, {
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05,
        absolute: true,
        onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.96}, {opacity: 1, scale: 1, duration: 0.4}),
        onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.96, duration: 0.3}),
        onComplete: () => ScrollTrigger.refresh()
      });
    } else {
      elements.releaseGrid.innerHTML = htmlString;
      if (window.ScrollTrigger) ScrollTrigger.refresh();
      initScrollReveals();
    }


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

  function initAmbient3D() {
    if (!window.THREE) return;

    // 1. Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '-1',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at center, #15131a 0%, #0a090c 100%)' 
    });
    document.body.prepend(canvas);

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a090c, 0.0025);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 3. Cyber-Gothic Elements

    // A. Abstract floating monoliths / wireframes via InstancedMesh (1 draw call)
    const monoGeo = new THREE.OctahedronGeometry(1.5, 0);
    const monoMat = new THREE.MeshBasicMaterial({ 
      color: 0x4a4a5a, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    });
    
    const monoCount = 45;
    const instancedMono = new THREE.InstancedMesh(monoGeo, monoMat, monoCount);
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < monoCount; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 100 - 20
      );
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = Math.random() * 2 + 0.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      instancedMono.setMatrixAt(i, dummy.matrix);
    }
    scene.add(instancedMono);

    // B. Ambient Dust / Data particles (1 draw call)
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 400 : 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x8899aa,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // 4. Parallax & Resize
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    // 5. Render Loop (Performance optimized)
    const clock = new THREE.Clock();
    let isVisible = true;
    
    document.addEventListener("visibilitychange", () => {
      isVisible = document.visibilityState === 'visible';
    });

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Drift
      instancedMono.rotation.y += delta * 0.015;
      instancedMono.rotation.x += delta * 0.01;
      particles.rotation.y -= delta * 0.02;
      particles.position.y = Math.sin(elapsed * 0.2) * 2;

      // Parallax easing
      targetX = mouseX * 2;
      targetY = mouseY * 2;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    
    animate();
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
    initScrollReveals();
        initAmbient3D();
  }

  init();
})();
