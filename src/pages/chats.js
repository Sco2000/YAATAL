import { createElement } from '../components.js';
import { getCurrentUser } from '../utils/auth.js';
import { fetchConversations, fetchUserById } from '../api/api.js';
import { selectItem } from '../handlers/eventHandlers.js';

export async function displayUserConversations() {
    const container = document.getElementById('message-container');
    if (!container) return;

    const currentUser = getCurrentUser();
    console.log(currentUser);
    
    if (!currentUser) return;

    try {
        const conversations = await fetchConversations();
        console.log(conversations);
        
        // Filtrer les conversations de l'utilisateur courant
        const userConversations = conversations.filter(conv => 
            conv.participants.includes(currentUser.id)
        );

        console.log('Conversations de l\'utilisateur:', userConversations);

        // Trier les conversations par date de dernière mise à jour
        userConversations.sort((a, b) => 
            new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );

        // Vider le conteneur
        container.innerHTML = '';

        // Afficher chaque conversation
        for (const conv of userConversations) {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const isLastMessageFromUser = lastMessage?.senderId === Number(currentUser.id);
            const userInterlocutor = conv.participants.find(participantId => participantId !== currentUser.id);
            console.log('User Interlocutor:', userInterlocutor);
            console.log('currentUser:', currentUser);
            console.log('Conversation:', conv);
            
            const Interlocutor = userInterlocutor ? await fetchUserById(userInterlocutor) : null;
            console.log('Interlocutor:', Interlocutor.name);
            console.log(Interlocutor);
            

            if(conv.messages.length === 0) continue
            const conversationElement = createElement('div', {
                class: ['w-full', 'flex', "flex-col", "gap-3",'items-center', 'px-4', "py-1", 'hover:bg-[#202c33]', 'cursor-pointer'],
                onclick: () => selectItem(Interlocutor, conv.isGroup ? 'group' : 'contact', conv)
            }, [createElement ("hr", {class: ["w-[91.5%]", "mt-0", "border-t", "ml-10", "border-gray-600"]}),
                createElement('div', {
                    class: ['flex', 'items-start', 'w-full', 'gap-3']
                }, [
                    createElement('div', {
                        class: ['size-8', 'rounded-full', 'overflow-hidden']
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
                            }, conv.isGroup ? conv.groupName : Interlocutor.name),
                            createElement('span', {
                                class: ['text-xs', 'text-gray-400']
                            }, formatDate(conv.lastUpdated))
                        ]),
                        createElement('p', {
                            class: ['text-sm', 'text-gray-400', 'truncate']
                        }, [
                            conv.isGroup ? '✓' : !Interlocutor.isOnline ? '✓' : '✓✓',
                            conv.isGroup && isLastMessageFromUser ? 'Vous: ' : '',
                            lastMessage?.text || 'Messahe en attente'
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
