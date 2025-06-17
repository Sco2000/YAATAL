export async function getGroupParticipants(conversation) {
    const members = [];
    for (const participantId of conversation.participants) {
        const user = await fetchUserById(participantId);
        if (user) {
            members.push(user);
        }
    }

    return members;
} 