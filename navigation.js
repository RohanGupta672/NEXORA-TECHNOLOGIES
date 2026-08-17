/* ==========================================================================
   NEXORA — navigation.js
   Global search overlay: searches services, projects, blog posts,
   technologies and static pages, with live results.
   ========================================================================== */

(function(){
  const overlay = document.querySelector(".search-overlay");
  if(!overlay) return;
  const input = overlay.querySelector("input");
  const results = overlay.querySelector(".search-results");

  const staticPages = [
    { title:"Home", url:"index.html", type:"Page" },
    { title:"About Us", url:"about.html", type:"Page" },
    { title:"Services", url:"services.html", type:"Page" },
    { title:"Technologies", url:"technologies.html", type:"Page" },
    { title:"Projects", url:"projects.html", type:"Page" },
    { title:"Team", url:"team.html", type:"Page" },
    { title:"Careers", url:"careers.html", type:"Page" },
    { title:"Blog", url:"blog.html", type:"Page" },
    { title:"Contact", url:"contact.html", type:"Page" }
  ];

  function buildIndex(){
    const idx = [...staticPages];
    if(window.NEXORA_DATA){
      NEXORA_DATA.services.forEach(function(s){
        idx.push({ title:s.title, url:"services.html#"+s.id, type:"Service" });
      });
      NEXORA_DATA.projects.forEach(function(p){
        idx.push({ title:p.title, url:"projects.html#"+p.id, type:"Project" });
      });
      NEXORA_DATA.blog.forEach(function(b){
        idx.push({ title:b.title, url:"blog-post.html?id="+b.id, type:"Blog" });
      });
      Object.keys(NEXORA_DATA.technologies).forEach(function(k){
        NEXORA_DATA.technologies[k].forEach(function(t){
          idx.push({ title:t, url:"technologies.html", type:"Technology" });
        });
      });
    }
    return idx;
  }
  const INDEX = buildIndex();

  function render(query){
    if(!query){
      results.innerHTML = '<div class="search-empty">Start typing to search services, projects, blog posts, technologies and pages.</div>';
      return;
    }
    const q = query.toLowerCase();
    const matches = INDEX.filter(function(i){ return i.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 8);
    if(!matches.length){
      results.innerHTML = '<div class="search-empty">No results for “' + query + '”.</div>';
      return;
    }
    results.innerHTML = matches.map(function(m){
      return '<a class="search-result" href="' + m.url + '"><b>' + m.title + '</b><span>' + m.type + '</span></a>';
    }).join("");
  }

  document.addEventListener("click", function(e){
    const opener = e.target.closest("[data-search-open]");
    if(opener){
      overlay.classList.add("open");
      render("");
      setTimeout(function(){ input.focus(); }, 80);
    }
  });

  input.addEventListener("input", function(){ render(input.value.trim()); });
  render("");
})();
