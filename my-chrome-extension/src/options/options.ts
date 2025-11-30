// This file contains the logic for the options page, handling user input and saving settings.

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save');
    const inputField = document.getElementById('inputField') as HTMLInputElement;

    // Load saved settings
    chrome.storage.sync.get({ userSetting: '' }, (result) => {
        inputField.value = result.userSetting as string;
    });

    // Save settings on button click
    if (saveButton && inputField) {
        saveButton.addEventListener('click', () => {
            const userSetting = inputField.value;
            chrome.storage.sync.set({ userSetting }, () => {
                console.log('Settings saved:', userSetting);
            });
        });
    }
});
