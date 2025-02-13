// -------------------------
// Existing DS Visualizer Code (Stack & Linked List)
// -------------------------
import { initStack, push as pushStack, pop as popStack } from './stack.js';
import { push as pushLL, removeLast, removeByValue } from './linkedlist.js';
// (We now include our updated Queue DS functions directly below.)

let dsType = "";
let maxSize = 0;

// DOM elements for DS visualizer
const dsSelect = document.getElementById('ds-select');
const dsSizeInput = document.getElementById('ds-size');
const sizeContainer = document.getElementById('size-container');
const llRemoveOptions = document.getElementById('ll-remove-options');
const llRemoveMode = document.getElementById('ll-remove-mode');
const removalInput = document.getElementById('removal-input');
const createDSBtn = document.getElementById('create-ds-btn');
const elementInput = document.getElementById('element-input');
const insertBtn = document.getElementById('insert-btn');
const removeBtn = document.getElementById('remove-btn');
const peekBtn = document.getElementById('peek-btn');

const stackContainer = document.getElementById('stack-container');
const llContainer = document.getElementById('ll-container');
const queueContainer = document.getElementById('queue-container');

// -------------------------
// Updated Queue DS Variables and Functions (Non-Shifting Behavior)
// -------------------------
const cellWidth = 60, cellHeight = 60;
let queue = [];       // Fixed-size queue array
let front = 0;        // Index of the current front element
let rear = 0;         // Next available index for insertion
let maxQueueSize = 0; // Set during initialization

function initQueueUI(size) {
  maxQueueSize = size;
  // Create a fixed-size array filled with null.
  queue = new Array(size).fill(null);
  front = 0;
  rear = 0;
  
  queueContainer.innerHTML = "";
  queueContainer.style.width = (size * cellWidth) + "px";
  queueContainer.style.height = cellHeight + "px";
  for (let i = 0; i < size; i++) {
    const cell = document.createElement("div");
    cell.className = "queue-cell";
    cell.style.position = "absolute";
    cell.style.top = "0px";
    cell.style.left = (i * cellWidth) + "px";
    cell.style.width = cellWidth + "px";
    cell.style.height = cellHeight + "px";
    cell.style.border = "1px dashed #013220";
    cell.style.backgroundColor = "#000";
    cell.style.boxSizing = "border-box";
    if (i === 0) cell.style.borderLeft = "none";
    if (i === size - 1) cell.style.borderRight = "none";
    queueContainer.appendChild(cell);
  }
  updateQueueUI();
}

function updateQueueUI() {
  const cells = queueContainer.getElementsByClassName("queue-cell");
  for (let i = 0; i < cells.length; i++) {
    if (queue[i] !== null) {
      cells[i].textContent = queue[i];
      cells[i].style.backgroundColor = "green";
    } else {
      cells[i].textContent = "";
      cells[i].style.backgroundColor = "#000";
    }
    // Remove any pointer labels inside each cell.
    const existingLabel = cells[i].querySelector(".pointer-label");
    if (existingLabel) existingLabel.remove();
  }
  // Remove any global pointer labels.
  const globalLabels = queueContainer.querySelectorAll(".global-pointer");
  globalLabels.forEach(label => label.remove());
  
  // Display pointers if there is at least one element.
  if (front < rear) {
    const cells = queueContainer.getElementsByClassName("queue-cell");
    if (front < cells.length) {
      const frontCell = cells[front];
      const frontLabel = document.createElement("div");
      frontLabel.className = "pointer-label global-pointer front-pointer";
      frontLabel.textContent = "↑ Front";
      frontLabel.style.position = "absolute";
      frontLabel.style.top = (frontCell.offsetTop + frontCell.offsetHeight) + "px";
      frontLabel.style.left = frontCell.offsetLeft + "px";
      frontLabel.style.width = cellWidth + "px";
      queueContainer.appendChild(frontLabel);
    }
    if (rear - 1 < cells.length && rear > front) {
      const rearCell = cells[rear - 1];
      const rearLabel = document.createElement("div");
      rearLabel.className = "pointer-label global-pointer rear-pointer";
      rearLabel.textContent = "Rear ↓";
      rearLabel.style.position = "absolute";
      rearLabel.style.bottom = (queueContainer.offsetHeight - rearCell.offsetHeight) + "px";
      rearLabel.style.left = rearCell.offsetLeft + "px";
      rearLabel.style.width = cellWidth + "px";
      queueContainer.appendChild(rearLabel);
    }
  }
}

