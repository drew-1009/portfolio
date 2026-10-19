/*
  DATA SCIENCE PORTFOLIO STARTER
  Personalise the PROFILE section and projectDetails below before publishing.
*/

const PROFILE = {
  name: 'Dhruv Nair',
  email: 'dhruvnair00@gmail.com',
  // Add your personal GitHub profile URL, e.g. 'https://github.com/yourusername'.
  githubUrl: 'https://github.com/drew-1009',
  // Put your actual PDF in assets/resume.pdf, then set this path.
  resumePath: 'assets/Dhruv_.pdf',
};

const projectDetails = {
  retail: {
    count: '01 / 04', category: 'ANALYTICS · DASHBOARD', title: 'Retail Sales Explorer',
    description: 'Turn transactional data into a clear view of sales trends, high-performing categories, and customer behaviour.',
    problem: 'Which products, time periods, and customer segments contribute most to sales — and where are the biggest opportunities to investigate?',
    approach: 'Start with data-quality checks and exploratory analysis. Define business metrics, compare trends over time, segment results, and build a dashboard that makes the key patterns easy to explore.',
    tools: ['Python', 'Pandas', 'SQL', 'Power BI / Tableau'],
    outcome: 'Add a link to your dashboard and repository, then summarise 2–3 verified insights and the decision each insight could support.'
  },
  churn: {
    count: '02 / 04', category: 'MACHINE LEARNING · CLASSIFICATION', title: 'Customer Churn Signals',
    description: 'Investigate customer behaviour that may be associated with churn and compare interpretable classification models.',
    problem: 'Can available customer attributes help identify accounts at higher risk of leaving, early enough for a team to take action?',
    approach: 'Establish a simple baseline, split data carefully, inspect class imbalance, compare suitable models, and evaluate precision, recall, and calibration alongside any headline score.',
    tools: ['Python', 'Pandas', 'Scikit-learn', 'Model evaluation'],
    outcome: 'Report a validated baseline and evaluation results. Explain false positives, false negatives, limitations, and how a team could use the prediction responsibly.'
  },
  sentiment: {
    count: '03 / 04', category: 'NLP · TEXT ANALYSIS', title: 'Review Sentiment Lab',
    description: 'Explore customer reviews, clean text, and compare approaches for classifying sentiment at scale.',
    problem: 'What themes and sentiment patterns appear in customer feedback, and how reliably can they be identified automatically?',
    approach: 'Inspect labels and text quality, establish a simple baseline, compare a rule-based or classical ML approach, and review errors to understand where language is ambiguous.',
    tools: ['Python', 'NLTK', 'TF-IDF', 'Scikit-learn'],
    outcome: 'Link a notebook with example predictions, a confusion matrix, and a short discussion of sarcasm, class imbalance, and possible bias in the dataset.'
  },
  climate: {
    count: '04 / 04', category: 'ANALYTICS · TIME SERIES', title: 'Climate Trend Notes',
    description: 'Use time-series exploration and careful visualisation to communicate changes across a selected climate dataset.',
    problem: 'What long-term changes can be seen in the chosen dataset, and how do location, seasonality, or measurement choices affect interpretation?',
    approach: 'Document the data source, check missing values and units, explore seasonality and long-term patterns, and clearly separate observed trends from causal explanations.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Time series'],
    outcome: 'Cite your data source, explain the date range and units, and publish a few readable charts with caveats about uncertainty and scope.'
  }
};

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const projectModal = document.getElementById('projectModal');
const modalDialog = projectModal.querySelector('.project-modal');
const modalClose = document.getElementById('modalClose');
const modalDone = document.getElementById('modalDone');
const toast = document.getElementById('toast');
let lastFocusedElement = null;
let toastTimer = null;

