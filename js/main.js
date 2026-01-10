/**
 * DigitalGear - Main JavaScript
 * Handles responsive menu, smooth scrolling, and general interactivity
 */

// DOM Elements
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

// Mobile Menu Toggle
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active")

    // Animate hamburger icon
    const spans = this.querySelectorAll("span")
    spans.forEach((span, index) => {
      if (navMenu.classList.contains("active")) {
        if (index === 0) span.style.transform = "rotate(45deg) translateY(8px)"
        if (index === 1) span.style.opacity = "0"
        if (index === 2) span.style.transform = "rotate(-45deg) translateY(-8px)"
      } else {
        span.style.transform = ""
        span.style.opacity = ""
      }
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active")
      menuToggle.querySelectorAll("span").forEach((span) => {
        span.style.transform = ""
        span.style.opacity = ""
      })
    }
  })

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll("a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      menuToggle.querySelectorAll("span").forEach((span) => {
        span.style.transform = ""
        span.style.opacity = ""
      })
    })
  })
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href")
    if (targetId !== "#" && targetId !== "#!") {
      e.preventDefault()
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})

// Category Page - Dynamic Title Update
function updateCategoryInfo() {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("cat")

  const categoryTitles = {
    gadgets: {
      title: "Categoría: Gadgets",
      description:
        "Los dispositivos más innovadores y gadgets tecnológicos del mercado. Reviews, análisis y comparativas.",
    },
    smartphones: {
      title: "Categoría: Smartphones",
      description:
        "Análisis completos de los mejores smartphones del mercado. Especificaciones, precios y rendimiento real.",
    },
    ia: {
      title: "Categoría: Inteligencia Artificial",
      description:
        "Explora el futuro de la tecnología con nuestros artículos sobre IA, machine learning y automatización.",
    },
    accesorios: {
      title: "Categoría: Accesorios",
      description:
        "Los mejores accesorios tecnológicos para complementar tus dispositivos. Auriculares, cargadores y más.",
    },
    reviews: {
      title: "Categoría: Reviews",
      description:
        "Reviews honestas y detalladas de productos tecnológicos. Análisis en profundidad para ayudarte a decidir.",
    },
  }

  const categoryTitle = document.getElementById("categoryTitle")
  const categoryDescription = document.getElementById("categoryDescription")

  if (category && categoryTitles[category] && categoryTitle && categoryDescription) {
    categoryTitle.textContent = categoryTitles[category].title
    categoryDescription.textContent = categoryTitles[category].description
    document.title = `${categoryTitles[category].title} | DigitalGear`
  }
}

// Run category info update if on category page
if (window.location.pathname.includes("categoria.html")) {
  updateCategoryInfo()
}

// Lazy Loading Images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", lazyLoadImages)
}

// Scroll to Top Button
function createScrollToTopButton() {
  const scrollBtn = document.createElement("button")
  scrollBtn.innerHTML = "↑"
  scrollBtn.className = "scroll-to-top"
  scrollBtn.setAttribute("aria-label", "Scroll to top")
  scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
        color: var(--color-bg-primary);
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
    `

  document.body.appendChild(scrollBtn)

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = "1"
      scrollBtn.style.visibility = "visible"
    } else {
      scrollBtn.style.opacity = "0"
      scrollBtn.style.visibility = "hidden"
    }
  })

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTopButton)

// Article Reading Progress Bar
function createReadingProgressBar() {
  if (!document.querySelector(".article-body")) return

  const progressBar = document.createElement("div")
  progressBar.className = "reading-progress"
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
        z-index: 9999;
        transition: width 0.1s ease;
    `

  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100
    progressBar.style.width = scrolled + "%"
  })
}

// Initialize reading progress bar
document.addEventListener("DOMContentLoaded", createReadingProgressBar)

// Active Navigation Link Highlight
function highlightActiveNavLink() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-menu a")

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname
    if (currentPath === linkPath || (currentPath === "/" && linkPath.includes("index.html"))) {
      link.classList.add("active")
    }
  })
}

// Initialize active nav link
document.addEventListener("DOMContentLoaded", highlightActiveNavLink)

// External Links - Open in New Tab
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="http"]')
  links.forEach((link) => {
    if (!link.href.includes(window.location.hostname) && !link.hasAttribute("target")) {
      link.setAttribute("target", "_blank")
      link.setAttribute("rel", "noopener noreferrer")
    }
  })
})

// Console Message
console.log("%c🚀 DigitalGear", "color: #00d9ff; font-size: 24px; font-weight: bold;")
console.log("%c¡Bienvenido a DigitalGear!", "color: #00ff88; font-size: 14px;")
console.log("%cTu fuente de información tecnológica", "color: #9ba3b4; font-size: 12px;")