function enqueueQueue(value) {
  if (rear >= maxQueueSize) {
    alert("Queue is full!");
    return;
  }
  const tempElem = document.createElement("div");
  tempElem.className = "queue-element";
  tempElem.innerText = value;
  // Start from the right edge.
  tempElem.style.left = queueContainer.offsetWidth + "px";
  tempElem.style.top = "10px";
  queueContainer.appendChild(tempElem);
  const cells = queueContainer.getElementsByClassName("queue-cell");
  const targetCell = cells[rear];
  const targetLeft = targetCell.offsetLeft;
  tempElem.getBoundingClientRect();
  setTimeout(() => {
    tempElem.style.left = targetLeft + "px";
  }, 10);
  tempElem.addEventListener("transitionend", () => {
    tempElem.remove();
    queue[rear] = value;
    rear++;
    updateQueueUI();
  }, { once: true });
}

function dequeueQueue() {
  if (front >= rear) {
    alert("Queue is empty!");
    return;
  }
  const cells = queueContainer.getElementsByClassName("queue-cell");
  const frontCell = cells[front];
  const tempElem = document.createElement("div");
  tempElem.className = "queue-element";
  tempElem.innerText = queue[front];
  tempElem.style.left = frontCell.offsetLeft + "px";
  tempElem.style.top = "10px";
  tempElem.style.opacity = "1";
  queueContainer.appendChild(tempElem);
  tempElem.getBoundingClientRect();
  setTimeout(() => {
    tempElem.style.left = "-100px";
    tempElem.style.opacity = "0";
  }, 10);
  tempElem.addEventListener("transitionend", () => {
    tempElem.remove();
    queue[front] = null;
    front++;
    updateQueueUI();
  }, { once: true });
}

// -------------------------
// DS Visualizer Event Handlers and Container Display Logic
// -------------------------
dsSelect.addEventListener('change', () => {
  dsType = dsSelect.value;
  
  // Hide all DS containers.
  stackContainer.style.display = "none";
  llContainer.style.display = "none";
  queueContainer.style.display = "none";
  document.getElementById('bubble-sort-section').style.display = "none";
  document.getElementById('insertion-sort-section').style.display = "none";
  
  if (dsType === "stack" || dsType === "queue") {
    sizeContainer.style.display = "block";
  } else {
    sizeContainer.style.display = "none";
  }
  
  if (dsType === "linked-list") {
    llRemoveOptions.style.display = "block";
    peekBtn.style.display = "none";
  } else if (dsType === "queue") {
    llRemoveOptions.style.display = "none";
    peekBtn.style.display = "block";
  } else {
    llRemoveOptions.style.display = "none";
    peekBtn.style.display = "none";
  }
  
  if(dsType === "bubble-sort") {
    document.getElementById('bubble-sort-section').style.display = "block";
    // Optionally disable DS-specific controls.
    elementInput.disabled = true;
    insertBtn.disabled = true;
    removeBtn.disabled = true;
    peekBtn.disabled = true;
  }
  
  if(dsType === "insertion-sort") {
    document.getElementById('insertion-sort-section').style.display = "block";
    elementInput.disabled = true;
    insertBtn.disabled = true;
    removeBtn.disabled = true;
    peekBtn.disabled = true;
  }
});

llRemoveMode.addEventListener('change', () => {
  if (llRemoveMode.value === "value") {
    removalInput.style.display = "block";
  } else {
    removalInput.style.display = "none";
  }
});

