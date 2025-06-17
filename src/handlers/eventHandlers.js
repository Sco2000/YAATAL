import { formatDate } from "../pages/chats";
import { fetchUserById, sendMessage, fetchConversationById, fetchConversations, fetchContacts, createConversation } from "../api/api";
import { loadConversations } from "../pages/chatBox";
import { getCurrentUser } from "../utils/auth";
import { displayUserConversations } from "../pages/chats";
import { separateStatus } from "../pages/status";
import { renderGroupedContacts } from "../pages/contacts";
import { showElement } from "../ui/uiManagers.js";
import { getGroupParticipants } from "../utils/functions.js";

const managedButtons = ["message", "status", "settings-button", "profile-picture", "new-chat", "deconnexion", "new-contact-button"];

let selectedItem = null;
let selectedType = null;
let selectedContact = null;
export let selectedConversation = null;
let updatedConversation = null;



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



export async function selectItem(item, type, conversation = null) {
  const currentUser = getCurrentUser();
  selectedItem = item;
  selectedType = type;
  selectedConversation = conversation;
  const contact = currentUser.contacts.filter(contact => contact.id === item.id);
  console.log(contact);
  
  // handleSendMessage();
  const inputElement = document.querySelector("input[placeholder=Rechercher]");
  const nameElement = document.getElementById("selected-name");
  const avatarElement = document.getElementById("selected-avatar");
  const statusElement = document.getElementById("selected-status");
  inputElement.value = "";
  
  if (type === 'conversation') {
    const user = await fetchUserById(item.id);
    statusElement.textContent = user.isOnline ? "En ligne" : `Dernière vue : ${formatDate(user.lastSeen)}`;
    nameElement.textContent = item.name;
    avatarElement.setAttribute("src", user.avatar || ""); 
  }else if (type === 'contact') {
    selectedContact = item;
    console.log(selectedContact);

    const user = await fetchUserById(item.id);
    statusElement.textContent = user.isOnline ? "En ligne" : `Dernière vue : ${formatDate(user.lastSeen)}`;
    nameElement.textContent = item.name;
    avatarElement.setAttribute("src", user.avatar || ""); 
  }
   else {
    const members = await getGroupParticipants(conversation)
    const membersSorted = members.sort((a, b) => a.name.localeCompare(b.name));
    
    nameElement.textContent = conversation.groupName;
    avatarElement.setAttribute("src", conversation.groupAvatar || "");
    const memberCount = Object.keys(item.users || {}).length;
    const membersName = membersSorted.map(member => member.name).join(", ");
    statusElement.textContent = membersName;
  }
  if (conversation) loadConversations(conversation);
}



export async function handleSendMessage() {
  const messageInput = document.getElementById("message-input");
  const button = document.getElementById("send-button");
  const currentUser = getCurrentUser();
  
  if (!messageInput || !currentUser || !button) return;
  console.log("dgh");
  
  const messageText = messageInput.value.trim();
  if (!messageText) return;
  try {
    if (selectedConversation){
      const messageData = {
        senderId: currentUser.id,
        content: messageText,
        type: 'text',
        timestamp: new Date().toISOString(),
      };
      
      await sendMessage(selectedConversation.id, messageData);
      
      messageInput.value = '';
      
      updatedConversation = await fetchConversationById(selectedConversation.id);
      
      // Mettre à jour la conversation sélectionnée
      selectedConversation = updatedConversation;
      
      loadConversations(updatedConversation);
      displayUserConversations();
     }
     else{
      const messages = [
           {
            "id": "1",
           "senderId": currentUser.id,
           "content": messageText,
           "type": 'text',
           "timestamp": new Date().toISOString(),
           "isReceived": true,
           "isRead": false
          }
        ]
        let conversations = null
        conversations = await fetchConversations();
        const conversation = {
          participants: [currentUser.id, selectedContact.id],
          isGroup: false,
          messages: messages,
          id: conversations.length > 0 ? (Math.max(...conversations.map(conv => conv.id))  + 1).toString() : "1",
        }
        await createConversation(conversation);
        conversations = await fetchConversations();
        const input = document.getElementById("message-input");
        input.value = "";
        selectedConversation = conversations[conversations.length - 1];
        updatedConversation = await fetchConversationById(selectedConversation.id);
        // Mettre à jour la conversation sélectionnée
        selectedConversation = updatedConversation;
        selectedContact =  null;
        
        loadConversations(updatedConversation);
        displayUserConversations();
     }
  } 
  catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
  }
}

export async function selectContact(item) {
  const currentUser = getCurrentUser();
  console.log("fd");
  
  const messageContainer = document.getElementById("messages-area");
  if (!messageContainer) {
  console.warn("message-container introuvable dans le DOM !");
  return;
}
  messageContainer.innerHTML = "";
  if (!currentUser) return;
  selectedContact = item;
  const conversations = await fetchConversations();
  const convNotGroup = conversations.filter(conv => !conv.isGroup);
  console.log(item);
  let counter = 0;
  convNotGroup.forEach(async (conv) => {
    if (!(conv.participants.includes(selectedContact.id) && conv.participants.includes(currentUser.id))) {
      counter++;
    }
    //   console.log(item);
    //   const contact = await fetchContacts();
    //   const contactItem = contact.find(c => c.id === selectedContact.id);
    //   console.log(contactItem);
      
    //   selectItem(selectedContact, 'contact');
    // } else if (conv.participants.includes(selectedContact.id) && conv.participants.includes(currentUser.id)) {
    //   selectItem(selectedContact, 'contact', conv);
    //   showElement('list-message');
    //   displayUserConversations();
    // };
  });
  if (counter === convNotGroup.length) {
    console.log(selectedContact);
    
    selectItem(selectedContact, 'contact');
    showElement('list-message');
    displayUserConversations();
  }else{
    const conv = convNotGroup.find(conv => conv.participants.includes(selectedContact.id) && conv.participants.includes(currentUser.id));
    console.log(selectedContact);
    
    selectItem(selectedContact, 'conversation', conv);
    showElement('list-message');
    displayUserConversations();
  }
}