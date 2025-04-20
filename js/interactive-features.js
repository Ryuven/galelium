// Интерактивные функции для сайта

document.addEventListener('DOMContentLoaded', function() {
  // Инициализация прелоадера
  initPreloader();
  
  // Инициализация всплывающих подсказок
  initTooltips();
  
  // Инициализация модальных окон
  initModals();
  
  // Инициализация интерактивной галереи
  initGallery();
  
  // Инициализация интерактивной карты
  initInteractiveMap();
  
  // Инициализация анимированных графиков
  initAnimatedCharts();
  
  // Инициализация интерактивного FAQ
  initInteractiveFAQ();
  
  // Инициализация уведомлений
  initNotifications();
  
  // Инициализация формы обратной связи
  initFeedbackForm();
  
  // Инициализация анимированных счетчиков
  initAnimatedCounters();
});

// Функция для инициализации прелоадера
function initPreloader() {
  // Создаем прелоадер, если он отсутствует
  if (!document.querySelector('.preloader')) {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="preloader-spinner"></div>';
    document.body.appendChild(preloader);
    
    // Скрываем прелоадер после загрузки страницы
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('hidden');
      }, 500);
    });
    
    // Скрываем прелоадер, если страница уже загружена
    if (document.readyState === 'complete') {
      setTimeout(function() {
        preloader.classList.add('hidden');
      }, 500);
    }
  }
}

// Функция для инициализации всплывающих подсказок
function initTooltips() {
  // Находим все элементы с атрибутом data-tooltip
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    // Получаем текст подсказки
    const tooltipText = element.getAttribute('data-tooltip');
    
    // Добавляем класс tooltip
    element.classList.add('tooltip');
    
    // Создаем элемент подсказки
    const tooltipElement = document.createElement('span');
    tooltipElement.className = 'tooltip-text';
    tooltipElement.textContent = tooltipText;
    
    // Добавляем подсказку в элемент
    element.appendChild(tooltipElement);
  });
  
  // Добавляем всплывающие подсказки к иконкам социальных сетей
  document.querySelectorAll('.social-icons a').forEach(link => {
    if (!link.hasAttribute('data-tooltip')) {
      // Определяем тип социальной сети по классу иконки
      const iconElement = link.querySelector('i');
      if (iconElement) {
        const iconClass = iconElement.className;
        let socialName = '';
        
        if (iconClass.includes('facebook')) {
          socialName = 'Facebook';
        } else if (iconClass.includes('twitter')) {
          socialName = 'Twitter';
        } else if (iconClass.includes('instagram')) {
          socialName = 'Instagram';
        } else if (iconClass.includes('linkedin')) {
          socialName = 'LinkedIn';
        } else if (iconClass.includes('youtube')) {
          socialName = 'YouTube';
        } else if (iconClass.includes('telegram')) {
          socialName = 'Telegram';
        }
        
        if (socialName) {
          // Добавляем класс tooltip
          link.classList.add('tooltip');
          
          // Создаем элемент подсказки
          const tooltipElement = document.createElement('span');
          tooltipElement.className = 'tooltip-text';
          tooltipElement.textContent = `Подписаться на ${socialName}`;
          
          // Добавляем подсказку в элемент
          link.appendChild(tooltipElement);
        }
      }
    }
  });
}

// Функция для инициализации модальных окон
function initModals() {
  // Создаем оверлей для модальных окон, если он отсутствует
  if (!document.querySelector('.modal-overlay')) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
    
    // Добавляем обработчик клика для закрытия модального окна
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
    
    // Добавляем обработчик клавиши Escape для закрытия модального окна
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.querySelector('.modal-overlay.active')) {
        closeModal();
      }
    });
  }
  
  // Находим все элементы с атрибутом data-modal
  const modalTriggers = document.querySelectorAll('[data-modal]');
  
  modalTriggers.forEach(trigger => {
    // Получаем ID модального окна
    const modalId = trigger.getAttribute('data-modal');
    
    // Добавляем обработчик клика
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(modalId);
    });
  });
  
  // Добавляем модальные окна для кнопок "Узнать больше"
  document.querySelectorAll('.learn-more, .read-more').forEach((button, index) => {
    if (!button.hasAttribute('data-modal')) {
      // Создаем уникальный ID для модального окна
      const modalId = `modal-${index}`;
      
      // Добавляем атрибут data-modal
      button.setAttribute('data-modal', modalId);
      
      // Получаем заголовок и содержимое из родительского элемента
      const parent = button.closest('.card, .slide, .news-item');
      let title = '';
      let content = '';
      
      if (parent) {
        const titleElement = parent.querySelector('h3, h2');
        const contentElement = parent.querySelector('p');
        
        if (titleElement) {
          title = titleElement.textContent;
        }
        
        if (contentElement) {
          content = contentElement.textContent;
        }
      }
      
      // Создаем модальное окно
      createModal(modalId, title, `
        <p>${content}</p>
        <p>Дополнительная информация о ${title}. Здесь может быть размещен более подробный текст, изображения и другие материалы.</p>
      `);
      
      // Добавляем обработчик клика
      button.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(modalId);
      });
    }
  });
}

