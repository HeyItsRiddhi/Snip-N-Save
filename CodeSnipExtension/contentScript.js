// Send a message to background.js to display the extension popup
chrome.runtime.sendMessage({
  from:    'contentScript',
  subject: 'showPopup'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // Check the incoming message's structure
  if ((msg.from === 'popup') && (msg.subject === 'snipInfo')) {
    //collect all the elements on that page with the tag name pre
    var elements = document.getElementsByTagName("pre");

    //put each snippets' html in array snips
    var snips = new Array;
    for (var i = 0; i < elements.length; i++) {
		  snips.push(elements[i].outerHTML);
    }

    //respond to the popup's message by sending it the array code snips
    response(snips);
  }
});