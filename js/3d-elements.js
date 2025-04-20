// Современные 3D элементы и интерактивные функции для сайта

// Инициализация 3D элементов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация 3D миссии
  initMission3D();
  
  // Инициализация 3D статистики
  initStats3D();
  
  // Инициализация 3D глобуса
  initGlobe3D();
  
  // Инициализация 3D графика
  initChart3D();
  
  // Инициализация параллакс-эффекта
  initParallax3D();
  
  // Инициализация 3D карточек команды
  initTeam3D();
  
  // Инициализация 3D волны для героя-секции
  initHeroWave();
});

// Функция для создания 3D карточки миссии
function initMission3D() {
  const missionSection = document.querySelector('.cube-3d');
  
  if (missionSection) {
    // Сохраняем оригинальное содержимое
    const missionTitle = missionSection.querySelector('h3').textContent;
    const missionText = missionSection.querySelector('p').textContent;
    const missionIcon = missionSection.querySelector('i').className;
    
    // Создаем новую 3D карточку
    const mission3DCard = document.createElement('div');
    mission3DCard.className = 'mission-3d-card';
    mission3DCard.innerHTML = `
      <div class="mission-3d-card-inner">
        <div class="mission-3d-card-front">
          <i class="${missionIcon} mission-3d-card-icon"></i>
          <h3>${missionTitle}</h3>
        </div>
        <div class="mission-3d-card-back">
          <p>${missionText}</p>
        </div>
      </div>
    `;
    
    // Заменяем оригинальный элемент на 3D карточку
    missionSection.innerHTML = '';
    missionSection.appendChild(mission3DCard);
  }
}

// Функция для создания 3D кубов статистики
function initStats3D() {
  const statsSection = document.getElementById('stats');
  
  if (statsSection) {
    const statsContainer = statsSection.querySelector('.stats-container');
    const statItems = statsSection.querySelectorAll('.stat-item');
    
    if (statsContainer && statItems.length > 0) {
      // Создаем новый контейнер для 3D статистики
      const stats3DContainer = document.createElement('div');
      stats3DContainer.className = 'stats-3d-container';
      
      // Преобразуем каждый элемент статистики в 3D куб
      statItems.forEach(item => {
        const statNumber = item.querySelector('.stat-number').getAttribute('data-target');
        const statLabel = item.querySelector('.stat-label').textContent;
        
        const stat3DCube = document.createElement('div');
        stat3DCube.className = 'stat-3d-cube';
        stat3DCube.innerHTML = `
          <div class="stat-3d-cube-inner">
            <div class="stat-3d-cube-face stat-3d-cube-front">
              <div class="stat-number-3d" data-target="${statNumber}">0</div>
              <div class="stat-label-3d">${statLabel}</div>
            </div>
            <div class="stat-3d-cube-face stat-3d-cube-back">
              <div class="stat-number-3d" data-target="${statNumber}">0</div>
              <div class="stat-label-3d">${statLabel}</div>
            </div>
            <div class="stat-3d-cube-face stat-3d-cube-top"></div>
            <div class="stat-3d-cube-face stat-3d-cube-bottom"></div>
            <div class="stat-3d-cube-face stat-3d-cube-left"></div>
            <div class="stat-3d-cube-face stat-3d-cube-right"></div>
          </div>
        `;
        
        stats3DContainer.appendChild(stat3DCube);
      });
      
      // Заменяем оригинальный контейнер на 3D контейнер
      statsContainer.parentNode.replaceChild(stats3DContainer, statsContainer);
      
      // Инициализируем счетчики
      initCounters();
    }
  }
}

// Функция для создания 3D глобуса
function initGlobe3D() {
  const aboutSection = document.getElementById('about');
  
  if (aboutSection) {
    // Создаем контейнер для 3D глобуса
    const globe3DContainer = document.createElement('div');
    globe3DContainer.className = 'globe-3d-container';
    globe3DContainer.innerHTML = `
      <div class="globe-3d">
        <div class="globe-circle"></div>
        <div class="globe-circle"></div>
        <div class="globe-circle"></div>
        <div class="globe-circle"></div>
        <div class="globe-circle"></div>
        <div class="globe-circle"></div>
        <div class="globe-equator"></div>
        <div class="globe-meridian"></div>
        <div class="globe-point"></div>
        <div class="globe-point"></div>
        <div class="globe-point"></div>
        <div class="globe-point"></div>
        <div class="globe-point"></div>
      </div>
    `;
    
    // Добавляем глобус после параграфа
    const aboutParagraph = aboutSection.querySelector('p');
    if (aboutParagraph) {
      aboutParagraph.parentNode.insertBefore(globe3DContainer, aboutParagraph.nextSibling);
    } else {
      aboutSection.appendChild(globe3DContainer);
    }
  }
}

