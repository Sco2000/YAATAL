import { getCurrentUser } from "../utils/auth";
import { isValidPhoneNumber } from "./login.js"
import { fetchUsers, addContactToCurrentUser, fetchContacts, refreshCurrentUser } from "../api/api.js";
import { showElement } from "../ui/uiManagers.js";

export const addContact = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const currentUser = getCurrentUser();

    if(!currentUser) return
    if(name === ""){
        showError ("Please enter a name");
        return;
    }
    if (!isValidPhoneNumber(phone)){
        showError("Please enter a valid phone number (9-12 digits)")
        return;
    }
    if(phone === currentUser.phone){
        showError("Vous ne pouvez pas ajouté votre propre numéro de téléphone!")
        return;
    }

     const contacts = await fetchContacts();
     const userContactsPhone = (contacts.filter(contact => currentUser.contacts.includes(contact.id))).map(contact => contact.phone);
    //  const userContactsPhone = userContacts.map(contact => contact.phone);
     console.log(currentUser.contacts);
    //  console.log(userContacts);
     console.log(userContactsPhone);
    
     

     if(userContactsPhone.includes(phone)){
        showError("Ce numéro de téléphone est déjà ajouté à vos contacts");
        return;
     }

    const users = await fetchUsers();
    const usersPhone = users.map(user => user.phone);
   
    if (!usersPhone.includes(phone)) {
        showError("Ce numéro de téléphone n'utilise pas YAATAL");
        return;
    }

    // const contact = {
    //     id: users.length > 0 ? (Math.max(...users.map(user => user.id)) + 1 ).toString(): "1",
    //     name: name,
    //     phone: phone
    // };

    // createContact(contact);
    const contact = await fetchContacts();
    const userContact = contact.filter(contact => contact.phone === phone);
    userContact[0].name = name;
    addContactToCurrentUser(userContact);
    refreshCurrentUser();
    showElement("list-contacts");
}

// async function addContactToCurrentUser(contact) {
//     const currentUser = getCurrentUser();
//     if (!currentUser) return;
//     const Contact = await fetchContacts();
//     const lastContactid = Contact[Contact.length - 1].id;
//     const currentUserContacts = currentUser.contacts;
//     currentUserContacts.push(contact.id);
// }

// Fonction pour afficher les erreurs
const showError = (message) => {
  const errorElement = document.getElementById('add-error-message');
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
};

// Fonction pour masquer les erreurs
const hideError = () => {
  const errorElement = document.getElementById('add-error-message');
  errorElement.classList.add('hidden');
};

// Fonction pour afficher les messages de succès
const showSuccess = (message) => {
  const successElement = document.getElementById('add-success-message');
  successElement.textContent = message;
  successElement.classList.remove('hidden');
};

// Fonction pour masquer les messages de succès
const hideSuccess = () => {
  const successElement = document.getElementById('add-success-message');
  successElement.classList.add('hidden');
};