// merge-sort.js

let mergeArray = [];
let mergeSteps = [];
let mergeCurrentStep = 0;

/**
 * Initializes the Merge Sort visualizer.
 * @param {string} inputStr - Comma-separated numbers.
 */
export function initializeMergeSort(inputStr) {
  mergeArray = inputStr.split(',')
    .map(num => parseInt(num.trim()))
    .filter(num => !isNaN(num));
  if (mergeArray.length === 0) {
    alert("Please enter a valid array of numbers.");
    return;
  }
  mergeSteps = generateMergeSortSteps([...mergeArray]);
  mergeCurrentStep = 0;
  renderMergeArray(mergeArray);
}

/**
 * Generates snapshots using an iterative (bottom-up) merge sort.
 * @param {Array} arr - Array to sort.
 * @returns {Array} history - Array of snapshots.
 */
function generateMergeSortSteps(arr) {
  let history = [];
  history.push([...arr]);
  let n = arr.length;
  // Bottom-up merge sort: merge subarrays of increasing size.
  for (let size = 1; size < n; size *= 2) {
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      let mid = Math.min(leftStart + size, n);
      let rightEnd = Math.min(leftStart + 2 * size, n);
      merge(arr, leftStart, mid, rightEnd);
      history.push([...arr]);
    }
  }
  return history;
}

/**
 * Merges two sorted subarrays of arr.
 * @param {Array} arr - The array.
 * @param {number} left - Left index.
 * @param {number} mid - Middle index.
 * @param {number} right - Right index.
 */
function merge(arr, left, mid, right) {
  let leftArr = arr.slice(left, mid);
  let rightArr = arr.slice(mid, right);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
  while (i < leftArr.length) {
    arr[k++] = leftArr[i++];
  }
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++];
  }
}

/**
 * Renders a snapshot in the Merge Sort container.
 * @param {Array} arr - Snapshot to render.
 */
function renderMergeArray(arr) {
  const container = document.getElementById('merge-container');
  container.innerHTML = '';
  arr.forEach(item => {
    const block = document.createElement('div');
    block.classList.add('merge-bar');
    block.textContent = item;
    container.appendChild(block);
  });
}

/**
 * Advances one step forward in the Merge Sort process.
 */
export function goMergeForward() {
  if (mergeCurrentStep < mergeSteps.length) {
    renderMergeArray(mergeSteps[mergeCurrentStep]);
    mergeCurrentStep++;
  } else {
    alert("Reached end of merge sort steps.");
  }
}

/**
 * Moves one step backward in the Merge Sort process.
 */
export function goMergeBackward() {
  if (mergeCurrentStep > 0) {
    mergeCurrentStep--;
    renderMergeArray(mergeSteps[mergeCurrentStep]);
  }
}
