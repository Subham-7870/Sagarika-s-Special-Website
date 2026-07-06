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

  // 8. Gallery Lightbox Modal Creation and Handling
  const galleryPage = document.getElementById('gallery');
  if (galleryPage) {
    // Dynamically inject the lightbox modal markup
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" id="lightbox-close" aria-label="Close modal">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div class="lightbox-img-wrapper">
          <img id="lightbox-img" class="lightbox-img" alt="Custom cake design">
        </div>
        <div class="lightbox-info">
          <span id="lightbox-tag" class="lightbox-tag"></span>
          <h2 id="lightbox-title" class="lightbox-title font-display-md"></h2>
          <span id="lightbox-price" class="lightbox-price"></span>
          <p id="lightbox-desc" class="lightbox-desc font-body-md"></p>
          <div class="lightbox-veg-banner">
            <span class="material-symbols-outlined lightbox-veg-icon">eco</span>
            <span>All our cakes are 100% Veg (Eggless)</span>
          </div>
          <button id="lightbox-cta" class="btn btn-primary" style="margin-top: 10px; width: 100%; justify-content: center; border: 0; cursor: pointer;">
            Order This Theme
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('lightbox-img');
    const modalTag = document.getElementById('lightbox-tag');
    const modalTitle = document.getElementById('lightbox-title');
    const modalPrice = document.getElementById('lightbox-price');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalClose = document.getElementById('lightbox-close');
    const modalCta = document.getElementById('lightbox-cta');
    
    const cards = document.querySelectorAll('.specialty-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.specialty-img');
        const tag = card.querySelector('.specialty-tag');
        const title = card.querySelector('.specialty-title');
        const desc = card.querySelector('.specialty-desc');
        
        const occasion = card.getAttribute('data-occasion') || 'Birthday';
        const flavor = card.getAttribute('data-flavor') || '';
        const price = card.getAttribute('data-price') || 'Contact for pricing';
        
        if (img) modalImg.src = img.src.split('?')[0]; // strip version tags
        if (img) modalImg.alt = img.alt;
        if (tag) modalTag.textContent = tag.textContent;
        if (title) modalTitle.textContent = title.textContent;
        if (price) modalPrice.textContent = price;
        if (desc) modalDesc.textContent = desc.textContent;
        
        modalCta.onclick = () => {
          const redirectUrl = `./order.html?occasion=${encodeURIComponent(occasion)}&flavor=${encodeURIComponent(flavor)}`;
          window.location.href = redirectUrl;
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
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
