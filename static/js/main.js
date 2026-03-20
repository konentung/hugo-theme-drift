/**
 * hugo-theme-drift - Main JS
 * Handles: theme toggle, typewriter, scroll reveals, sidebar, mobile nav, 3D tilt, search
 */

document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initTypewriter();
  initScrollReveal();
  initMobileNav();
  initCardTilt();
  initSearch();
  initGitHub();
  initCodeCopy();
});

/* ============================================
   THEME TOGGLE (dark/light)
   ============================================ */
function initThemeToggle() {
  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  var saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  toggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

/* ============================================
   TYPEWRITER EFFECT (with proper cursor tracking)
   ============================================ */
function initTypewriter() {
  var elements = document.querySelectorAll(".typewriter");

  elements.forEach(function (el) {
    var text = el.getAttribute("data-text") || el.textContent;
    el.textContent = "";
    var index = 0;

    function type() {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, 45 + Math.random() * 35);
      }
    }

    setTimeout(type, 600);
  });
}

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */
function initScrollReveal() {
  var revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length === 0) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ============================================
   MOBILE NAV & SIDEBAR
   ============================================ */
function initMobileNav() {
  var sidebar = document.getElementById("sidebar");
  var overlay = document.querySelector(".sidebar-overlay");
  var menuBtn = document.querySelector(".mobile-menu-btn");

  if (!sidebar || !menuBtn) return;

  function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
    menuBtn.classList.toggle("active");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    menuBtn.classList.remove("active");
  }

  menuBtn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", closeSidebar);

  var navItems = sidebar.querySelectorAll(".nav-item:not(.search-trigger)");
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });
}

/* ============================================
   3D CARD TILT EFFECT
   ============================================ */
function initCardTilt() {
  var cards = document.querySelectorAll("a.card, .social-card, .post-nav-card, .note-item");
  if (cards.length === 0 || window.matchMedia("(max-width: 900px)").matches) return;

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -4;
      var rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform =
        "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-8px) scale(1.01)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
}

/* ============================================
   SEARCH
   客戶端全文搜尋，讀取 Hugo JSON index
   ============================================ */
