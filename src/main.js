import './style.css'
import "./index.css"
import { leftBox, centerBox, rightBox, loginPage } from "./ui/components.js"
import { createElement } from "./components.js"
import { showLoginPage, hideLoginPage, showMainApp } from './pages/login.js'
import { getCurrentUser } from './utils/auth.js';  
import {renderGroupedContacts} from "./pages/contacts.js"
import { displayUserConversations } from './pages/chats.js'
import { getContactStatus, separateStatus } from './pages/status.js'
import { hideAllElements } from './handlers/eventHandlers.js';
import { showElement } from './handlers/eventHandlers.js';

const app = createElement(
    "div", 
    {
        id:"app",
        class: ["w-[90%]", "h-[95%]", "flex","shadow-xl"],
        style: { display: "none" }
    },
    [
      leftBox,
      centerBox,
      rightBox
    ]
);

document.body.appendChild(loginPage);
document.body.appendChild(app);

window.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  if (user) {
    hideLoginPage();
    showMainApp();
    showElement("list-message");
  } else {
    showLoginPage();
  }
});
console.log(getCurrentUser());
displayUserConversations();
renderGroupedContacts()
getContactStatus()
separateStatus();
hideAllElements(); 

console.log(JSON.parse(localStorage.getItem('currentUser')));

