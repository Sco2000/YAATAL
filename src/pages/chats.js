import { createElement } from '../components.js';
import { getCurrentUser } from '../utils/auth.js';
import { fetchConversations, fetchUserById } from '../api/api.js';
import { selectItem } from '../handlers/eventHandlers.js';

export async function displayUserConversations() {
    const container = document.getElementById('message-container');
    if (!container) return;

    const currentUser = getCurrentUser();
    
    if (!currentUser) return;

    try {
        const conversations = await fetchConversations();
        const userConversations = conversations.filter(conv => 
            conv.participants.includes(currentUser.id)
        );


        userConversations.sort((a, b) => 
            new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );

        container.innerHTML = '';

        for (const conv of userConversations) {
            const messageSortedByDate = conv.messages.sort((a, b) => new Date(b.date) - new Date(a.date));
            const lastMessage = messageSortedByDate[messageSortedByDate.length - 1] || {};
            const isLastMessageFromUser = lastMessage?.senderId === Number(currentUser.id);
            const userInterlocutor = conv.participants.find(participantId => participantId !== currentUser.id);
            
            const Interlocutor = userInterlocutor ? await fetchUserById(userInterlocutor) : null;
            const contact = currentUser.contacts.find(contact => contact.id === userInterlocutor);
            
            
            

            if(conv.messages.length === 0) continue
            const conversationElement = createElement('div', {
                                            class: ['w-full', 'flex', "flex-col", "gap-3",'items-center', 'px-4', "py-1", 'hover:bg-[#202c33]', 'cursor-pointer'],
                                            onclick: () => selectItem(Interlocutor, conv.isGroup ? 'group' : 'conversation', conv)
                                        }, [createElement ("hr", {class: ["w-[91.5%]", "mt-0", "border-t", "ml-10", "border-gray-800"]}),
                                            createElement('div', {
                                                class: ['flex', 'items-start', 'w-full', 'gap-3']
                                            }, [
                                                createElement('div', {
                                                    class: ['size-10', 'rounded-full', 'overflow-hidden']
                                                }, [
                                                    createElement('img', {
                                                        src: conv.isGroup ? conv.groupAvatar : Interlocutor.avatar || 'https://via.placeholder.com/150',
                                                        class: ['w-full', 'h-full', 'object-cover']
                                                    })
                                                ]),
                                                createElement('div', {
                                                    class: ['flex-1']
                                                }, [
                                                    createElement('div', {
                                                        class: ['flex', 'justify-between', 'items-center', 'w-full']
                                                    }, [
                                                        createElement('h3', {
                                                            class: ['text-white', 'font-medium']
                                                        }, conv.isGroup ? conv.groupName : contact.name),
                                                        createElement('span', {
                                                            class: ['text-xs', 'text-gray-400']
                                                        }, formatDate(lastMessage.timestamp))
                                                    ]),
                                                    createElement('p', {
                                                        class: ['text-sm', 'text-gray-400', 'truncate']
                                                    }, [
                                                        lastMessage.senderId === currentUser.id ? conv.isGroup ? "✓ Vous: " : Interlocutor.isOnline ? "✓✓ Vous: " : "✓ Vous: " : "",
                                                        lastMessage?.content || 'Message en attente'
                                                    ].join(''))
                                                ])
                                            ]),
                                        ]);

            container.appendChild(conversationElement);
        }
    } catch (error) {
        console.error('Error fetching conversations:', error);
        container.innerHTML = '<div class="text-red-500 p-4">Erreur lors du chargement des conversations</div>';
    }
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (date >= yesterday) {
        return 'Hier';
    } else {
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
}
