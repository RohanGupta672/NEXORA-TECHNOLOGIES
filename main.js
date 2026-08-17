/* ==========================================================================
   NEXORA — main.js
   Global behaviours shared by every page: theme, nav state, mobile menu,
   scroll reveal, animated counters, toasts, modal helper, FAQ, back-to-top.
   ========================================================================== */

(function(){

  /* ---------------- loader ---------------- */
  window.addEventListener("load", function(){
    var l = document.querySelector(".loader");
    if(l){ setTimeout(function(){ l.classList.add("hide"); }, 220); }
  });

  /* ---------------- theme (dark / light) ---------------- */
  const THEME_KEY = "nexora_theme";
  function applyTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(THEME_KEY, t);
    document.querySelectorAll("[data-theme-toggle]").forEach(function(btn){
      btn.innerHTML = t === "light" ? ICON.moon : ICON.sun;
    });
  }
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  document.addEventListener("click", function(e){
    const btn = e.target.closest("[data-theme-toggle]");
    if(!btn) return;
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });

  /* ---------------- navbar scroll state ---------------- */
  const nav = document.querySelector(".navbar");
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 12) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");

    const backTop = document.querySelector(".back-top");
    if(backTop){
      if(window.scrollY > 500) backTop.classList.add("show");
      else backTop.classList.remove("show");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------------- mobile menu ---------------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if(hamburger && mobileMenu){
    hamburger.addEventListener("click", function(){
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------- active nav link ---------------- */
  (function markActive(){
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function(a){
      const href = a.getAttribute("href");
      if(href === path) a.classList.add("active");
    });
  })();

  /* ---------------- back to top ---------------- */
  document.addEventListener("click", function(e){
    if(e.target.closest(".back-top")){
      window.scrollTo({ top:0, behavior:"smooth" });
    }
  });

  /* ---------------- scroll reveal ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && revealEls.length){
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------------- animated counters ---------------- */
  function animateCounter(el){
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = el.getAttribute("data-count").includes(".") ? 1 : 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(1) : Math.floor(val)) + suffix;
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll("[data-count]");
  if(counters.length){
    if("IntersectionObserver" in window){
      const cio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){ animateCounter(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold:0.4 });
      counters.forEach(function(c){ cio.observe(c); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------- FAQ accordion ---------------- */
  document.addEventListener("click", function(e){
    const q = e.target.closest(".faq-q");
    if(!q) return;
    const item = q.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    item.parentElement.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); });
    if(!wasOpen) item.classList.add("open");
  });

  /* ---------------- footer year ---------------- */
  document.querySelectorAll("[data-year]").forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* ---------------- toast system (global) ---------------- */
  function ensureStack(){
    let stack = document.querySelector(".toast-stack");
    if(!stack){
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    return stack;
  }
  window.showToast = function(message, type){
    type = type || "success";
    const stack = ensureStack();
    const t = document.createElement("div");
    t.className = "toast " + type;
    t.innerHTML = '<span class="toast-dot"></span><span>' + message + "</span>";
    stack.appendChild(t);
    setTimeout(function(){
      t.style.transition = "opacity .3s ease, transform .3s ease";
      t.style.opacity = "0";
      t.style.transform = "translateX(20px)";
      setTimeout(function(){ t.remove(); }, 300);
    }, 3600);
  };

  /* ---------------- modal helper (generic) ---------------- */
  document.addEventListener("click", function(e){
    const opener = e.target.closest("[data-modal-open]");
    if(opener){
      const sel = opener.getAttribute("data-modal-open");
      const el = document.querySelector(sel);
      if(el) el.classList.add("open");
    }
    const closer = e.target.closest("[data-modal-close]");
    if(closer){
      const overlay = closer.closest(".overlay");
      if(overlay) overlay.classList.remove("open");
    }
    if(e.target.classList && e.target.classList.contains("overlay")){
      e.target.classList.remove("open");
    }
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      document.querySelectorAll(".overlay.open").forEach(function(o){ o.classList.remove("open"); });
    }
  });

  /* ---------------- generic hero particle field ---------------- */
  const field = document.querySelector(".hero-particles");
  if(field && !field.dataset.built){
    field.dataset.built = "1";
    for(let i=0;i<26;i++){
      const s = document.createElement("span");
      s.style.top = Math.random()*100 + "%";
      s.style.left = Math.random()*100 + "%";
      s.style.animationDelay = (Math.random()*6) + "s";
      s.style.opacity = (0.3 + Math.random()*0.6).toFixed(2);
      field.appendChild(s);
    }
  }

  /* ---------------- auth-aware nav state ---------------- */
  const currentUser = JSON.parse(localStorage.getItem("nexora_current_user") || "null");
  document.querySelectorAll("[data-auth-slot]").forEach(function(slot){
    if(currentUser){
      slot.innerHTML = '<a href="#" class="btn btn-outline btn-sm" data-logout>Logout (' + currentUser.name.split(" ")[0] + ")</a>";
    }
  });
  document.addEventListener("click", function(e){
    if(e.target.closest("[data-logout]")){
      e.preventDefault();
      localStorage.removeItem("nexora_current_user");
      showToast("You have been logged out.", "success");
      setTimeout(function(){ location.href = "index.html"; }, 700);
    }
  });

  /* ---------------- testimonial slider ---------------- */
  (function testimonials(){
    const wrap = document.querySelector("[data-testimonials]");
    if(!wrap || !window.NEXORA_DATA) return;
    const list = NEXORA_DATA.testimonials;
    const slideBox = wrap.querySelector(".testi-slides");
    const dotsBox = wrap.querySelector(".testi-dots");
    slideBox.innerHTML = list.map(function(t, i){
      return '<div class="testi-slide' + (i===0 ? " active" : "") + '">' +
        '<div class="testi-stars">' + ICON.star.repeat(t.rating) + '</div>' +
        '<p class="testi-quote">“' + t.quote + '”</p>' +
        '<div class="testi-person"><div class="testi-avatar">' + t.i + '</div><div><b>' + t.name + '</b><span>' + t.company + '</span></div></div>' +
      '</div>';
    }).join("");
    dotsBox.innerHTML = list.map(function(_, i){ return '<button class="' + (i===0?"active":"") + '" data-i="' + i + '"></button>'; }).join("");

    let idx = 0;
    const slides = slideBox.querySelectorAll(".testi-slide");
    const dots = dotsBox.querySelectorAll("button");
    function go(n){
      idx = (n + slides.length) % slides.length;
      slides.forEach(function(s,i){ s.classList.toggle("active", i===idx); });
      dots.forEach(function(d,i){ d.classList.toggle("active", i===idx); });
    }
    wrap.querySelectorAll(".testi-arrow.next").forEach(function(b){ b.addEventListener("click", function(){ go(idx+1); resetAuto(); }); });
    wrap.querySelectorAll(".testi-arrow.prev").forEach(function(b){ b.addEventListener("click", function(){ go(idx-1); resetAuto(); }); });
    dotsBox.addEventListener("click", function(e){
      const b = e.target.closest("button");
      if(!b) return;
      go(parseInt(b.getAttribute("data-i"), 10));
      resetAuto();
    });
    let timer = setInterval(function(){ go(idx+1); }, 5500);
    function resetAuto(){ clearInterval(timer); timer = setInterval(function(){ go(idx+1); }, 5500); }
  })();

  /* ---------------- pricing toggle (monthly / yearly) ---------------- */
  (function pricing(){
    const toggle = document.querySelector("[data-pricing-toggle]");
    if(!toggle) return;
    toggle.addEventListener("click", function(){
      const on = toggle.classList.toggle("on");
      document.querySelectorAll("[data-price-monthly]").forEach(function(el){
        el.style.display = on ? "none" : "";
      });
      document.querySelectorAll("[data-price-yearly]").forEach(function(el){
        el.style.display = on ? "" : "none";
      });
    });
  })();

})();

/* small inline icon set reused by JS-rendered markup */
const ICON = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
  star: '★'
};
