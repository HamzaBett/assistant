// This file contains the content script that interacts with web pages. 
// It can manipulate the DOM of the pages where the extension is active.

const targetElement = document.querySelector('body');

if (targetElement) {
    targetElement.style.backgroundColor = 'lightblue'; // Example manipulation
    console.log('Content script injected and background color changed to light blue.');
} else {
    console.error('Target element not found.');
}