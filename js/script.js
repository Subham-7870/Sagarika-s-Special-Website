document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  
  // 1. Sticky Navigation Blur Effect on Scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check in case page starts scrolled down
  
  // 2. Mobile Hamburger Menu Toggle
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Smooth Scrolling for Navigation Links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Account for header height
        const headerHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Highlight active page link in nav bar
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace('./', '');
    const cleanPath = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    if (
      (cleanPath === '' && cleanHref === 'index.html') ||
      (cleanPath === 'index.html' && cleanHref === 'index.html') ||
      (cleanPath && cleanHref && cleanPath.includes(cleanHref))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 5. WhatsApp Order Form message generator
  const orderForm = document.getElementById('whatsapp-order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const occasion = document.getElementById('order-occasion').value;
      const flavor = document.getElementById('order-flavor').value || 'Any flavor';
      const weight = document.getElementById('order-weight').value;
      const notes = document.getElementById('order-notes').value || 'No special requirements';
      
      const baseMessage = `Hello Sagarika's Special! I would like to inquire about a custom cake:\n\n` +
                          `* Occasion: ${occasion}\n` +
                          `* Flavor: ${flavor}\n` +
                          `* Weight: ${weight}\n` +
                          `* Custom Details/Notes: ${notes}`;
      
      const encodedMessage = encodeURIComponent(baseMessage);
      const whatsappUrl = `https://wa.me/917008875538?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }

  // 7. Auto-fill Order Form from URL search parameters (occasion and flavor)
  const urlParams = new URLSearchParams(window.location.search);
  const occasionParam = urlParams.get('occasion');
  const flavorParam = urlParams.get('flavor');
  
  if (occasionParam) {
    const selectOccasion = document.getElementById('order-occasion');
    if (selectOccasion) {
      selectOccasion.value = occasionParam;
    }
  }
  if (flavorParam) {
    const inputFlavor = document.getElementById('order-flavor');
    if (inputFlavor) {
      inputFlavor.value = flavorParam;
    }
  }

  // 8. Gallery & Home Detail Bubble Creation and Handling
  const specialtiesGrid = document.querySelector('.grid-specialties');
  if (specialtiesGrid) {
    const cards = document.querySelectorAll('.specialty-card');
    
    const closeAllBubbles = () => {
      const existingBubbles = document.querySelectorAll('.detail-bubble');
      existingBubbles.forEach(b => b.remove());
    };

    cards.forEach(card => {
      // Set relative position on card dynamically to anchor the bubble
      card.style.position = 'relative';

      card.addEventListener('click', (e) => {
        // If we clicked inside an already open bubble, do nothing
        if (e.target.closest('.detail-bubble')) return;
        
        e.stopPropagation();
        closeAllBubbles();

        const img = card.querySelector('.specialty-img');
        const tag = card.querySelector('.specialty-tag');
        const title = card.querySelector('.specialty-title');
        const desc = card.querySelector('.specialty-desc');
        
        const occasion = card.getAttribute('data-occasion') || 'Birthday';
        const flavor = card.getAttribute('data-flavor') || '';
        const price = card.getAttribute('data-price') || 'Contact for pricing';
        
        const imgSrc = img ? img.src : '';
        const tagText = tag ? tag.textContent : 'Custom';
        const titleText = title ? title.textContent : 'Custom Cake';
        const descText = desc ? desc.textContent : '';

        // Create the detail bubble element
        const bubble = document.createElement('div');
        bubble.className = 'detail-bubble';
        bubble.innerHTML = `
          <button class="bubble-close" aria-label="Close details">
            <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
          </button>
          <div class="bubble-img-container">
            <img src="${imgSrc}" class="bubble-img" alt="${titleText}">
          </div>
          <div class="bubble-info">
            <span class="bubble-tag">${tagText}</span>
            <h3 class="bubble-title font-headline-sm">${titleText}</h3>
            <div class="bubble-meta">
              <span class="bubble-price">${price}</span>
              <span class="bubble-weight">• Min Weight: 1 kg</span>
            </div>
            <p class="bubble-desc font-body-sm">${descText}</p>
            <button class="bubble-cta-btn btn btn-primary btn-sm" style="border: 0;">
              Order This Theme
            </button>
          </div>
        `;

        // Prevent clicks inside the bubble from bubbling up to the card
        bubble.addEventListener('click', (evt) => {
          evt.stopPropagation();
        });

        // Close button click listener
        const closeBtn = bubble.querySelector('.bubble-close');
        closeBtn.addEventListener('click', (evt) => {
          evt.stopPropagation();
          bubble.remove();
        });

        // CTA button click listener
        const ctaBtn = bubble.querySelector('.bubble-cta-btn');
        ctaBtn.addEventListener('click', (evt) => {
          evt.stopPropagation();
          const redirectUrl = `./order.html?occasion=${encodeURIComponent(occasion)}&flavor=${encodeURIComponent(flavor)}`;
          window.location.href = redirectUrl;
        });

        card.appendChild(bubble);
      });
    });

    // Close all bubbles when clicking anywhere outside
    document.addEventListener('click', () => {
      closeAllBubbles();
    });
  }
});

// 6. Fade out preloader when page is fully loaded (all images, stylesheets, etc.)
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
    try {
      sessionStorage.setItem('ss_preloader_shown', 'true');
    } catch (e) {
      console.warn('sessionStorage is not accessible:', e);
    }
  }
};

// Fade out with a pleasant delay (e.g. 1.2s) after load completes
window.addEventListener('load', () => {
  let delay = 1200;
  try {
    if (sessionStorage.getItem('ss_preloader_shown')) {
      delay = 0; // Hide instantly if already shown in this session
    }
  } catch (e) {}
  
  setTimeout(hidePreloader, delay);
});

// Fallback: hide preloader after 3 seconds anyway in case window load is delayed or blocked
let fallbackDelay = 3000;
try {
  if (sessionStorage.getItem('ss_preloader_shown')) {
    fallbackDelay = 0; // Hide instantly if already shown in this session
  }
} catch (e) {}
setTimeout(hidePreloader, fallbackDelay);
