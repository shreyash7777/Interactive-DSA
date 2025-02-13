// insertion-sort.js

let insertionArray = [];
let insertionSteps = [];
let insertionCurrentStep = 0;

/**
 * Initializes the Insertion Sort visualizer.
 * @param {string} inputStr - A comma-separated string of numbers.
 */
export function initializeInsertionSort(inputStr) {
  insertionArray = inputStr
    .split(',')
    .map(num => parseInt(num.trim()))
    .filter(num => !isNaN(num));
  if (insertionArray.length === 0) {
    alert("Please enter a valid array of numbers.");
    return;
  }
  insertionSteps = generateInsertionSortSteps([...insertionArray]);
  insertionCurrentStep = 0;
  renderInsertionSnapshot(insertionSteps[0]);
}

/**
 * Generates snapshots of the insertion sort process.
 * Each snapshot is an object with:
 *  - arr: the array snapshot (with flagged objects for highlighting)
 *  - key: the current key (number that is being inserted) if any.
 * When comparing the key to the sorted part, both the key and the element being shifted are flagged.
 * @param {Array} arr - The array to sort.
 * @returns {Array} history - Array of snapshot objects.
 */
function generateInsertionSortSteps(arr) {
  let history = [];
  // Save the initial state (no key displayed yet).
  history.push({ arr: [...arr], key: null });
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    // Snapshot before shifting: highlight the key at index i and the element at index j.
    let snapshot = arr.map((item, index) => {
      if (index === i) {
        return { value: key, key: true };
      }
      if (index === j) {
        return { value: item, shifting: true };
      }
      return item;
    });
    history.push({ arr: snapshot, key: key });
    
    while (j >= 0 && arr[j] > key) {
      // Snapshot during shifting: mark the key (still at index i) and the element at j.
      let compareSnapshot = arr.map((item, index) => {
        if (index === i) {
          return { value: key, key: true };
        }
        if (index === j) {
          return { value: item, shifting: true };
        }
        return item;
      });
      history.push({ arr: compareSnapshot, key: key });
      
      // Shift arr[j] to the right.
      arr[j + 1] = arr[j];
      history.push({ arr: [...arr], key: key });
      j--;
    }
    // Insert the key at its correct position.
    arr[j + 1] = key;
    let insertSnapshot = arr.map((item, index) => {
      if (index === j + 1) {
        return { value: key, key: true };
      }
      return item;
    });
    history.push({ arr: insertSnapshot, key: key });
    // After insertion, clear the key display.
    history.push({ arr: [...arr], key: null });
  }
  return history;
}

/**
 * Renders a snapshot of the insertion sort array in the insertion container,
 * and also updates a separate container (with id "insertion-key") to show the key.
 * @param {Object} snapshotObj - An object with properties { arr, key }.
 */
function renderInsertionSnapshot(snapshotObj) {
  const container = document.getElementById('insertion-container');
  container.innerHTML = '';
  // Update key display if an element is being shifted.
  const keyContainer = document.getElementById('insertion-key');
  if (snapshotObj.key !== null) {
    keyContainer.textContent = "Key: " + snapshotObj.key;
    keyContainer.style.display = "block";
  } else {
    keyContainer.style.display = "none";
  }
  
  snapshotObj.arr.forEach(item => {
    const block = document.createElement('div');
    block.classList.add('insertion-bar');
    let value, isKey = false, isShifting = false;
    if (typeof item === 'object') {
      value = item.value;
      isKey = item.key || false;
      isShifting = item.shifting || false;
    } else {
      value = item;
    }
    block.textContent = value;
    // If flagged, add the "swapping" class and a pointer arrow.
    if (isKey || isShifting) {
      block.classList.add('swapping');
      const arrow = document.createElement('div');
      arrow.classList.add('swap-arrow');
      arrow.textContent = '⇩';
      block.appendChild(arrow);
    }
    container.appendChild(block);
  });
}

/**
 * Advances one step forward in the insertion sort process.
 */
export function goInsertionForward() {
  if (insertionCurrentStep < insertionSteps.length) {
    renderInsertionSnapshot(insertionSteps[insertionCurrentStep]);
    insertionCurrentStep++;
  } else {
    alert("Reached the end of insertion sort steps.");
  }
}

/**
 * Moves one step backward in the insertion sort process.
 */
export function goInsertionBackward() {
  if (insertionCurrentStep > 0) {
    insertionCurrentStep--;
    renderInsertionSnapshot(insertionSteps[insertionCurrentStep]);
  }
}
