/* منطق العرض — لا حاجة لتعديل هذا الملف */
(function () {
  const S = window.SITE;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.8-2.8l.8-1-1-2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.6v3h2.7V21z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.5 2.3 4.2 5 4.5"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="m9 13 8-6"/></svg>',
    maps: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    join: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="3.5"/><path d="M3.5 20a6.5 6.5 0 0 1 11.5-4.2"/><path d="M19 14v6M16 17h6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>'
  };

  const vi = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const VALUE_ICONS = {
    heart: vi('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
    shield: vi('<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>'),
    clock: vi('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    key: vi('<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2 2M14 9l2 2"/>'),
    hands: vi('<path d="M3 12l4-4 4 3 3-3 7 5"/><path d="M7 14l3 3c.8.8 2 .8 2.8 0L17 13"/><path d="M3 12v3l3 3M21 13v2l-3 3"/>'),
    team: vi('<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14.5 15.5A4 4 0 0 1 20.5 19"/>'),
    bulb: vi('<path d="M9 17h6M10 20.5h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
    star: vi('<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),
    eye: vi('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'),
    book: vi('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>')
  };

  const fmtDate = (d) => {
    try {
      return new Intl.DateTimeFormat("ar-DZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d + "T12:00:00"));
    } catch { return d; }
  };
  const ph = (src, alt) =>
    src ? `<div class="ph"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></div>` : `<div class="ph empty"></div>`;
  const sortedEvents = () => [...S.events].sort((a, b) => b.date.localeCompare(a.date));

  /* ---------- الصفحة الرئيسية ---------- */
  function renderHome() {
    document.title = S.name + " " + S.subname;
    $("#logo").innerHTML = S.logo ? `<img src="${esc(S.logo)}" alt="شعار ${esc(S.name)} ${esc(S.subname)}">` : `<span>M</span>`;
    if (S.logo) $(".hero").classList.add("has-logo");
    $("#name").textContent = S.name;
    $("#subname").textContent = S.subname;
    $("#tagline").textContent = S.tagline;
    $("#about").innerHTML = [].concat(S.about).map((p) => `<p>${esc(p)}</p>`).join("");
    $("#scope").innerHTML = S.scope ? `${ICONS.maps}<span>نطاق نشاطنا: ${esc(S.scope)}</span>` : "";
    $("#vision").textContent = S.vision || "";
    $("#mission").textContent = S.mission || "";
    $("#goals").innerHTML = (S.goals || []).map((g) => `<li><strong>${esc(g.title)}</strong><span>${esc(g.text)}</span></li>`).join("");
    $("#values").innerHTML = (S.values || [])
      .map((v) => (typeof v === "string" ? { name: v } : v))
      .map((v) => `<div class="value">
          <span class="v-ico">${VALUE_ICONS[v.icon] || VALUE_ICONS.star}</span>
          <strong>${esc(v.name)}</strong>
          ${v.text ? `<span class="v-txt">${esc(v.text)}</span>` : ""}
        </div>`)
      .join("");

    $("#stats").innerHTML = (S.stats || [])
      .filter((s) => s.value)
      .map((s) => `<div class="stat"><b>${esc(s.prefix || "")}${esc(s.value)}</b><span>${esc(s.label)}</span></div>`)
      .join("");

    if (S.groupPhoto) $("#groupPhoto").innerHTML = `<img src="${esc(S.groupPhoto)}" alt="صورة جماعية لطلبة المكتب" loading="lazy">`;

    const c = S.contacts;
    const joinHref = c.whatsapp && `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(S.joinMessage || "")}`;
    const joinBtn = joinHref
      ? `<a class="btn-join" href="${esc(joinHref)}" target="_blank" rel="noopener">${ICONS.join}انضم إلينا: عرّف بنفسك</a>` : "";
    $("#wa").innerHTML = c.whatsapp
      ? `<a class="btn-main" href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${ICONS.whatsapp}راسلنا على واتساب</a>
         ${joinBtn}
         <div class="phone-line"><a href="tel:+${esc(c.whatsapp)}">${esc(c.phoneDisplay)}</a></div>`
      : "";
    $("#join2").innerHTML = joinHref ? `<a class="btn-main" href="${esc(joinHref)}" target="_blank" rel="noopener">${ICONS.whatsapp}انضم إلينا عبر واتساب</a>` : "";

    const links = [
      ["facebook", "فيسبوك", c.facebook],
      ["instagram", "إنستغرام", c.instagram],
      ["email", "الإيميل", c.email && "mailto:" + c.email],
      ["tiktok", "تيك توك", c.tiktok],
      ["youtube", "يوتيوب", c.youtube],
      ["telegram", "تلغرام", c.telegram],
      ["phone", "اتصل بنا", c.whatsapp && "tel:+" + c.whatsapp],
      ["maps", "موقعنا", c.maps]
    ].filter((l) => l[2]);
    $("#socials").innerHTML = links
      .map(([k, label, href]) => `<a class="social" href="${esc(href)}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${ICONS[k]}<span>${label}</span></a>`)
      .join("");

    $("#events").innerHTML = sortedEvents()
      .map((e) => `<a class="event" href="event.html?id=${encodeURIComponent(e.id)}">
          ${ph(e.cover || e.photos.find(Boolean), e.title)}
          <div class="body">
            <span class="date">${fmtDate(e.date)}${e.category ? ` · ${esc(e.category)}` : ""}</span>
            <h3>${esc(e.title)}</h3>
            <p>${esc(e.summary)}</p>
            <span class="more">اقرأ التقرير ←</span>
          </div></a>`)
      .join("");

    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- صفحة الفعالية ---------- */
  function renderEvent() {
    const id = new URLSearchParams(location.search).get("id");
    const e = S.events.find((x) => x.id === id);
    $("#back").innerHTML = ICONS.back + "الرئيسية";
    $("#share").innerHTML = ICONS.share + "مشاركة";
    if (!e) {
      $("#main").innerHTML = `<div class="notfound"><h2>الفعالية غير موجودة</h2><p><a href="./">العودة إلى الصفحة الرئيسية</a></p></div>`;
      return;
    }
    document.title = e.title + " — " + S.name;
    const photos = e.photos.filter(Boolean);
    const shown = photos.length ? photos : e.photos; // يعرض أماكن فارغة في النموذج
    $("#main").innerHTML = `
      <div class="ev-cover ph ${e.cover || photos[0] ? "" : "empty"}">${e.cover || photos[0] ? `<img src="${esc(e.cover || photos[0])}" alt="${esc(e.title)}">` : ""}</div>
      <div class="ev-head">
        ${e.logo ? `<img class="ev-logo" src="${esc(e.logo)}" alt="شعار ${esc(e.title)}">` : ""}
        <h1>${esc(e.title)}</h1>
        <div class="ev-meta">
          <span class="chip">📅 ${fmtDate(e.date)}${e.hijri ? ` · ${esc(e.hijri)}` : ""}</span>
          ${e.time ? `<span class="chip">🕗 ${esc(e.time)}</span>` : ""}
          ${e.place ? `<span class="chip">📍 ${esc(e.place)}</span>` : ""}
          ${e.category ? `<span class="chip">${esc(e.category)}</span>` : ""}
        </div>
        ${e.intro ? `<p class="ev-intro">${esc(e.intro)}</p>` : ""}
      </div>
      ${e.speakers && e.speakers.length ? `<section>
        <h2 class="sec-title">${e.speakers.length > 1 ? "المحاضرات" : "المحاضرة"}</h2>
        <div class="speakers">${e.speakers.map((s, i) => `
          <article class="speaker">
            <span class="sp-num">${i + 1}</span>
            <div>
              <h3>«${esc(s.topic)}»</h3>
              <p class="sp-name">${esc(s.name)}</p>
              ${s.role ? `<p class="sp-role">${esc(s.role)}</p>` : ""}
            </div>
          </article>`).join("")}
        </div></section>` : ""}
      <section class="ev-report">
        <h2 class="sec-title">التقرير</h2>
        ${e.report.map((p) => `<p>${esc(p)}</p>`).join("")}
      </section>
      ${shown.length ? `<section><h2 class="sec-title">صور من الفعالية</h2>
        <div class="gallery">${shown.map((p) => (p ? `<div class="ph" data-src="${esc(p)}"><img src="${esc(p)}" alt="" loading="lazy"></div>` : `<div class="ph empty"></div>`)).join("")}</div></section>` : ""}
      ${e.video ? `<section><h2 class="sec-title">${esc(e.videoTitle || "فيديو البرنامج")}</h2>
        <div class="ev-video"><video src="${esc(e.video)}"${e.videoPoster ? ` poster="${esc(e.videoPoster)}"` : ""} controls playsinline preload="none"></video></div></section>` : ""}
      ${e.poster ? `<section><h2 class="sec-title">إعلان البرنامج</h2>
        <div class="poster" data-src="${esc(e.poster)}"><img src="${esc(e.poster)}" alt="إعلان ${esc(e.title)}" loading="lazy"></div></section>` : ""}
    `;

    const lb = $("#lightbox");
    document.querySelectorAll(".gallery [data-src], .poster[data-src]").forEach((el) =>
      el.addEventListener("click", () => { lb.querySelector("img").src = el.dataset.src; lb.classList.add("open"); })
    );
    lb.addEventListener("click", () => lb.classList.remove("open"));
    document.addEventListener("keydown", (k) => k.key === "Escape" && lb.classList.remove("open"));

    $("#share").addEventListener("click", async () => {
      const data = { title: e.title, url: location.href };
      if (navigator.share) { try { await navigator.share(data); } catch {} return; }
      try { await navigator.clipboard.writeText(location.href); toast("تم نسخ الرابط"); } catch { toast(location.href); }
    });
  }

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 1800);
  }

  document.body.dataset.page === "event" ? renderEvent() : renderHome();
})();
