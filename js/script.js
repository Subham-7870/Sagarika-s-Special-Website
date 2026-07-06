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
});

// 4. Fade out preloader when page is fully loaded (all images, stylesheets, etc.)
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
};

// Fade out with a pleasant delay (e.g. 1.2s) after load completes so the animations can play beautifully
window.addEventListener('load', () => {
  setTimeout(hidePreloader, 1200);
});

// Fallback: hide preloader after 3 seconds anyway in case window load is delayed or blocked
setTimeout(hidePreloader, 3000);
