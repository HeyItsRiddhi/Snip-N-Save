//Listen for a message from the content script to show the extension popup
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // Check the incoming message's structure
  if ((msg.from === 'contentScript') && (msg.subject === 'showPopup')) {
    // Display the extension popup on the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});

