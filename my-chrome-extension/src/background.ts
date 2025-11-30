// This file contains the background script for the Chrome extension. It manages events and handles long-running tasks.

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'someAction') {
        // Handle the action
        sendResponse({ result: 'Action handled' });
    }
});

// Additional background script logic can be added here.