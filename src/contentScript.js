'use strict';


if (location.href.includes('#logsV2:logs-insights')) {

  chrome.runtime.sendMessage(
    {
      type: 'GET_CONTENT',
    }
  );
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SNIPPET') {
      navigator.clipboard.writeText(request.snippet);
    }
    if (request.type === 'URL') {
      window.open(request.url, '_blank');
    }
    return true;
  });
}

