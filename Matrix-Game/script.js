const draggables = document.querySelectorAll('.shape-tile[draggable="true"]');
const droppables = document.querySelectorAll('.droppable');

draggables.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('shape', item.dataset.shape);
    e.dataTransfer.setData('color', item.dataset.color);
    e.dataTransfer.setData('id', item.outerHTML);
    item.classList.add('dragging');
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
  });
});

droppables.forEach(dropZone => {
  dropZone.addEventListener('dragover', e => e.preventDefault());

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const shape = e.dataTransfer.getData('shape');
    const color = e.dataTransfer.getData('color');
    const html = e.dataTransfer.getData('id');

    if (dropZone.innerHTML.trim()) return;

    // Create a DOM element from the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();
    const draggedElement = tempDiv.firstElementChild;

    // Add classes
    draggedElement.classList.remove('dragging');

    const isCorrect =
      dropZone.dataset.shape === shape && dropZone.dataset.color === color;

    if (isCorrect) {
      draggedElement.classList.remove('wrong-drop');
      draggedElement.setAttribute('draggable', 'false');
    } else {
      draggedElement.classList.add('wrong-drop');
      draggedElement.setAttribute('draggable', 'true');
    }

    // Clear original element (from shape-board or wrong cell)
    const existing = document.querySelector(
      `.shape-tile[data-shape="${shape}"][data-color="${color}"]`
    );
    if (existing) existing.remove();

    // Insert into drop zone
    dropZone.innerHTML = '';
    dropZone.appendChild(draggedElement);

    // Add drag listeners if still draggable
    if (isCorrect) {
      setTimeout(checkWinner, 100);
    } else {
      draggedElement.addEventListener('dragstart', e => {
        e.dataTransfer.setData('shape', shape);
        e.dataTransfer.setData('color', color);
        e.dataTransfer.setData('id', draggedElement.outerHTML);
        draggedElement.classList.add('dragging');
      });

      draggedElement.addEventListener('dragend', () => {
        draggedElement.classList.remove('dragging');
      });
    }
  });

});

function checkWinner() {
  const rightBoard = document.querySelector('.shape-board');
  const placedCells = document.querySelectorAll('#drop-grid .droppable');
  const allFilled = [...placedCells].every(cell => cell.innerHTML.trim() !== '');

  if (rightBoard.children.length === 0 && allFilled) {
    clearInterval(timerInterval);
    document.getElementById('winnerMessage').style.display = 'flex';
  }
}

let startTime = Date.now();
let paused = false;
let elapsedBeforePause = 0;

const timerBtn = document.getElementById('timerBtn');
const pauseBtn = document.getElementById('pauseBtn');
const ctrlIcon = document.getElementById('ctrlIcon');
const sideMenu = document.getElementById('sideMenu');
const container = document.getElementById('mainContainer');
const shapeBoard = document.querySelector('.shape-board');
const grid = document.querySelector('.grid');

const timerInterval = setInterval(() => {
  if (!paused) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000) + elapsedBeforePause;
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timerBtn.innerText = `Time: ${minutes}m ${seconds}s`;
  }
}, 1000);

pauseBtn.addEventListener('click', () => {
  paused = !paused;

  if (paused) {
    elapsedBeforePause += Math.floor((Date.now() - startTime) / 1000);
    ctrlIcon.classList.replace('fa-pause', 'fa-play');
    shapeBoard.classList.add('disabled');
    grid.classList.add('disabled');
    sideMenu.classList.add('visible');
  } else {
    startTime = Date.now();
    ctrlIcon.classList.replace('fa-play', 'fa-pause');
    shapeBoard.classList.remove('disabled');
    grid.classList.remove('disabled');
    sideMenu.classList.remove('visible');
  }
});

const questionBtn = document.querySelector('.fa-question');
const helpPopup = document.getElementById('helpPopup');

questionBtn.addEventListener('click', () => {
  helpPopup.style.display = helpPopup.style.display === 'block' ? 'none' : 'block';
});

const gotItBtn = document.getElementById('gotItBtn');
gotItBtn.addEventListener('click', () => {
  helpPopup.style.display = 'none';
});

const resetButtons = document.querySelectorAll('.reset');

resetButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Clear all droppable cells
    droppables.forEach(cell => {
      cell.innerHTML = '';
    });

    // Re-populate shape-board with all original shapes
    shapeBoard.innerHTML = `
      <div class="cell shape-tile" draggable="true" data-shape="circle" data-color="pink">
        <div class="shape-filled filled-circle" style="background:#f25987"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="star" data-color="pink">
        <div class="shape-filled filled-star" style="background:#f25987"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="cross" data-color="green">
        <div class="shape-filled filled-cross" style="color:#c4cf3f"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="star" data-color="green">
        <div class="shape-filled filled-star" style="background:#c4cf3f"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="cross" data-color="yellow">
        <div class="shape-filled filled-cross" style="color:#fbd020"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="square" data-color="pink">
        <div class="shape-filled filled-square" style="background:#f25987"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="circle" data-color="green">
        <div class="shape-filled filled-circle" style="background:#c4cf3f"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="circle" data-color="blue">
        <div class="shape-filled filled-circle" style="background:#22c2f2"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="cross" data-color="pink">
        <div class="shape-filled filled-cross" style="color:#f25987"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="triangle" data-color="yellow">
        <div class="shape-filled filled-triangle" style="border-bottom-color:#fbd020"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="square" data-color="yellow">
        <div class="shape-filled filled-square" style="background:#fbd020"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="triangle" data-color="green">
        <div class="shape-filled filled-triangle" style="border-bottom-color:#c4cf3f"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="star" data-color="yellow">
        <div class="shape-filled filled-star" style="background:#fbd020"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="square" data-color="blue">
        <div class="shape-filled filled-square" style="background:#22c2f2"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="circle" data-color="yellow">
        <div class="shape-filled filled-circle" style="background:#fbd020"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="triangle" data-color="pink">
        <div class="shape-filled filled-triangle" style="border-bottom-color:#f25987"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="triangle" data-color="blue">
        <div class="shape-filled filled-triangle" style="border-bottom-color:#22c2f2"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="square" data-color="green">
        <div class="shape-filled filled-square" style="background:#c4cf3f"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="cross" data-color="blue">
        <div class="shape-filled filled-cross" style="color:#22c2f2"></div>
      </div>
      <div class="cell shape-tile" draggable="true" data-shape="star" data-color="blue">
        <div class="shape-filled filled-star" style="background:#22c2f2"></div>
      </div>
    `;

    // Rebind drag events
    const newDraggables = shapeBoard.querySelectorAll('.shape-tile');
    newDraggables.forEach(item => {
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('shape', item.dataset.shape);
        e.dataTransfer.setData('color', item.dataset.color);
        e.dataTransfer.setData('id', item.outerHTML);
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });

      
    });

    // Reset timer
    elapsedBeforePause = 0;
    startTime = Date.now();
    paused = false;
    ctrlIcon.classList.replace('fa-play', 'fa-pause');
    shapeBoard.classList.remove('disabled');
    grid.classList.remove('disabled');
    sideMenu.classList.remove('visible');
  });
});