function initSearch() {
  var overlay = document.getElementById("searchOverlay");
  var input = document.getElementById("searchInput");
  var resultsContainer = document.getElementById("searchResults");
  var trigger = document.querySelector(".search-trigger");

  if (!overlay || !input) return;

  var searchIndex = null;
  var activeIndex = -1;

  // Section icon map
  var sectionIcons = {
    posts: "P",
    projects: "PJ",
    notes: "N",
    about: "A"
  };

  function openSearch() {
    overlay.classList.add("active");
    input.value = "";
    input.focus();
    activeIndex = -1;
    showDefault();
    if (!searchIndex) {
      loadIndex();
    }
  }

  function closeSearch() {
    overlay.classList.remove("active");
    input.blur();
  }

  function showDefault() {
    resultsContainer.innerHTML =
      '<div class="search-empty">' +
      '<p class="search-empty-text">Type to search across all content</p>' +
      '<p class="search-shortcut">Tip: Press <kbd>/</kbd> anywhere to open search</p>' +
      "</div>";
  }

  // Load JSON index
  function loadIndex() {
    var baseUrl = document.querySelector('link[rel="stylesheet"]').href;
    var indexUrl = baseUrl.substring(0, baseUrl.indexOf("/css/")) + "/index.json";

    fetch(indexUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) { searchIndex = data; })
      .catch(function () {
        // Fallback: try root
        fetch("/index.json")
          .then(function (res) { return res.json(); })
          .then(function (data) { searchIndex = data; });
      });
  }

  // Highlight matching text
  function highlight(text, query) {
    if (!query) return text;
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp("(" + escaped + ")", "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  // Perform search
  function doSearch(query) {
    if (!searchIndex || !query || query.length < 2) {
      if (!query) {
        showDefault();
      } else {
        resultsContainer.innerHTML =
          '<div class="search-empty"><p class="search-empty-text">Keep typing...</p></div>';
      }
      return;
    }

    var q = query.toLowerCase();
    var results = [];

    searchIndex.forEach(function (item) {
      var score = 0;
      var titleLower = (item.title || "").toLowerCase();
      var contentLower = (item.content || "").toLowerCase();
      var summaryLower = (item.summary || "").toLowerCase();
      var tagsStr = (item.tags || []).join(" ").toLowerCase();

      // Title match (highest weight)
      if (titleLower.indexOf(q) !== -1) {
        score += 10;
        if (titleLower.startsWith(q)) score += 5;
      }

      // Tags match
      if (tagsStr.indexOf(q) !== -1) score += 6;

      // Summary match
      if (summaryLower.indexOf(q) !== -1) score += 4;

      // Content match
      if (contentLower.indexOf(q) !== -1) score += 2;

      if (score > 0) {
        results.push({ item: item, score: score });
      }
    });

    // Sort by score
    results.sort(function (a, b) { return b.score - a.score; });

    if (results.length === 0) {
      resultsContainer.innerHTML =
        '<div class="search-no-results">No results found for "' +
        query.replace(/</g, "&lt;") + '"</div>';
      return;
    }

    var html = "";
    results.slice(0, 10).forEach(function (r, i) {
      var item = r.item;
      var icon = sectionIcons[item.section] || item.section.charAt(0).toUpperCase();
      var snippet = item.summary || item.content || "";
      if (snippet.length > 150) snippet = snippet.substring(0, 150) + "...";

      html +=
        '<a href="' + item.permalink + '" class="search-result' + (i === 0 ? " active" : "") + '" data-index="' + i + '">' +
        '<div class="search-result-icon">' + icon + "</div>" +
        '<div class="search-result-body">' +
        '<div class="search-result-title">' + highlight(item.title, query) + "</div>" +
        '<div class="search-result-snippet">' + highlight(snippet, query) + "</div>" +
        '<div class="search-result-meta">' +
        '<span>' + (item.section || "page") + "</span>" +
        '<span class="meta-dot"></span>' +
        '<span>' + (item.date || "") + "</span>" +
        "</div>" +
        "</div>" +
        "</a>";
    });

    html +=
      '<div class="search-footer">' +
      "<span>" + results.length + " result" + (results.length > 1 ? "s" : "") + "</span>" +
      "<span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate <kbd>Enter</kbd> open</span>" +
      "</div>";

    resultsContainer.innerHTML = html;
    activeIndex = 0;
  }

  // Keyboard navigation within results
  function navigateResults(direction) {
    var items = resultsContainer.querySelectorAll(".search-result");
    if (items.length === 0) return;

    items.forEach(function (el) { el.classList.remove("active"); });

    activeIndex += direction;
    if (activeIndex < 0) activeIndex = items.length - 1;
    if (activeIndex >= items.length) activeIndex = 0;

    items[activeIndex].classList.add("active");
    items[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function selectResult() {
    var items = resultsContainer.querySelectorAll(".search-result");
    if (items.length > 0 && activeIndex >= 0 && activeIndex < items.length) {
      window.location.href = items[activeIndex].getAttribute("href");
    }
  }

  // Event: sidebar search button
  if (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openSearch();
    });
  }

  // Event: input
  var debounceTimer;
  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      doSearch(input.value.trim());
    }, 150);
  });

  // Event: keyboard
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateResults(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateResults(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectResult();
    }
  });

  // Event: close
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeSearch();
  });

  // Event: global keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // ESC to close
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeSearch();
      return;
    }

    // "/" to open (when not typing in an input)
    if (e.key === "/" && !overlay.classList.contains("active")) {
      var tag = document.activeElement.tagName.toLowerCase();
      if (tag !== "input" && tag !== "textarea" && !document.activeElement.isContentEditable) {
        e.preventDefault();
        openSearch();
      }
    }

    // Cmd/Ctrl + K to open
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      if (overlay.classList.contains("active")) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });
}

/* ============================================
   GITHUB API INTEGRATION
   抓取 repo 數據，顯示 stats + 語言分佈圖
   ============================================ */

// GitHub 語言配色表
var LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C++": "#f34b7d",
  C: "#555555", "C#": "#178600", Ruby: "#701516", PHP: "#4F5D95",
  Swift: "#F05138", Kotlin: "#A97BFF", Dart: "#00B4AB",
  HTML: "#e34c26", CSS: "#563d7c", SCSS: "#c6538c",
  Shell: "#89e051", Vue: "#41b883", Svelte: "#ff3e00",
  Dockerfile: "#384d54", Makefile: "#427819", Lua: "#000080"
};

