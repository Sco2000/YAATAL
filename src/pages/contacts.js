import { createElement } from '../components.js';
import { getCurrentUser } from '../utils/auth.js';
import { fetchContacts, fetchUsers } from '../api/api.js';

export async function groupContactsByLetter() {
    const currentUser = getCurrentUser();
    if(!currentUser) return
    try{
        const currentUserContactsId = currentUser.contacts;
        const contacts = await fetchContacts();

        const currentUserContacts = contacts.filter(contact => currentUserContactsId.includes(contact.id));
        // Trier les contacts par nom
        // console.log(currentUserContacts);
        
        // console.log(contacts);
        
      const sorted = [...currentUserContacts].sort((a, b) =>
        a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
      );
    
      // Grouper par première lettre
      const grouped = {};
      sorted.forEach(contact => {
        const letter = contact.name[0].toUpperCase();
        if (!grouped[letter]) {
          grouped[letter] = [];
        }
        grouped[letter].push(contact);
      });
      // console.log(grouped);
      
      return grouped;
    }
    catch (error){
        console.error('Error fetching contacts:', error);
    }
}

export async function renderGroupedContacts() {
  const container = document.getElementById("contacts-list");
  container.innerHTML = ''; // Vider le conteneur
  const groupedContacts = await groupContactsByLetter();
  const users = await fetchUsers();
  // console.log(users);
  
  // console.log(groupedContacts);
  
  for (const letter in groupedContacts) {
    // Titre de section (ex: "A")
    container.appendChild(createElement("div", {
      class: ["text-teal-400", "text-lg", "font-bold", "py-2",]
    }, letter));

    // Contacts sous cette lettre
    groupedContacts[letter].forEach(contact => {
    const userContact = users.find(user => user.id === contact.id);
    // console.log(userContact);
      
      const contactElement = createElement("div", {
        
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
  // console.log(container);
}
