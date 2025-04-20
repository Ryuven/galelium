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
    
    // Добавляем светящуюся точку, движущуюся по линии
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', 'var(--accent)');
    circle.setAttribute('filter', 'url(#glow)');
    
    // Добавляем анимацию движения точки по пути
    const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animateMotion.setAttribute('dur', (3 + index * 0.5) + 's');
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('path', d);
    animateMotion.setAttribute('rotate', 'auto');
    
    circle.appendChild(animateMotion);
    svg.appendChild(circle);
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
