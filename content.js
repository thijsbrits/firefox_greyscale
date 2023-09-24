document.documentElement.style.filter = 'grayscale(100%)';
let isGreyscale = true;

const url = window.location.hostname;

// Fetch and apply stored preference
browser.storage.local.get(url, function(data) {
  if (data[url] !== undefined) {
    isGreyscale = data[url];
  }
  applyGreyscale();
});

function applyGreyscale() {
  document.documentElement.style.filter = isGreyscale ? 'grayscale(100%)' : '';
}

// Function to toggle and store greyscale
function toggleGreyscale() {
  isGreyscale = !isGreyscale;
  applyGreyscale();
  const saveObj = {};
  saveObj[url] = isGreyscale;
  browser.storage.local.set(saveObj);
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleGreyscale") {
      toggleGreyscale();
    }
  }
);