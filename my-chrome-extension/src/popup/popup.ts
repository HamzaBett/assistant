// This file contains the logic for the popup, including event listeners and interactions with the background script.

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const output = document.getElementById('output');

    if (button && output) {
        button.addEventListener('click', () => {
            chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
                if (response) {
                    output.textContent = response.data;
                } else {
                    output.textContent = 'No data received.';
                }
            });
        });
    }
});
