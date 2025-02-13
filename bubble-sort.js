// bubble-sort.js

// Global variables for the bubble sort visualizer:
let bubbleArray = [];
let steps = [];       // Array of snapshots (each snapshot is a state of the array)
let currentStep = 0;

/**
 * Initializes the Bubble Sort visualizer.
 * Reads a comma-separated string of numbers, converts it to an array,
 * generates the step-by-step snapshots, and renders the initial state.
 * @param {string} inputStr - The input string from the Bubble Sort input.
 */
export function initializeBubbleSort(inputStr) {
  // Convert input string to an array of numbers.
  bubbleArray = inputStr.split(',')
    .map(num => parseInt(num.trim()))
    .filter(num => !isNaN(num));
  
  if (bubbleArray.length === 0) {
    alert("Please enter a valid array of numbers.");
    return;
  }
  
  // Generate snapshots of the bubble sort process.
  steps = generateBubbleSortSteps([...bubbleArray]);
  currentStep = 0;
  // Render the initial unsorted array.
  renderBubbleArray(bubbleArray);
}

/**
 * Generates snapshots of the array during the bubble sort process.
 * For each comparison, a snapshot is taken with the two elements being compared flagged.
 * If a swap occurs, the state after the swap is also saved.
 * @param {Array} arr - The array to sort.
 * @returns {Array} history - Array of snapshots.
 */
function generateBubbleSortSteps(arr) {
  let history = [];
  // Save the initial state.
  history.push([...arr]);
  
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Snapshot before comparison: flag the two elements being compared.
      let snapshot = arr.map((item, index) => {
        if (index === j || index === j + 1) {
          return { value: item, swapping: true };
        }
        return item;
      });
      history.push(snapshot);
      
      // Swap if the current element is greater than the next.
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Save the state after the swap.
        history.push([...arr]);
      }
    }
  }
  return history;
}

/**
 * Renders a snapshot of the array in the Bubble Sort container.
 * Each element is rendered as a fixed-size block; if flagged as being compared,
 * the block gets the "swapping" class and a pointer arrow is added.
 * @param {Array} arr - The snapshot to render.
 */
function renderBubbleArray(arr) {
  const container = document.getElementById('bubble-container');
  container.innerHTML = ''; // Clear previous content
  
  arr.forEach(item => {
    const block = document.createElement('div');
    block.classList.add('bubble-bar');
    
    let value, isSwapping = false;
    if (typeof item === 'object') {
      value = item.value;
      isSwapping = item.swapping;
    } else {
      value = item;
    }
    
    block.textContent = value;
    
    if (isSwapping) {
      block.classList.add('swapping');
      // Create a pointer arrow element.
      const arrow = document.createElement('div');
      arrow.classList.add('swap-arrow');
      arrow.textContent = '⇩';  // Use your preferred arrow symbol.
      block.appendChild(arrow);
    }
    
    container.appendChild(block);
  });
}

/**
 * Advances one step forward in the Bubble Sort process.
 */
export function goForward() {
  if (currentStep < steps.length) {
    renderBubbleArray(steps[currentStep]);
    currentStep++;
  } else {
    alert("Reached the end of the sorting steps.");
  }
}

/**
 * Moves one step backward in the Bubble Sort process.
 */
export function goBackward() {
  if (currentStep > 0) {
    currentStep--;
    renderBubbleArray(steps[currentStep]);
  }
}
