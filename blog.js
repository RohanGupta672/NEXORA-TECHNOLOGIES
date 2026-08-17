/* ==========================================================================
   NEXORA — blog.js
   Renders blog cards from NEXORA_DATA, wires category filter + search.
   ========================================================================== */

(function(){
  const grid = document.querySelector("[data-blog-grid]");
  if(!grid || !window.NEXORA_DATA) return;

  function fmtDate(d){
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
  }

  function cardHTML(b){
    return (
      '<a href="blog-post.html?id=' + b.id + '" class="card blog-card reveal in" data-cat="' + b.cat + '" data-title="' + b.title.toLowerCase() + '">' +
        '<span class="pill">' + b.cat + '</span>' +
        '<h3 style="margin-top:16px;font-size:19px;">' + b.title + '</h3>' +
        '<p>' + b.excerpt + '</p>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">' +
          '<span class="small">' + fmtDate(b.date) + '</span>' +
          '<span class="card-link">Read More ' + ICON.arrow + '</span>' +
        '</div>' +
      '</a>'
    );
  }

  grid.innerHTML = NEXORA_DATA.blog.map(cardHTML).join("");

  function applyFilters(){
    const activeBtn = document.querySelector("[data-blog-filters] .filter-btn.active");
    const cat = activeBtn ? activeBtn.getAttribute("data-filter") : "All";
    const q = (document.querySelector("[data-blog-search]") || {}).value || "";
    const query = q.toLowerCase().trim();
    let visible = 0;
    grid.querySelectorAll(".blog-card").forEach(function(card){
      const matchesCat = cat === "All" || card.getAttribute("data-cat") === cat;
      const matchesQuery = !query || card.getAttribute("data-title").indexOf(query) !== -1;
      const show = matchesCat && matchesQuery;
      card.classList.toggle("hidden-item", !show);
      if(show) visible++;
    });
    const empty = document.querySelector("[data-blog-empty]");
    if(empty) empty.style.display = visible ? "none" : "block";
  }

  const filterBar = document.querySelector("[data-blog-filters]");
  if(filterBar){
    filterBar.addEventListener("click", function(e){
      const btn = e.target.closest(".filter-btn");
      if(!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      applyFilters();
    });
  }
  const searchInput = document.querySelector("[data-blog-search]");
  if(searchInput) searchInput.addEventListener("input", applyFilters);

  /* ---- blog detail page rendering ---- */
  const detail = document.querySelector("[data-blog-detail]");
  if(detail){
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const post = NEXORA_DATA.blog.find(function(b){ return b.id === id; }) || NEXORA_DATA.blog[0];
    document.title = post.title + " — Nexora Technologies Blog";
    detail.innerHTML =
      '<span class="pill">' + post.cat + '</span>' +
      '<h1 style="margin-top:18px;">' + post.title + '</h1>' +
      '<p class="small" style="margin-bottom:34px;">' + fmtDate(post.date) + ' · Nexora Editorial Team</p>' +
      '<p style="font-size:18px;color:var(--ink);">' + post.excerpt + '</p>' +
      '<p>Technology moves fastest where business need meets engineering discipline. In this piece, our team unpacks the practical shifts we are seeing across client engagements, the trade-offs teams should weigh before committing budget, and where the real leverage sits for organizations investing in ' + post.cat.toLowerCase() + ' this year.</p>' +
      '<p>We start with the fundamentals: clear ownership, measurable outcomes and infrastructure that can flex as demand changes. From there, the conversation turns to implementation — the sequencing that keeps risk low while still moving quickly, and the signals that tell a team when it is ready to scale a pilot into a full rollout.</p>' +
      '<p>As with most of our engagements at Nexora, the details vary by industry, but the underlying pattern holds: start with a narrow, well-instrumented problem, prove the value, then expand deliberately. Teams that follow that sequence consistently outperform those that try to transform everything at once.</p>' +
      '<h3 style="margin-top:40px;">Key takeaways</h3>' +
      '<ul style="list-style:disc;padding-left:22px;color:var(--ink-dim);">' +
        '<li style="margin-bottom:8px;">Start with a narrow, measurable pilot before scaling company-wide.</li>' +
        '<li style="margin-bottom:8px;">Instrument outcomes early so success is provable, not anecdotal.</li>' +
        '<li style="margin-bottom:8px;">Choose infrastructure that can flex as usage and requirements change.</li>' +
      '</ul>';

    const related = document.querySelector("[data-blog-related]");
    if(related){
      const others = NEXORA_DATA.blog.filter(function(b){ return b.id !== post.id; }).slice(0,3);
      related.innerHTML = others.map(cardHTML).join("");
    }
  }
})();
