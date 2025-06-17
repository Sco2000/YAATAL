import './style.css'
import "./index.css"
import { leftBox, centerBox, rightBox, loginPage, theStatus } from "./ui/components.js"
import { createElement } from "./components.js"
import { showLoginPage, hideLoginPage, showMainApp } from './pages/login.js'
import { getCurrentUser } from './utils/auth.js';  
import {renderGroupedContacts} from "./pages/contacts.js"
import { displayUserConversations } from './pages/chats.js'
import { getContactStatus, separateStatus } from './pages/status.js'
import { showElement, hideAllElements } from './ui/uiManagers.js';
import { handleSendMessage } from './handlers/eventHandlers.js'
import { startPolling } from './polling.js'
import { fetchConversations } from './api/api.js'

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
      rightBox,
      theStatus
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
    displayUserConversations();
  } else {
    showLoginPage();
  }
});
// console.log(getCurrentUser());
// displayUserConversations();
// renderGroupedContacts()
// getContactStatus()
// separateStatus();
// hideAllElements(); 

// console.log(JSON.parse(localStorage.getItem('currentUser')));

// console.log(new Date("2025-05-09T08:33:49.213Z"));
// console.log(new Date("2025-06-09T08:33:49.213Z"));

startPolling();
// handleSendMessage();

// const user = getCurrentUser();
// console.log( Number(user.id )+ 1);
// const conversations = await fetchConversations();
// console.log(Math.max(...conversations.map(conv => conv.id)) + 1);
// console.log(Math.max(...conversations.map(conv => conv.id) + 1));
// Supprimer ces lignes car le status-view sera géré dans components.js 