// Функция для создания модального окна
function createModal(id, title, content) {
  // Проверяем, существует ли уже модальное окно с таким ID
  if (document.getElementById(id)) {
    return;
  }
  
  // Создаем модальное окно
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = id;
  
  // Добавляем содержимое
  modal.innerHTML = `
    <button class="modal-close">&times;</button>
    <div class="modal-header">
      <h2 class="modal-title">${title}</h2>
    </div>
    <div class="modal-body">
      ${content}
    </div>
    <div class="modal-footer">
      <button class="btn-modern close-modal">Закрыть</button>
    </div>
  `;
  
  // Добавляем модальное окно в оверлей
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.appendChild(modal);
    
    // Добавляем обработчик для кнопки закрытия
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    
    // Добавляем обработчик для кнопки "Закрыть"
    const closeModalButton = modal.querySelector('.close-modal');
    if (closeModalButton) {
      closeModalButton.addEventListener('click', closeModal);
    }
  }
}

// Функция для открытия модального окна
function openModal(id) {
  const modal = document.getElementById(id);
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (modal && modalOverlay) {
    // Активируем оверлей
    modalOverlay.classList.add('active');
    
    // Устанавливаем активное модальное окно
    modalOverlay.setAttribute('data-active-modal', id);
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
  }
}

// Функция для закрытия модального окна
function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (modalOverlay) {
    // Деактивируем оверлей
    modalOverlay.classList.remove('active');
    
    // Удаляем атрибут активного модального окна
    modalOverlay.removeAttribute('data-active-modal');
    
    // Разблокируем прокрутку страницы
    document.body.style.overflow = '';
  }
}

// Функция для инициализации интерактивной галереи
function initGallery() {
  // Создаем галерею, если на странице есть элемент с классом gallery-container
  const galleryContainer = document.querySelector('.gallery-container');
  
  if (galleryContainer) {
    // Создаем галерею
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    
    // Добавляем изображения в галерею
    const images = [
      { src: 'https://via.placeholder.com/600x400', caption: 'Изображение 1', description: 'Описание изображения 1' },
      { src: 'https://via.placeholder.com/600x400', caption: 'Изображение 2', description: 'Описание изображения 2' },
      { src: 'https://via.placeholder.com/600x400', caption: 'Изображение 3', description: 'Описание изображения 3' },
      { src: 'https://via.placeholder.com/600x400', caption: 'Изображение 4', description: 'Описание изображения 4' },
      { src: 'https://via.placeholder.com/600x400', caption: 'Изображение 5', description: 'Описание изображения 5' },
      { src: 'https://via.placeholder.com/600x400', caption: 'Изображение 6', description: 'Описание изображения 6' }
    ];
    
    images.forEach((image, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.setAttribute('data-index', index);
      
      galleryItem.innerHTML = `
        <img src="${image.src}" alt="${image.caption}" class="gallery-image">
        <div class="gallery-caption">${image.caption}</div>
      `;
      
      gallery.appendChild(galleryItem);
      
      // Добавляем обработчик клика
      galleryItem.addEventListener('click', function() {
        openGalleryModal(index);
      });
    });
    
    galleryContainer.appendChild(gallery);
    
    // Создаем модальное окно для галереи
    createGalleryModal(images);
  }
}

