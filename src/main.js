import './style.css'
import "./index.css"
import { leftBox, centerBox, rightBox, loginPage } from "./ui/components.js"
import { createElement } from "./components.js"
import { showLoginPage, hideLoginPage, showMainApp } from './pages/login.js'
import { getCurrentUser } from './utils/auth.js';  

const app = createElement(
    "div", 
    {
        id:"app",
        class: ["w-[90%]", "h-[95%]", "flex","shadow-xl"],
        style: { display: "none" } // Masqué par défaut
    },
    [
      leftBox,
      centerBox,
      rightBox
    ]
);
console.log(app);
// Event listeners
// document.addEventListener('keypress', function(event) {"app"
//   if (event.key === 'Enter' && event.target.id === 'message-input') {
//     sendMessage();
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const searchInput = document.querySelector('input[placeholder="Rechercher"]');
//   if (searchInput) {
//     searchInput.addEventListener('input', function() {
//       if (document.getElementById("list-message").style.display !== "none") {
//         renderMessage();
//       }
//     });
//   }
// });

// Initialisation de l'application
// document.body.appendChild(loginPage);
document.body.appendChild(loginPage);
document.body.appendChild(app);

window.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  if (user) {
    // Utilisateur déjà connecté
    hideLoginPage();
    showMainApp();
  } else {
    // Aucun utilisateur => rester sur la page de login
    showLoginPage(); // à créer si nécessaire
  }
});

// localStorage.removeItem("currentUser"); // Pour le test, on supprime l'utilisateur courant