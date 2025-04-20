// Редизайн компонентов интерфейса

document.addEventListener('DOMContentLoaded', function() {
  // Применяем современные стили к элементам интерфейса
  applyModernStyles();
  
  // Инициализируем улучшенный FAQ
  initModernFaq();
  
  // Инициализируем улучшенный слайдер
  initModernSlider();
  
  // Создаем частицы для героя-секции
  createHeroParticles();
  
  // Инициализируем анимации при скролле
  initScrollAnimations();
});

// Функция для применения современных стилей к элементам интерфейса
function applyModernStyles() {
  // Обновляем стили кнопок
  document.querySelectorAll('.hero-btn, .career-btn, .submit-btn').forEach(button => {
    button.classList.add('btn-modern');
    if (button.classList.contains('secondary')) {
      button.classList.add('btn-secondary');
    }
  });
  
  // Обновляем стили карточек
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('card-modern');
  });
  
  // Обновляем стили иконок в карточках
  document.querySelectorAll('.card i').forEach(icon => {
    icon.classList.add('card-modern-icon');
  });
  
  // Обновляем стили формы
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.classList.add('form-modern');
    
    // Обновляем стили групп формы
    contactForm.querySelectorAll('.form-group').forEach(group => {
      group.classList.add('form-group-modern');
    });
    
    // Обновляем стили меток формы
    contactForm.querySelectorAll('label').forEach(label => {
      label.classList.add('form-label-modern');
    });
    
    // Обновляем стили полей ввода
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.classList.add('form-input-modern');
      if (input.tagName === 'TEXTAREA') {
        input.classList.add('form-textarea-modern');
      }
    });
  }
  
  // Обновляем стили навигации
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.add('nav-modern');
    
    // Обновляем стили ссылок навигации
    nav.querySelectorAll('a').forEach(link => {
      link.classList.add('nav-link-modern');
      
      // Определяем активную ссылку на основе текущего URL
      const currentPath = window.location.pathname;
      const href = link.getAttribute('href');
      
      if (href === currentPath || 
          (currentPath === '/' && href === 'index.html') || 
          (currentPath === '/index.html' && href === '#')) {
        link.classList.add('active');
      }
    });
  }
  
  // Обновляем стили героя-секции
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('hero-modern');
    
    // Обновляем стили контента героя-секции
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('hero-content-modern');
      
      // Обновляем стили заголовка героя-секции
      const heroTitle = heroContent.querySelector('h1');
      if (heroTitle) {
        heroTitle.classList.add('hero-title-modern');
      }
      
      // Обновляем стили подзаголовка героя-секции
      const heroSubtitle = heroContent.querySelector('p');
      if (heroSubtitle) {
        heroSubtitle.classList.add('hero-subtitle-modern');
      }
      
      // Обновляем стили кнопок героя-секции
      const heroButtons = heroContent.querySelector('.hero-buttons');
      if (heroButtons) {
        heroButtons.classList.add('hero-buttons-modern');
      }
    }
    
    // Добавляем контейнер для частиц
    const heroParticles = document.createElement('div');
    heroParticles.className = 'hero-particles';
    hero.appendChild(heroParticles);
  }
  
  // Обновляем стили секций
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-modern');
    
    // Обновляем стили заголовков секций
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'section-title-modern';
    
    const h2 = section.querySelector('h2');
    if (h2 && h2.parentNode === section) {
      // Оборачиваем h2 в div с классом section-title-modern
      h2.parentNode.insertBefore(sectionTitle, h2);
      sectionTitle.appendChild(h2);
    }
  });
  
  // Обновляем стили футера
  const footer = document.querySelector('footer');
  if (footer) {
    footer.classList.add('footer-modern');
    
    // Обновляем стили контента футера
    const footerContent = footer.querySelector('.footer-content');
    if (footerContent) {
      footerContent.classList.add('footer-content-modern');
      
      // Обновляем стили колонок футера
      footerContent.querySelectorAll('.footer-column').forEach(column => {
        column.classList.add('footer-column-modern');
      });
    }
    
    // Обновляем стили нижней части футера
    const footerBottom = footer.querySelector('.footer-bottom');
    if (footerBottom) {
      footerBottom.classList.add('footer-bottom-modern');
      
      // Обновляем стили социальных ссылок
      const socialLinks = footerBottom.querySelector('.social-links');
      if (socialLinks) {
        socialLinks.classList.add('social-links-modern');
        
        // Обновляем стили отдельных социальных ссылок
        socialLinks.querySelectorAll('a').forEach(link => {
          link.classList.add('social-link-modern');
        });
      }
      
      // Обновляем стили копирайта
      const copyright = footerBottom.querySelector('p');
      if (copyright) {
        copyright.classList.add('copyright-modern');
      }
    }
  }
  
  // Обновляем стили FAQ
  const faqContainer = document.querySelector('.faq-container');
  if (faqContainer) {
    faqContainer.classList.add('faq-modern');
    
    // Обновляем стили элементов FAQ
    faqContainer.querySelectorAll('.faq-item').forEach(item => {
      item.classList.add('faq-item-modern');
      
      // Обновляем стили вопросов FAQ
      const question = item.querySelector('.faq-question');
      if (question) {
        question.classList.add('faq-question-modern');
        
        // Обновляем стили иконок FAQ
        const icon = question.querySelector('.faq-icon');
        if (icon) {
          icon.classList.add('faq-icon-modern');
        }
      }
      
      // Обновляем стили ответов FAQ
      const answer = item.querySelector('.faq-answer');
      if (answer) {
        answer.classList.add('faq-answer-modern');
      }
    });
  }
  
  // Обновляем стили статистики
  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) {
    statsContainer.classList.add('stats-modern');
    
    // Обновляем стили элементов статистики
    statsContainer.querySelectorAll('.stat-item').forEach(item => {
      item.classList.add('stat-item-modern');
      
      // Обновляем стили чисел статистики
      const number = item.querySelector('.stat-number');
      if (number) {
        number.classList.add('stat-number-modern');
      }
      
      // Обновляем стили меток статистики
      const label = item.querySelector('.stat-label');
      if (label) {
        label.classList.add('stat-label-modern');
      }
    });
  }
  
  // Обновляем стили слайдера
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.classList.add('slider-modern');
    
    // Обновляем стили обертки слайдера
    const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
    if (sliderWrapper) {
      sliderWrapper.classList.add('slider-wrapper-modern');
      
      // Обновляем стили слайдов
      sliderWrapper.querySelectorAll('.slide').forEach(slide => {
        slide.classList.add('slide-modern');
        
        // Обновляем стили изображений слайдов
        const img = slide.querySelector('img');
        if (img) {
          img.classList.add('slide-image-modern');
        }
        
        // Обновляем стили контента слайдов
        const content = slide.querySelector('.slide-content');
        if (content) {
          content.classList.add('slide-content-modern');
        }
      });
    }
    
    // Обновляем стили элементов управления слайдером
    const sliderControls = sliderContainer.querySelector('.slider-controls');
    if (sliderControls) {
      sliderControls.classList.add('slider-controls-modern');
      
      // Обновляем стили кнопок управления
      sliderControls.querySelectorAll('button').forEach(button => {
        button.classList.add('slider-control-modern');
      });
    }
    
    // Обновляем стили точек слайдера
    const sliderDots = sliderContainer.querySelector('.slider-dots');
    if (sliderDots) {
      sliderDots.classList.add('slider-dots-modern');
    }
  }
}

