// Улучшения для мобильного опыта

document.addEventListener('DOMContentLoaded', function() {
  // Инициализация мобильного меню
  initMobileMenu();
  
  // Инициализация кнопки "Наверх"
  initBackToTopButton();
  
  // Исправление отображения содержания в уставе
  fixCharterTOC();
  
  // Улучшение форм для мобильных устройств
  enhanceMobileForms();
  
  // Добавление обработки свайпов
  initSwipeHandling();
  
  // Оптимизация загрузки изображений
  initLazyLoading();
});

// Функция для инициализации мобильного меню
function initMobileMenu() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  const body = document.body;
  
  if (!hamburgerMenu || !mobileNav) {
    // Создаем элементы, если они отсутствуют
    createMobileMenuElements();
    return;
  }
  
  // Добавляем обработчик для гамбургер-меню
  hamburgerMenu.addEventListener('click', function() {
    body.classList.toggle('mobile-nav-open');
  });
  
  // Добавляем обработчик для оверлея
  if (overlay) {
    overlay.addEventListener('click', function() {
      body.classList.remove('mobile-nav-open');
    });
  }
  
  // Добавляем обработчики для ссылок в мобильном меню
  const mobileNavLinks = mobileNav.querySelectorAll('a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      body.classList.remove('mobile-nav-open');
    });
  });
  
  // Добавляем обработчик для клавиши Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && body.classList.contains('mobile-nav-open')) {
      body.classList.remove('mobile-nav-open');
    }
  });
  
  // Синхронизируем мобильный переключатель темы с основным
  const mobileThemeToggle = document.querySelector('.mobile-controls .theme-toggle');
  const mainThemeToggle = document.querySelector('header .theme-toggle');
  
  if (mobileThemeToggle && mainThemeToggle) {
    mobileThemeToggle.addEventListener('click', function() {
      // Имитируем клик по основному переключателю
      mainThemeToggle.click();
      
      // Обновляем иконку в мобильном меню
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const icon = mobileThemeToggle.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }
    });
  }
  
  // Синхронизируем мобильный переключатель языка с основным
  const mobileLangSwitcher = document.getElementById('mobileLangSwitcher');
  const mainLangSwitcher = document.getElementById('langSwitcher');
  
  if (mobileLangSwitcher && mainLangSwitcher) {
    // Устанавливаем начальное значение
    mobileLangSwitcher.value = mainLangSwitcher.value;
    
    mobileLangSwitcher.addEventListener('change', function() {
      // Устанавливаем значение основного переключателя
      mainLangSwitcher.value = this.value;
      
      // Имитируем событие change
      const event = new Event('change');
      mainLangSwitcher.dispatchEvent(event);
    });
    
    mainLangSwitcher.addEventListener('change', function() {
      // Синхронизируем значение мобильного переключателя
      mobileLangSwitcher.value = this.value;
    });
  }
}

// Функция для создания элементов мобильного меню, если они отсутствуют
function createMobileMenuElements() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const body = document.body;
  
  if (!header) return;
  
  // Создаем гамбургер-меню
  if (!document.getElementById('hamburgerMenu')) {
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.id = 'hamburgerMenu';
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(hamburgerMenu);
  }
  
  // Создаем мобильную навигацию
  if (!document.getElementById('mobileNav')) {
    const mobileNav = document.createElement('div');
    mobileNav.id = 'mobileNav';
    mobileNav.className = 'mobile-nav';
    
    // Копируем ссылки из основной навигации
    if (nav) {
      const links = nav.querySelectorAll('a');
      links.forEach(link => {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        mobileNav.appendChild(newLink);
      });
    }
    
    // Добавляем элементы управления
    const mobileControls = document.createElement('div');
    mobileControls.className = 'mobile-controls';
    
    // Добавляем переключатель темы
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Тема';
    mobileControls.appendChild(themeToggle);
    
    // Добавляем переключатель языка
    const langSwitcher = document.createElement('select');
    langSwitcher.id = 'mobileLangSwitcher';
    langSwitcher.innerHTML = `
      <option value="ru">Русский</option>
      <option value="en">English</option>
      <option value="tj">Тоҷикӣ</option>
    `;
    mobileControls.appendChild(langSwitcher);
    
    mobileNav.appendChild(mobileControls);
    body.appendChild(mobileNav);
  }
  
  // Создаем оверлей
  if (!document.getElementById('overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    body.appendChild(overlay);
  }
  
  // Инициализируем мобильное меню
  initMobileMenu();
}

