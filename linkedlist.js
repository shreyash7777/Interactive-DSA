// linkedlist.js
let linkedList = [];

/**
 * Updates the linked list UI.
 * @param {HTMLElement} container - The linked list container element.
 */
function updateUI(container) {
  container.innerHTML = "";
  linkedList.forEach((nodeValue, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "ll-wrapper";
    wrapper.setAttribute("data-index", index);
    const nodeDiv = document.createElement("div");
    nodeDiv.className = "ll-node";
    const valDiv = document.createElement("div");
    valDiv.className = "node-value";
    valDiv.innerText = nodeValue;
    const ptrDiv = document.createElement("div");
    ptrDiv.className = "node-pointer";
    ptrDiv.innerText = "Node";
    nodeDiv.appendChild(valDiv);
    nodeDiv.appendChild(ptrDiv);
    wrapper.appendChild(nodeDiv);
    if (index < linkedList.length - 1) {
      const connector = document.createElement("div");
      connector.className = "connector";
      connector.style.width = "0px";
      wrapper.appendChild(connector);
      connector.getBoundingClientRect();
      setTimeout(() => {
        connector.style.width = "30px";
      }, 50);
    }
    container.appendChild(wrapper);
  });
  if (linkedList.length > 0) {
    const finalConnector = document.createElement("div");
    finalConnector.className = "connector";
    finalConnector.style.width = "0px";
    container.appendChild(finalConnector);
    finalConnector.getBoundingClientRect();
    setTimeout(() => {
      finalConnector.style.width = "30px";
    }, 50);
    const nullBlock = document.createElement("div");
    nullBlock.className = "ll-null";
    nullBlock.innerText = "Null";
    container.appendChild(nullBlock);
  }
}

/**
 * Adds a new value to the linked list.
 * @param {string} value - The value to add.
 * @param {HTMLElement} container - The linked list container element.
 */
function push(value, container) {
  linkedList.push(value);
  updateUI(container);
}

/**
 * Removes the last node from the linked list.
 * @param {HTMLElement} container - The linked list container element.
 */
function removeLast(container) {
  if (linkedList.length === 0) {
    alert("Linked List is empty!");
    return;
  }
  const wrappers = container.getElementsByClassName("ll-wrapper");
  const indexToRemove = linkedList.length - 1;
  if (wrappers[indexToRemove]) {
    wrappers[indexToRemove].classList.add("falling-node");
    wrappers[indexToRemove].addEventListener("transitionend", () => {
      linkedList.splice(indexToRemove, 1);
      updateUI(container);
    }, { once: true });
  } else {
    linkedList.splice(indexToRemove, 1);
    updateUI(container);
  }
}

/**
 * Removes a node by its value.
 * @param {string} value - The value to remove.
 * @param {HTMLElement} container - The linked list container element.
 */
function removeByValue(value, container) {
  if (linkedList.length === 0) {
    alert("Linked List is empty!");
    return;
  }
  const index = linkedList.indexOf(value);
  if (index === -1) {
    alert("The number is not in the linked list!");
    return;
  }
  const wrappers = container.getElementsByClassName("ll-wrapper");
  if (wrappers[index]) {
    wrappers[index].classList.add("falling-node");
    wrappers[index].addEventListener("transitionend", () => {
      linkedList.splice(index, 1);
      updateUI(container);
    }, { once: true });
  } else {
    linkedList.splice(index, 1);
    updateUI(container);
  }
}

export { updateUI, push, removeLast, removeByValue };
