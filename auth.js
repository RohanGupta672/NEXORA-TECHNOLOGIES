/* ==========================================================================
   NEXORA — auth.js
   Frontend-only demo authentication. Not production-grade: passwords are
   stored in localStorage in plain form purely for demo purposes.
   ========================================================================== */

(function(){
  const USERS_KEY = "nexora_users";
  const SESSION_KEY = "nexora_current_user";

  function getUsers(){ return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
  function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setError(field, msg){
    field.classList.add("error");
    const e = field.querySelector(".field-error");
    if(e) e.textContent = msg;
  }
  function clearError(field){ field.classList.remove("error"); }

  /* ---------------- register ---------------- */
  const regForm = document.querySelector("#register-form");
  if(regForm){
    regForm.addEventListener("submit", function(e){
      e.preventDefault();
      let valid = true;
      const name = regForm.querySelector("#r-name");
      const email = regForm.querySelector("#r-email");
      const pass = regForm.querySelector("#r-password");
      const confirm = regForm.querySelector("#r-confirm");

      [name, email, pass, confirm].forEach(function(f){ clearError(f.closest(".field")); });

      if(name.value.trim().length < 2){ setError(name.closest(".field"), "Please enter your full name."); valid = false; }
      if(!isEmail(email.value.trim())){ setError(email.closest(".field"), "Please enter a valid email address."); valid = false; }
      if(pass.value.length < 6){ setError(pass.closest(".field"), "Password must be at least 6 characters."); valid = false; }
      if(confirm.value !== pass.value){ setError(confirm.closest(".field"), "Passwords do not match."); valid = false; }

      const users = getUsers();
      if(valid && users.some(function(u){ return u.email === email.value.trim().toLowerCase(); })){
        setError(email.closest(".field"), "An account with this email already exists.");
        valid = false;
      }

      if(!valid){ showToast("Please fix the highlighted fields.", "error"); return; }

      users.push({ name:name.value.trim(), email:email.value.trim().toLowerCase(), password:pass.value, joined:new Date().toISOString() });
      saveUsers(users);
      showToast("Account created! Redirecting to login…", "success");
      setTimeout(function(){ location.href = "login.html"; }, 1000);
    });
  }

  /* ---------------- login ---------------- */
  const loginForm = document.querySelector("#login-form");
  if(loginForm){
    loginForm.addEventListener("submit", function(e){
      e.preventDefault();
      const email = loginForm.querySelector("#l-email");
      const pass = loginForm.querySelector("#l-password");
      [email, pass].forEach(function(f){ clearError(f.closest(".field")); });

      const users = getUsers();
      const match = users.find(function(u){ return u.email === email.value.trim().toLowerCase() && u.password === pass.value; });

      if(!match){
        setError(pass.closest(".field"), "Incorrect email or password.");
        showToast("Login failed. Check your credentials.", "error");
        return;
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify({ name:match.name, email:match.email }));
      showToast("Welcome back, " + match.name.split(" ")[0] + "!", "success");
      setTimeout(function(){ location.href = "index.html"; }, 700);
    });
  }

  /* ---------------- forgot password ---------------- */
  const forgotForm = document.querySelector("#forgot-form");
  if(forgotForm){
    forgotForm.addEventListener("submit", function(e){
      e.preventDefault();
      const email = forgotForm.querySelector("#f-email");
      clearError(email.closest(".field"));
      if(!isEmail(email.value.trim())){ setError(email.closest(".field"), "Please enter a valid email address."); return; }
      showToast("If an account exists for that email, reset instructions were sent.", "success");
      forgotForm.reset();
    });
  }

})();
