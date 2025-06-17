const managedElements = ["list-message", "contacts-container", "status-zone", "settings-container", "profil-container", "new-contact-zone"];

export function hideAllElements() {
  managedElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  });
}

export function showElement(elementId) {
  hideAllElements(); 
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = ""; 
    
    if (elementId === "form-add-group") {
      renderContactsSelection();
    }
  }
}