// Функция для инициализации улучшенного FAQ
function initModernFaq() {
  const faqItems = document.querySelectorAll('.faq-item-modern');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question-modern');
    const answer = item.querySelector('.faq-answer-modern');
    
    if (question && answer) {
      // Устанавливаем начальное состояние
      answer.style.maxHeight = '0';
      
      // Добавляем обработчик клика
      question.addEventListener('click', function() {
        // Закрываем все другие FAQ
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer-modern');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = '0';
            }
          }
        });
        
        // Переключаем текущий FAQ
        item.classList.toggle('active');
        
        if (item.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 40 + 'px'; // 40px для padding
        } else {
          answer.style.maxHeight = '0';
        }
      });
    }
  });
}

// Функция для инициализации улучшенного слайдера
function initModernSlider() {
  const sliderWrapper = document.querySelector('.slider-wrapper-modern');
  const slides = document.querySelectorAll('.slide-modern');
  const prevButton = document.querySelector('.slider-controls-modern .prev-slide');
  const nextButton = document.querySelector('.slider-controls-modern .next-slide');
  const dotsContainer = document.querySelector('.slider-dots-modern');
  
  if (sliderWrapper && slides.length > 0) {
    let currentSlide = 0;
    
    // Создаем точки для слайдера
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot-modern' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }
    
    // Функция для перехода к определенному слайду
    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
      currentSlide = index;
      
      // Обновляем активную точку
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.slider-dot-modern').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    }
    
    // Добавляем обработчики для кнопок
    if (prevButton) {
      prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Автоматическое переключение слайдов
    let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    
    // Останавливаем автоматическое переключение при наведении
    sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderWrapper.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
    
    // Добавляем поддержку свайпов для мобильных устройств
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
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Свайп влево
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Свайп вправо
        goToSlide(currentSlide - 1);
      }
    }
  }
}

// Функция для создания частиц в героя-секции
function createHeroParticles() {
  const heroParticles = document.querySelector('.hero-particles');
  
  if (heroParticles) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Случайные размеры и позиции
      const size = Math.random() * 5 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.1;
      const animationDuration = Math.random() * 20 + 10;
      const animationDelay = Math.random() * 5;
      
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = posX + '%';
      particle.style.top = posY + '%';
      particle.style.opacity = opacity;
      
      // Добавляем анимацию
      particle.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite alternate`;
      
      heroParticles.appendChild(particle);
    }
    
    // Добавляем стиль анимации
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        100% {
          transform: translateY(${Math.random() * 100 + 50}px) translateX(${Math.random() * 100 - 50}px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Функция для инициализации анимаций при скролле
function initScrollAnimations() {
  const elements = document.querySelectorAll('.card-modern, .stat-item-modern, .team-3d-card, .section-title-modern');
  
  // Создаем Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Добавляем стили для анимации
  const style = document.createElement('style');
  style.textContent = `
    .card-modern, .stat-item-modern, .team-3d-card, .section-title-modern {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .card-modern.animate, .stat-item-modern.animate, .team-3d-card.animate, .section-title-modern.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Наблюдаем за элементами
  elements.forEach(element => {
    observer.observe(element);
  });
}
