import { logout } from "../pages/login";
import { formatDate } from "../pages/chats";
import { fetchUserById, sendMessage, fetchConversationById } from "../api/api";
import { loadConversations } from "../pages/chatBox";
import { getCurrentUser } from "../utils/auth";
import { displayUserConversations } from "../pages/chats";
import { separateStatus } from "../pages/status";
import { renderGroupedContacts } from "../pages/contacts";

const managedElements = ["list-message", "contacts-container", "status-zone", "settings-container", "profil-container", "new-contact-zone"];

const managedButtons = ["message", "status", "settings-button", "profile-picture", "new-chat", "deconnexion", "new-contact-button"];

let selectedItem = null;
let selectedType = null;
export let selectedConversation = null;
let updatedConversation = null;

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
      separateStatus();
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
      renderGroupedContacts();  
      // renderMessage();
      break;
    case "new-contact-button":
      showElement("new-contact-zone");
      break;
    // case "deconnexion":
      // handleLogout();
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
    
    // console.log("Déconnexion réussie");
}

export async function selectItem(item, type, conversation) {
  selectedItem = item;
  selectedType = type;
  selectedConversation = conversation;
  
  handleSendMessage();
  const inputElement = document.querySelector("input[placeholder=Rechercher]");
  const nameElement = document.getElementById("selected-name");
  const avatarElement = document.getElementById("selected-avatar");
  const statusElement = document.getElementById("selected-status");
  inputElement.value = "";
  // console.log(formatDate(item.lastSeen));
  
  if (type === 'contact') {
    statusElement.textContent = item.isOnline ? "En ligne" : `Dernière vue : ${formatDate(item.lastSeen)}`;
    nameElement.textContent = item.name;
    avatarElement.setAttribute("src", item.avatar || ""); 
  } else {
    const members = await getGroupParticipants(conversation)
    // console.log(members);
    const membersSorted = members.sort((a, b) => a.name.localeCompare(b.name));
    // console.log(membersSorted);
    
    nameElement.textContent = conversation.groupName;
    avatarElement.setAttribute("src", conversation.groupAvatar || "");
    const memberCount = Object.keys(item.users || {}).length;
    const membersName = membersSorted.map(member => member.name).join(", ");
    statusElement.textContent = membersName;
  }
  console.log(conversation);
  
  loadConversations(conversation); // Charger les conversations pour afficher les messages

  // const messageInput = document.getElementById("message-input");
  // const sendButton = document.getElementById("send-button");
  // messageInput.disabled = false;
  // sendButton.disabled = false;
  
  // const conversationId = generateConversationId(item, type);
  // displayMessages(conversationId, item);
}

async function getGroupParticipants(conversation) {
    const members = [];
    for (const participantId of conversation.participants) {
        const user = await fetchUserById(participantId);
        if (user) {
            members.push(user);
        }
    }
    // console.log(members);
    
    return members;
} 

export async function handleSendMessage() {
  const messageInput = document.getElementById("message-input");
  const button = document.getElementById("send-button");
  const currentUser = getCurrentUser();
  if (!messageInput || !currentUser || !button || !selectedConversation) {
    // console.log('Message impossible: données manquantes', {
    //   hasInput: !!messageInput,
    //   hasUser: !!currentUser,
    //   hasConversation: !!selectedConversation
    // });
    return;
  }
  
  const messageText = messageInput.value.trim();
  if (!messageText) return;
  
  try {
    // Préparer les données du message
    const messageData = {
      senderId: currentUser.id,
      content: messageText,
      type: 'text',
      timestamp: new Date().toISOString(),
    };
    
    // Envoyer le message
    await sendMessage(selectedConversation.id, messageData);
    
    // Vider l'input
    messageInput.value = '';
    
    // Récupérer la conversation mise à jour
    updatedConversation = await fetchConversationById(selectedConversation.id);
    
    // Mettre à jour la conversation sélectionnée
    selectedConversation = updatedConversation;
    
    // Recharger la conversation avec les données mises à jour
    loadConversations(updatedConversation);
    displayUserConversations();
  } catch (error) {
    // console.error('Erreur lors de l\'envoi du message:', error);
  }
}