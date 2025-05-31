window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const slider = document.getElementById('myRange');
  const sizeDisplay = document.getElementById('sizeDisplay');
  const colorPicker = document.getElementById('colorPicker');
  const eraserButton = document.getElementById('eraserButton');
  const clearButton = document.getElementById('clearButton');

  // color + eraser state 
  let currentColor = colorPicker.value;
  let isErasing = false;

  //main grid
  function createGrid(gridSize) {
    container.innerHTML = '';           // Clear existing cells
    const percent = 100 / gridSize;     // Each cell’s flex-basis %

    for (let i = 0; i < gridSize * gridSize; i++) {
      const square = document.createElement('div');
      square.classList.add('grid-square');

      //cell = 1/n of container width, keeps 1:1 aspect ratio
      square.style.flex = `0 0 ${percent}%`;
      square.style.aspectRatio = '1 / 1';

      //left click event listener
      square.addEventListener('mousedown', (e) => {
          if (isErasing) {
            square.style.backgroundColor = '#ffffff';
          } else {
            square.style.backgroundColor = currentColor;
          }
      });

      //hover + left click listener
      square.addEventListener('mouseover', (e) => {
        if (e.buttons === 1) {
          if (isErasing) {
            square.style.backgroundColor = '#ffffff';
          } else {
            square.style.backgroundColor = currentColor;
          }
        }
      });

      container.appendChild(square);
    }
  }

  //updates slider text
  function updateSliderText(gridSize) {
    sizeDisplay.textContent = `Grid Size: ${gridSize} × ${gridSize}`;
  }

  //initial setup
  const defaultSize = parseInt(slider.value, 10);
  createGrid(defaultSize);
  updateSliderText(defaultSize);

  //updates grid when changing size
  slider.addEventListener('input', (e) => {
    const newSize = parseInt(e.target.value, 10);
    createGrid(newSize);
    updateSliderText(newSize);
  });

  // When user picks a new color, update currentColor and turn Eraser OFF
  colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    if (isErasing) {
      isErasing = false;
      eraserButton.classList.remove('active');
      eraserButton.textContent = 'Eraser';
    }
  });

  // Toggle Eraser mode on/off
  eraserButton.addEventListener('click', () => {
    isErasing = !isErasing;
    if (isErasing) {
      eraserButton.textContent = 'Erasing';
      eraserButton.classList.add('active');
    } else {
      eraserButton.textContent = 'Eraser';
      eraserButton.classList.remove('active');
    }
  });

  //clear button
  clearButton.addEventListener('click', () => {
    const squares = container.querySelectorAll('.grid-square');
    squares.forEach((sq) => {
      sq.style.backgroundColor = '#ffffff';
    });
  });

  //prevents highlighting text when dragging
  container.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
});