// Функция для создания модального окна галереи
function createGalleryModal(images) {
  // Создаем модальное окно
  const galleryModal = document.createElement('div');
  galleryModal.className = 'modal gallery-modal';
  galleryModal.id = 'gallery-modal';
  
  // Добавляем содержимое
  galleryModal.innerHTML = `
    <button class="modal-close">&times;</button>
    <img src="" alt="" class="gallery-modal-image">
    <h3 class="gallery-modal-caption"></h3>
    <p class="gallery-modal-description"></p>
    <div class="gallery-navigation">
      <button class="gallery-nav-button prev-image"><i class="fas fa-chevron-left"></i></button>
      <button class="gallery-nav-button next-image"><i class="fas fa-chevron-right"></i></button>
    </div>
  `;
  
  // Добавляем модальное окно в оверлей
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.appendChild(galleryModal);
    
    // Добавляем обработчик для кнопки закрытия
    const closeButton = galleryModal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    
    // Добавляем обработчики для кнопок навигации
    const prevButton = galleryModal.querySelector('.prev-image');
    const nextButton = galleryModal.querySelector('.next-image');
    
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', function() {
        navigateGallery(-1);
      });
      
      nextButton.addEventListener('click', function() {
        navigateGallery(1);
      });
    }
    
    // Добавляем обработчик клавиш для навигации
    document.addEventListener('keydown', function(e) {
      if (modalOverlay.classList.contains('active') && modalOverlay.getAttribute('data-active-modal') === 'gallery-modal') {
        if (e.key === 'ArrowLeft') {
          navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
          navigateGallery(1);
        }
      }
    });
  }
  
  // Сохраняем изображения в объекте window
  window.galleryImages = images;
  window.currentGalleryIndex = 0;
}

// Функция для открытия модального окна галереи
function openGalleryModal(index) {
  const galleryModal = document.getElementById('gallery-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (galleryModal && modalOverlay && window.galleryImages) {
    // Устанавливаем текущий индекс
    window.currentGalleryIndex = index;
    
    // Обновляем содержимое модального окна
    updateGalleryModal();
    
    // Активируем оверлей
    modalOverlay.classList.add('active');
    
    // Устанавливаем активное модальное окно
    modalOverlay.setAttribute('data-active-modal', 'gallery-modal');
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
  }
}

// Функция для обновления содержимого модального окна галереи
function updateGalleryModal() {
  const galleryModal = document.getElementById('gallery-modal');
  
  if (galleryModal && window.galleryImages) {
    const image = window.galleryImages[window.currentGalleryIndex];
    
    // Обновляем изображение
    const imageElement = galleryModal.querySelector('.gallery-modal-image');
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.caption;
    }
    
    // Обновляем заголовок
    const captionElement = galleryModal.querySelector('.gallery-modal-caption');
    if (captionElement) {
      captionElement.textContent = image.caption;
    }
    
    // Обновляем описание
    const descriptionElement = galleryModal.querySelector('.gallery-modal-description');
    if (descriptionElement) {
      descriptionElement.textContent = image.description;
    }
    
    // Обновляем состояние кнопок навигации
    const prevButton = galleryModal.querySelector('.prev-image');
    const nextButton = galleryModal.querySelector('.next-image');
    
    if (prevButton) {
      prevButton.disabled = window.currentGalleryIndex === 0;
    }
    
    if (nextButton) {
      nextButton.disabled = window.currentGalleryIndex === window.galleryImages.length - 1;
    }
  }
}

// Функция для навигации по галерее
function navigateGallery(direction) {
  if (window.galleryImages) {
    // Вычисляем новый индекс
    const newIndex = window.currentGalleryIndex + direction;
    
    // Проверяем, что новый индекс находится в допустимом диапазоне
    if (newIndex >= 0 && newIndex < window.galleryImages.length) {
      window.currentGalleryIndex = newIndex;
      updateGalleryModal();
    }
  }
}

// Функция для инициализации интерактивной карты
function initInteractiveMap() {
  // Создаем карту, если на странице есть элемент с классом map-container
  const mapContainer = document.querySelector('.map-container');
  
  if (mapContainer) {
    // Создаем интерактивную карту
    const interactiveMap = document.createElement('div');
    interactiveMap.className = 'interactive-map';
    
    // Добавляем фоновое изображение карты
    interactiveMap.style.backgroundImage = 'url(https://via.placeholder.com/1200x600)';
    interactiveMap.style.backgroundSize = 'cover';
    interactiveMap.style.backgroundPosition = 'center';
    
    // Добавляем маркеры на карту
    const markers = [
      { x: 20, y: 30, title: 'Офис в Душанбе', description: 'Главный офис компании в Душанбе' },
      { x: 50, y: 60, title: 'Офис в Москве', description: 'Представительство компании в Москве' },
      { x: 80, y: 40, title: 'Офис в Дубае', description: 'Представительство компании в Дубае' }
    ];
    
    markers.forEach((marker, index) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'map-marker';
      markerElement.style.left = `${marker.x}%`;
      markerElement.style.top = `${marker.y}%`;
      markerElement.setAttribute('data-marker-index', index);
      
      interactiveMap.appendChild(markerElement);
      
      // Добавляем обработчик клика
      markerElement.addEventListener('click', function() {
        showMapInfo(index);
      });
    });
    
    // Создаем информационное окно
    const mapInfo = document.createElement('div');
    mapInfo.className = 'map-info';
    mapInfo.innerHTML = `
      <button class="map-info-close">&times;</button>
      <h3></h3>
      <p></p>
    `;
    
    interactiveMap.appendChild(mapInfo);
    
    // Добавляем обработчик для кнопки закрытия
    const closeButton = mapInfo.querySelector('.map-info-close');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        mapInfo.classList.remove('active');
      });
    }
    
    mapContainer.appendChild(interactiveMap);
    
    // Сохраняем маркеры в объекте window
    window.mapMarkers = markers;
  }
}

