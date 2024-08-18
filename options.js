document.addEventListener('DOMContentLoaded', () => {
    const whitelistTextarea = document.getElementById('whitelist');
    const saveWhitelistBtn = document.getElementById('saveWhitelistBtn');
  
    chrome.storage.local.get(['whitelist'], result => {
      if (result.whitelist) {
        whitelistTextarea.value = result.whitelist.join('\n'); 
      }
    });
  
    saveWhitelistBtn.addEventListener('click', () => {
      const whitelist = whitelistTextarea.value.split('\n').map(url => url.trim()).filter(url => url.length > 0); 
      chrome.storage.local.set({ whitelist: whitelist }, () => {
        alert('Whitelist saved.');
      });
    });
  });
  