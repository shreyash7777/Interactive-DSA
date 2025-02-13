// Main JavaScript Code
document.addEventListener('DOMContentLoaded', () => {
    let dsType = "";
    let maxSize = 0;
    
    // Get DOM elements
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
    
    // Update control visibility based on data structure selection
    dsSelect.addEventListener('change', () => {
      dsType = dsSelect.value;
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
    });
    
    // Update linked list removal input visibility
    llRemoveMode.addEventListener('change', () => {
      if (llRemoveMode.value === "value") {
        removalInput.style.display = "block";
      } else {
        removalInput.style.display = "none";
      }
    });
    
    // Create Data Structure button event
    createDSBtn.addEventListener('click', () => {
      dsType = dsSelect.value;
      if (!dsType) {
        alert("Please select a Data Structure.");
        return;
      }
      // Hide all DS containers initially
      stackContainer.style.display = "none";
      llContainer.style.display = "none";
      queueContainer.style.display = "none";
      
      if (dsType === "stack") {
        maxSize = parseInt(dsSizeInput.value);
        if (isNaN(maxSize) || maxSize <= 0) {
          alert("Please enter a valid size (number greater than 0).");
          return;
        }
        // Reset stack and create UI
        stack = [];
        createStackUI(maxSize);
        stackContainer.style.display = "block";
      } else if (dsType === "linked-list") {
        linkedList = [];
        llContainer.innerHTML = "";
        llContainer.style.display = "flex";
      } else if (dsType === "queue") {
        maxSize = parseInt(dsSizeInput.value);
        if (isNaN(maxSize) || maxSize <= 0) {
          alert("Please enter a valid size (number greater than 0).");
          return;
        }
        queue = [];
        createQueueUI(maxSize);
        queueContainer.style.display = "block";
      }
      elementInput.disabled = false;
      insertBtn.disabled = false;
      removeBtn.disabled = false;
      peekBtn.disabled = false;
    });
    
    // Insert button event
    insertBtn.addEventListener('click', () => {
      const value = elementInput.value;
      if (value === "") {
        alert("Please enter an element value.");
        return;
      }
      if (dsType === "stack") {
        if (stack.length >= maxSize) {
          alert("Stack is full!");
          return;
        }
        animateStackInsert(value, maxSize);
      } else if (dsType === "linked-list") {
        linkedList.push(value);
        updateLLUI();
      } else if (dsType === "queue") {
        if (queue.length >= maxSize) {
          alert("Queue is full!");
          return;
        }
        animateQueueInsert(value, maxSize);
      }
      elementInput.value = "";
    });
    
    // Remove button event
    removeBtn.addEventListener('click', () => {
      if (dsType === "stack") {
        if (stack.length === 0) {
          alert("Stack is empty!");
          return;
        }
        stack.pop();
        updateStackUI(maxSize);
      } else if (dsType === "linked-list") {
        if (linkedList.length === 0) {
          alert("Linked List is empty!");
          return;
        }
        const mode = llRemoveMode.value;
        let indexToRemove;
        if (mode === "last") {
          indexToRemove = linkedList.length - 1;
        } else if (mode === "value") {
          const remVal = removalInput.value;
          if (remVal === "") {
            alert("Please enter a value to remove.");
            return;
          }
          indexToRemove = linkedList.indexOf(remVal);
          if (indexToRemove === -1) {
            alert("The number is not in the linked list!");
            return;
          }
        }
        // Animate removal for linked list
        const wrappers = llContainer.getElementsByClassName("ll-wrapper");
        if (wrappers[indexToRemove]) {
          wrappers[indexToRemove].classList.add("falling-node");
          wrappers[indexToRemove].addEventListener("transitionend", () => {
            linkedList.splice(indexToRemove, 1);
            updateLLUI();
          }, { once: true });
        } else {
          linkedList.splice(indexToRemove, 1);
          updateLLUI();
        }
      } else if (dsType === "queue") {
        if (queue.length === 0) {
          alert("Queue is empty!");
          return;
        }
        animateQueuePop();
      }
    });
    
    // Peek button event for queue
    peekBtn.addEventListener('click', () => {
      if (dsType === "queue") {
        if (queue.length === 0) {
          alert("Queue is empty!");
        } else {
          alert("Front element: " + queue[0]);
        }
      }
    });
  });
  