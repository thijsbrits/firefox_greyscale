document.documentElement.style.filter = 'grayscale(100%)';
let isGrayscale = true;

const url = window.location.hostname;

// Fetch and apply stored preference
browser.storage.local.get(url, function(data) {
  if (data[url] !== undefined) {
    isGrayscale = data[url];
  }
  applyGrayscale();
});

function applyGrayscale() {
  document.documentElement.style.filter = isGrayscale ? 'grayscale(100%)' : '';
}

// Function to toggle and store grayscale
function toggleGrayscale() {
  isGrayscale = !isGrayscale;
  applyGrayscale();
  const saveObj = {};
  saveObj[url] = isGrayscale;
  browser.storage.local.set(saveObj);
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleGrayscale") {
      toggleGrayscale();
    }
  }
);