// Функция для отображения информации о маркере
function showMapInfo(index) {
  const mapInfo = document.querySelector('.map-info');
  
  if (mapInfo && window.mapMarkers) {
    const marker = window.mapMarkers[index];
    
    // Обновляем содержимое информационного окна
    const titleElement = mapInfo.querySelector('h3');
    const descriptionElement = mapInfo.querySelector('p');
    
    if (titleElement) {
      titleElement.textContent = marker.title;
    }
    
    if (descriptionElement) {
      descriptionElement.textContent = marker.description;
    }
    
    // Позиционируем информационное окно
    mapInfo.style.left = `${marker.x}%`;
    mapInfo.style.top = `${marker.y}%`;
    
    // Активируем информационное окно
    mapInfo.classList.add('active');
  }
}

// Функция для инициализации анимированных графиков
function initAnimatedCharts() {
  // Создаем график, если на странице есть элемент с классом chart-container
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartContainers.forEach(container => {
    // Проверяем, есть ли у контейнера атрибут data-chart-type
    const chartType = container.getAttribute('data-chart-type');
    
    if (chartType === 'bar') {
      createBarChart(container);
    } else if (chartType === 'line') {
      createLineChart(container);
    } else if (chartType === 'pie') {
      createPieChart(container);
    } else {
      // По умолчанию создаем столбчатый график
      createBarChart(container);
    }
  });
}

// Функция для создания столбчатого графика
function createBarChart(container) {
  // Проверяем, загружена ли библиотека Chart.js
  if (typeof Chart === 'undefined') {
    // Загружаем Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
      initBarChart(container);
    };
    document.head.appendChild(script);
  } else {
    initBarChart(container);
  }
}

// Функция для инициализации столбчатого графика
function initBarChart(container) {
  // Создаем canvas для графика
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  // Создаем график
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Доход (млн $)',
        data: [12, 19, 15, 25, 32, 40],
        backgroundColor: 'rgba(0, 201, 167, 0.6)',
        borderColor: 'rgba(0, 201, 167, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Функция для создания линейного графика
function createLineChart(container) {
  // Проверяем, загружена ли библиотека Chart.js
  if (typeof Chart === 'undefined') {
    // Загружаем Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
      initLineChart(container);
    };
    document.head.appendChild(script);
  } else {
    initLineChart(container);
  }
}

