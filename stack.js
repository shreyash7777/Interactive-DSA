// stack.js
const slotHeight = 55;
let stack = [];

/**
 * Initializes the stack display.
 * @param {HTMLElement} container - The stack container element.
 * @param {number} maxSize - The maximum size of the stack.
 */
function initStack(container, maxSize) {
  stack = [];
  container.style.height = (maxSize * slotHeight) + "px";
  container.innerHTML = "";
  for (let i = 0; i < maxSize; i++) {
    const slot = document.createElement("div");
    slot.className = "stack-slot";
    slot.style.position = "absolute";
    slot.style.left = "0";
    slot.style.width = "100%";
    slot.style.bottom = (i * slotHeight) + "px";
    if (i === maxSize - 1) slot.style.borderTop = "none";
    container.appendChild(slot);
  }
}

/**
 * Updates the stack UI to reflect the current stack array.
 * @param {HTMLElement} container - The stack container element.
 * @param {number} maxSize - The maximum size of the stack.
 */
function updateUI(container, maxSize) {
  // Remove any existing stack element elements.
  const existingContents = container.querySelectorAll(".slot-content");
  existingContents.forEach(el => el.remove());
  stack.forEach((value, index) => {
    const content = document.createElement("div");
    content.className = "slot-content";
    content.innerText = value;
    const targetTop = container.clientHeight - ((index + 1) * slotHeight);
    content.style.top = targetTop + "px";
    content.style.position = "absolute";
    content.style.left = "0";
    content.style.width = "100%";
    container.appendChild(content);
  });
  // Add a top-stick if the stack is full.
  if (stack.length === maxSize) {
    if (!container.querySelector('.top-stick')) {
      const topStick = document.createElement("div");
      topStick.className = "top-stick";
      topStick.style.top = "-10px";
      container.appendChild(topStick);
      topStick.getBoundingClientRect();
      setTimeout(() => {
        topStick.style.top = "0px";
      }, 10);
    }
  } else {
    const topStick = container.querySelector('.top-stick');
    if (topStick) topStick.remove();
  }
}

/**
 * Pushes a value onto the stack with an animation.
 * @param {string} value - The value to push.
 * @param {HTMLElement} container - The stack container element.
 * @param {number} maxSize - The maximum size of the stack.
 */
function push(value, container, maxSize) {
  if (stack.length >= maxSize) {
    alert("Stack is full!");
    return;
  }
  const fallingElem = document.createElement("div");
  fallingElem.className = "slot-content falling";
  fallingElem.innerText = value;
  fallingElem.style.position = "absolute";
  fallingElem.style.left = "0";
  fallingElem.style.width = "100%";
  fallingElem.style.top = "-60px";
  container.appendChild(fallingElem);
  fallingElem.getBoundingClientRect();
  const targetTop = container.clientHeight - ((stack.length + 1) * slotHeight);
  fallingElem.style.top = targetTop + "px";
  fallingElem.addEventListener("transitionend", () => {
    fallingElem.remove();
    stack.push(value);
    updateUI(container, maxSize);
  }, { once: true });
}

/**
 * Pops the top value off the stack.
 * @param {HTMLElement} container - The stack container element.
 * @param {number} maxSize - The maximum size of the stack.
 */
function pop(container, maxSize) {
  if (stack.length === 0) {
    alert("Stack is empty!");
    return;
  }
  stack.pop();
  updateUI(container, maxSize);
}

export { initStack, push, pop };
