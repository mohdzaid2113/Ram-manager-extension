document.addEventListener('DOMContentLoaded', () => {
    const suspendTimeInput = document.getElementById('suspendTime');
    const saveBtn = document.getElementById('saveBtn');
  
    chrome.storage.local.get(['suspensionTime'], result => {
      if (result.suspensionTime) {
        suspendTimeInput.value = result.suspensionTime / (60 * 1000); 
      }
    });
  
    saveBtn.addEventListener('click', () => {
      const suspensionTime = parseInt(suspendTimeInput.value) * 60 * 1000; 
      chrome.storage.local.set({ suspensionTime: suspensionTime }, () => {
        alert('Suspension time saved.');
      });
    });
  });
  