// Функция для инициализации линейного графика
function initLineChart(container) {
  // Создаем canvas для графика
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  // Создаем график
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [{
        label: 'Проекты 2023',
        data: [5, 8, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35],
        borderColor: 'rgba(0, 201, 167, 1)',
        backgroundColor: 'rgba(0, 201, 167, 0.1)',
        fill: true,
        tension: 0.4
      }, {
        label: 'Проекты 2024',
        data: [8, 12, 18, 22, 28, 32, 38, 42, 48, 52, 58, 65],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Функция для создания круговой диаграммы
function createPieChart(container) {
  // Проверяем, загружена ли библиотека Chart.js
  if (typeof Chart === 'undefined') {
    // Загружаем Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
      initPieChart(container);
    };
    document.head.appendChild(script);
  } else {
    initPieChart(container);
  }
}

// Функция для инициализации круговой диаграммы
function initPieChart(container) {
  // Создаем canvas для графика
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  
  // Создаем график
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Технологии', 'Финансы', 'Консалтинг', 'Маркетинг', 'Другое'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(0, 201, 167, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(0, 201, 167, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Функция для инициализации интерактивного FAQ
function initInteractiveFAQ() {
  const faqContainer = document.querySelector('.faq-container');
  
  if (faqContainer) {
    // Добавляем поиск по FAQ
    const faqSearch = document.createElement('div');
    faqSearch.className = 'faq-search';
    faqSearch.innerHTML = `
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Поиск по вопросам...">
    `;
    
    faqContainer.insertBefore(faqSearch, faqContainer.firstChild);
    
    // Добавляем категории FAQ
    const faqCategories = document.createElement('div');
    faqCategories.className = 'faq-categories';
    
    const categories = ['Все', 'Общие вопросы', 'Инвестиции', 'Технологии', 'Сотрудничество'];
    
    categories.forEach((category, index) => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'faq-category' + (index === 0 ? ' active' : '');
      categoryElement.textContent = category;
      categoryElement.setAttribute('data-category', category.toLowerCase());
      
      faqCategories.appendChild(categoryElement);
      
      // Добавляем обработчик клика
      categoryElement.addEventListener('click', function() {
        // Удаляем класс active у всех категорий
        document.querySelectorAll('.faq-category').forEach(cat => {
          cat.classList.remove('active');
        });
        
        // Добавляем класс active текущей категории
        this.classList.add('active');
        
        // Фильтруем вопросы по категории
        filterFAQByCategory(this.getAttribute('data-category'));
      });
    });
    
    faqContainer.insertBefore(faqCategories, faqSearch.nextSibling);
    
    // Добавляем атрибуты категорий к вопросам
    const faqItems = faqContainer.querySelectorAll('.faq-item-modern');
    
    faqItems.forEach((item, index) => {
      // Определяем категорию на основе индекса (для демонстрации)
      let category;
      if (index % 4 === 0) {
        category = 'общие вопросы';
      } else if (index % 4 === 1) {
        category = 'инвестиции';
      } else if (index % 4 === 2) {
        category = 'технологии';
      } else {
        category = 'сотрудничество';
      }
      
      item.setAttribute('data-category', category);
    });
    
    // Добавляем обработчик для поиска
    const searchInput = faqSearch.querySelector('input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        filterFAQBySearch(this.value);
      });
    }
  }
}

// Функция для фильтрации FAQ по категории
function filterFAQByCategory(category) {
  const faqItems = document.querySelectorAll('.faq-item-modern');
  
  faqItems.forEach(item => {
    if (category === 'все' || item.getAttribute('data-category') === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// Функция для фильтрации FAQ по поисковому запросу
function filterFAQBySearch(query) {
  const faqItems = document.querySelectorAll('.faq-item-modern');
  
  query = query.toLowerCase();
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question-modern h3').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer-modern').textContent.toLowerCase();
    
    if (question.includes(query) || answer.includes(query)) {
      item.classList.remove('hidden');
      
      // Подсвечиваем совпадения, если есть запрос
      if (query) {
        item.classList.add('highlight');
      } else {
        item.classList.remove('highlight');
      }
    } else {
      item.classList.add('hidden');
      item.classList.remove('highlight');
    }
  });
}

// Функция для инициализации уведомлений
function initNotifications() {
  // Создаем контейнер для уведомлений, если он отсутствует
  if (!document.querySelector('.notification')) {
    // Создаем уведомление о куки
    showCookieNotification();
    
    // Показываем уведомление о новостях через 30 секунд
    setTimeout(function() {
      showNewsNotification();
    }, 30000);
  }
}

// Функция для отображения уведомления о куки
function showCookieNotification() {
  // Проверяем, было ли уже показано уведомление о куки
  if (localStorage.getItem('cookieNotificationShown')) {
    return;
  }
  
  // Создаем уведомление
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-icon"><i class="fas fa-cookie-bite"></i></div>
    <div class="notification-content">
      <div class="notification-title">Мы используем куки</div>
      <div class="notification-message">Этот сайт использует куки для улучшения вашего опыта. Продолжая использовать сайт, вы соглашаетесь с нашей политикой использования куки.</div>
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  // Показываем уведомление
  setTimeout(function() {
    notification.classList.add('show');
  }, 1000);
  
  // Добавляем обработчик для кнопки закрытия
  const closeButton = notification.querySelector('.notification-close');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      notification.classList.remove('show');
      
      // Удаляем уведомление после анимации
      setTimeout(function() {
        notification.remove();
      }, 300);
      
      // Сохраняем информацию о том, что уведомление было показано
      localStorage.setItem('cookieNotificationShown', 'true');
    });
  }
}

