document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Local Time Bar
  function updateLiveTime() {
    const timeElement = document.getElementById("live-time");
    const now = new Date();
    const options = { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    timeElement.innerHTML = `<i class="fa-regular fa-clock"></i> SF Time: ${now.toLocaleTimeString("en-US", options)}`;
  }
  setInterval(updateLiveTime, 1000);
  updateLiveTime();

  // 2. Light / Dark Theme Switching
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    themeToggleBtn.innerHTML = newTheme === "dark" 
      ? '<i class="fa-solid fa-moon"></i>' 
      : '<i class="fa-solid fa-sun"></i>';
  });

  // 3. Dynamic Bento Filter System
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      cards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue || category === "bio") {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 4. Click to Copy Email Feature
  const copyBtn = document.getElementById("copy-email-btn");
  const copyTooltip = document.getElementById("copy-tooltip");

  copyBtn.addEventListener("click", () => {
    const email = copyBtn.getAttribute("data-email");
    navigator.clipboard.writeText(email).then(() => {
      copyTooltip.innerText = "Copied!";
      setTimeout(() => {
        copyTooltip.innerText = "Click to Copy";
      }, 2000);
    });
  });

  // 5. Smooth 3D Card Hover & Tilt Effect
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
});