// Основной файл JavaScript для сайта Ibod Corporation

// Переключение темы (светлая/темная)
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Обновление иконки переключателя темы
  const themeToggles = document.querySelectorAll('.theme-toggle i');
  themeToggles.forEach(icon => {
    if (newTheme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

// Переключение языка
function switchLang(lang) {
  // Синхронизация выбора языка между мобильной и десктопной версиями
  const langSwitchers = document.querySelectorAll('#langSwitcher, #mobileLangSwitcher');
  langSwitchers.forEach(switcher => {
    switcher.value = lang;
  });
  
  // Сохранение выбора языка
  localStorage.setItem('lang', lang);
  
  // Здесь будет логика переключения языка
  console.log(`Язык переключен на: ${lang}`);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация темы
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    
    // Обновление иконки переключателя темы
    const themeToggles = document.querySelectorAll('.theme-toggle i');
    themeToggles.forEach(icon => {
      if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });
  }
  
  // Инициализация языка
  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    const langSwitchers = document.querySelectorAll('#langSwitcher, #mobileLangSwitcher');
    langSwitchers.forEach(switcher => {
      switcher.value = savedLang;
    });
  }
  
  // Инициализация мобильного меню
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  
  if (hamburgerMenu && mobileNav && overlay) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    overlay.addEventListener('click', function() {
      hamburgerMenu.classList.remove('active');
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
    
    // Закрытие мобильного меню при клике на ссылку
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  // Инициализация счетчиков статистики
  const statCounters = document.querySelectorAll('.stat-counter');
  if (statCounters.length > 0) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          let count = 0;
          const duration = 2000; // 2 секунды
          const interval = duration / target;
          
          const timer = setInterval(() => {
            count++;
            counter.textContent = count;
            
            if (count >= target) {
              clearInterval(timer);
            }
          }, interval);
          
          observer.unobserve(counter);
        }
      });
    }, options);
    
    statCounters.forEach(counter => {
      observer.observe(counter);
    });
  }
  
  // Инициализация FAQ аккордеона
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Закрываем все остальные элементы
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Переключаем активный элемент
        item.classList.toggle('active');
      });
    }
  });
  
  // Инициализация карусели новостей
  initNewsCarousel();
  
  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Подсветка активного пункта меню при скролле
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `index.html#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// Функция для инициализации карусели новостей
function initNewsCarousel() {
  const newsCarousel = document.getElementById('newsCarousel');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!newsCarousel || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const newsItems = document.querySelectorAll('.news-item');
  const totalSlides = newsItems.length;
  const slideWidth = 330; // Ширина слайда + отступы
  let autoSlideInterval;
  
  // Функция для перехода к определенному слайду
  function moveToSlide(index) {
    if (index < 0) index = 0;
    if (index > totalSlides - 1) index = totalSlides - 1;
    
    currentSlide = index;
    const offset = -currentSlide * slideWidth;
    newsCarousel.style.transform = `translateX(${offset}px)`;
    
    // Обновление активного индикатора
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }
  
  // Обработчики для кнопок
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      moveToSlide(currentSlide - 1);
      resetAutoSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      moveToSlide(currentSlide + 1);
      resetAutoSlide();
    });
  }
  
  // Обработчики для индикаторов
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      moveToSlide(index);
      resetAutoSlide();
    });
  });
  
  // Автоматическое переключение слайдов
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      let nextSlide = currentSlide + 1;
      if (nextSlide >= totalSlides) nextSlide = 0;
      moveToSlide(nextSlide);
    }, 5000);
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  // Запускаем автоматическое переключение
  startAutoSlide();
}
