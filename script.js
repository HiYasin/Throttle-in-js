// Debounce function implementation
function debounce(func, delay) {
    let timeoutId = null;
    
    return function(...args) {
        // Clear the previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Set a new timeout
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Throttle function implementation
function throttle(func, limit) {
    let lastCallTime = 0;
    let timeoutId = null;
    
    return function(...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastCallTime;
        
        // If enough time has passed, execute immediately
        if (timeSinceLastCall >= limit) {
            lastCallTime = now;
            func.apply(this, args);
        } else {
            // Clear any pending timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            // Schedule execution for when the delay period is complete
            timeoutId = setTimeout(() => {
                lastCallTime = Date.now();
                func.apply(this, args);
            }, limit - timeSinceLastCall);
        }
    };
}

// Counter variables
let normalCount = 0;
let throttleCount = 0;
let debounceCount = 0;

// Get DOM elements
const normalButton = document.getElementById('normalButton');
const throttleButton = document.getElementById('throttleButton');
const debounceButton = document.getElementById('debounceButton');
const normalCounter = document.getElementById('normalCounter');
const throttleCounter = document.getElementById('throttleCounter');
const debounceCounter = document.getElementById('debounceCounter');

// Normal button handler (no throttling)
function incrementNormal() {
    normalCount++;
    normalCounter.textContent = normalCount;
    console.log('Normal click:', normalCount);
}

// Throttled button handler
function incrementThrottle() {
    throttleCount++;
    throttleCounter.textContent = throttleCount;
    console.log('Throttled click:', throttleCount);
}

// Debounced button handler
function incrementDebounce() {
    debounceCount++;
    debounceCounter.textContent = debounceCount;
    console.log('Debounced click:', debounceCount);
}

// Create throttled version of the increment function
// The function will only execute at most once per 1000ms (1 second)
const throttledIncrement = throttle(incrementThrottle, 1000);

// Create debounced version of the increment function
// The function will only execute after you stop clicking for 1000ms (1 second)
const debouncedIncrement = debounce(incrementDebounce, 1000);

// Add event listeners
normalButton.addEventListener('click', incrementNormal);
throttleButton.addEventListener('click', throttledIncrement);
debounceButton.addEventListener('click', debouncedIncrement);

console.log('Throttle & Debounce demo loaded! Try clicking all buttons rapidly to see the difference.');