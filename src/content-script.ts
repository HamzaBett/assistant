console.log('Content script loaded.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fill_form') {
    // In a real scenario, you would have more sophisticated logic
    // to identify and fill specific forms and fields.
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input.type === 'text' || input.type === 'email' || input.type === 'password') {
        input.value = `test-${input.name || input.id || 'value'}`;
      }
    });
    sendResponse({ status: 'Form filled' });
  }
});
