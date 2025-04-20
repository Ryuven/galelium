// Визуальные улучшения для сайта

document.addEventListener('DOMContentLoaded', function() {
  // Применяем визуальные улучшения
  applyVisualImprovements();
  
  // Инициализируем анимации при скролле
  initScrollAnimations();
  
  // Инициализируем параллакс-эффекты
  initParallaxEffects();
  
  // Инициализируем эффекты наведения
  initHoverEffects();
  
  // Инициализируем градиентные тексты
  initGradientTexts();
  
  // Инициализируем фоновые узоры
  initBackgroundPatterns();
  
  // Инициализируем улучшенные секции
  initEnhancedSections();
});

// Функция для применения визуальных улучшений
function applyVisualImprovements() {
  // Применяем стили к заголовкам
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    if (!heading.classList.contains('hero-title-modern') && 
        !heading.classList.contains('section-title-modern') && 
        !heading.classList.contains('modal-title')) {
      heading.classList.add('text-gradient');
    }
  });
  
  // Применяем стили к кнопкам
  document.querySelectorAll('.btn-modern').forEach(button => {
    if (!button.classList.contains('btn-secondary')) {
      button.classList.add('shadow-accent');
    }
  });
  
  // Применяем стили к карточкам
  document.querySelectorAll('.card-modern').forEach(card => {
    card.classList.add('card-hover-effect');
  });
  
  // Применяем стили к изображениям
  document.querySelectorAll('img').forEach(img => {
    if (!img.closest('.gallery-item') && 
        !img.closest('.slide-modern') && 
        !img.closest('.team-3d-card')) {
      img.classList.add('image-rounded', 'image-shadow');
    }
  });
  
  // Применяем стили к иконкам
  document.querySelectorAll('.card-modern-icon').forEach(icon => {
    icon.classList.add('icon-gradient', 'icon-float');
  });
  
  // Применяем стили к спискам
  document.querySelectorAll('ul').forEach(list => {
    if (!list.classList.contains('social-icons') && 
        !list.classList.contains('slider-dots-modern')) {
      list.classList.add('list-check');
    }
  });
  
  // Применяем стили к таблицам
  document.querySelectorAll('table').forEach(table => {
    table.classList.add('table-modern', 'table-rounded');
  });
  
  // Применяем стили к цитатам
  document.querySelectorAll('blockquote').forEach(quote => {
    quote.classList.add('quote-modern');
  });
  
  // Применяем стили к разделителям
  document.querySelectorAll('hr').forEach(hr => {
    hr.classList.add('divider-gradient');
  });
  
  // Создаем разделители для секций
  document.querySelectorAll('section').forEach(section => {
    if (section.nextElementSibling && section.nextElementSibling.tagName === 'SECTION') {
      const divider = document.createElement('div');
      divider.className = 'divider-dots';
      divider.innerHTML = '<span></span>';
      section.after(divider);
    }
  });
  
  // Применяем стили к хедеру
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('glass-nav');
  }
  
  // Применяем стили к футеру
  const footer = document.querySelector('footer');
  if (footer) {
    footer.classList.add('bg-gradient-dark');
  }
  
  // Применяем стили к героя-секции
  const hero = document.querySelector('.hero-modern');
  if (hero) {
    hero.classList.add('bg-gradient-accent');
  }
}

