// Функция для загрузки и отображения новостей из JSON файла
document.addEventListener('DOMContentLoaded', function() {
  // Загрузка новостей
  loadNews();
  
  // Инициализация FAQ аккордеона
  initFAQ();
});

// Функция для загрузки новостей из JSON файла
function loadNews() {
  const newsCarousel = document.getElementById('newsCarousel');
  const carouselIndicators = document.getElementById('carouselIndicators');
  
  if (!newsCarousel || !carouselIndicators) return;
  
  // Загрузка данных из JSON файла
  fetch('news-data.json')
    .then(response => response.json())
    .then(data => {
      // Очистка контейнера
      newsCarousel.innerHTML = '';
      carouselIndicators.innerHTML = '';
      
      // Добавление новостей в карусель
      data.forEach((news, index) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        
        newsItem.innerHTML = `
          <div class="news-item-image">
            <img src="${news.image}" alt="${news.title}">
          </div>
          <div class="news-item-date">${news.date}</div>
          <h3 class="news-item-title">${news.title}</h3>
          <p class="news-item-excerpt">${news.excerpt}</p>
          <a href="${news.url}" class="news-item-link">Узнать больше</a>
        `;
        
        newsCarousel.appendChild(newsItem);
        
        // Добавление индикатора
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => moveToSlide(index));
        carouselIndicators.appendChild(indicator);
      });
      
      // Инициализация карусели
      initNewsCarousel();
    })
    .catch(error => {
      console.error('Ошибка загрузки новостей:', error);
      newsCarousel.innerHTML = '<p>Не удалось загрузить новости. Пожалуйста, попробуйте позже.</p>';
    });
}

// Функция для инициализации карусели новостей
function initNewsCarousel() {
  const newsCarousel = document.getElementById('newsCarousel');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!newsCarousel || !prevBtn || !nextBtn) return;
  
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.news-item').length;
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
  prevBtn.addEventListener('click', () => {
    moveToSlide(currentSlide - 1);
    resetAutoSlide();
  });
  
  nextBtn.addEventListener('click', () => {
    moveToSlide(currentSlide + 1);
    resetAutoSlide();
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

// Функция для инициализации FAQ аккордеона
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
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
  });
}
