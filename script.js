document.addEventListener("DOMContentLoaded", () => {

  // Live Time
  function updateLiveTime() {
    const timeElement = document.getElementById("live-time");
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    timeElement.innerHTML =
      `<i class="fa-regular fa-clock"></i> Local Time: ${now.toLocaleTimeString("en-IN", options)}`;
  }
  setInterval(updateLiveTime, 1000);
  updateLiveTime();

  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);

    themeToggleBtn.innerHTML =
      newTheme === "dark"
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
  });

  // Animated Filter System
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        const isMatch = filterValue === "all" || category === filterValue || category === "bio";

        if (isMatch) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1) translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95) translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 400); 
        }
      });
    });
  });

  // Copy Email
  const copyBtn = document.getElementById("copy-email-btn");
  const copyTooltip = document.getElementById("copy-tooltip");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        copyTooltip.innerText = "Copied!";
        setTimeout(() => {
          copyTooltip.innerText = "Click to Copy";
        }, 2000);
      });
    });
  }

  // Scroll Progress Bar
  const progressBar = document.getElementById("progressBar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
  });

  // Cursor Glow
  const cursorGlow = document.getElementById("cursorGlow");

  document.addEventListener("mousemove", e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });

  // Back to Top
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Typing Effect
  const typingText = document.getElementById("typing-text");

  const roles = [
    "Data Science Student",
    "Python Developer",
    "ML Enthusiast",
    "AI Project Builder"
  ];

  let roleIndex = 0;

  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    typingText.style.opacity = 0;

    setTimeout(() => {
      typingText.textContent = roles[roleIndex];
      typingText.style.opacity = 1;
    }, 300);

  }, 2500);

});
