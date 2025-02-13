// queue.js

// Global variables for the queue:
let queue = [];         // Fixed-size array
let front = 0;          // Index of the front element
let rear = 0;           // Index where the next element will be inserted
let maxSize = 0;        // Maximum number of elements (set when creating the queue)

const cellWidth = 60, cellHeight = 60;

/**
 * Creates the UI for the queue.
 * Instead of shifting elements when an element is removed,
 * the cell remains empty and the front pointer moves.
 * Also, once an index is used, it will not be re-used.
 * @param {number} size - The maximum size of the queue.
 */
export function createQueueUI(size) {
  maxSize = size; // set the global maxSize
  const container = document.getElementById("queue-container");
  container.innerHTML = "";
  container.style.width = (size * cellWidth) + "px";
  container.style.height = cellHeight + "px";
  
  // Create fixed cells.
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
    // For open ends, remove borders on the first and last cell:
    if (i === 0) cell.style.borderLeft = "none";
    if (i === size - 1) cell.style.borderRight = "none";
    container.appendChild(cell);
  }
  
  // Initialize our queue array and pointers.
  queue = new Array(size).fill(null);
  front = 0;
  rear = 0;
  updateQueueUI();
}

/**
 * Updates the UI for the queue.
 * Each cell is updated based on the current value in the queue array.
 * The front and rear pointers are shown as labels on the corresponding cells.
 */
export function updateQueueUI() {
  const cells = document.getElementsByClassName("queue-cell");
  
  // Update each cell.
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
    if (existingLabel) {
      existingLabel.remove();
    }
  }
  
  // Remove any global pointer labels if needed.
  const container = document.getElementById("queue-container");
  const globalLabels = container.querySelectorAll(".global-pointer");
  globalLabels.forEach(label => label.remove());
  
  // Add the front pointer if the queue is not empty.
  if (front < rear) {
    const frontCell = cells[front];
    const frontLabel = document.createElement("div");
    frontLabel.className = "pointer-label global-pointer front-pointer";
    frontLabel.textContent = "↑ Front";
    frontLabel.style.position = "absolute";
    frontLabel.style.top = (frontCell.offsetTop - 20) + "px";
    frontLabel.style.left = frontCell.offsetLeft + "px";
    frontLabel.style.width = cellWidth + "px";
    frontLabel.style.textAlign = "center";
    container.appendChild(frontLabel);
  }
  
  // Add the rear pointer if there is at least one element.
  if (rear > 0 && rear <= maxSize) {
    const rearCell = cells[rear - 1];
    const rearLabel = document.createElement("div");
    rearLabel.className = "pointer-label global-pointer rear-pointer";
    rearLabel.textContent = "Rear ↓";
    rearLabel.style.position = "absolute";
    rearLabel.style.bottom = "0px";
    rearLabel.style.left = rearCell.offsetLeft + "px";
    rearLabel.style.width = cellWidth + "px";
    rearLabel.style.textAlign = "center";
    container.appendChild(rearLabel);
  }
}

/**
 * Enqueues a new value into the queue.
 * It will be inserted at the current rear index.
 * If rear equals maxSize, the queue is full.
 * @param {string|number} value - The value to enqueue.
 */
export function enqueue(value, container, size) {
  if (rear >= maxSize) {
    alert("Queue is full! Cannot insert at a used index.");
    return;
  }
  // Insert value at rear position.
  queue[rear] = value;
  rear++;
  updateQueueUI();
}

/**
 * Dequeues an element from the queue.
 * Instead of shifting elements, it simply moves the front pointer,
 * and the cell where the element was removed is not reused.
 */
export function dequeue(container) {
  if (front >= rear) {
    alert("Queue is empty!");
    return;
  }
  // Remove the element at the front index by setting it to null.
  queue[front] = null;
  front++;
  updateQueueUI();
}