createDSBtn.addEventListener('click', () => {
  dsType = dsSelect.value;
  if (!dsType) {
    alert("Please select a Data Structure.");
    return;
  }
  
  // Hide all DS containers.
  stackContainer.style.display = "none";
  llContainer.style.display = "none";
  queueContainer.style.display = "none";
  document.getElementById('bubble-sort-section').style.display = "none";
  document.getElementById('insertion-sort-section').style.display = "none";
  
  if (dsType === "stack") {
    maxSize = parseInt(dsSizeInput.value);
    if (isNaN(maxSize) || maxSize <= 0) {
      alert("Please enter a valid size (number greater than 0).");
      return;
    }
    initStack(stackContainer, maxSize);
    stackContainer.style.display = "block";
  } else if (dsType === "linked-list") {
    llContainer.innerHTML = "";
    llContainer.style.display = "flex";
  } else if (dsType === "queue") {
    maxSize = parseInt(dsSizeInput.value);
    if (isNaN(maxSize) || maxSize <= 0) {
      alert("Please enter a valid size (number greater than 0).");
      return;
    }
    initQueueUI(maxSize);
    queueContainer.style.display = "block";
  } else if (dsType === "bubble-sort") {
    document.getElementById('bubble-sort-section').style.display = "block";
  } else if (dsType === "insertion-sort") {
    document.getElementById('insertion-sort-section').style.display = "block";
  }
  
  // Re-enable controls.
  elementInput.disabled = false;
  insertBtn.disabled = false;
  removeBtn.disabled = false;
  peekBtn.disabled = false;
});

insertBtn.addEventListener('click', () => {
  const value = elementInput.value;
  if (value === "") {
    alert("Please enter an element value.");
    return;
  }
  if (dsType === "stack") {
    pushStack(value, stackContainer, maxSize);
  } else if (dsType === "linked-list") {
    pushLL(value, llContainer);
  } else if (dsType === "queue") {
    enqueueQueue(value);
  }
  elementInput.value = "";
});

removeBtn.addEventListener('click', () => {
  if (dsType === "stack") {
    popStack(stackContainer, maxSize);
  } else if (dsType === "linked-list") {
    if (llRemoveMode.value === "last") {
      removeLast(llContainer);
    } else if (llRemoveMode.value === "value") {
      const remVal = removalInput.value;
      if (remVal === "") {
        alert("Please enter a value to remove.");
        return;
      }
      removeByValue(remVal, llContainer);
    }
  } else if (dsType === "queue") {
    dequeueQueue();
  }
});

peekBtn.addEventListener('click', () => {
  if (dsType === "queue") {
    const cells = queueContainer.getElementsByClassName("queue-cell");
    if (cells.length > 0 && cells[0].textContent !== "") {
      alert("Front element: " + cells[0].textContent);
    } else {
      alert("Queue is empty!");
    }
  }
});

// -------------------------
// Bubble Sort Visualizer Integration
// -------------------------
import { initializeBubbleSort, goForward, goBackward } from './bubble-sort.js';

document.getElementById('start-bubble-sort').addEventListener('click', () => {
  const inputStr = document.getElementById('bubble-input').value;
  initializeBubbleSort(inputStr);
});

document.getElementById('bubble-forward').addEventListener('click', () => {
  goForward();
});

document.getElementById('bubble-backward').addEventListener('click', () => {
  goBackward();
});

// -------------------------
// Insertion Sort Visualizer Integration
// -------------------------
import { initializeInsertionSort, goInsertionForward, goInsertionBackward } from './insertion-sort.js';

document.getElementById('start-insertion-sort').addEventListener('click', () => {
  const inputStr = document.getElementById('insertion-input').value;
  initializeInsertionSort(inputStr);
});

document.getElementById('insertion-forward').addEventListener('click', () => {
  goInsertionForward();
});

document.getElementById('insertion-backward').addEventListener('click', () => {
  goInsertionBackward();
});

// -------------------------
// Optional: Allow Enter key to trigger actions.
// -------------------------
dsSelect.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    createDSBtn.click();
  }
});
dsSizeInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    createDSBtn.click();
  }
});
elementInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    insertBtn.click();
  }
});
removalInput.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    insertBtn.click();
  }
});
