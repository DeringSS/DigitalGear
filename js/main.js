// TechHub - Main JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Update category page based on URL parameter
  updateCategoryPage()

  // Handle newsletter form submission
  handleNewsletterForm()

  // Handle contact form submission
  handleContactForm()

  // Smooth scroll for anchor links
  initSmoothScroll()

  // Add scroll-to-top button
  initScrollToTop()
})

// Update category page content based on URL parameter
function updateCategoryPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("cat")

  if (!category) return

  const categoryData = {
    smartphones: {
      title: "Smartphones",
      description: "Descubre los últimos modelos, comparativas y análisis en profundidad de smartphones",
    },
    gadgets: {
      title: "Gadgets",
      description: "Los dispositivos más innovadores y útiles que debes conocer",
    },
    ia: {
      title: "Inteligencia Artificial",
      description: "Explora el futuro de la tecnología con IA y machine learning",
    },
    accesorios: {
      title: "Accesorios",
      description: "Complementa tu experiencia tecnológica con los mejores accesorios",
    },
    reviews: {
      title: "Reviews",
      description: "Análisis profesionales y honestos de productos tecnológicos",
    },
    guias: {
      title: "Guías de Compra",
      description: "Encuentra el producto perfecto para ti con nuestras guías especializadas",
    },
  }

  const data = categoryData[category]
  if (data) {
    const titleElement = document.getElementById("categoryTitle")
    const descElement = document.getElementById("categoryDescription")

    if (titleElement) titleElement.textContent = data.title
    if (descElement) descElement.textContent = data.description
  }
}

// Handle newsletter form submission
function handleNewsletterForm() {
  const form = document.getElementById("newsletterForm")
  if (!form) return

  form.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value

    // Simulate form submission
    alert("¡Gracias por suscribirte! Pronto recibirás nuestras últimas noticias en " + email)
    this.reset()
  })
}

// Handle contact form submission
function handleContactForm() {
  const form = document.getElementById("contactForm")
  if (!form) return

  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const nombre = document.getElementById("nombre").value
    const email = document.getElementById("email").value
    const asunto = document.getElementById("asunto").value
    const mensaje = document.getElementById("mensaje").value

    // Simulate form submission
    alert("¡Gracias por contactarnos, " + nombre + "! Hemos recibido tu mensaje y te responderemos pronto.")
    this.reset()
  })
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Scroll to top button
function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement("button")
  scrollBtn.innerHTML = "↑"
  scrollBtn.className = "scroll-to-top"
  scrollBtn.setAttribute("aria-label", "Volver arriba")
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00d4ff, #00a3cc);
    color: #0a1929;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
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

  // Scroll to top on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Hover effect
  scrollBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)"
    this.style.boxShadow = "0 6px 20px rgba(0, 212, 255, 0.4)"
  })

  scrollBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
    this.style.boxShadow = "0 4px 15px rgba(0, 212, 255, 0.3)"
  })
}
