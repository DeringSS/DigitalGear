/**
 * DigitalGear - Ads Management
 * Handles Google AdSense integration and ad loading
 */

// Check if AdSense is blocked by ad blockers
function checkAdBlocker() {
  const testAd = document.createElement("div")
  testAd.innerHTML = "&nbsp;"
  testAd.className = "adsbox"
  testAd.style.cssText =
    "width: 1px !important; height: 1px !important; position: absolute !important; left: -999px !important;"

  document.body.appendChild(testAd)

  setTimeout(() => {
    const adHeight = testAd.offsetHeight
    document.body.removeChild(testAd)

    if (adHeight === 0) {
      console.log("[DigitalGear] AdBlocker detectado")
      // Optionally, show a message to users about disabling ad blockers
      // showAdBlockMessage();
    } else {
      console.log("[DigitalGear] AdSense cargado correctamente")
    }
  }, 100)
}

// Initialize AdSense
function initializeAdSense() {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAdSense)
    return
  }

  console.log("[DigitalGear] Inicializando AdSense...")

  // Check for ad blocker
  checkAdBlocker()

  // Load AdSense script (add your actual AdSense code here)
  // Example:
  // const script = document.createElement('script');
  // script.async = true;
  // script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
  // script.crossOrigin = 'anonymous';
  // document.head.appendChild(script);

  // Initialize ad slots
  initializeAdSlots()
}

// Initialize individual ad slots
function initializeAdSlots() {
  const adSlots = document.querySelectorAll(".ad-space")

  adSlots.forEach((slot, index) => {
    // Add unique identifier to each ad slot
    slot.setAttribute("data-ad-slot", `ad-${index + 1}`)

    // Log ad slot initialization
    console.log(`[DigitalGear] Ad slot ${index + 1} inicializado:`, slot.id)

    // Here you would initialize actual AdSense units
    // Example:
    // (adsbygoogle = window.adsbygoogle || []).push({});
  })
}

// Show message for ad blocker users (optional)
function showAdBlockMessage() {
  const message = document.createElement("div")
  message.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-bg-tertiary);
        border: 1px solid var(--color-accent-primary);
        border-radius: var(--radius-lg);
        padding: 1rem 2rem;
        color: var(--color-text-primary);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        max-width: 90%;
        width: 500px;
        text-align: center;
    `

  message.innerHTML = `
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">AdBlocker Detectado</p>
        <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-secondary);">
            Considera desactivar tu bloqueador de anuncios para apoyar nuestro contenido gratuito.
        </p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: var(--color-accent-primary);
            color: var(--color-bg-primary);
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-weight: 500;
        ">Entendido</button>
    `

  document.body.appendChild(message)

  // Auto-hide after 10 seconds
  setTimeout(() => {
    message.style.opacity = "0"
    message.style.transition = "opacity 0.5s ease"
    setTimeout(() => message.remove(), 500)
  }, 10000)
}

// Lazy load ads for better performance
function lazyLoadAds() {
  const adObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const adSlot = entry.target
          console.log("[DigitalGear] Ad entrando en viewport:", adSlot.id)

          // Here you would trigger ad loading
          // Example: loadAdUnit(adSlot);

          adObserver.unobserve(adSlot)
        }
      })
    },
    {
      rootMargin: "200px", // Load ads 200px before they come into view
    },
  )

  document.querySelectorAll(".ad-space").forEach((ad) => {
    adObserver.observe(ad)
  })
}

// Track ad performance (optional)
function trackAdPerformance() {
  // This function can be used to track ad impressions and clicks
  // Integration with Google Analytics or other analytics tools

  console.log("[DigitalGear] Ad performance tracking initialized")
}

// Initialize ads when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAdSense)
} else {
  initializeAdSense()
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", lazyLoadAds)
}

// Initialize performance tracking
document.addEventListener("DOMContentLoaded", trackAdPerformance)

// Handle responsive ad sizing
window.addEventListener("resize", () => {
  // Adjust ad sizes based on viewport
  const adSlots = document.querySelectorAll(".ad-space")
  adSlots.forEach((slot) => {
    // Responsive ad logic here if needed
    console.log("[DigitalGear] Ajustando tamaño de anuncios para viewport:", window.innerWidth)
  })
})

// Export functions for external use if needed
window.DigitalGearAds = {
  checkAdBlocker,
  initializeAdSense,
  showAdBlockMessage,
}
