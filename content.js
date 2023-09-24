document.documentElement.style.filter = 'grayscale(100%)';

let isGreyscale = true;

function toggleGreyscale() {
  isGreyscale = !isGreyscale;
  document.documentElement.style.filter = isGreyscale ? "grayscale(100%)" : "";
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleGreyscale") {
      toggleGreyscale();
    }
  }
);