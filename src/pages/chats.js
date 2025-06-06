import { createElement } from '../components.js';
import { getCurrentUser } from '../utils/auth.js';
import { fetchConversations, fetchUserById } from '../api/api.js';

export async function displayUserConversations() {
    const container = document.getElementById('message-container');
    if (!container) return;

    const currentUser = getCurrentUser();
    if (!currentUser) return;

    try {
        const conversations = await fetchConversations();
        
        // Filtrer les conversations de l'utilisateur courant
        const userConversations = conversations.filter(conv => 
            conv.participants.includes(Number(currentUser.id))
        );

        console.log('Conversations de l\'utilisateur:', userConversations);
        

        // const userInterlocutor = userConversations.find(conv => 
        //     conv.participants.find(participant => participant.id !== currentUser.id)
        // );

        // console.log('User Interlocutor:', userInterlocutor);

        const userInterlocutors = userConversations.filter(conv => 
            conv.participants.length === 2 && 
            conv.participants.some(participant => participant.id !== currentUser.id)
        );

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
            const userInterlocutor = conv.participants.find(participantId => participantId !== Number(currentUser.id));
            console.log('User Interlocutor:', userInterlocutor);
            console.log('currentUser:', currentUser);
            
            const Interlocutor = userInterlocutor ? await fetchUserById(userInterlocutor) : null;
            console.log('Interlocutor:', Interlocutor.name);
            

            const conversationElement = createElement('div', {
                class: ['w-full', 'flex', "flex-col", "gap-3",'items-center', 'px-4', "py-1", 'hover:bg-[#202c33]', 'cursor-pointer'],
                onclick: () => selectConversation(conv.id)
            }, [createElement ("hr", {class: ["w-[91.5%]", "mt-0", "border-t", "ml-10", "border-gray-600"]}),
                createElement('div', {
                    class: ['flex', 'items-start', 'w-full', 'gap-3']
                }, [
                    createElement('div', {
                        class: ['size-8', 'rounded-full', 'overflow-hidden']
                    }, [
                        createElement('img', {
                            src: Interlocutor.avatar || '',
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
                            }, Interlocutor.name),
                            createElement('span', {
                                class: ['text-xs', 'text-gray-400']
                            }, formatDate(conv.lastUpdated))
                        ]),
                        createElement('p', {
                            class: ['text-sm', 'text-gray-400', 'truncate']
                        }, [
                            conv.isGroup ? '✓' : !Interlocutor.isOnline ? '✓' : '✓✓',
                            conv.isGroup && isLastMessageFromUser ? 'Vous: ' : '',
                            lastMessage?.text || 'Aucun message'
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

function formatDate(dateString) {
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

function selectConversation(conversationId) {
    // TODO: Implémenter la sélection de conversation
    console.log('Conversation sélectionnée:', conversationId);
}