// Функция для инициализации кнопки "Наверх"
function initBackToTopButton() {
  // Создаем кнопку, если она отсутствует
  if (!document.querySelector('.back-to-top')) {
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Добавляем обработчик клика
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  const backToTopButton = document.querySelector('.back-to-top');
  
  // Показываем/скрываем кнопку при прокрутке
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
}

// Функция для исправления отображения содержания в уставе
function fixCharterTOC() {
  // Проверяем, находимся ли мы на странице устава
  if (window.location.pathname.includes('charter') || document.title.includes('Устав')) {
    const toc = document.querySelector('.charter-toc');
    const content = document.querySelector('.charter-content');
    
    // Если элементы существуют, добавляем классы для мобильной адаптации
    if (toc) {
      toc.classList.add('charter-toc');
    }
    
    if (content) {
      content.classList.add('charter-content');
    }
    
    // Создаем кнопку для показа/скрытия содержания на мобильных устройствах
    if (toc && !document.querySelector('.toc-toggle')) {
      const tocToggle = document.createElement('button');
      tocToggle.className = 'toc-toggle';
      tocToggle.innerHTML = '<i class="fas fa-list"></i> Содержание';
      
      // Добавляем обработчик клика
      tocToggle.addEventListener('click', function() {
        toc.classList.toggle('visible');
      });
      
      // Добавляем кнопку перед содержанием
      toc.parentNode.insertBefore(tocToggle, toc);
      
      // Добавляем стили для кнопки
      const style = document.createElement('style');
      style.textContent = `
        .toc-toggle {
          display: none;
          padding: 10px 15px;
          background-color: var(--accent);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 15px;
          font-weight: 500;
        }
        
        .toc-toggle i {
          margin-right: 5px;
        }
        
        @media (max-width: 768px) {
          .toc-toggle {
            display: block;
          }
          
          .charter-toc {
            display: none !important;
          }
          
          .charter-toc.visible {
            display: block !important;
            margin-bottom: 20px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Функция для улучшения форм на мобильных устройствах
function enhanceMobileForms() {
  // Улучшаем все формы
  document.querySelectorAll('form').forEach(form => {
    // Добавляем атрибут autocomplete для улучшения заполнения форм
    form.setAttribute('autocomplete', 'on');
    
    // Улучшаем поля ввода
    form.querySelectorAll('input, textarea, select').forEach(input => {
      // Добавляем атрибут autocapitalize для предотвращения автоматического ввода с большой буквы
      if (input.type === 'email' || input.type === 'url' || input.type === 'search') {
        input.setAttribute('autocapitalize', 'off');
      }
      
      // Добавляем атрибут autocorrect для предотвращения автокоррекции
      if (input.type === 'email' || input.type === 'url') {
        input.setAttribute('autocorrect', 'off');
      }
      
      // Устанавливаем атрибут inputmode для оптимизации виртуальной клавиатуры
      if (input.type === 'email') {
        input.setAttribute('inputmode', 'email');
      } else if (input.type === 'tel') {
        input.setAttribute('inputmode', 'tel');
      } else if (input.type === 'number') {
        input.setAttribute('inputmode', 'numeric');
      } else if (input.type === 'url') {
        input.setAttribute('inputmode', 'url');
      }
      
      // Добавляем обработчик фокуса для прокрутки к полю ввода
      input.addEventListener('focus', function() {
        // Небольшая задержка для корректной работы на мобильных устройствах
        setTimeout(() => {
          const rect = this.getBoundingClientRect();
          const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
          );
          
          if (!isInViewport) {
            this.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }, 300);
      });
    });
  });
}

// Функция для добавления обработки свайпов
function initSwipeHandling() {
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  
  // Добавляем обработчики для всего документа
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, false);
  
  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, false);
  
  // Функция обработки свайпа
  function handleSwipe() {
    const swipeThreshold = 100;
    const swipeVerticalThreshold = 50;
    const verticalMovement = Math.abs(touchEndY - touchStartY);
    
    // Проверяем, что свайп был преимущественно горизонтальным
    if (verticalMovement < swipeVerticalThreshold) {
      if (touchEndX < touchStartX - swipeThreshold) {
        // Свайп влево
        handleLeftSwipe();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Свайп вправо
        handleRightSwipe();
      }
    }
  }
  
  // Обработка свайпа влево
  function handleLeftSwipe() {
    // Проверяем, находимся ли мы в слайдере
    const sliderWrapper = document.querySelector('.slider-wrapper-modern');
    if (sliderWrapper) {
      // Имитируем клик по кнопке "Следующий слайд"
      const nextButton = document.querySelector('.slider-controls-modern .next-slide');
      if (nextButton) {
        nextButton.click();
        return;
      }
    }
    
    // Проверяем, находимся ли мы в карусели новостей
    const newsCarousel = document.getElementById('newsCarousel');
    if (newsCarousel) {
      // Имитируем клик по кнопке "Следующая новость"
      const nextButton = document.querySelector('.carousel-controls .next');
      if (nextButton) {
        nextButton.click();
        return;
      }
    }
  }
  
  // Обработка свайпа вправо
  function handleRightSwipe() {
    // Проверяем, находимся ли мы в слайдере
    const sliderWrapper = document.querySelector('.slider-wrapper-modern');
    if (sliderWrapper) {
      // Имитируем клик по кнопке "Предыдущий слайд"
      const prevButton = document.querySelector('.slider-controls-modern .prev-slide');
      if (prevButton) {
        prevButton.click();
        return;
      }
    }
    
    // Проверяем, находимся ли мы в карусели новостей
    const newsCarousel = document.getElementById('newsCarousel');
    if (newsCarousel) {
      // Имитируем клик по кнопке "Предыдущая новость"
      const prevButton = document.querySelector('.carousel-controls .prev');
      if (prevButton) {
        prevButton.click();
        return;
      }
    }
    
    // Если мы находимся на мобильном устройстве и свайп был от левого края экрана
    if (window.innerWidth <= 768 && touchStartX < 50) {
      // Открываем мобильное меню
      document.body.classList.add('mobile-nav-open');
    }
  }
}

// Функция для оптимизации загрузки изображений
function initLazyLoading() {
  // Проверяем поддержку IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          observer.unobserve(img);
        }
      });
    });
    
    // Находим все изображения с атрибутом data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Запасной вариант для браузеров без поддержки IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
  
  // Конвертируем обычные изображения в ленивую загрузку
  document.querySelectorAll('img:not([data-src])').forEach(img => {
    // Пропускаем изображения, которые уже загружены или не имеют src
    if (!img.src || img.complete) return;
    
    // Сохраняем оригинальный src в data-src
    img.setAttribute('data-src', img.src);
    
    // Устанавливаем placeholder
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
  });
}
