/* ==========================================================================
   NEXORA — projects.js
   Renders the portfolio grid from NEXORA_DATA and wires the filter bar.
   ========================================================================== */

(function(){
  const grid = document.querySelector("[data-project-grid]");
  if(!grid || !window.NEXORA_DATA) return;

  function cardHTML(p){
    return (
      '<div class="card project-card reveal in" data-cat="' + p.cat + '" id="' + p.id + '">' +
        '<div class="icon-tile grad-' + p.color + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 4v5"/></svg>' +
        '</div>' +
        '<span class="pill">' + p.cat + '</span>' +
        '<h3 style="margin-top:14px;font-size:19px;">' + p.title + '</h3>' +
        '<p>' + p.desc + '</p>' +
        '<div class="chip-row">' + p.tags.map(function(t){ return '<span class="pill">' + t + '</span>'; }).join("") + '</div>' +
        '<a href="#" class="card-link" data-modal-open="#project-modal" data-project-title="' + p.title + '" data-project-desc="' + p.desc + '" style="margin-top:18px;">View Project ' + ICON.arrow + '</a>' +
      '</div>'
    );
  }

  grid.innerHTML = NEXORA_DATA.projects.map(cardHTML).join("");

  // filter
  const filterBar = document.querySelector("[data-project-filters]");
  if(filterBar){
    filterBar.addEventListener("click", function(e){
      const btn = e.target.closest(".filter-btn");
      if(!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter");
      grid.querySelectorAll(".project-card").forEach(function(card){
        const show = cat === "All" || card.getAttribute("data-cat") === cat;
        card.classList.toggle("hidden-item", !show);
      });
    });
  }

  // view project modal fill
  const modalTitle = document.querySelector("#project-modal [data-project-title]");
  const modalDesc = document.querySelector("#project-modal [data-project-desc]");
  document.addEventListener("click", function(e){
    const trigger = e.target.closest("[data-project-title]");
    if(!trigger || !trigger.hasAttribute("data-modal-open")) return;
    if(modalTitle) modalTitle.textContent = trigger.getAttribute("data-project-title");
    if(modalDesc) modalDesc.textContent = trigger.getAttribute("data-project-desc");
  });
})();
