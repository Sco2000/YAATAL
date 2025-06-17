import { FONTUP } from "../consts";
import { getCurrentUser } from "../utils/auth";
import { createElement } from "../components";
import { fetchConversations } from "../api/api";
import { formatDate } from "./chats";


export async function loadConversations(conversation) {
    
    const messageArea = document.getElementById('messages-area');
    if (!messageArea)  return;
    messageArea.innerHTML = ''; 
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    messageArea.innerHTML = ''; 
    const messages = conversation.messages || [];
    const sortMessageBytimestamp = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    const sortMessageByDate = {}
    sortMessageBytimestamp.forEach(message => {
        const date = new Date(message.timestamp).toLocaleDateString();
        
        if (!sortMessageByDate[date]) {
            sortMessageByDate[date] = [];
        }
        sortMessageByDate[date].push(message);
    });

    for (const date in sortMessageByDate) {
        console.log(date);

        const day = createElement("div", {class: ["w-full", "flex", "justify-center", "text-gray-100", 'font-semibold']}, createElement("p", {class: [ "bg-[#182229]", "rounded-xl", "w-fit", "p-2"]}, formatDate(sortMessageByDate[date][0].timestamp)));

        messageArea.appendChild(day)
        sortMessageByDate[date].forEach(message => {
        
            if (message.senderId === currentUser.id) {
                messageArea.appendChild(createElement("div", {class: ["inline-block", "ml-auto", 'bg-[#005c4b]','rounded-lg', "flex", "gap-2", "p-2"]}, 
                                        [
                                            createElement('div', {
                                                    class: [ 'text-gray-200', '', ]
                                                }, message.content),
                                            createElement('div', {class: [ "flex", "items-end"]}, 
                                                [
                                                    createElement('div', {
                                                    class: ['text-gray-400', 'text-xs', 'mt-1', 'text-right', '', "flex", "items-end"]
                                                    }, new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                                                    createElement('span', {class: ['text-gray-400', 'text-xs',  'text-right', '', "flex", "items-end"]}, message.isReceived ? "✓✓" : "✓")

                                                ])
                                        ]));
            } else {
                messageArea.appendChild(createElement("div", {class: ["inline-block", "mr-auto", 'bg-gray-700','rounded-lg', "flex", "gap-2", "p-2"]}, 
                                        [
                                            createElement('div', {
                                                    class: [ 'text-gray-200', '', ]
                                                }, message.content),
                                            createElement('div', {class: [ "flex", "items-end"]}, 
                                                [
                                                    createElement('div', {
                                                    class: ['text-gray-400', 'text-xs', 'mt-1', 'text-right', '', "flex", "items-end"]
                                                    }, new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
                                                ])
                                        ]));
            }
        });
        
    }
    messageArea.scrollTop = messageArea.scrollHeight;
} 

export async function getUserConversations(userId) {
    const conversations = await fetchConversations();
    return conversations.filter(conv => conv.participants.includes(userId));
}