// Apply the current year and profile details in places that share the same content.
document.title = `${PROFILE.name} — Data Science Portfolio`;
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.brand-name').forEach((el) => {
  const nameParts = PROFILE.name.trim().split(/\s+/);
  const first = nameParts.shift() || 'your';
  const rest = nameParts.join(' ') || 'name';
  el.innerHTML = `${escapeHTML(first.toLowerCase())}<span>${escapeHTML(rest.toLowerCase())}</span>`;
});
document.querySelectorAll('#heroTitle').forEach((el) => {
  // Keep the headline styling, only update the name used in its introduction.
});
document.querySelector('.hero-description strong').textContent = PROFILE.name;
document.querySelector('.signature').textContent = `— ${PROFILE.name}`;
document.querySelector('.copyright').innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${escapeHTML(PROFILE.name)}`;
document.getElementById('emailLink').href = `mailto:${PROFILE.email}`;
document.getElementById('copyStatus').textContent = `Email: ${PROFILE.email}. Add your GitHub URL and résumé path in PROFILE inside script.js.`;

// Configure the GitHub profile link. Until a URL is supplied, explain how to enable it.
const githubLink = document.getElementById('githubLink');
if (PROFILE.githubUrl.trim()) {
  githubLink.href = PROFILE.githubUrl.trim();
} else {
  githubLink.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Add your GitHub profile URL in PROFILE inside script.js.');
  });
}

// Configure the résumé download without sending visitors to a missing file by default.
const resumeDownload = document.getElementById('resumeDownload');
if (PROFILE.resumePath.trim()) {
  resumeDownload.href = PROFILE.resumePath.trim();
  resumeDownload.download = `${PROFILE.name.trim().replace(/[^a-z0-9_-]+/gi, '-')}-Resume.pdf`;
} else {
  resumeDownload.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Add your PDF to assets/resume.pdf and set PROFILE.resumePath in script.js.');
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

// Theme toggle. The user's preference is saved locally in their browser.
const savedTheme = localStorage.getItem('portfolio-theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
setTheme(savedTheme || preferredTheme);
themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});
function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f8f7ff' : '#171724';
}

// Mobile navigation menu.
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navLinks.classList.toggle('open', open);
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('open');
}));

// Reveal-on-scroll animation with a reduced-motion-friendly fallback.
const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}

// Scroll progress and current section in the navigation.
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}, { passive: true });
const sections = [...document.querySelectorAll('main section[id], main section#top')];
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id || 'top';
      document.querySelectorAll('.nav-link').forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach((section) => navObserver.observe(section));
}

// Animate the small portfolio counters once they enter the viewport.
const counters = document.querySelectorAll('.counter');
function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    element.textContent = Math.round(target * eased).toString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .7 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => { counter.textContent = counter.dataset.count; });
}

// Project filter buttons update the visible cards and accessible result count.
const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.project-card')];
const filterResult = document.getElementById('filterResult');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  let visible = 0;
  filterButtons.forEach((candidate) => {
    const isActive = candidate === button;
    candidate.classList.toggle('active', isActive);
    candidate.setAttribute('aria-pressed', String(isActive));
  });
  projectCards.forEach((card) => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  filterResult.textContent = `Showing ${visible} project${visible === 1 ? '' : 's'}`;
}));

// Populate and open the interactive project case-study modal.
document.querySelectorAll('[data-open-project]').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.openProject)));
function openProject(key) {
  const project = projectDetails[key];
  if (!project) return;
  lastFocusedElement = document.activeElement;
  document.getElementById('modalKicker').textContent = project.category;
  document.getElementById('modalCount').textContent = project.count;
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  document.getElementById('modalProblem').textContent = project.problem;
  document.getElementById('modalApproach').textContent = project.approach;
  document.getElementById('modalOutcome').textContent = project.outcome;
  const toolsBox = document.getElementById('modalTools');
  toolsBox.replaceChildren(...project.tools.map((tool) => {
    const tag = document.createElement('span');
    tag.textContent = tool;
    return tag;
  }));
  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeProject() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}
modalClose.addEventListener('click', closeProject);
modalDone.addEventListener('click', closeProject);
projectModal.addEventListener('click', (event) => {
  if (event.target === projectModal) closeProject();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal.classList.contains('open')) closeProject();
  if (event.key === 'Tab' && projectModal.classList.contains('open')) {
    const focusable = [...modalDialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')].filter((el) => !el.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

// Copy-to-clipboard helper; provide graceful fallback if clipboard access is unavailable.
document.getElementById('copyEmail').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    showToast('Email copied to clipboard');
    document.getElementById('copyStatus').textContent = `Copied ${PROFILE.email} to your clipboard.`;
  } catch (error) {
    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = PROFILE.email;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand('copy');
    temporaryInput.remove();
    if (copied) {
      showToast('Email copied to clipboard');
      document.getElementById('copyStatus').textContent = `Copied ${PROFILE.email} to your clipboard.`;
    } else {
      showToast(`Email: ${PROFILE.email}`);
      document.getElementById('copyStatus').textContent = `Copy manually: ${PROFILE.email}`;
    }
  }
});
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}