// Функция для отображения уведомления о новостях
function showNewsNotification() {
  // Создаем уведомление
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-icon"><i class="fas fa-newspaper"></i></div>
    <div class="notification-content">
      <div class="notification-title">Новая статья</div>
      <div class="notification-message">Мы опубликовали новую статью о последних тенденциях в сфере технологий. Хотите прочитать?</div>
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  // Показываем уведомление
  setTimeout(function() {
    notification.classList.add('show');
  }, 500);
  
  // Добавляем обработчик для кнопки закрытия
  const closeButton = notification.querySelector('.notification-close');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      notification.classList.remove('show');
      
      // Удаляем уведомление после анимации
      setTimeout(function() {
        notification.remove();
      }, 300);
    });
  }
  
  // Добавляем обработчик клика для всего уведомления
  notification.addEventListener('click', function(e) {
    if (e.target !== closeButton && !closeButton.contains(e.target)) {
      // Перенаправляем на страницу новостей
      window.location.href = 'news.html';
    }
  });
  
  // Автоматически скрываем уведомление через 10 секунд
  setTimeout(function() {
    notification.classList.remove('show');
    
    // Удаляем уведомление после анимации
    setTimeout(function() {
      notification.remove();
    }, 300);
  }, 10000);
}

// Функция для инициализации формы обратной связи
function initFeedbackForm() {
  // Создаем форму обратной связи, если она отсутствует
  if (!document.querySelector('.feedback-form')) {
    const feedbackForm = document.createElement('div');
    feedbackForm.className = 'feedback-form';
    feedbackForm.innerHTML = `
      <div class="feedback-button">
        <i class="fas fa-comment"></i>
      </div>
      <div class="feedback-panel">
        <h3>Обратная связь</h3>
        <textarea placeholder="Напишите ваш отзыв или предложение..."></textarea>
        <button>Отправить</button>
      </div>
    `;
    
    document.body.appendChild(feedbackForm);
    
    // Добавляем обработчик для кнопки
    const feedbackButton = feedbackForm.querySelector('.feedback-button');
    const feedbackPanel = feedbackForm.querySelector('.feedback-panel');
    
    if (feedbackButton && feedbackPanel) {
      feedbackButton.addEventListener('click', function() {
        feedbackPanel.classList.toggle('active');
      });
    }
    
    // Добавляем обработчик для кнопки отправки
    const submitButton = feedbackPanel.querySelector('button');
    const textarea = feedbackPanel.querySelector('textarea');
    
    if (submitButton && textarea) {
      submitButton.addEventListener('click', function() {
        if (textarea.value.trim() !== '') {
          // Имитируем отправку формы
          submitButton.textContent = 'Отправка...';
          submitButton.disabled = true;
          
          setTimeout(function() {
            submitButton.textContent = 'Отправлено!';
            textarea.value = '';
            
            // Скрываем панель через 2 секунды
            setTimeout(function() {
              feedbackPanel.classList.remove('active');
              submitButton.textContent = 'Отправить';
              submitButton.disabled = false;
            }, 2000);
          }, 1500);
        }
      });
    }
  }
}

// Функция для инициализации анимированных счетчиков
function initAnimatedCounters() {
  // Находим все элементы с классом animated-counter
  const counters = document.querySelectorAll('.animated-counter');
  
  counters.forEach(counter => {
    // Получаем целевое значение
    const target = parseInt(counter.getAttribute('data-target'));
    
    // Создаем Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Запускаем анимацию счетчика
          animateCounter(counter, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
  
  // Конвертируем обычные числа в анимированные счетчики
  document.querySelectorAll('.stat-number-modern').forEach(statNumber => {
    if (!statNumber.classList.contains('animated-counter')) {
      // Получаем целевое значение
      const target = parseInt(statNumber.textContent);
      
      // Добавляем класс animated-counter
      statNumber.classList.add('animated-counter');
      statNumber.setAttribute('data-target', target);
      statNumber.textContent = '0';
      
      // Создаем Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Запускаем анимацию счетчика
            animateCounter(statNumber, target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(statNumber);
    }
  });
}

// Функция для анимации счетчика
function animateCounter(element, target) {
  let current = 0;
  const increment = Math.ceil(target / 100);
  const duration = 2000; // 2 секунды
  const stepTime = Math.abs(Math.floor(duration / (target / increment)));
  
  const timer = setInterval(function() {
    current += increment;
    
    if (current > target) {
      current = target;
      clearInterval(timer);
    }
    
    element.textContent = current;
  }, stepTime);
}
