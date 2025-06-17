import { createElement } from '../components.js';
import { getCurrentUser } from '../utils/auth.js';
import { fetchContacts, fetchUsers, refreshCurrentUser } from '../api/api.js';
import { selectContact } from "../handlers/eventHandlers.js"

export async function groupContactsByLetter() {
    refreshCurrentUser();
    const currentUser = getCurrentUser();
    if(!currentUser) return
    try{
      
        const currentUserContacts = currentUser.contacts;
        const contacts = await fetchContacts();
        
      const sorted = [...currentUserContacts].sort((a, b) =>
        a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
      );
      const grouped = {};

      sorted.forEach(contact => {
        const letter = contact.name[0].toUpperCase();
        if (!grouped[letter]) {
          grouped[letter] = [];
        }
        grouped[letter].push(contact);
      });
      
      return grouped;
    }
    catch (error){
        console.error('Error fetching contacts:', error);
    }
}

export async function renderGroupedContacts() {
  const container = document.getElementById("contacts-list");
  container.innerHTML = ''; 
  const groupedContacts = await groupContactsByLetter();
  const users = await fetchUsers();
  
  for (const letter in groupedContacts) {
    container.appendChild(createElement("div", {
      class: ["text-teal-400", "text-lg", "font-bold", "py-2",]
    }, letter));

    groupedContacts[letter].forEach(contact => {
    const userContact = users.find(user => user.id === contact.id);
      
      const contactElement = createElement("div", {
        onclick: () => { selectContact(contact) }
      }, 
      [
        createElement("hr", {class: ["w-[85%]",  "ml-auto", "border-gray-600"]}, ),
        createElement("div", {class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]}, 
            [
              createElement("img", {
                class: ["w-12", "h-12", "rounded-full", "object-cover"],
                src: userContact.avatar || null,
                alt: contact.name
              }),
              createElement("div", { class: ["flex", "flex-col"] }, [
                createElement("div", { class: ["text-white", "font-medium"] }, contact.name),
                createElement("div", { class: ["text-gray-400", "text-sm"] }, userContact.status)
              ])
            ]
        )
      ]);
      
      container.appendChild(contactElement);
    });
  }
}
