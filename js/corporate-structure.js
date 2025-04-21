// Функция для создания линий связи между родительской компанией и дочерними
function createConnectionLines() {
  const parent = document.querySelector('.parent-company');
  const subsidiaries = document.querySelectorAll('.subsidiary');
  const connectionLines = document.querySelector('.connection-lines');
  
  if (!parent || !subsidiaries.length || !connectionLines) return;
  
  // Очищаем существующие линии
  connectionLines.innerHTML = '';
  
  // Получаем координаты родительской компании
  const parentRect = parent.getBoundingClientRect();
  const containerRect = document.querySelector('.structure-container').getBoundingClientRect();
  
  const parentCenterX = parentRect.left + parentRect.width / 2 - containerRect.left;
  const parentBottomY = parentRect.bottom - containerRect.top;
  
  // Создаем SVG элемент
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  
  // Для каждой дочерней компании создаем линию связи с улучшенной анимацией
  subsidiaries.forEach((subsidiary, index) => {
    const subRect = subsidiary.getBoundingClientRect();
    const subCenterX = subRect.left + subRect.width / 2 - containerRect.left;
    const subTopY = subRect.top - containerRect.top;
    
    // Создаем путь
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Определяем контрольные точки для кривой Безье
    const controlPointY = parentBottomY + (subTopY - parentBottomY) / 2;
    
    // Создаем путь в формате SVG
    const d = `M ${parentCenterX} ${parentBottomY} 
               C ${parentCenterX} ${controlPointY}, 
                 ${subCenterX} ${controlPointY}, 
                 ${subCenterX} ${subTopY}`;
    
    path.setAttribute('d', d);
    path.setAttribute('stroke', 'var(--accent)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-dasharray', '5,5');
    path.setAttribute('opacity', '0.8');
    
    // Добавляем анимацию движения точек по линии
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'stroke-dashoffset');
    animate.setAttribute('from', '10');
    animate.setAttribute('to', '0');
    animate.setAttribute('dur', '1.5s');
    animate.setAttribute('repeatCount', 'indefinite');
    
    path.appendChild(animate);
    svg.appendChild(path);
    
    // Добавляем несколько светящихся точек, движущихся по линии с разной скоростью
    for (let i = 0; i < 3; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', i === 1 ? '3' : '4');
      circle.setAttribute('fill', 'var(--accent)');
      circle.setAttribute('filter', 'url(#glow)');
      
      // Добавляем анимацию движения точки по пути с разной скоростью и задержкой
      const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
      animateMotion.setAttribute('dur', (3 + i * 0.7 + index * 0.3) + 's');
      animateMotion.setAttribute('repeatCount', 'indefinite');
      animateMotion.setAttribute('path', d);
      animateMotion.setAttribute('rotate', 'auto');
      
      // Добавляем задержку для каждой точки
      animateMotion.setAttribute('begin', (i * 1.2) + 's');
      
      circle.appendChild(animateMotion);
      svg.appendChild(circle);
    }
  });
  
  // Добавляем фильтр для свечения
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'glow');
  filter.setAttribute('x', '-50%');
  filter.setAttribute('y', '-50%');
  filter.setAttribute('width', '200%');
  filter.setAttribute('height', '200%');
  
  const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', '2.5');
  feGaussianBlur.setAttribute('result', 'coloredBlur');
  
  const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
  const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
  feMergeNode1.setAttribute('in', 'coloredBlur');
  const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
  feMergeNode2.setAttribute('in', 'SourceGraphic');
  
  feMerge.appendChild(feMergeNode1);
  feMerge.appendChild(feMergeNode2);
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feMerge);
  defs.appendChild(filter);
  svg.appendChild(defs);
  
  connectionLines.appendChild(svg);
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('load', createConnectionLines);
window.addEventListener('resize', createConnectionLines);

