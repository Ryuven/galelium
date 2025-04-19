// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация мобильного меню
  initMobileMenu();
  
  // Инициализация слайдера
  initSlider();
  
  // Инициализация счетчиков статистики
  initCounters();
  
  // Проверка и установка темы
  checkTheme();
  
  // Инициализация языка
  initLanguage();
});

// Функция для инициализации мобильного меню
function initMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  
  if (hamburgerMenu && mobileNav && overlay) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function() {
      hamburgerMenu.classList.remove('active');
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    });
    
    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
      });
    });
  }
}

// Функция для инициализации слайдера
function initSlider() {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!sliderWrapper || slides.length === 0) return;
  
  let currentSlide = 0;
  let slideWidth = 100; // в процентах
  let autoSlideInterval;
  
  // Создаем точки для слайдера
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Функция для перехода к определенному слайду
  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    sliderWrapper.style.transform = `translateX(-${index * slideWidth}%)`;
    currentSlide = index;
    
    // Обновляем активную точку
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Обработчики для кнопок
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoSlide();
    });
  }
  
  // Автоматическое переключение слайдов
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  // Запускаем автоматическое переключение
  startAutoSlide();
}

// Функция для инициализации счетчиков
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 секунды
    const step = Math.ceil(target / (duration / 50)); // 50 - частота обновления в мс
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current > target) current = target;
      counter.textContent = current;
      
      if (current < target) {
        setTimeout(updateCounter, 50);
      }
    };
    
    updateCounter();
  });
}

// Функция для переключения темы
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Обновляем иконку
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

// Функция для проверки и установки темы
function checkTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Обновляем иконку
    const themeToggles = document.querySelectorAll('.theme-toggle i');
    themeToggles.forEach(icon => {
      if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
  }
}

// Функция для переключения языка
function switchLang(lang) {
  // Синхронизируем выбор языка между десктопной и мобильной версиями
  const langSwitchers = document.querySelectorAll('#langSwitcher, #mobileLangSwitcher');
  langSwitchers.forEach(switcher => {
    switcher.value = lang;
  });
  
  // Здесь можно добавить логику для переключения языка
  // Например, загрузка переводов и обновление текстов на странице
  console.log('Язык переключен на:', lang);
  
  // Сохраняем выбор пользователя
  localStorage.setItem('language', lang);
}

// Функция для инициализации языка
function initLanguage() {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    switchLang(savedLang);
  }
}

// Функция для активации ссылок меню при прокрутке
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