// Функция для создания 3D графика
function initChart3D() {
  const statsSection = document.getElementById('stats');
  
  if (statsSection) {
    // Создаем контейнер для 3D графика
    const chart3DContainer = document.createElement('div');
    chart3DContainer.className = 'chart-3d-container';
    chart3DContainer.innerHTML = `
      <div class="chart-3d">
        <div class="chart-3d-grid"></div>
        <div class="chart-3d-bar">
          <div class="chart-3d-value">60%</div>
          <div class="chart-3d-label">2020</div>
        </div>
        <div class="chart-3d-bar">
          <div class="chart-3d-value">80%</div>
          <div class="chart-3d-label">2021</div>
        </div>
        <div class="chart-3d-bar">
          <div class="chart-3d-value">40%</div>
          <div class="chart-3d-label">2022</div>
        </div>
        <div class="chart-3d-bar">
          <div class="chart-3d-value">90%</div>
          <div class="chart-3d-label">2023</div>
        </div>
        <div class="chart-3d-bar">
          <div class="chart-3d-value">70%</div>
          <div class="chart-3d-label">2024</div>
        </div>
      </div>
    `;
    
    // Добавляем график после секции статистики
    statsSection.appendChild(chart3DContainer);
  }
}

// Функция для создания параллакс-эффекта
function initParallax3D() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    // Создаем контейнер для параллакс-фона
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-3d-bg';
    parallaxBg.innerHTML = `
      <div class="parallax-3d-layer parallax-3d-layer-1"></div>
      <div class="parallax-3d-layer parallax-3d-layer-2"></div>
      <div class="parallax-3d-layer parallax-3d-layer-3"></div>
      <div class="parallax-3d-layer parallax-3d-layer-4"></div>
    `;
    
    // Добавляем параллакс-фон в начало секции
    section.insertBefore(parallaxBg, section.firstChild);
  });
  
  // Добавляем обработчик движения мыши для эффекта параллакса
  document.addEventListener('mousemove', function(e) {
    const layers = document.querySelectorAll('.parallax-3d-layer');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    layers.forEach((layer, index) => {
      const depth = (index + 1) * 10;
      const moveX = (mouseX * depth) - (depth / 2);
      const moveY = (mouseY * depth) - (depth / 2);
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });
}

// Функция для создания 3D карточек команды
function initTeam3D() {
  const teamSection = document.getElementById('team');
  
  if (teamSection) {
    const teamCards = teamSection.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
      // Получаем данные из оригинальной карточки
      const photo = card.querySelector('img').src;
      const name = card.querySelector('h3').textContent;
      const position = card.querySelector('p').textContent;
      const socialIcons = card.querySelector('.social-icons').innerHTML;
      
      // Создаем новую 3D карточку
      const team3DCard = document.createElement('div');
      team3DCard.className = 'team-3d-card';
      team3DCard.innerHTML = `
        <div class="team-3d-card-inner">
          <div class="team-3d-card-front">
            <img src="${photo}" alt="${name}" class="team-3d-photo">
            <div class="team-3d-info">
              <h3>${name}</h3>
              <p>${position}</p>
            </div>
          </div>
          <div class="team-3d-card-back">
            <h3>${name}</h3>
            <p class="team-3d-bio">Опытный специалист с многолетним стажем работы в индустрии. Эксперт в своей области.</p>
            <div class="team-3d-skills">
              <span class="team-3d-skill">Лидерство</span>
              <span class="team-3d-skill">Стратегия</span>
              <span class="team-3d-skill">Инновации</span>
            </div>
            <div class="social-icons">${socialIcons}</div>
          </div>
        </div>
      `;
      
      // Заменяем оригинальную карточку на 3D карточку
      card.parentNode.replaceChild(team3DCard, card);
    });
  }
}

// Функция для создания 3D волны для героя-секции
function initHeroWave() {
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    // Создаем контейнер для 3D волны
    const heroWaveContainer = document.createElement('div');
    heroWaveContainer.className = 'hero-wave-container';
    heroWaveContainer.innerHTML = `
      <div class="hero-wave"></div>
      <div class="hero-wave"></div>
      <div class="hero-wave"></div>
    `;
    
    // Добавляем волну в конец героя-секции
    heroSection.appendChild(heroWaveContainer);
  }
}