function initGitHub() {
  // Single page: full panel
  var panel = document.querySelector(".gh-panel[data-repo]");
  if (panel) {
    fetchRepoData(panel.getAttribute("data-repo"), function (data) {
      fillPanel(panel, data);
    });
    fetchLanguages(panel.getAttribute("data-repo"), function (langs) {
      fillLanguageBar(panel, langs);
    });
  }

  // List page: card mini stats
  var cards = document.querySelectorAll("a.card[data-repo]");
  cards.forEach(function (card) {
    var repo = card.getAttribute("data-repo");
    if (!repo) return;
    fetchRepoData(repo, function (data) {
      fillCardStats(card, data);
    });
  });
}

function fetchRepoData(repo, callback) {
  fetch("https://api.github.com/repos/" + repo)
    .then(function (r) { return r.json(); })
    .then(callback)
    .catch(function () {});
}

function fetchLanguages(repo, callback) {
  fetch("https://api.github.com/repos/" + repo + "/languages")
    .then(function (r) { return r.json(); })
    .then(callback)
    .catch(function () {});
}

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function formatSize(kb) {
  if (kb >= 1024) return (kb / 1024).toFixed(1) + " MB";
  return kb + " KB";
}

function timeAgo(dateStr) {
  var diff = Date.now() - new Date(dateStr).getTime();
  var days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return days + " days ago";
  if (days < 365) return Math.floor(days / 30) + " months ago";
  return Math.floor(days / 365) + " years ago";
}

function fillPanel(panel, data) {
  if (!data || data.message) return;

  var set = function (attr, val) {
    var el = panel.querySelector("[data-gh='" + attr + "']");
    if (el) el.textContent = val;
  };

  set("stars", formatNum(data.stargazers_count || 0));
  set("forks", formatNum(data.forks_count || 0));
  set("issues", formatNum(data.open_issues_count || 0));
  set("watchers", formatNum(data.subscribers_count || data.watchers_count || 0));
  set("license", data.license ? data.license.spdx_id : "");
  set("updated", data.pushed_at ? "Updated " + timeAgo(data.pushed_at) : "");
  set("size", data.size ? formatSize(data.size) : "");
}

function fillLanguageBar(panel, langs) {
  if (!langs || typeof langs !== "object") return;

  var bar = panel.querySelector("[data-gh='langbar']");
  var legend = panel.querySelector("[data-gh='langlegend']");
  if (!bar || !legend) return;

  var total = Object.values(langs).reduce(function (a, b) { return a + b; }, 0);
  if (total === 0) return;

  var barHtml = "";
  var legendHtml = "";

  Object.keys(langs).forEach(function (lang) {
    var pct = ((langs[lang] / total) * 100).toFixed(1);
    var color = LANG_COLORS[lang] || "#8b949e";

    barHtml += '<div class="gh-lang-segment" style="width:' + pct + '%;background:' + color + '"></div>';
    legendHtml +=
      '<span class="gh-lang-item">' +
      '<span class="gh-lang-dot" style="background:' + color + '"></span>' +
      lang +
      ' <span class="gh-lang-pct">' + pct + '%</span>' +
      "</span>";
  });

  bar.innerHTML = barHtml;
  legend.innerHTML = legendHtml;
}

function fillCardStats(card, data) {
  if (!data || data.message) return;

  var statsEl = card.querySelector("[data-gh-card='stats']");
  if (!statsEl) return;

  var starsVal = card.querySelector("[data-gh-card='stars-val']");
  var forksVal = card.querySelector("[data-gh-card='forks-val']");
  var langVal = card.querySelector("[data-gh-card='lang-val']");
  var langDot = card.querySelector(".gh-card-lang-dot");

  if (starsVal) starsVal.textContent = formatNum(data.stargazers_count || 0);
  if (forksVal) forksVal.textContent = formatNum(data.forks_count || 0);
  if (langVal) langVal.textContent = data.language || "";
  if (langDot && data.language) {
    langDot.style.background = LANG_COLORS[data.language] || "#8b949e";
  }

  statsEl.style.display = "flex";
}

/* ============================================
   CODE COPY BUTTON
   ============================================ */
function initCodeCopy() {
  var copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  document.querySelectorAll(".post-content pre, .note-content pre").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.className = "code-copy-btn";
    btn.setAttribute("aria-label", "Copy code");
    btn.innerHTML = copyIcon;
    pre.appendChild(btn);

    btn.addEventListener("click", function () {
      var code = pre.querySelector("code");
      var text = code ? code.textContent : pre.textContent;

      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = checkIcon;
        btn.classList.add("copied");
        setTimeout(function () {
          btn.innerHTML = copyIcon;
          btn.classList.remove("copied");
        }, 2000);
      });
    });
  });
}
