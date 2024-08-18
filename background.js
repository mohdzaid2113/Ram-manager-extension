chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
      const lastAccessed = new Date().getTime(); 
      chrome.storage.local.set({ [tab.id]: lastAccessed });
  
      chrome.tabs.query({}, tabs => { 
        const currentTime = new Date().getTime(); 
        const suspensionTime = 10 * 60 * 1000; 
  
        tabs.forEach(tab => {
          chrome.storage.local.get([tab.id.toString()], result => {
            if (result[tab.id] && currentTime - result[tab.id] > suspensionTime) {
              chrome.tabs.discard(tab.id);
            }
          });
        });
      });
    });
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ suspensionTime: 10 * 60 * 1000 });
  });
  