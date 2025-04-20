// Main JavaScript file for Ibod Corporation website
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  const body = document.body;

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function() {
      body.classList.toggle('mobile-nav-open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function() {
      body.classList.remove('mobile-nav-open');
    });
  }

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      body.classList.remove('mobile-nav-open');
    });
  });

  // Theme toggle functionality
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  function toggleTheme() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggles.forEach(toggle => {
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        if (toggle.textContent.includes('Тема')) {
          toggle.innerHTML = '<i class="fas fa-moon"></i> Тема';
        }
      });
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggles.forEach(toggle => {
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (toggle.textContent.includes('Тема')) {
          toggle.innerHTML = '<i class="fas fa-sun"></i> Тема';
        }
      });
    }
  }

  // Apply theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      themeToggles.forEach(toggle => {
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (toggle.textContent.includes('Тема')) {
          toggle.innerHTML = '<i class="fas fa-sun"></i> Тема';
        }
      });
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggles.forEach(toggle => {
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
      if (toggle.textContent.includes('Тема')) {
        toggle.innerHTML = '<i class="fas fa-sun"></i> Тема';
      }
    });
  }

  // Add event listeners to theme toggles
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });

  // Make toggleTheme available globally
  window.toggleTheme = toggleTheme;

  // Language switcher functionality
  function switchLang(lang) {
    // In a real implementation, this would switch the language
    console.log('Switching to language:', lang);
    // For now, just sync the selectors
    const langSwitchers = document.querySelectorAll('#langSwitcher, #mobileLangSwitcher');
    langSwitchers.forEach(switcher => {
      switcher.value = lang;
    });
  }

  // Make switchLang available globally
  window.switchLang = switchLang;

  // Sync language switchers
  const langSwitchers = document.querySelectorAll('#langSwitcher, #mobileLangSwitcher');
  langSwitchers.forEach(switcher => {
    switcher.addEventListener('change', function() {
      switchLang(this.value);
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Slider functionality
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (sliderWrapper && slides.length > 0) {
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    // Function to go to a specific slide
    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
      currentSlide = index;
      
      // Update dots
      document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    // Event listeners for buttons
    if (prevButton) {
      prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Auto slide
    let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    
    // Pause on hover
    sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderWrapper.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderWrapper.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + 50) {
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Counter animation for statistics
  const counters = document.querySelectorAll('.counter');
  
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 20);
    } else {
      counter.innerText = target;
    }
  }
  
  // Intersection Observer for counters
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      counter.innerText = '0';
      observer.observe(counter);
    });
  }

  // Form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Simple validation
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = 'red';
        isValid = false;
      } else {
        nameInput.style.borderColor = '';
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = 'red';
        isValid = false;
      } else {
        emailInput.style.borderColor = '';
      }
      
      if (!messageInput.value.trim()) {
        messageInput.style.borderColor = 'red';
        isValid = false;
      } else {
        messageInput.style.borderColor = '';
      }
      
      if (isValid) {
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.classList.remove('loading');
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.style.color = 'var(--accent)';
          successMessage.style.padding = '15px';
          successMessage.style.marginTop = '20px';
          successMessage.style.borderRadius = '5px';
          successMessage.style.backgroundColor = 'rgba(0, 201, 167, 0.1)';
          successMessage.textContent = 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
          
          contactForm.appendChild(successMessage);
          
          // Reset form
          contactForm.reset();
          
          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transition = 'opacity 0.5s';
            setTimeout(() => successMessage.remove(), 500);
          }, 5000);
        }, 1500);
      }
    });
    
    // Email validation helper
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    // Real-time validation feedback
    nameInput.addEventListener('input', function() {
      this.style.borderColor = this.value.trim() ? '' : 'red';
    });
    
    emailInput.addEventListener('input', function() {
      this.style.borderColor = (this.value.trim() && isValidEmail(this.value)) ? '' : 'red';
    });
    
    messageInput.addEventListener('input', function() {
      this.style.borderColor = this.value.trim() ? '' : 'red';
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to navigation based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const headerHeight = document.querySelector('header').offsetHeight;
      
      if (window.pageYOffset >= sectionTop - headerHeight - 100 && 
          window.pageYOffset < sectionTop + sectionHeight - headerHeight - 100) {
        currentSection = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Lazy loading for images
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
    });
  }

  // Load news data from JSON
  const newsCarousel = document.getElementById('newsCarousel');
  const carouselIndicators = document.getElementById('carouselIndicators');
  
  if (newsCarousel) {
    // Fetch news data
    fetch('news-data.json')
      .then(response => response.json())
      .then(data => {
        // Create news items
        data.forEach((news, index) => {
          const newsItem = document.createElement('div');
          newsItem.className = 'news-item';
          if (index !== 0) newsItem.classList.add('hidden');
          
          newsItem.innerHTML = `
            <div class="news-card">
              <img src="${news.image}" alt="${news.title}" class="news-image">
              <div class="news-content">
                <div class="news-date">${news.date}</div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="${news.link}" class="news-link">Читать далее</a>
              </div>
            </div>
          `;
          
          newsCarousel.appendChild(newsItem);
          
          // Create indicator
          const indicator = document.createElement('div');
          indicator.className = 'carousel-indicator';
          if (index === 0) indicator.classList.add('active');
          indicator.addEventListener('click', () => showNewsItem(index));
          carouselIndicators.appendChild(indicator);
        });
        
        // Set up carousel controls
        const prevButton = document.querySelector('.carousel-control.prev');
        const nextButton = document.querySelector('.carousel-control.next');
        
        let currentNews = 0;
        
        function showNewsItem(index) {
          const newsItems = document.querySelectorAll('.news-item');
          const indicators = document.querySelectorAll('.carousel-indicator');
          
          if (index < 0) index = newsItems.length - 1;
          if (index >= newsItems.length) index = 0;
          
          newsItems.forEach((item, i) => {
            item.classList.toggle('hidden', i !== index);
          });
          
          indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
          });
          
          currentNews = index;
        }
        
        if (prevButton) {
          prevButton.addEventListener('click', () => showNewsItem(currentNews - 1));
        }
        
        if (nextButton) {
          nextButton.addEventListener('click', () => showNewsItem(currentNews + 1));
        }
        
        // Auto rotate news
        let newsInterval = setInterval(() => showNewsItem(currentNews + 1), 6000);
        
        newsCarousel.addEventListener('mouseenter', () => clearInterval(newsInterval));
        newsCarousel.addEventListener('mouseleave', () => {
          clearInterval(newsInterval);
          newsInterval = setInterval(() => showNewsItem(currentNews + 1), 6000);
        });
      })
      .catch(error => {
        console.error('Error loading news data:', error);
        newsCarousel.innerHTML = '<p>Не удалось загрузить новости. Пожалуйста, попробуйте позже.</p>';
      });
  }

  // Add skip to content link for accessibility
  const header = document.querySelector('header');
  if (header) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Перейти к содержанию';
    document.body.insertBefore(skipLink, header);
    
    // Add id to main content
    const mainContent = document.querySelector('section');
    if (mainContent) {
      mainContent.id = 'main';
      mainContent.setAttribute('tabindex', '-1');
    }
  }

  // Detect if user is using keyboard navigation
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  
  window.addEventListener('keydown', handleFirstTab);
});
