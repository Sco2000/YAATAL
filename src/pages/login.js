import { apiService } from '../services/api.js';
import { getCurrentUser, setCurrentUser } from '../utils/auth.js';
import { displayUserConversations } from './chats.js';
import {showElement} from '../handlers/eventHandlers.js';

// Fonction de gestion de la connexion
export const handleLogin = async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const phone = formData.get('phone').trim();
  
  // Validation
  if (!isValidPhone(phone)) {
    showError('Please enter a valid phone number (9-12 digits)');
    return;
  }

  // Afficher le spinner
  showLoading(true);
  hideError();
  hideSuccess();

  try {
    // Vérifier si l'utilisateur existe déjà
    const user = await apiService.getUserByPhone(phone);
    console.log(user);
    
    
    if (user) {
      // Utilisateur existant - mettre à jour le statut en ligne
      await apiService.updateUser(user.id, {
        ...user,
        isOnline: true,
        lastSeen: new Date().toISOString()
      });
      
      // Sauvegarder l'utilisateur dans localStorage
      setCurrentUser(user);
      
      showSuccess('Welcome back!');
      
      // Rediriger vers la page de chat après un délai
      setTimeout(async () => {
        hideLoginPage();
        showMainApp();

        // Afficher les conversations de l'utilisateur
        showElement('list-message');
      }, 100);
    } else {
      showError('No account found with this phone number');
    }
  } catch (error) {
    console.error('Login error:', error);
    showError('Connection failed. Please check your internet connection and try again.');
  } finally {
    showLoading(false);
  }
};

// Fonction pour valider le numéro de téléphone
const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{9,15}$/;
  return phoneRegex.test(phone);
};

// Fonction pour afficher le loading
const showLoading = (show) => {
  const loginText = document.getElementById('login-text');
  const loginSpinner = document.getElementById('login-spinner');
  const loginButton = document.getElementById('login-button');
  
  if (show) {
    loginText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    loginButton.disabled = true;
    loginButton.classList.add('opacity-75', 'cursor-not-allowed');
  } else {
    loginText.classList.remove('hidden');
    loginSpinner.classList.add('hidden');
    loginButton.disabled = false;
    loginButton.classList.remove('opacity-75', 'cursor-not-allowed');
  }
};

// Fonction pour afficher les erreurs
const showError = (message) => {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
};

// Fonction pour masquer les erreurs
const hideError = () => {
  const errorElement = document.getElementById('error-message');
  errorElement.classList.add('hidden');
};

// Fonction pour afficher les messages de succès
const showSuccess = (message) => {
  const successElement = document.getElementById('success-message');
  successElement.textContent = message;
  successElement.classList.remove('hidden');
};

// Fonction pour masquer les messages de succès
const hideSuccess = () => {
  const successElement = document.getElementById('success-message');
  successElement.classList.add('hidden');
};

// Validate phone number format
export const isValidPhoneNumber = (phone) => {
  return /^\d{9,12}$/.test(phone);
};

export function hideLoginPage() {
  const loginPage = document.getElementById("login-page");
  if (loginPage) {
    loginPage.style.display = "none";
  }  
}
export function showMainApp() {
  const app = document.getElementById("app");
  if (app) {
    app.style.display = "flex";
  }  
}

export function showLoginPage() {
  const loginPage = document.getElementById("login-page");
  const app = document.getElementById("app");
  if (app) {
    app.style.display = "none";
  }
  if (loginPage) {
    loginPage.style.display = "flex";
  }
}

export function logout() {
  const DEFAULT_USER = getCurrentUser();
  const previousUser = { ...DEFAULT_USER };
  
  // Réinitialiser l'utilisateur par défaut
  DEFAULT_USER.name = "";
  DEFAULT_USER.telephone = "";
  DEFAULT_USER.id = null;
  DEFAULT_USER.isLoggedIn = false;
  
  // Supprimer la session de localStorage
  clearUserSession();
  
  console.log(`Utilisateur ${previousUser.name} déconnecté`);
  
  return true;
}

// Ajouter cette fonction pour supprimer la session
export function clearUserSession() {
  try {
    localStorage.removeItem("currentUser");
    console.log("Session utilisateur supprimée");
  } catch (error) {
    console.error("Erreur lors de la suppression de la session:", error);
  }
}