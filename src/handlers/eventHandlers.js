import { logout } from "../pages/login";
import { formatDate } from "../pages/chats";
import { fetchUserById } from "../api/api";

const managedElements = ["list-message", "contacts-container", "status-zone", "settings-container", "profil-container"];

const managedButtons = ["message", "status", "settings-button", "profile-picture", "new-chat", "deconnexion"];

let selectedItem = null;
let selectedType = null;

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

export function handleButtonClick(buttonId) {
  //   let e = null
  // managedButtons.forEach(element => {
  //    e = document.getElementById(element.id);
  //   if(e.classList.contains("bg-[#e1b447]")){
  //     e.classList.remove("bg-[#e1b447]");
  //   }
  //   if(!e.classList.contains("hover:bg-orange-200")){
  //     e.classList.add("hover:bg-orange-200");
  //   }
  // });

  // resetSelection();
  
  const menu = document.getElementById("menu");
  
  switch(buttonId) {
    case "message":
      // setClass("nouveau", "bg-[#e1b447]");
      // removeClass("nouveau", "hover:bg-orange-200");
      showElement("list-message");
      break;
    case "status":
      // setClass("diffusions", "bg-[#e1b447]");
      // removeClass("diffusions", "hover:bg-orange-200");
      showElement("status-zone");
      // renderContact();
      break;
    case "settings-button":
      // setClass("groupes", "bg-[#e1b447]");
      // removeClass("groupes", "hover:bg-orange-200");
      showElement("settings-container");
      // renderGroup();
      break;
    case "profile-picture":
      // setClass("archives", "bg-[#e1b447]");
      // removeClass("archives", "hover:bg-orange-200");
      showElement("profil-container");
      // renderArchive();
      break;
    case "new-chat":
      // setClass("message", "bg-[#e1b447]");
      // removeClass("message", "hover:bg-orange-200");
      showElement("contacts-container");
      renderMessage();
      break;
    // case "deconnexion":
    //   // handleLogout();
    //   break;
    default:
      break;
  }
}

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
    // resetLoginForm();
    
    console.log("Déconnexion réussie");
}

export async function selectItem(item, type, conversation = "") {
  selectedItem = item;
  selectedType = type;
  
  const inputElement = document.querySelector("input[placeholder=Rechercher]");
  const nameElement = document.getElementById("selected-name");
  const avatarElement = document.getElementById("selected-avatar");
  const statusElement = document.getElementById("selected-status");
  inputElement.value = "";
  console.log(formatDate(item.lastSeen));
  
  if (type === 'contact') {
    statusElement.textContent = item.isOnline ? "En ligne" : `Dernière vue : ${formatDate(item.lastSeen)}`;
    nameElement.textContent = item.name;
    avatarElement.setAttribute("src", item.avatar || ""); 
  } else {
    const members = await getGroupParticipants(conversation)
    console.log(members);
    const membersSorted = members.sort((a, b) => a.name.localeCompare(b.name));
    console.log(membersSorted);
    
    nameElement.textContent = conversation.groupName;
    avatarElement.setAttribute("src", conversation.groupAvatar || ""); 
    const memberCount = Object.keys(item.users || {}).length;
    const membersName = membersSorted.map(member => member.name).join(", ");
    statusElement.textContent = membersName;
  }
  
  // const messageInput = document.getElementById("message-input");
  // const sendButton = document.getElementById("send-button");
  // messageInput.disabled = false;
  // sendButton.disabled = false;
  
  const conversationId = generateConversationId(item, type);
  displayMessages(conversationId, item);
}

async function getGroupParticipants(conversation) {
    const members = [];
    for (const participantId of conversation.participants) {
        const user = await fetchUserById(participantId);
        if (user) {
            members.push(user);
        }
    }
    console.log(members);
    
    return members;
}