/* ==========================================================================
   NEXORA — forms.js
   Contact form validation + localStorage persistence, careers job list
   rendering, and the job application modal form.
   ========================================================================== */

(function(){

  function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isPhone(v){ return /^[0-9+\-\s()]{7,16}$/.test(v); }

  function setError(field, msg){
    field.classList.add("error");
    const e = field.querySelector(".field-error");
    if(e) e.textContent = msg;
  }
  function clearError(field){
    field.classList.remove("error");
  }

  /* ---------------- contact form ---------------- */
  const contactForm = document.querySelector("#contact-form");
  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      let valid = true;

      const name = contactForm.querySelector("#c-name");
      const email = contactForm.querySelector("#c-email");
      const phone = contactForm.querySelector("#c-phone");
      const message = contactForm.querySelector("#c-message");

      [name, email, phone, message].forEach(function(f){ clearError(f.closest(".field")); });

      if(name.value.trim().length < 2){ setError(name.closest(".field"), "Please enter your full name."); valid = false; }
      if(!isEmail(email.value.trim())){ setError(email.closest(".field"), "Please enter a valid email address."); valid = false; }
      if(phone.value.trim() && !isPhone(phone.value.trim())){ setError(phone.closest(".field"), "Please enter a valid phone number."); valid = false; }
      if(message.value.trim().length < 10){ setError(message.closest(".field"), "Message should be at least 10 characters."); valid = false; }

      if(!valid){ showToast("Please fix the highlighted fields.", "error"); return; }

      const record = {
        id: "msg_" + Date.now(),
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        company: (contactForm.querySelector("#c-company") || {}).value || "",
        service: (contactForm.querySelector("#c-service") || {}).value || "",
        budget: (contactForm.querySelector("#c-budget") || {}).value || "",
        message: message.value.trim(),
        date: new Date().toISOString()
      };
      const store = JSON.parse(localStorage.getItem("nexora_messages") || "[]");
      store.unshift(record);
      localStorage.setItem("nexora_messages", JSON.stringify(store));

      contactForm.reset();
      const modal = document.querySelector("#success-modal");
      if(modal){
        modal.querySelector("[data-success-text]").textContent = "Thanks, " + record.name.split(" ")[0] + " — your message has been received. Our team will get back to you shortly.";
        modal.classList.add("open");
      } else {
        showToast("Message sent successfully!", "success");
      }
    });
  }

  /* ---------------- careers: render job list ---------------- */
  const jobList = document.querySelector("[data-job-list]");
  if(jobList && window.NEXORA_DATA){
    jobList.innerHTML = NEXORA_DATA.jobs.map(function(j, i){
      return (
        '<div class="card reveal in" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px;">' +
          '<div>' +
            '<h3 style="font-size:18px;margin-bottom:8px;">' + j.title + '</h3>' +
            '<div class="chip-row" style="margin-top:0;">' +
              '<span class="pill">' + j.loc + '</span>' +
              '<span class="pill">' + j.type + '</span>' +
              '<span class="pill">' + j.exp + '</span>' +
            '</div>' +
          '</div>' +
          '<button class="btn btn-primary btn-sm" data-apply-job="' + j.title + '">Apply Now</button>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------------- job application modal ---------------- */
  const applyModal = document.querySelector("#apply-modal");
  const applyForm = document.querySelector("#apply-form");
  if(applyModal && applyForm){
    document.addEventListener("click", function(e){
      const trigger = e.target.closest("[data-apply-job]");
      if(!trigger) return;
      const roleName = trigger.getAttribute("data-apply-job");
      applyForm.querySelector("#a-role").value = roleName;
      const roleLabel = applyModal.querySelector("[data-apply-role]");
      if(roleLabel) roleLabel.textContent = roleName;
      applyModal.classList.add("open");
    });

    applyForm.addEventListener("submit", function(e){
      e.preventDefault();
      let valid = true;
      const name = applyForm.querySelector("#a-name");
      const email = applyForm.querySelector("#a-email");
      const phone = applyForm.querySelector("#a-phone");

      [name, email, phone].forEach(function(f){ clearError(f.closest(".field")); });

      if(name.value.trim().length < 2){ setError(name.closest(".field"), "Please enter your full name."); valid = false; }
      if(!isEmail(email.value.trim())){ setError(email.closest(".field"), "Please enter a valid email address."); valid = false; }
      if(!isPhone(phone.value.trim())){ setError(phone.closest(".field"), "Please enter a valid phone number."); valid = false; }

      if(!valid){ showToast("Please fix the highlighted fields.", "error"); return; }

      const record = {
        id: "app_" + Date.now(),
        role: applyForm.querySelector("#a-role").value,
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        experience: applyForm.querySelector("#a-exp").value,
        note: applyForm.querySelector("#a-note").value.trim(),
        date: new Date().toISOString()
      };
      const store = JSON.parse(localStorage.getItem("nexora_applications") || "[]");
      store.unshift(record);
      localStorage.setItem("nexora_applications", JSON.stringify(store));

      applyForm.reset();
      applyModal.classList.remove("open");
      showToast("Application submitted for " + record.role + "!", "success");
    });
  }

  /* ---------------- newsletter (blog page) ---------------- */
  const newsletter = document.querySelector("#newsletter-form");
  if(newsletter){
    newsletter.addEventListener("submit", function(e){
      e.preventDefault();
      const input = newsletter.querySelector("input");
      if(!isEmail(input.value.trim())){ showToast("Please enter a valid email address.", "error"); return; }
      const store = JSON.parse(localStorage.getItem("nexora_subscribers") || "[]");
      store.unshift({ email:input.value.trim(), date:new Date().toISOString() });
      localStorage.setItem("nexora_subscribers", JSON.stringify(store));
      newsletter.reset();
      showToast("Subscribed! Check your inbox for updates.", "success");
    });
  }

})();