// Функция для инициализации счетчиков
function initCounters() {
  const counters = document.querySelectorAll('.stat-number-3d');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = Math.ceil(target / 100);
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        if (current > target) current = target;
        counter.textContent = current;
        setTimeout(updateCounter, 20);
      }
    };
    
    // Запускаем счетчик при появлении элемента в области видимости
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Функция для преобразования обычных кнопок в 3D кнопки
function convert3DButtons() {
  const buttons = document.querySelectorAll('.hero-btn, .career-btn, .submit-btn');
  
  buttons.forEach(button => {
    button.classList.add('button-3d');
  });
}

// Вызываем функцию преобразования кнопок при загрузке страницы
document.addEventListener('DOMContentLoaded', convert3DButtons);

// Интерактивная карта присутствия компании
function initPresenceMap() {
  // Создаем контейнер для карты
  const mapContainer = document.createElement('div');
  mapContainer.id = 'companyPresenceMap';
  mapContainer.className = 'company-presence-map';
  
  // Добавляем карту после секции "О нас"
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.parentNode.insertBefore(mapContainer, aboutSection.nextSibling);
    
    // Инициализируем карту с помощью Three.js
    // Примечание: для полной реализации требуется подключение библиотеки Three.js
    if (typeof THREE !== 'undefined') {
      // Код инициализации Three.js карты
    } else {
      console.warn('Three.js не загружен. Карта присутствия не может быть инициализирована.');
    }
  }
}

// Калькулятор инвестиций
function initInvestmentCalculator() {
  const portfolioSection = document.getElementById('portfolio');
  
  if (portfolioSection) {
    // Создаем контейнер для калькулятора
    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'investment-calculator';
    calculatorContainer.innerHTML = `
      <h3>Калькулятор инвестиций</h3>
      <div class="calculator-form">
        <div class="calculator-field">
          <label for="investmentAmount">Сумма инвестиций ($)</label>
          <input type="number" id="investmentAmount" min="1000" step="1000" value="10000">
        </div>
        <div class="calculator-field">
          <label for="investmentPeriod">Период (лет)</label>
          <input type="range" id="investmentPeriod" min="1" max="10" value="5">
          <span id="periodValue">5</span>
        </div>
        <div class="calculator-field">
          <label for="investmentType">Тип инвестиций</label>
          <select id="investmentType">
            <option value="conservative">Консервативный (5%)</option>
            <option value="balanced" selected>Сбалансированный (10%)</option>
            <option value="aggressive">Агрессивный (15%)</option>
          </select>
        </div>
        <button id="calculateBtn" class="button-3d">Рассчитать</button>
      </div>
      <div class="calculator-result">
        <h4>Ожидаемая прибыль:</h4>
        <div id="investmentResult">$0</div>
      </div>
    `;
    
    // Добавляем калькулятор после секции портфолио
    portfolioSection.appendChild(calculatorContainer);
    
    // Добавляем обработчики событий для калькулятора
    document.addEventListener('DOMContentLoaded', function() {
      const periodInput = document.getElementById('investmentPeriod');
      const periodValue = document.getElementById('periodValue');
      const calculateBtn = document.getElementById('calculateBtn');
      
      if (periodInput && periodValue) {
        periodInput.addEventListener('input', function() {
          periodValue.textContent = this.value;
        });
      }
      
      if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateInvestment);
      }
    });
  }
}

// Функция расчета инвестиций
function calculateInvestment() {
  const amount = parseFloat(document.getElementById('investmentAmount').value);
  const period = parseInt(document.getElementById('investmentPeriod').value);
  const type = document.getElementById('investmentType').value;
  const resultElement = document.getElementById('investmentResult');
  
  let rate;
  switch (type) {
    case 'conservative':
      rate = 0.05;
      break;
    case 'aggressive':
      rate = 0.15;
      break;
    default:
      rate = 0.10;
  }
  
  // Расчет сложных процентов
  const result = amount * Math.pow(1 + rate, period);
  const profit = result - amount;
  
  if (resultElement) {
    resultElement.textContent = '$' + profit.toFixed(2);
    
    // Анимация результата
    resultElement.classList.add('highlight');
    setTimeout(() => {
      resultElement.classList.remove('highlight');
    }, 1000);
  }
}

// Вызываем функции инициализации интерактивных элементов
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация карты присутствия
  // initPresenceMap(); // Требует Three.js
  
  // Инициализация калькулятора инвестиций
  initInvestmentCalculator();
});
