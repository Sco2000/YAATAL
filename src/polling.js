import { displayUserConversations } from "./pages/chats.js";
import { loadConversations } from "./pages/chatBox";
import { separateStatus } from "./pages/status.js";
import { renderGroupedContacts } from "./pages/contacts";
import { getCurrentUser } from "./utils/auth";
import { selectedConversation } from "./handlers/eventHandlers.js";
import { fetchConversationById } from "./api/api.js";

export function startPolling() {
    setInterval( async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return
      displayUserConversations();
      renderGroupedContacts();
      separateStatus();
      
      if (selectedConversation) {
        const conv = await fetchConversationById(selectedConversation.id);
        loadConversations(conv);
      }
      }, 5000); // 5 secondes
}