// Добавляем 3D эффект при прокрутке для структуры корпорации
window.addEventListener('scroll', function() {
  const structure = document.querySelector('.corporate-structure');
  if (!structure) return;
  
  const structureTop = structure.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (structureTop < windowHeight * 0.75 && structureTop > -structure.offsetHeight) {
    const scrollPosition = structureTop / windowHeight;
    const rotateY = scrollPosition * 5; // Максимальный угол поворота
    
    document.querySelector('.parent-company').style.transform = `translateZ(30px) rotateY(${rotateY}deg)`;
    
    const subsidiaries = document.querySelectorAll('.subsidiary');
    subsidiaries.forEach((sub, index) => {
      const delay = index * 0.1;
      const rotate = rotateY + (index % 2 === 0 ? 2 : -2);
      sub.style.transform = `translateZ(10px) rotateY(${rotate}deg)`;
      sub.style.transitionDelay = `${delay}s`;
    });
    
    // Обновляем линии связи при прокрутке
    createConnectionLines();
  }
});

// Добавляем всплывающие подсказки при наведении на дочерние компании
function addTooltips() {
  const subsidiaries = document.querySelectorAll('.subsidiary');
  
  subsidiaries.forEach(sub => {
    sub.addEventListener('mouseenter', function() {
      // Создаем элемент подсказки, если его еще нет
      if (!this.querySelector('.tooltip')) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.top = '-70px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'var(--header-bg)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '10px 15px';
        tooltip.style.borderRadius = '8px';
        tooltip.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        tooltip.style.zIndex = '10';
        tooltip.style.width = '200px';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        
        // Добавляем стрелку
        tooltip.style.setProperty('--accent', getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
        tooltip.style.setProperty('--accent-dark', getComputedStyle(document.documentElement).getPropertyValue('--accent-dark').trim());
        
        // Получаем название компании и добавляем описание
        const companyName = this.querySelector('h4').textContent;
        tooltip.innerHTML = `
          <div style="font-weight: bold; margin-bottom: 5px;">${companyName}</div>
          <div style="font-size: 12px;">Нажмите для получения подробной информации о деятельности компании и текущих проектах.</div>
        `;
        
        // Добавляем стрелку внизу
        const arrow = document.createElement('div');
        arrow.style.position = 'absolute';
        arrow.style.bottom = '-8px';
        arrow.style.left = '50%';
        arrow.style.transform = 'translateX(-50%)';
        arrow.style.width = '0';
        arrow.style.height = '0';
        arrow.style.borderLeft = '8px solid transparent';
        arrow.style.borderRight = '8px solid transparent';
        arrow.style.borderTop = '8px solid var(--header-bg)';
        
        tooltip.appendChild(arrow);
        this.style.position = 'relative';
        this.appendChild(tooltip);
        
        // Плавно показываем подсказку
        setTimeout(() => {
          tooltip.style.opacity = '1';
        }, 50);
      }
    });
    
    sub.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          tooltip.remove();
        }, 300);
      }
    });
    
    // Добавляем эффект нажатия
    sub.addEventListener('click', function() {
      // Здесь можно добавить открытие модального окна с подробной информацией
      this.classList.add('pulse');
      setTimeout(() => {
        this.classList.remove('pulse');
      }, 1000);
    });
  });
}

// Вызываем функцию добавления подсказок при загрузке страницы
window.addEventListener('load', addTooltips);

// Добавляем анимацию счетчиков
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const duration = 2000; // 2 секунды
    const step = Math.ceil(target / (duration / 20)); // Шаг обновления
    let current = 0;
    
    // Сбрасываем счетчик
    counter.textContent = '0';
    
    const updateCounter = () => {
      current += step;
      if (current > target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    };
    
    const interval = setInterval(updateCounter, 20);
  });
}

// Функция для проверки, находится ли элемент в видимой области
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Запускаем анимацию счетчиков, когда они появляются в видимой области
window.addEventListener('scroll', function() {
  const counterSection = document.querySelector('.counter-container');
  if (counterSection && isElementInViewport(counterSection) && !counterSection.classList.contains('animated')) {
    counterSection.classList.add('animated');
    animateCounters();
  }
});

// Запускаем анимацию счетчиков при загрузке страницы, если они видны
window.addEventListener('load', function() {
  const counterSection = document.querySelector('.counter-container');
  if (counterSection && isElementInViewport(counterSection) && !counterSection.classList.contains('animated')) {
    counterSection.classList.add('animated');
    animateCounters();
  }
});

// Добавляем анимацию появления элементов при прокрутке
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('visible')) {
      element.classList.add('visible');
    }
  });
}

// Вызываем функцию анимации при прокрутке
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