// Функция для инициализации анимаций при скролле
function initScrollAnimations() {
  // Находим все элементы, которые нужно анимировать
  const elements = document.querySelectorAll('.card-modern, .team-3d-card, .stat-item-modern, .section-title-modern, .mission-3d-card, .globe-3d-container, .chart-3d-container');
  
  // Создаем Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Определяем тип анимации на основе класса элемента
        if (entry.target.classList.contains('card-modern')) {
          entry.target.classList.add('animate-fade-up');
        } else if (entry.target.classList.contains('team-3d-card')) {
          entry.target.classList.add('animate-fade-in');
        } else if (entry.target.classList.contains('stat-item-modern')) {
          entry.target.classList.add('animate-scale-in');
        } else if (entry.target.classList.contains('section-title-modern')) {
          entry.target.classList.add('animate-fade-down');
        } else if (entry.target.classList.contains('mission-3d-card')) {
          entry.target.classList.add('animate-fade-in');
        } else if (entry.target.classList.contains('globe-3d-container')) {
          entry.target.classList.add('animate-fade-in');
        } else if (entry.target.classList.contains('chart-3d-container')) {
          entry.target.classList.add('animate-fade-up');
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Наблюдаем за элементами
  elements.forEach(element => {
    observer.observe(element);
  });
  
  // Добавляем анимации для элементов героя-секции
  const heroTitle = document.querySelector('.hero-title-modern');
  const heroSubtitle = document.querySelector('.hero-subtitle-modern');
  const heroButtons = document.querySelector('.hero-buttons-modern');
  
  if (heroTitle) {
    heroTitle.classList.add('animate-fade-down');
  }
  
  if (heroSubtitle) {
    heroSubtitle.classList.add('animate-fade-up');
    heroSubtitle.style.animationDelay = '0.3s';
  }
  
  if (heroButtons) {
    heroButtons.classList.add('animate-fade-up');
    heroButtons.style.animationDelay = '0.6s';
  }
}

// Функция для инициализации параллакс-эффектов
function initParallaxEffects() {
  // Добавляем параллакс-эффект для героя-секции
  const hero = document.querySelector('.hero-modern');
  
  if (hero) {
    window.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      hero.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
    });
  }
  
  // Добавляем параллакс-эффект для карточек
  document.querySelectorAll('.card-modern').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      this.style.transform = `perspective(1000px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * -5}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Функция для инициализации эффектов наведения
function initHoverEffects() {
  // Добавляем эффект наведения для кнопок
  document.querySelectorAll('.btn-modern').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 201, 167, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Добавляем эффект наведения для ссылок
  document.querySelectorAll('a:not(.btn-modern):not(.nav-link-modern)').forEach(link => {
    link.style.transition = 'color 0.3s ease';
    
    link.addEventListener('mouseenter', function() {
      this.style.color = 'var(--accent)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.color = '';
    });
  });
  
  // Добавляем эффект наведения для изображений
  document.querySelectorAll('img:not(.gallery-image):not(.slide-image-modern):not(.team-3d-photo)').forEach(img => {
    img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
}

// Функция для инициализации градиентных текстов
function initGradientTexts() {
  // Создаем стиль для градиентных текстов
  const style = document.createElement('style');
  style.textContent = `
    .text-gradient {
      background: linear-gradient(135deg, var(--accent-dark), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  `;
  document.head.appendChild(style);
  
  // Применяем градиентный текст к заголовкам секций
  document.querySelectorAll('.section-title-modern h2').forEach(heading => {
    heading.classList.add('text-gradient');
  });
  
  // Применяем градиентный текст к числам статистики
  document.querySelectorAll('.stat-number-modern').forEach(number => {
    number.classList.add('text-gradient');
  });
}

// Функция для инициализации фоновых узоров
function initBackgroundPatterns() {
  // Добавляем фоновые узоры к секциям
  document.querySelectorAll('section').forEach((section, index) => {
    if (index % 3 === 0) {
      section.classList.add('bg-pattern');
    } else if (index % 3 === 1) {
      section.classList.add('bg-dots');
    } else {
      section.classList.add('bg-grid');
    }
  });
}

// Функция для инициализации улучшенных секций
function initEnhancedSections() {
  // Добавляем волнистые разделители к секциям
  document.querySelectorAll('section').forEach((section, index) => {
    if (index % 3 === 0 && section.nextElementSibling) {
      section.classList.add('section-wave');
    } else if (index % 3 === 1 && section.nextElementSibling) {
      section.classList.add('section-angle');
    } else if (index % 3 === 2 && section.nextElementSibling) {
      section.classList.add('section-curve');
    }
  });
  
  // Создаем стеклянные карточки для важных элементов
  document.querySelectorAll('.cta, .highlight').forEach(element => {
    element.classList.add('glass-card');
  });
  
  // Создаем неоморфные элементы для форм
  document.querySelectorAll('form').forEach(form => {
    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.classList.add('neomorphic-input');
    });
    
    form.querySelectorAll('button[type="submit"]').forEach(button => {
      button.classList.add('neomorphic-button');
    });
  });
}

// Функция для создания эффекта частиц на фоне
function createParticlesEffect() {
  // Создаем контейнер для частиц
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.zIndex = '-1';
  particlesContainer.style.pointerEvents = 'none';
  
  document.body.appendChild(particlesContainer);
  
  // Создаем частицы
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Случайные размеры и позиции
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.3 + 0.1;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 5;
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = posX + '%';
    particle.style.top = posY + '%';
    particle.style.opacity = opacity;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = 'var(--accent)';
    
    // Добавляем анимацию
    particle.style.animation = `float ${animationDuration}s ease-in-out ${animationDelay}s infinite alternate`;
    
    particlesContainer.appendChild(particle);
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

// Вызываем функцию создания эффекта частиц
document.addEventListener('DOMContentLoaded', createParticlesEffect);
