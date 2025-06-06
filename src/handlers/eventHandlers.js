import { logout } from "../pages/login";

export function handleLogout() {
    // Sauvegarder les données avant de se déconnecter
    // saveCurrentUserData();
    
    // Déconnecter l'utilisateur
    logout();
    
    // Réinitialiser l'état de l'application
    // resetApplicationState();
    
    // Masquer l'application principale
    const app = document.getElementById("app");
    if (app) {
      app.style.display = "none";
    }
    
    // Afficher la page de connexion
    const loginPage = document.getElementById("login-page");
    if (loginPage) {
      loginPage.style.display = "flex";
    }
    
    // Réinitialiser les champs de connexion
    resetLoginForm();
    
    console.log("Déconnexion réussie");
}