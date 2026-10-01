(function () {
  var HERO_COVERS = [
    "/images/8as027bx/production/b0a58a9c1f4b15a397831dae434cccd7b393ff4d-538x720.jpg",
    "/images/8as027bx/production/363d00c2c9007dd9a27441d5fb3f59a763a5a1b7-538x720.jpg",
    "/images/8as027bx/production/b54855ff46eed351bd45e3cdf9f294088f5bce3a-538x720.jpg",
    "/images/8as027bx/production/07b0ac50a72aa70e794f6bec53bfd0db9ab5700e-538x720.jpg",
    "/images/8as027bx/production/f7534b8a4bd53f445b0daaed01d6a7241420e621-538x720.jpg",
  ];

  function toLocalCover(src) {
    try {
      if (!src) return "";
      var raw = src;
      if (raw.indexOf("/_next/image") !== -1) {
        var u = new URL(raw, location.origin);
        raw = decodeURIComponent(u.searchParams.get("url") || "");
      }
      raw = raw.split("?")[0];
      var m = raw.match(/\/(?:images\/)?8as027bx\/production\/([a-f0-9]+-\d+x\d+\.(?:jpe?g|png|webp))/i);
      if (m) return "/images/8as027bx/production/" + m[1];
      m = raw.match(/([a-f0-9]{20,}-\d+x\d+\.(?:jpe?g|png|webp))/i);
      if (m && /8as027bx|production|sanity|_next\/image/i.test(src)) {
        return "/images/8as027bx/production/" + m[1];
      }
      if (raw.charAt(0) === "/") return raw;
      return src;
    } catch (e) {
      return src || "";
    }
  }

  function isHomePage() {
    var p = (location.pathname || "/").replace(/\\/g, "/");
    if (p.length > 1) p = p.replace(/\/+$/, "");
    return p === "" || p === "/" || p === "/index.html";
  }

  function clearHeroBooksEverywhere() {
    document.querySelectorAll("[data-ink-hero-books]").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll(".ink-hero-split").forEach(function (el) {
      el.classList.remove("ink-hero-split");
    });
    document.querySelectorAll("main > section[data-ink-hero-books]").forEach(function (el) {
      delete el.dataset.inkHeroBooks;
    });
  }

  function hideFunkyHero3D() {
    // Hide 3D/canvas books on every page banner — never leave them showing
    document.querySelectorAll("main section canvas, main canvas").forEach(function (el) {
      el.style.setProperty("display", "none", "important");
      el.setAttribute("aria-hidden", "true");
      var wrap =
        el.closest('[class*="inset-y-10"]') ||
        el.closest('[class*="absolute"][class*="right"]') ||
        el.parentElement;
      if (wrap && wrap.tagName !== "SECTION" && wrap.tagName !== "MAIN") {
        wrap.style.setProperty("display", "none", "important");
      }
    });
    document.querySelectorAll('[class*="inset-y-10"][class*="right-10"]').forEach(function (el) {
      el.style.setProperty("display", "none", "important");
      el.setAttribute("aria-hidden", "true");
    });
  }

  function collectHeroCovers() {
    var covers = HERO_COVERS.slice();
    var section = findPortfolioSection();
    if (section) {
      var seen = {};
      covers.forEach(function (c) {
        seen[c] = 1;
      });
      Array.prototype.slice.call(section.querySelectorAll("img")).forEach(function (img) {
        var src = toLocalCover(img.getAttribute("src") || img.currentSrc || img.src || "");
        if (!src || src.indexOf("/images/8as027bx/production/") === -1) return;
        if (seen[src]) return;
        seen[src] = 1;
        covers.push(src);
      });
    }
    return covers.slice(0, 3);
  }

  function replaceHeroBooks() {
    // Books belong ONLY on the homepage hero
    if (!isHomePage()) {
      clearHeroBooksEverywhere();
      return;
    }

    var hero = document.querySelector("main > section");
    if (!hero) return;

    var container = hero.querySelector(".container");
    if (!container) return;

    // rebuild if an older stage exists or is in the wrong place
    var old = hero.querySelector("[data-ink-hero-books]");
    if (old) {
      var inContainer = container.contains(old);
      var count = old.querySelectorAll(".ink-hero-book").length;
      if (!inContainer || count !== 3) {
        old.remove();
        delete hero.dataset.inkHeroBooks;
      }
    }
    if (hero.querySelector("[data-ink-hero-books]")) return;

    hideFunkyHero3D();

    var covers = collectHeroCovers();
    if (covers.length < 3) return;

    var stage = document.createElement("div");
    stage.setAttribute("data-ink-hero-books", "1");
    stage.className = "ink-hero-books";
    stage.setAttribute("aria-hidden", "true");

    var shelf = document.createElement("div");
    shelf.className = "ink-hero-books__shelf";

    var poses = ["is-left", "is-front", "is-right"];

    covers.forEach(function (src, i) {
      var card = document.createElement("figure");
      card.className = "ink-hero-book " + poses[i];
      var img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "eager";
      img.decoding = "async";
      card.appendChild(img);
      shelf.appendChild(card);
    });

    stage.appendChild(shelf);
    container.appendChild(stage);
    container.classList.add("ink-hero-split");
    hero.dataset.inkHeroBooks = "1";
  }

  function findPortfolioSection() {
    var heading = Array.prototype.slice.call(document.querySelectorAll("h2")).find(function (h) {
      return /Proudly\s*Worked/i.test(h.textContent || "");
    });
    return heading ? heading.closest("section") : null;
  }

  function cleanPortfolio() {
    var section = findPortfolioSection();
    if (!section) return;

    var existing = section.querySelector('[data-ink-portfolio-grid="1"]');
    if (existing) {
      existing.querySelectorAll("img").forEach(function (img) {
        var local = toLocalCover(img.getAttribute("src") || img.src || "");
        if (local && local !== img.getAttribute("src")) img.src = local;
      });
      section.dataset.inkGrid = "1";
      return;
    }
    if (section.dataset.inkGrid === "1") return;

    var imgs = Array.prototype.slice.call(section.querySelectorAll("img")).filter(function (img) {
      var src = img.getAttribute("src") || img.currentSrc || "";
      var alt = img.alt || "";
      return (
        /8as027bx|production|object-cover|_next\/image|sanity\.io/i.test(src + " " + (img.className || "")) ||
        (alt.length > 2 && !/logo|icon/i.test(alt))
      );
    });
    if (imgs.length < 3) return;

    var data = [];
    var seen = {};
    imgs.forEach(function (img) {
      var src = toLocalCover(img.getAttribute("src") || img.currentSrc || img.src || "");
      if (!src || src.indexOf("/images/8as027bx/production/") === -1) return;
      if (seen[src]) return;
      seen[src] = 1;
      data.push({ src: src, alt: img.alt || "Book cover", title: (img.alt || "Book").trim() });
    });
    if (data.length < 3) return;

    Array.prototype.slice.call(section.children).forEach(function (child) {
      if (child.querySelector && child.querySelectorAll("img").length >= 3) {
        child.style.setProperty("display", "none", "important");
        child.setAttribute("aria-hidden", "true");
      }
    });
    section.querySelectorAll('[class*="cursor-grab"], [style*="perspective"], button[aria-label*="slide"]').forEach(function (el) {
      if (el.matches('button[aria-label*="slide"]')) {
        var row = el.parentElement;
        if (row && row !== section) row.style.setProperty("display", "none", "important");
        el.style.setProperty("display", "none", "important");
      } else if (el.parentElement && el.parentElement !== section) {
        el.parentElement.style.setProperty("display", "none", "important");
      }
    });
    section.querySelectorAll('button[aria-label*="slide"]').forEach(function (btn) {
      var row = btn.parentElement;
      if (row) {
        row.style.setProperty("display", "none", "important");
        row.setAttribute("aria-hidden", "true");
      }
      btn.style.setProperty("display", "none", "important");
    });

    var grid = document.createElement("div");
    grid.setAttribute("data-ink-portfolio-grid", "1");
    grid.className = "ink-portfolio-grid";

    data.slice(0, 8).forEach(function (d) {
      var card = document.createElement("figure");
      card.className = "ink-portfolio-card";
      var image = document.createElement("img");
      image.src = d.src;
      image.alt = d.alt;
      image.loading = "lazy";
      image.decoding = "async";
      var cap = document.createElement("figcaption");
      cap.textContent = d.title;
      card.appendChild(image);
      card.appendChild(cap);
      grid.appendChild(card);
    });

    var heading = Array.prototype.slice.call(section.querySelectorAll("h2")).find(function (h) {
      return /Proudly\s*Worked/i.test(h.textContent || "");
    });
    var headerBlock = heading ? heading.parentElement : null;
    while (headerBlock && headerBlock.parentElement !== section) headerBlock = headerBlock.parentElement;
    if (headerBlock && headerBlock.parentElement === section) {
      section.insertBefore(grid, headerBlock.nextSibling);
    } else {
      section.appendChild(grid);
    }

    section.dataset.inkGrid = "1";
  }

  function revealStuckMotion(root) {
    var scope = root || document;
    scope.querySelectorAll("h1, h2, h3, p, span, a, li, div").forEach(function (el) {
      var inline = el.getAttribute("style") || "";
      if (!/opacity\s*:\s*0|translateY\(|translate3d\([^)]*40|scale\(0/i.test(inline)) return;
      var cs = window.getComputedStyle(el);
      var fs = parseFloat(cs.fontSize) || 0;
      if (fs > 90) return;
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("visibility", "visible", "important");
    });
  }

  var BLOG_LOCAL_COVERS = {
    "future-of-digital-publishing": "/assets/img/9acb33a23a1a.jpg",
    "how-to-build-marketing-campaign": "/assets/img/94beff685b98.jpg",
    "self-publishing-vs-traditional": "/assets/img/d6be54d489da.jpg",
    "editing-masterclass": "/assets/img/editing-masterclass.jpg",
  };

  function fixNextImages() {
    document.querySelectorAll("img").forEach(function (img) {
      var src = img.getAttribute("src") || img.currentSrc || "";
      var srcset = img.getAttribute("srcset") || "";
      var changed = false;

      // Map blog covers back to local files when possible
      var near = ((img.closest("a") && img.closest("a").getAttribute("href")) || "") + " " + (img.alt || "");
      Object.keys(BLOG_LOCAL_COVERS).forEach(function (slug) {
        var words = slug.split("-").slice(0, 2).join(" ");
        if (near.indexOf(slug) !== -1 || near.toLowerCase().indexOf(words) !== -1 || /editing masterclass/i.test(near)) {
          if (slug === "editing-masterclass" && !/editing/i.test(near)) return;
          if (/_next\/image|unsplash\.com/i.test(src) || !img.naturalWidth) {
            img.src = BLOG_LOCAL_COVERS[slug];
            changed = true;
          }
        }
      });

      src = img.getAttribute("src") || "";
      if (src.indexOf("/_next/image") !== -1) {
        var local = toLocalCover(src);
        if (local && local.indexOf("/images/8as027bx/") === 0) {
          img.src = local;
          changed = true;
        } else {
          try {
            var u = new URL(src, location.origin);
            var raw = decodeURIComponent(u.searchParams.get("url") || "");
            if (raw) {
              img.src = raw;
              changed = true;
            }
          } catch (e) {}
        }
      }

      if (srcset.indexOf("/_next/image") !== -1 || /unsplash\.com|cdn\.sanity\.io/i.test(srcset)) {
        img.removeAttribute("srcset");
        changed = true;
      }

      if (changed) {
        img.style.opacity = "1";
        img.style.visibility = "visible";
      }
    });
  }

  function fixBlogCards() {
    // Reveal blog listing cards stuck on entrance animations
    document.querySelectorAll("article, a[href*='/blogs/'], main section img").forEach(function (el) {
      var inline = el.getAttribute("style") || "";
      var cs = window.getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.2 || /opacity\s*:\s*0|translateY\(/i.test(inline)) {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        el.style.setProperty("visibility", "visible", "important");
      }
    });

    // Walk parents of blog images and force-show
    document.querySelectorAll("main img").forEach(function (img) {
      var p = img.parentElement;
      for (var i = 0; i < 5 && p; i++) {
        var st = window.getComputedStyle(p);
        if (parseFloat(st.opacity) < 0.3) {
          p.style.setProperty("opacity", "1", "important");
          p.style.setProperty("transform", "none", "important");
          p.style.setProperty("visibility", "visible", "important");
        }
        p = p.parentElement;
      }
    });
  }

  function fixOverview() {
    revealStuckMotion(document);
    document.querySelectorAll("section").forEach(function (sec) {
      sec.querySelectorAll("*").forEach(function (el) {
        if (el.children && el.children.length > 4) return;
        var st = window.getComputedStyle(el);
        var op = parseFloat(st.opacity);
        if (!(op < 0.5)) return;
        var t = (el.textContent || "").trim();
        if (!t || t.length > 80) return;
        if (/%|24\/7|Rights|Royalty|Support|Authors|Trust|Partner|Ownership|Distribution|Published|Satisfaction|Experience|Worldwide|Hidden|Specialists/i.test(t)) {
          el.style.setProperty("opacity", "1", "important");
          el.style.setProperty("transform", "none", "important");
        }
      });
    });
  }

  function fixDropCap() {
    document.querySelectorAll("span.float-left").forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var full = (parent.textContent || "").replace(/\s+/g, " ").trim();
      if (!/^E\s*nk Bridge/i.test(full) && el.textContent !== "E") return;
      if (/^E\s*nk Bridge/i.test(full) || (el.textContent === "E" && /nk Bridge/i.test(full))) {
        el.textContent = "I";
      }
    });
  }

  function run() {
    hideFunkyHero3D();
    fixNextImages();
    fixBlogCards();
    fixDropCap();
    if (isHomePage()) {
      replaceHeroBooks();
      cleanPortfolio();
    } else {
      clearHeroBooksEverywhere();
    }
    fixOverview();
  }

  run();
  document.addEventListener("DOMContentLoaded", run);
  window.addEventListener("load", run);
  [300, 900, 1800, 3200].forEach(function (t) {
    setTimeout(run, t);
  });
  new MutationObserver(function () {
    hideFunkyHero3D();
    fixNextImages();
    fixDropCap();
    if (isHomePage()) replaceHeroBooks();
    else clearHeroBooksEverywhere();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
