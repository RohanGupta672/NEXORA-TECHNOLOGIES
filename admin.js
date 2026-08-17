/* ==========================================================================
   NEXORA — admin.js
   Frontend-only demo admin dashboard. Credentials: admin / admin123.
   Reads and manages contact messages, applications and demo content
   entirely from localStorage — no server or database involved.
   ========================================================================== */

(function(){
  const ADMIN_SESSION = "nexora_admin_session";
  const loginScreen = document.querySelector("#admin-login-screen");
  const dashScreen = document.querySelector("#admin-dashboard");
  if(!loginScreen || !dashScreen) return;

  function isLoggedIn(){ return sessionStorage.getItem(ADMIN_SESSION) === "1"; }

  function showDashboard(){
    loginScreen.style.display = "none";
    dashScreen.style.display = "block";
    renderDashboard();
  }
  function showLogin(){
    loginScreen.style.display = "flex";
    dashScreen.style.display = "none";
  }

  const loginForm = document.querySelector("#admin-login-form");
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const u = document.querySelector("#adm-user").value.trim();
    const p = document.querySelector("#adm-pass").value;
    const errEl = document.querySelector("#admin-login-error");
    if(u === "admin" && p === "admin123"){
      sessionStorage.setItem(ADMIN_SESSION, "1");
      errEl.style.display = "none";
      showToast("Welcome back, Admin.", "success");
      showDashboard();
    } else {
      errEl.style.display = "block";
      errEl.textContent = "Invalid username or password. Try admin / admin123.";
    }
  });

  document.addEventListener("click", function(e){
    if(e.target.closest("[data-admin-logout]")){
      sessionStorage.removeItem(ADMIN_SESSION);
      showToast("Logged out of admin dashboard.", "success");
      showLogin();
    }
    const delBtn = e.target.closest("[data-del-msg]");
    if(delBtn){
      removeItem("nexora_messages", delBtn.getAttribute("data-del-msg"));
      renderDashboard();
    }
    const delApp = e.target.closest("[data-del-app]");
    if(delApp){
      removeItem("nexora_applications", delApp.getAttribute("data-del-app"));
      renderDashboard();
    }
    const tabBtn = e.target.closest("[data-admin-tab]");
    if(tabBtn){
      document.querySelectorAll("[data-admin-tab]").forEach(function(b){ b.classList.remove("active"); });
      tabBtn.classList.add("active");
      document.querySelectorAll("[data-admin-panel]").forEach(function(p){ p.style.display = "none"; });
      const panel = document.querySelector('[data-admin-panel="' + tabBtn.getAttribute("data-admin-tab") + '"]');
      if(panel) panel.style.display = "block";
    }
  });

  function removeItem(key, id){
    const arr = JSON.parse(localStorage.getItem(key) || "[]").filter(function(i){ return i.id !== id; });
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function esc(s){ return (s || "").toString().replace(/[<>&]/g, function(c){ return { "<":"&lt;", ">":"&gt;", "&":"&amp;" }[c]; }); }

  function renderDashboard(){
    const messages = JSON.parse(localStorage.getItem("nexora_messages") || "[]");
    const applications = JSON.parse(localStorage.getItem("nexora_applications") || "[]");
    const projects = (window.NEXORA_DATA && NEXORA_DATA.projects) || [];
    const posts = (window.NEXORA_DATA && NEXORA_DATA.blog) || [];

    document.querySelector("#stat-projects").textContent = projects.length;
    document.querySelector("#stat-messages").textContent = messages.length;
    document.querySelector("#stat-applications").textContent = applications.length;
    document.querySelector("#stat-posts").textContent = posts.length;

    const msgBody = document.querySelector("#messages-table");
    msgBody.innerHTML = messages.length ? messages.map(function(m){
      return '<tr><td>' + esc(m.name) + '</td><td>' + esc(m.email) + '</td><td>' + esc(m.service||"—") + '</td>' +
        '<td>' + new Date(m.date).toLocaleDateString() + '</td>' +
        '<td><button class="btn btn-ghost btn-sm" data-del-msg="' + m.id + '">Delete</button></td></tr>';
    }).join("") : '<tr><td colspan="5" class="small" style="padding:20px 8px;">No contact messages yet.</td></tr>';

    const appBody = document.querySelector("#applications-table");
    appBody.innerHTML = applications.length ? applications.map(function(a){
      return '<tr><td>' + esc(a.name) + '</td><td>' + esc(a.role) + '</td><td>' + esc(a.email) + '</td>' +
        '<td>' + new Date(a.date).toLocaleDateString() + '</td>' +
        '<td><button class="btn btn-ghost btn-sm" data-del-app="' + a.id + '">Delete</button></td></tr>';
    }).join("") : '<tr><td colspan="5" class="small" style="padding:20px 8px;">No job applications yet.</td></tr>';

    const projBody = document.querySelector("#projects-table");
    if(projBody){
      projBody.innerHTML = projects.map(function(p){
        return '<tr><td>' + esc(p.title) + '</td><td>' + esc(p.cat) + '</td><td>' + esc(p.tags.join(", ")) + '</td></tr>';
      }).join("");
    }
    const postBody = document.querySelector("#posts-table");
    if(postBody){
      postBody.innerHTML = posts.map(function(b){
        return '<tr><td>' + esc(b.title) + '</td><td>' + esc(b.cat) + '</td><td>' + new Date(b.date).toLocaleDateString() + '</td></tr>';
      }).join("");
    }
  }

  if(isLoggedIn()) showDashboard(); else showLogin();
})();
