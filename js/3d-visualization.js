// 3D Visualization JavaScript - Based on zypl.ai reference
document.addEventListener('DOMContentLoaded', function() {
  // Create the 3D visualization element
  const createVisualization = () => {
    const container = document.getElementById('visualization-3d-container');
    if (!container) return;
    
    // Create the 3D visualization structure
    const visualization = document.createElement('div');
    visualization.className = 'visualization-3d';
    
    // Add grid background
    const grid = document.createElement('div');
    grid.className = 'grid-background';
    visualization.appendChild(grid);
    
    // Add wave container
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';
    
    // Add teal wave
    const waveTeal = document.createElement('div');
    waveTeal.className = 'wave wave-teal';
    waveContainer.appendChild(waveTeal);
    
    // Add purple wave
    const wavePurple = document.createElement('div');
    wavePurple.className = 'wave wave-purple';
    waveContainer.appendChild(wavePurple);
    
    // Add data points
    for (let i = 1; i <= 4; i++) {
      const dataPoint = document.createElement('div');
      dataPoint.className = `data-point data-point-${i}`;
      waveContainer.appendChild(dataPoint);
    }
    
    visualization.appendChild(waveContainer);
    
    // Add axis labels
    const axisLabels = [
      { class: 'axis-labels axis-x', text: 'X' },
      { class: 'axis-labels axis-y', text: 'Y' },
      { class: 'axis-labels axis-z', text: 'Z' }
    ];
    
    axisLabels.forEach(label => {
      const element = document.createElement('div');
      element.className = label.class;
      element.textContent = label.text;
      visualization.appendChild(element);
    });
    
    // Add axis values
    for (let i = 1; i <= 5; i++) {
      const valueElement = document.createElement('div');
      valueElement.className = `axis-values value-${i}`;
      valueElement.textContent = `0.00${i}`;
      visualization.appendChild(valueElement);
    }
    
    // Add the visualization to the container
    container.appendChild(visualization);
    
    // Add interactive effects
    container.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      visualization.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    
    container.addEventListener('mouseleave', () => {
      visualization.style.transform = '';
      // Restart the animation
      visualization.style.animation = 'none';
      setTimeout(() => {
        visualization.style.animation = 'rotate3d 20s infinite linear';
      }, 10);
    });
  };
  
  // Initialize the visualization
  createVisualization();
  
  // Recreate on window resize for responsiveness
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const container = document.getElementById('visualization-3d-container');
      if (container) {
        container.innerHTML = '';
        createVisualization();
      }
    }, 250);
  });
});
